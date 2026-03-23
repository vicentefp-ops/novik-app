import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Save, Loader2, User, Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  const { user, updateProfile } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [measurementSystem, setMeasurementSystem] = useState<'metric' | 'imperial'>(user?.weightUnit === 'lbs' ? 'imperial' : 'metric');
  const [selectedLanguage, setSelectedLanguage] = useState<'es' | 'en'>(language);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setMeasurementSystem(user.weightUnit === 'lbs' ? 'imperial' : 'metric');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    try {
      await updateProfile({
        displayName,
        language: selectedLanguage,
        weightUnit: measurementSystem === 'metric' ? 'kg' : 'lbs',
        heightUnit: measurementSystem === 'metric' ? 'cm' : 'ft',
      });
      
      // Update the app language context
      setLanguage(selectedLanguage);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert(t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('settingsTitle')}</h1>
          <p className="mt-1 text-sm text-slate-500">{t('settingsDesc')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Section */}
          <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
              <User className="w-5 h-5 text-slate-500" />
              <h2 className="text-lg font-medium text-slate-900">{t('profileSettings')}</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  {t('displayName')}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={t('displayNamePlaceholder')}
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {language === 'en' ? 'This is how Novik will address you in the interface.' : 'Así es como Novik se dirigirá a ti en la interfaz.'}
                </p>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-slate-500" />
              <h2 className="text-lg font-medium text-slate-900">{t('appPreferences')}</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  {t('language')}
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as 'es' | 'en')}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm"
                >
                  <option value="es">{t('spanish')}</option>
                  <option value="en">{t('english')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  {t('measurementPreferences')}
                </label>
                <select
                  value={measurementSystem}
                  onChange={(e) => setMeasurementSystem(e.target.value as 'metric' | 'imperial')}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm"
                >
                  <option value="metric">{language === 'en' ? 'International Metric (kg, cm)' : 'Métrico Internacional (kg, cm)'}</option>
                  <option value="imperial">{language === 'en' ? 'American (lbs, ft)' : 'Americano (lbs, ft)'}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            {success && (
              <span className="text-sm text-olive-600 font-medium bg-olive-50 px-3 py-1 rounded-full">
                {t('savedSuccessfully')}
              </span>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-olive-600 hover:bg-olive-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-500 disabled:opacity-50 transition-colors"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {t('saveChanges')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
