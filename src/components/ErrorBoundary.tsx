import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
            <h1 className="text-2xl font-bold text-red-600 mb-4">¡Vaya! Algo ha salido mal.</h1>
            <p className="text-gray-700 mb-4">
              La aplicación ha encontrado un error inesperado al cargar.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg overflow-auto mb-6">
              <code className="text-sm text-red-500">
                {this.state.error?.message || 'Error desconocido'}
              </code>
            </div>
            
            {this.state.error?.message.includes('GEMINI_API_KEY') && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Falta la clave de API de Gemini.</strong> Si has desplegado en Vercel, asegúrate de añadir la variable de entorno <code>GEMINI_API_KEY</code> en la configuración de tu proyecto en Vercel y luego haz un nuevo despliegue (Redeploy).
                </p>
              </div>
            )}

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
