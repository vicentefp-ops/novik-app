import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Leaflet } from '../types';
import { Pill, Plus, Trash2, Edit2, CheckCircle, XCircle, LayoutGrid, List, Folder } from 'lucide-react';
import { extractDocumentKnowledge } from '../services/geminiService';

const CATEGORIES = ['Todos', 'Anestésicos', 'Antibióticos', 'Analgésicos', 'Antiinflamatorios', 'Otros'];

export default function AdminLeaflets() {
  const [leaflets, setLeaflets] = useState<Leaflet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newLeaflet, setNewLeaflet] = useState<Partial<Leaflet>>({ isActive: true });
  const [rawText, setRawText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [extracting, setExtracting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, fileName: '' });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('Todos');

  useEffect(() => {
    fetchLeaflets();
  }, []);

  const fetchLeaflets = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'leaflets'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Leaflet));
      setLeaflets(data);
    } catch (error) {
      console.error('Error fetching leaflets:', error);
    }
    setLoading(false);
  };

  const handleExtractAndSave = async () => {
    if ((!newLeaflet.commercialName && files.length === 0) || (!rawText && files.length === 0)) return;
    
    setExtracting(true);
    const skippedFiles: string[] = [];
    
    try {
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          setProgress({ current: i + 1, total: files.length, fileName: file.name });
          
          const commercialName = (files.length === 1 && newLeaflet.commercialName) 
            ? newLeaflet.commercialName 
            : file.name.replace(/\.[^/.]+$/, ""); // Remove extension
            
          const exists = leaflets.some(l => l.commercialName.toLowerCase() === commercialName.toLowerCase());
          if (exists) {
            skippedFiles.push(commercialName);
            continue;
          }
            
          const activeIngredient = (files.length === 1 && newLeaflet.activeIngredient)
            ? newLeaflet.activeIngredient
            : "Pendiente de revisión";

          const extractedData = await extractDocumentKnowledge('leaflet', file, undefined);
          
          const leafletToSave = {
            commercialName,
            activeIngredient,
            pharmacologicalCategory: newLeaflet.pharmacologicalCategory || '',
            date: newLeaflet.date || '',
            version: newLeaflet.version || '',
            lab: newLeaflet.lab || '',
            drugType: newLeaflet.drugType || '',
            keywords: newLeaflet.keywords || [],
            isActive: newLeaflet.isActive ?? true,
            content: JSON.stringify(extractedData, null, 2),
            fileName: file.name,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };

          await addDoc(collection(db, 'leaflets'), leafletToSave);
        }
      } else if (rawText) {
        const commercialName = newLeaflet.commercialName || '';
        const exists = leaflets.some(l => l.commercialName.toLowerCase() === commercialName.toLowerCase());
        
        if (exists) {
          skippedFiles.push(commercialName);
        } else {
          const extractedData = await extractDocumentKnowledge('leaflet', undefined, rawText);
          const leafletToSave = {
            commercialName,
            activeIngredient: newLeaflet.activeIngredient,
            pharmacologicalCategory: newLeaflet.pharmacologicalCategory || '',
            date: newLeaflet.date || '',
            version: newLeaflet.version || '',
            lab: newLeaflet.lab || '',
            drugType: newLeaflet.drugType || '',
            keywords: newLeaflet.keywords || [],
            isActive: newLeaflet.isActive ?? true,
            content: JSON.stringify(extractedData, null, 2),
            fileName: '',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
          await addDoc(collection(db, 'leaflets'), leafletToSave);
        }
      }

      setIsAdding(false);
      setNewLeaflet({ isActive: true });
      setRawText('');
      setFiles([]);
      setProgress({ current: 0, total: 0, fileName: '' });
      fetchLeaflets();
      
      if (skippedFiles.length > 0) {
        alert(`Se han omitido los siguientes prospectos porque ya existen en la base de datos:\n\n${skippedFiles.join('\n')}`);
      }
    } catch (error) {
      console.error('Error saving leaflet:', error);
      alert('Error al extraer conocimiento o guardar el prospecto.');
    }
    setExtracting(false);
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'leaflets', id), {
        isActive: !currentStatus,
        updatedAt: serverTimestamp()
      });
      fetchLeaflets();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este prospecto?')) {
      try {
        await deleteDoc(doc(db, 'leaflets', id));
        fetchLeaflets();
      } catch (error) {
        console.error('Error deleting leaflet:', error);
      }
    }
  };

  const filteredLeaflets = activeTab === 'Todos' 
    ? leaflets 
    : leaflets.filter(l => l.pharmacologicalCategory === activeTab);

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Pill className="w-7 h-7 text-olive-600" />
            Prospectos Farmacológicos
          </h1>
          <p className="text-slate-500 mt-1">Gestiona la base documental de prospectos y fichas técnicas.</p>
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
            {isAdding ? 'Cancelar' : 'Añadir Prospecto'}
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-semibold mb-4">Nuevo Prospecto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Comercial {files.length > 1 ? '(Automático)' : '*'}</label>
              <input
                type="text"
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 disabled:bg-slate-100 disabled:text-slate-500"
                value={files.length > 1 ? 'Se extraerá del nombre del archivo' : (newLeaflet.commercialName || '')}
                onChange={e => setNewLeaflet({...newLeaflet, commercialName: e.target.value})}
                disabled={files.length > 1}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Principio Activo {files.length > 1 ? '(Automático)' : '*'}</label>
              <input
                type="text"
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 disabled:bg-slate-100 disabled:text-slate-500"
                value={files.length > 1 ? 'Pendiente de revisión' : (newLeaflet.activeIngredient || '')}
                onChange={e => setNewLeaflet({...newLeaflet, activeIngredient: e.target.value})}
                disabled={files.length > 1}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Categoría Farmacológica</label>
              <select
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                value={newLeaflet.pharmacologicalCategory || ''}
                onChange={e => setNewLeaflet({...newLeaflet, pharmacologicalCategory: e.target.value})}
              >
                <option value="">Seleccionar categoría...</option>
                {CATEGORIES.filter(c => c !== 'Todos').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Laboratorio</label>
              <input
                type="text"
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                value={newLeaflet.lab || ''}
                onChange={e => setNewLeaflet({...newLeaflet, lab: e.target.value})}
              />
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
            <label className="block text-sm font-medium text-slate-700 mb-1">O Texto del Prospecto (Copiar y Pegar)</label>
            <textarea
              rows={8}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 font-mono text-sm disabled:bg-slate-100"
              placeholder="Si no subes un PDF, pega aquí el contenido del prospecto o ficha técnica..."
              value={rawText}
              onChange={e => setRawText(e.target.value)}
              disabled={files.length > 0}
            />
            <p className="text-xs text-slate-500 mt-2">Novik extraerá indicaciones, contraindicaciones, posología y advertencias automáticamente del texto o archivo PDF.</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-olive-600 font-medium">
              {extracting && files.length > 0 && `Procesando ${progress.current} de ${progress.total}: ${progress.fileName}...`}
            </div>
            <button
              onClick={handleExtractAndSave}
              disabled={extracting || (files.length === 0 && (!newLeaflet.commercialName || !newLeaflet.activeIngredient || !rawText))}
              className="flex items-center gap-2 px-6 py-2 bg-olive-600 text-white rounded-lg hover:bg-olive-700 disabled:opacity-50 transition-colors font-medium"
            >
              {extracting ? 'Procesando con IA...' : (files.length > 1 ? `Extraer y Guardar ${files.length} Prospectos` : 'Extraer y Guardar')}
            </button>
          </div>
        </div>
      )}

      {!isAdding && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === category 
                  ? 'bg-olive-100 text-olive-700 border border-olive-200' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {category !== 'Todos' && <Folder className="w-4 h-4" />}
              {category}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12 text-slate-500">Cargando prospectos...</div>
      ) : filteredLeaflets.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
          <Pill className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-slate-900">No hay prospectos</h3>
          <p className="text-slate-500">
            {activeTab === 'Todos' 
              ? 'Añade tu primer prospecto farmacológico para alimentar el motor de Novik.'
              : `No hay prospectos en la categoría ${activeTab}.`}
          </p>
        </div>
      ) : viewMode === 'list' ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nombre Comercial</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Principio Activo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Categoría / Lab</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredLeaflets.map(leaflet => (
                  <tr key={leaflet.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900 line-clamp-2" title={leaflet.commercialName}>{leaflet.commercialName}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {leaflet.createdAt?.toDate ? new Date(leaflet.createdAt.toDate()).toLocaleDateString() : 'Reciente'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{leaflet.activeIngredient}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{leaflet.pharmacologicalCategory || '-'}</div>
                      <div className="text-xs text-slate-500">{leaflet.lab || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleActive(leaflet.id, leaflet.isActive)}
                        className={`px-2 py-1 text-xs font-medium rounded-full ${leaflet.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}
                      >
                        {leaflet.isActive ? 'Activo' : 'Inactivo'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleDelete(leaflet.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors inline-flex">
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
          {filteredLeaflets.map(leaflet => (
            <div key={leaflet.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-slate-900 line-clamp-2" title={leaflet.commercialName}>{leaflet.commercialName}</h3>
                <button
                  onClick={() => toggleActive(leaflet.id, leaflet.isActive)}
                  className={`flex-shrink-0 ml-3 px-2 py-1 text-xs font-medium rounded-full ${leaflet.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}
                >
                  {leaflet.isActive ? 'Activo' : 'Inactivo'}
                </button>
              </div>
              <div className="text-sm text-slate-500 mb-4 flex-1">
                <p><strong>Principio Activo:</strong> {leaflet.activeIngredient}</p>
                <p><strong>Categoría:</strong> {leaflet.pharmacologicalCategory || 'N/A'}</p>
                <p><strong>Laboratorio:</strong> {leaflet.lab || 'N/A'}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400">
                  {leaflet.createdAt?.toDate ? new Date(leaflet.createdAt.toDate()).toLocaleDateString() : 'Reciente'}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(leaflet.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
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
