import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface Banner {
  id: string;
  image: string;
  url: string;
  title: { es: string; en: string };
  active: boolean;
}

export default function CrossPromotionBanner() {
  const { language } = useLanguage();
  const [currentPromo, setCurrentPromo] = useState<Banner | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      const q = query(collection(db, 'banners'), where('active', '==', true));
      const querySnapshot = await getDocs(q);
      const banners = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Banner));
      
      if (banners.length > 0) {
        const sessionPromoIndex = sessionStorage.getItem('promoIndex');
        let index = 0;
        if (sessionPromoIndex) {
          index = parseInt(sessionPromoIndex, 10) % banners.length;
        } else {
          index = Math.floor(Math.random() * banners.length);
          sessionStorage.setItem('promoIndex', index.toString());
        }
        setCurrentPromo(banners[index]);
      }
    };
    fetchBanners();
  }, []);

  if (!currentPromo) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-6 px-4"
    >
      <a href={currentPromo.url} target="_blank" rel="noopener noreferrer" className="block">
        <img
          src={currentPromo.image}
          alt={currentPromo.title[language as 'es' | 'en']}
          className="w-full h-auto rounded-lg shadow-md"
          referrerPolicy="no-referrer"
        />
      </a>
    </motion.div>
  );
}
