import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Trash2, Plus, Save } from 'lucide-react';

interface Banner {
  id: string;
  image: string;
  url: string;
  title: { es: string; en: string };
  active: boolean;
}

export default function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [newBanner, setNewBanner] = useState({ image: '', url: '', titleEs: '', titleEn: '', active: true });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const querySnapshot = await getDocs(collection(db, 'banners'));
    const fetchedBanners = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Banner));
    setBanners(fetchedBanners);
  };

  const addBanner = async () => {
    await addDoc(collection(db, 'banners'), {
      image: newBanner.image,
      url: newBanner.url,
      title: { es: newBanner.titleEs, en: newBanner.titleEn },
      active: newBanner.active
    });
    setNewBanner({ image: '', url: '', titleEs: '', titleEn: '', active: true });
    fetchBanners();
  };

  const deleteBanner = async (id: string) => {
    await deleteDoc(doc(db, 'banners', id));
    fetchBanners();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestor de Banners</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
        <h2 className="text-lg font-semibold mb-4">Añadir nuevo banner</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="URL de la imagen" value={newBanner.image} onChange={(e) => setNewBanner({...newBanner, image: e.target.value})} className="p-2 border rounded" />
          <input type="text" placeholder="URL de destino" value={newBanner.url} onChange={(e) => setNewBanner({...newBanner, url: e.target.value})} className="p-2 border rounded" />
          <input type="text" placeholder="Título (ES)" value={newBanner.titleEs} onChange={(e) => setNewBanner({...newBanner, titleEs: e.target.value})} className="p-2 border rounded" />
          <input type="text" placeholder="Título (EN)" value={newBanner.titleEn} onChange={(e) => setNewBanner({...newBanner, titleEn: e.target.value})} className="p-2 border rounded" />
          <button onClick={addBanner} className="bg-olive-600 text-white p-2 rounded flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Añadir Banner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map(banner => (
          <div key={banner.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <img src={banner.image} alt={banner.title.es} className="w-full h-32 object-cover rounded mb-4" />
            <p className="font-semibold">{banner.title.es}</p>
            <button onClick={() => deleteBanner(banner.id)} className="text-red-600 mt-2 flex items-center gap-1">
              <Trash2 className="w-4 h-4" /> Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
