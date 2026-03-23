import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Stethoscope, FileText, Pill, LogOut, ShieldAlert, Settings as SettingsIcon, Users, Menu, X } from 'lucide-react';
import clsx from 'clsx';

// import logo from '../assets/logo_new.png'; // Removed in favor of public/logo.png

export default function Layout() {
  const { user, isAdmin, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans relative overflow-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png?v=2" alt="Novik Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="font-bold text-xl tracking-tight text-slate-900">Novik</h1>
              <p className="text-xs text-slate-500 font-medium">Asistente Clínico</p>
            </div>
          </div>
          <button 
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            onClick={closeMobileMenu}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium text-sm',
                isActive
                  ? 'bg-olive-50 text-olive-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )
            }
          >
            <Stethoscope className="w-5 h-5" />
            {t('clinicalEngine')}
          </NavLink>

          <NavLink
            to="/settings"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium text-sm',
                isActive
                  ? 'bg-olive-50 text-olive-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )
            }
          >
            <SettingsIcon className="w-5 h-5" />
            {t('settings')}
          </NavLink>

          {isAdmin && (
            <>
              <div className="pt-6 pb-2 px-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <ShieldAlert className="w-3 h-3" />
                  Administración
                </p>
              </div>
              <NavLink
                to="/admin/users"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium text-sm',
                    isActive
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  )
                }
              >
                <Users className="w-5 h-5" />
                {t('adminUsers')}
              </NavLink>
              <NavLink
                to="/admin/protocols"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium text-sm',
                    isActive
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  )
                }
              >
                <FileText className="w-5 h-5" />
                Protocolos Clínicos
              </NavLink>
              <NavLink
                to="/admin/leaflets"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium text-sm',
                    isActive
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  )
                }
              >
                <Pill className="w-5 h-5" />
                Prospectos
              </NavLink>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-4 px-2">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{user?.displayName || 'Usuario'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {t('logout')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <img src="/logo.png?v=2" alt="Novik Logo" className="w-8 h-8 object-contain" />
            <span className="font-bold text-lg tracking-tight">Novik</span>
          </div>
          <button 
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            onClick={toggleMobileMenu}
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
