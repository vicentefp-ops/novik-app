import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage, Type } from "@google/genai";
import { Mic, MicOff, Loader2, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VoiceAssistantProps {
  onFieldUpdate: (field: string, value: any) => void;
  onAnalyzeCase?: () => void;
}

export default function VoiceAssistant({ onFieldUpdate, onAnalyzeCase }: VoiceAssistantProps) {
  const { language } = useLanguage();
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const isRecordingRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcript, setTranscript] = useState<string>("");

  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null);
  const audioQueueRef = useRef<Int16Array[]>([]);
  const isPlayingRef = useRef(false);
  const lastActivityRef = useRef<number>(0);
  const processCountRef = useRef<number>(0);

  const stopSession = useCallback(async () => {
    console.log("Stopping voice session...");
    if (sessionRef.current) {
      await sessionRef.current.close();
      sessionRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      await audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsConnected(false);
    setIsRecording(false);
    isRecordingRef.current = false;
    setAudioLevel(0);
    setTranscript("");
  }, []);

  const playNextChunk = useCallback(() => {
    if (audioQueueRef.current.length === 0 || isPlayingRef.current || !audioContextRef.current) {
      return;
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    isPlayingRef.current = true;
    const chunk = audioQueueRef.current.shift()!;
    const audioBuffer = audioContextRef.current.createBuffer(1, chunk.length, 24000);
    const channelData = audioBuffer.getChannelData(0);

    for (let i = 0; i < chunk.length; i++) {
      channelData[i] = chunk[i] / 32768.0;
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);
    source.onended = () => {
      isPlayingRef.current = false;
      playNextChunk();
    };
    source.start();
  }, []);

  const startSession = async () => {
    try {
      console.log("Starting voice session...");
      setError(null);
      setTranscript("");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = `
        Eres un asistente clínico experto. Tu objetivo es ayudar al médico a rellenar el formulario del paciente mediante la voz.
        
        INSTRUCCIONES CRÍTICAS:
        1. Cuando recibas "GREET_USER", saluda al usuario diciendo: "${language === 'es' ? 'Adelante, puede empezar a describir su caso.' : 'Go ahead, you can start describing your case.'}"
        2. Usa la voz de "Aoede" con acento de España si hablas en español.
        3. SÉ EXTREMADAMENTE CONCISO. NO dialogues, NO repitas la información que el usuario te acaba de dar. Solo di "Anotado", "Entendido" o similar. No pierdas el tiempo.
        4. RELLENA EN TIEMPO REAL: En cuanto escuches un dato, usa la herramienta 'fillFormField' INMEDIATAMENTE. No esperes a que el usuario termine de hablar.
        5. Extrae los siguientes campos:
           - age (número)
           - weight (número, asume kg si no se especifica)
           - height (número, asume cm si no se especifica)
           - sex (M para hombre/masculino, F para mujer/femenino, O para otro)
           - procedure (texto corto del procedimiento planeado)
           - currentPathologies (texto de antecedentes y patologías actuales)
           - medication (texto de medicación actual)
           - allergies (texto de alergias)
        6. Si el usuario te pide que "analices el caso", "evalúes el caso" o similar, NO LO ANALICES TÚ. Usa la herramienta 'analyzeCase' inmediatamente y di "Analizando caso...".
      `;

      const fillFormFieldTool = {
        name: "fillFormField",
        description: "Rellena un campo del formulario clínico con el valor extraído en tiempo real.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            field: {
              type: Type.STRING,
              enum: ["age", "weight", "height", "sex", "procedure", "currentPathologies", "medication", "allergies"],
              description: "El nombre del campo a rellenar."
            },
            value: {
              type: Type.STRING,
              description: "El valor para el campo. Para 'sex' debe ser 'M', 'F' o 'O'."
            }
          },
          required: ["field", "value"]
        }
      };

      const analyzeCaseTool = {
        name: "analyzeCase",
        description: "Inicia el análisis del caso clínico. Úsalo cuando el usuario te pida analizar o evaluar el caso.",
        parameters: {
          type: Type.OBJECT,
          properties: {},
        }
      };

      console.log("Connecting to Live API...");
      const sessionPromise = ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction,
          tools: [{ functionDeclarations: [fillFormFieldTool, analyzeCaseTool] }],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } }
          },
          outputAudioTranscription: {},
          inputAudioTranscription: {}
        },
        callbacks: {
          onopen: () => {
            console.log("Live API connection opened.");
            setIsConnected(true);
            setIsRecording(true);
            isRecordingRef.current = true;
            // Trigger initial greeting using sessionPromise to avoid race conditions
            sessionPromise.then(session => {
              session.sendRealtimeInput({
                text: "GREET_USER"
              });
            });
          },
          onmessage: async (message: LiveServerMessage) => {
            // Reset activity on any message from AI
            lastActivityRef.current = Date.now();

            // Log transcription if available
            if (message.serverContent?.modelTurn?.parts) {
              for (const part of message.serverContent.modelTurn.parts) {
                if (part.text) {
                  console.log("AI Transcript:", part.text);
                  setTranscript(part.text);
                }
              }
            }

            // Handle audio output
            if (message.serverContent?.modelTurn?.parts) {
              for (const part of message.serverContent.modelTurn.parts) {
                if (part.inlineData?.data) {
                  const binaryString = atob(part.inlineData.data);
                  const bytes = new Uint8Array(binaryString.length);
                  for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                  }
                  const pcmData = new Int16Array(bytes.buffer);
                  audioQueueRef.current.push(pcmData);
                  playNextChunk();
                }
              }
            }

            // Handle tool calls
            if (message.toolCall) {
              console.log("Tool call received:", message.toolCall);
              for (const call of message.toolCall.functionCalls) {
                if (call.name === "fillFormField") {
                  const { field, value } = call.args as any;
                  onFieldUpdate(field, value);
                  
                  // Send tool response back
                  sessionPromise.then(session => {
                    session.sendToolResponse({
                      functionResponses: [{
                        name: "fillFormField",
                        id: call.id,
                        response: { result: "success" }
                      }]
                    });
                  });
                } else if (call.name === "analyzeCase") {
                  if (onAnalyzeCase) {
                    onAnalyzeCase();
                  }
                  
                  sessionPromise.then(session => {
                    session.sendToolResponse({
                      functionResponses: [{
                        name: "analyzeCase",
                        id: call.id,
                        response: { result: "success" }
                      }]
                    });
                  });
                  
                  // Optionally stop the voice session when analysis starts
                  stopSession();
                }
              }
            }

            if (message.serverContent?.interrupted) {
              console.log("AI was interrupted.");
              audioQueueRef.current = [];
              isPlayingRef.current = false;
            }
          },
          onclose: () => {
            console.log("Live API connection closed.");
            setIsConnected(false);
            setIsRecording(false);
            isRecordingRef.current = false;
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            setError("Error en la conexión de voz.");
            stopSession();
          }
        }
      });

      const session = await sessionPromise;
      sessionRef.current = session;

      // Setup Audio Capture
      console.log("Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;
      await audioContext.resume(); // Ensure it's running

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      // Prevent feedback by connecting to a muted gain node
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0;
      processor.connect(gainNode);
      gainNode.connect(audioContext.destination);

      const SILENCE_THRESHOLD = 0.01;
      const SILENCE_TIMEOUT = 20000; // 20 seconds
      lastActivityRef.current = Date.now();
      let isCurrentlySpeaking = false;

      processor.onaudioprocess = (e) => {
        if (!isRecordingRef.current || isMutedRef.current) return;
        
        const inputData = e.inputBuffer.getChannelData(0);

        // Silence detection
        let sum = 0;
        for (let i = 0; i < inputData.length; i++) {
          sum += inputData[i] * inputData[i];
        }
        const rms = Math.sqrt(sum / inputData.length);

        // Update visualizer state without spamming re-renders
        if (rms > SILENCE_THRESHOLD) {
          if (!isCurrentlySpeaking) {
            isCurrentlySpeaking = true;
            setAudioLevel(1);
          }
        } else {
          if (isCurrentlySpeaking) {
            isCurrentlySpeaking = false;
            setAudioLevel(0);
          }
        }

        if (rms > SILENCE_THRESHOLD || isPlayingRef.current) {
          lastActivityRef.current = Date.now();
        } else {
          if (Date.now() - lastActivityRef.current > SILENCE_TIMEOUT) {
            console.log("Silence timeout reached. Stopping session.");
            stopSession();
            return;
          }
        }
        
        // Convert Float32 to Int16 PCM
        const pcmData = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
        }
        
        // Convert Int16Array to Base64
        const uint8 = new Uint8Array(pcmData.buffer);
        let binary = "";
        for (let i = 0; i < uint8.length; i++) {
          binary += String.fromCharCode(uint8[i]);
        }
        const base64 = btoa(binary);

        sessionPromise.then(s => {
          s.sendRealtimeInput({
            audio: { data: base64, mimeType: 'audio/pcm;rate=16000' }
          });
        });
      };

      source.connect(processor);
      console.log("Audio capture started.");

    } catch (err) {
      console.error("Failed to start voice assistant:", err);
      setError("No se pudo acceder al micrófono o conectar con la IA.");
    }
  };

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, [stopSession]);

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-3">
        {!isConnected ? (
          <button
            onClick={startSession}
            className="flex items-center gap-2 px-4 py-2 bg-olive-100 text-olive-700 rounded-full hover:bg-olive-200 transition-colors font-medium"
          >
            <Mic className="w-5 h-5" />
            {language === 'es' ? 'Dictar caso' : 'Dictate case'}
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-olive-600 text-white px-4 py-2 rounded-full shadow-lg">
            <button 
              onClick={() => {
                if (isMuted) lastActivityRef.current = Date.now();
                setIsMuted(!isMuted);
                isMutedRef.current = !isMuted;
              }}
              className="hover:bg-olive-700 p-1 rounded-full transition-colors relative"
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              {!isMuted && audioLevel > 0.01 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
              )}
            </button>
            <span className="text-sm font-medium">
              {language === 'es' ? 'Asistente activo...' : 'Assistant active...'}
            </span>
            <button 
              onClick={stopSession}
              className="ml-2 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded text-xs"
            >
              {language === 'es' ? 'Finalizar' : 'Finish'}
            </button>
          </div>
        )}
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
      {isConnected && transcript && (
        <div className="text-xs text-slate-500 max-w-xs text-right italic bg-slate-50 p-2 rounded-lg border border-slate-100">
          "{transcript}"
        </div>
      )}
    </div>
  );
}
