import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Protocol } from '../types';
import { FileText, Plus, Trash2, Edit2, CheckCircle, XCircle, LayoutGrid, List } from 'lucide-react';
import { extractDocumentKnowledge } from '../services/geminiService';

export default function AdminProtocols() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newProtocol, setNewProtocol] = useState<Partial<Protocol>>({ isActive: true });
  const [rawText, setRawText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [extracting, setExtracting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, fileName: '' });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchProtocols();
  }, []);

  const fetchProtocols = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'protocols'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Protocol));
      setProtocols(data);
    } catch (error) {
      console.error('Error fetching protocols:', error);
    }
    setLoading(false);
  };

  const handleExtractAndSave = async () => {
    if ((!newProtocol.title && files.length === 0) || (!rawText && files.length === 0)) return;
    
    setExtracting(true);
    const skippedFiles: string[] = [];
    
    try {
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          setProgress({ current: i + 1, total: files.length, fileName: file.name });
          
          const title = (files.length === 1 && newProtocol.title) 
            ? newProtocol.title 
            : file.name.replace(/\.[^/.]+$/, ""); // Remove extension

          const exists = protocols.some(p => p.title.toLowerCase() === title.toLowerCase());
          if (exists) {
            skippedFiles.push(title);
            continue;
          }

          const extractedData = await extractDocumentKnowledge('protocol', file, undefined);
          
          const protocolToSave = {
            title,
            issuingEntity: newProtocol.issuingEntity || '',
            date: newProtocol.date || '',
            version: newProtocol.version || '',
            theme: newProtocol.theme || '',
            keywords: newProtocol.keywords || [],
            priorityLevel: newProtocol.priorityLevel || 'media',
            isActive: newProtocol.isActive ?? true,
            content: JSON.stringify(extractedData, null, 2),
            fileName: file.name,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };

          await addDoc(collection(db, 'protocols'), protocolToSave);
        }
      } else if (rawText) {
        const title = newProtocol.title || '';
        const exists = protocols.some(p => p.title.toLowerCase() === title.toLowerCase());
        
        if (exists) {
          skippedFiles.push(title);
        } else {
          const extractedData = await extractDocumentKnowledge('protocol', undefined, rawText);
          const protocolToSave = {
            title,
            issuingEntity: newProtocol.issuingEntity || '',
            date: newProtocol.date || '',
            version: newProtocol.version || '',
            theme: newProtocol.theme || '',
            keywords: newProtocol.keywords || [],
            priorityLevel: newProtocol.priorityLevel || 'media',
            isActive: newProtocol.isActive ?? true,
            content: JSON.stringify(extractedData, null, 2),
            fileName: '',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
          await addDoc(collection(db, 'protocols'), protocolToSave);
        }
      }

      setIsAdding(false);
      setNewProtocol({ isActive: true });
      setRawText('');
      setFiles([]);
      setProgress({ current: 0, total: 0, fileName: '' });
      fetchProtocols();
      
      if (skippedFiles.length > 0) {
        alert(`Se han omitido los siguientes protocolos porque ya existen en la base de datos:\n\n${skippedFiles.join('\n')}`);
      }
    } catch (error) {
      console.error('Error saving protocol:', error);
      alert('Error al extraer conocimiento o guardar el protocolo.');
    }
    setExtracting(false);
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'protocols', id), {
        isActive: !currentStatus,
        updatedAt: serverTimestamp()
      });
      fetchProtocols();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este protocolo?')) {
      try {
        await deleteDoc(doc(db, 'protocols', id));
        fetchProtocols();
      } catch (error) {
        console.error('Error deleting protocol:', error);
      }
    }
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <FileText className="w-7 h-7 text-olive-600" />
            Protocolos Clínicos
          </h1>
          <p className="text-slate-500 mt-1">Gestiona la base documental de guías y protocolos.</p>
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg mr-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-olive-600' : 'text-slate-500 hover:text-slate-700'}`}
              title="Vista de cuadrícula"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-olive-600' : 'text-slate-500 hover:text-slate-700'}`}
              title="Vista de lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 px-4 py-2 bg-olive-600 text-white rounded-lg hover:bg-olive-700 transition-colors font-medium"
          >
            {isAdding ? <XCircle className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {isAdding ? 'Cancelar' : 'Añadir Protocolo'}
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-semibold mb-4">Nuevo Protocolo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Título {files.length > 1 ? '(Automático)' : '*'}</label>
              <input
                type="text"
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 disabled:bg-slate-100 disabled:text-slate-500"
                value={files.length > 1 ? 'Se extraerá del nombre del archivo' : (newProtocol.title || '')}
                onChange={e => setNewProtocol({...newProtocol, title: e.target.value})}
                disabled={files.length > 1}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Entidad Emisora</label>
              <input
                type="text"
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                value={newProtocol.issuingEntity || ''}
                onChange={e => setNewProtocol({...newProtocol, issuingEntity: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tema</label>
              <input
                type="text"
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                value={newProtocol.theme || ''}
                onChange={e => setNewProtocol({...newProtocol, theme: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Prioridad</label>
              <select
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                value={newProtocol.priorityLevel || 'media'}
                onChange={e => setNewProtocol({...newProtocol, priorityLevel: e.target.value as any})}
              >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Subir Archivos PDF (Puedes seleccionar varios)</label>
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">O Texto del Documento (Copiar y Pegar)</label>
            <textarea
              rows={8}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 font-mono text-sm disabled:bg-slate-100"
              placeholder="Si no subes un PDF, pega aquí el contenido del documento..."
              value={rawText}
              onChange={e => setRawText(e.target.value)}
              disabled={files.length > 0}
            />
            <p className="text-xs text-slate-500 mt-2">La IA de Novik extraerá automáticamente el conocimiento clínico, indicaciones, advertencias y reglas de este texto o archivo PDF.</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-olive-600 font-medium">
              {extracting && files.length > 0 && `Procesando ${progress.current} de ${progress.total}: ${progress.fileName}...`}
            </div>
            <button
              onClick={handleExtractAndSave}
              disabled={extracting || (files.length === 0 && (!newProtocol.title || !rawText))}
              className="flex items-center gap-2 px-6 py-2 bg-olive-600 text-white rounded-lg hover:bg-olive-700 disabled:opacity-50 transition-colors font-medium"
            >
              {extracting ? 'Procesando con IA...' : (files.length > 1 ? `Extraer y Guardar ${files.length} Protocolos` : 'Extraer y Guardar')}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12 text-slate-500">Cargando protocolos...</div>
      ) : protocols.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-slate-900">No hay protocolos</h3>
          <p className="text-slate-500">Añade tu primer protocolo clínico para alimentar el motor de Novik.</p>
        </div>
      ) : viewMode === 'list' ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Entidad / Tema</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Prioridad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {protocols.map(protocol => (
                  <tr key={protocol.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900 line-clamp-2" title={protocol.title}>{protocol.title}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {protocol.createdAt?.toDate ? new Date(protocol.createdAt.toDate()).toLocaleDateString() : 'Reciente'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{protocol.issuingEntity || '-'}</div>
                      <div className="text-xs text-slate-500">{protocol.theme || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="capitalize text-sm text-slate-900">{protocol.priorityLevel}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleActive(protocol.id, protocol.isActive)}
                        className={`px-2 py-1 text-xs font-medium rounded-full ${protocol.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}
                      >
                        {protocol.isActive ? 'Activo' : 'Inactivo'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleDelete(protocol.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors inline-flex">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {protocols.map(protocol => (
            <div key={protocol.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-slate-900 line-clamp-2" title={protocol.title}>{protocol.title}</h3>
                <button
                  onClick={() => toggleActive(protocol.id, protocol.isActive)}
                  className={`flex-shrink-0 ml-3 px-2 py-1 text-xs font-medium rounded-full ${protocol.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}
                >
                  {protocol.isActive ? 'Activo' : 'Inactivo'}
                </button>
              </div>
              <div className="text-sm text-slate-500 mb-4 flex-1">
                <p><strong>Entidad:</strong> {protocol.issuingEntity || 'N/A'}</p>
                <p><strong>Tema:</strong> {protocol.theme || 'N/A'}</p>
                <p><strong>Prioridad:</strong> <span className="capitalize">{protocol.priorityLevel}</span></p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400">
                  {protocol.createdAt?.toDate ? new Date(protocol.createdAt.toDate()).toLocaleDateString() : 'Reciente'}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(protocol.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
