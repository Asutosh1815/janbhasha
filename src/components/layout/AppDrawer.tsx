import React from 'react';
import { 
  X, 
  Languages, 
  Wifi, 
  WifiOff, 
  BookOpen, 
  FileText, 
  Clock, 
  Award, 
  Settings as SettingsIcon, 
  HelpCircle, 
  Info, 
  ChevronRight, 
  ShieldCheck, 
  GraduationCap, 
  Smile, 
  LogOut, 
  Globe2 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JanBhashaLogo } from '../common/Illustrations';
import { ScreenType, UserRole } from '../../types';

export const AppDrawer: React.FC = () => {
  const { 
    isDrawerOpen, 
    setIsDrawerOpen, 
    setCurrentScreen, 
    selectedLanguage, 
    offlineMode, 
    setOfflineMode, 
    currentUser, 
    loginAs, 
    logout, 
    t, 
    appLanguage 
  } = useApp();

  if (!isDrawerOpen) return null;

  const navigateTo = (screen: ScreenType) => {
    setCurrentScreen(screen);
    setIsDrawerOpen(false);
  };

  const handleRoleSwitch = (role: UserRole) => {
    loginAs(role);
    setIsDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Body */}
      <div className="relative w-[84%] max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        {/* User Profile Header */}
        <div className="bg-gradient-to-br from-janbhasha-800 to-janbhasha-900 text-white p-4.5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <JanBhashaLogo size={36} />
              <span className="font-extrabold text-base tracking-wider">JANBHASHA</span>
            </div>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded-full text-emerald-100 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Card */}
          <div className="flex items-center gap-3 bg-black/25 rounded-2xl p-3 border border-white/10">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
              {currentUser.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-xs truncate text-white">{currentUser.name}</h3>
              <p className="text-[10px] text-emerald-200 truncate">{currentUser.designation || currentUser.school}</p>
              <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-emerald-500 text-white text-[9px] font-extrabold uppercase">
                {currentUser.role}
              </span>
            </div>
          </div>
          
          {/* Active Language Badge */}
          <div 
            onClick={() => navigateTo('language-select')}
            className="mt-2.5 flex items-center justify-between bg-white/10 hover:bg-white/20 rounded-xl p-2 text-xs cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1.5 text-emerald-100 text-[11px]">
              <Languages className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('activeLanguage')}: <b>{selectedLanguage.name}</b></span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          </div>
        </div>

        {/* Links List */}
        <div className="flex-1 overflow-y-auto py-2.5 px-3 space-y-1 text-xs text-slate-700">
          {/* Admin link if role is admin */}
          {currentUser.role === 'admin' && (
            <button 
              onClick={() => navigateTo('admin-dashboard')}
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-indigo-50 text-indigo-900 transition-colors text-left font-bold"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <span>{t('adminTitle')}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
            </button>
          )}

          <button 
            onClick={() => navigateTo('home')}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <BookOpen className="w-4 h-4" />
              </span>
              <span className="font-semibold">{t('navHome')}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button 
            onClick={() => navigateTo('voice-translation')}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <Languages className="w-4 h-4" />
              </span>
              <span className="font-semibold">{t('voiceTranslateTitle')}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button 
            onClick={() => navigateTo('lessons')}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-orange-50 text-orange-700">
                <BookOpen className="w-4 h-4" />
              </span>
              <span className="font-semibold">{t('lessonsTitle')}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button 
            onClick={() => navigateTo('worksheets')}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                <FileText className="w-4 h-4" />
              </span>
              <span className="font-semibold">{t('worksheetsTitle')} &amp; Assignments</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button 
            onClick={() => navigateTo('assessments')}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                <Award className="w-4 h-4" />
              </span>
              <span className="font-semibold">{t('assessmentsTitle')}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button 
            onClick={() => navigateTo('history')}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
                <Clock className="w-4 h-4" />
              </span>
              <span className="font-semibold">{t('historyTitle')}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button 
            onClick={() => navigateTo('language-select')}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <Globe2 className="w-4 h-4" />
              </span>
              <span className="font-semibold">{t('languageSelectTitle')}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button 
            onClick={() => navigateTo('settings')}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
                <SettingsIcon className="w-4 h-4" />
              </span>
              <span className="font-semibold">{t('settingsTitle')}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Quick Role Switch Section */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-1">
              {t('switchRole')}
            </span>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => handleRoleSwitch('admin')}
                className={`py-1.5 px-1 rounded-lg text-[10px] font-bold border transition-colors ${
                  currentUser.role === 'admin' ? 'bg-indigo-50 border-indigo-300 text-indigo-800' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => handleRoleSwitch('teacher')}
                className={`py-1.5 px-1 rounded-lg text-[10px] font-bold border transition-colors ${
                  currentUser.role === 'teacher' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                Teacher
              </button>
              <button
                onClick={() => handleRoleSwitch('student')}
                className={`py-1.5 px-1 rounded-lg text-[10px] font-bold border transition-colors ${
                  currentUser.role === 'student' ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                Student
              </button>
            </div>
          </div>
        </div>

        {/* Footer Area with Logout */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-2">
          {/* Offline Toggle */}
          <div className="flex items-center justify-between px-2 py-1 bg-white rounded-xl border border-slate-200 text-xs">
            <span className="text-slate-600 font-medium">{t('offlineMode')}</span>
            <button
              onClick={() => setOfflineMode(!offlineMode)}
              className={`w-9 h-5 rounded-full transition-colors relative ${
                offlineMode ? 'bg-janbhasha-700' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.75 transition-transform ${
                  offlineMode ? 'left-5' : 'left-0.75'
                }`}
              />
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              logout();
              setIsDrawerOpen(false);
            }}
            className="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-rose-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('logout')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
