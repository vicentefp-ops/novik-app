import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';
import { ShieldAlert, Globe, Mail, Lock, User as UserIcon } from 'lucide-react';

// import logo from '../assets/logo_new.png'; // Removed in favor of public/logo.png

export default function Login() {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail, loading } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;
  }

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegistering) {
        await signUpWithEmail(email, password, displayName);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      await signInWithGoogle();
    } catch (err: any) {
      if (err.code === 'auth/unauthorized-domain') {
        setError('Este dominio no está autorizado en Firebase. Por favor, añádelo en la consola de Firebase Authentication.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('El inicio de sesión con Google no está habilitado en Firebase. Por favor, actívalo en la consola.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('El navegador bloqueó la ventana emergente. Por favor, permite las ventanas emergentes para este sitio.');
      } else {
        setError(err.message || 'Error al iniciar sesión con Google');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-8 text-center">
          <img src="/logo.png?v=2" alt="Novik Logo" className="w-24 h-24 mx-auto mb-6 object-contain" />
          <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Novik</h1>
          <p className="text-slate-500 mb-8 font-medium">
            {step === 1 ? 'Clinical Dental Assistant' : t('clinicalEngine')}
          </p>
          
          {step === 1 ? (
            <div className="space-y-4">
              <p className="text-slate-600 mb-6 font-medium">Please select your language to continue</p>
              <button
                onClick={() => handleLanguageSelect('en')}
                className="w-full flex items-center justify-between p-4 border-2 border-slate-200 rounded-xl hover:border-olive-600 hover:bg-olive-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-olive-600" />
                  <span className="font-semibold text-slate-900 text-lg">English</span>
                </div>
              </button>
              <button
                onClick={() => handleLanguageSelect('es')}
                className="w-full flex items-center justify-between p-4 border-2 border-slate-200 rounded-xl hover:border-olive-600 hover:bg-olive-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-olive-600" />
                  <span className="font-semibold text-slate-900 text-lg">Español</span>
                </div>
              </button>
            </div>
          ) : (
            <>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left flex gap-3">
                <ShieldAlert className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  {language === 'en' 
                    ? 'Novik is a clinical decision support tool. It does not replace the clinical judgment of the healthcare professional.' 
                    : 'Novik es una herramienta de soporte a la decisión clínica. No sustituye el criterio del profesional sanitario.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                {isRegistering && (
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Display Name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                      required
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-olive-600 text-white rounded-xl font-medium hover:bg-olive-700 transition-all shadow-sm"
                >
                  {isRegistering ? 'Register' : 'Login'}
                </button>
              </form>

              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-olive-600 hover:text-olive-700 text-sm font-medium mb-6"
              >
                {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">Or</span>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-500 transition-all shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {language === 'en' ? 'Continue with Google' : 'Continuar con Google'}
              </button>
            </>
          )}
        </div>
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-xs text-slate-500">
            {language === 'en' 
              ? 'Exclusive access for authorized healthcare professionals.' 
              : 'Acceso exclusivo para profesionales sanitarios autorizados.'}
          </p>
        </div>
      </div>
    </div>
  );
}
