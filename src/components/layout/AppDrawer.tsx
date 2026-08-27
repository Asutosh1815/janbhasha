import React from 'react';
import { 
  X, 
  Languages, 
  Wifi, 
  WifiOff, 
  BookOpen, 
  FileText, 
  Layers, 
  Clock, 
  Award, 
  Settings as SettingsIcon, 
  HelpCircle, 
  Info,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JanBhashaLogo } from '../common/Illustrations';

export const AppDrawer: React.FC = () => {
  const { 
    isDrawerOpen, 
    setIsDrawerOpen, 
    setCurrentScreen, 
    selectedLanguage, 
    offlineMode, 
    setOfflineMode 
  } = useApp();

  if (!isDrawerOpen) return null;

  const navigateTo = (screen: any) => {
    setCurrentScreen(screen);
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
      <div className="relative w-[82%] max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="bg-gradient-to-br from-janbhasha-800 to-janbhasha-900 text-white p-5">
          <div className="flex items-center justify-between mb-4">
            <JanBhashaLogo size={42} />
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded-full text-emerald-100 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h2 className="font-bold text-lg leading-tight tracking-wide">JANBHASHA</h2>
          <p className="text-xs text-emerald-200 mt-0.5">जनभाषा • FLN Tribal Companion</p>
          
          <div className="mt-3 flex items-center justify-between bg-black/20 rounded-lg p-2 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-100">
              <Languages className="w-4 h-4 text-amber-300" />
              <span>Language: <b>{selectedLanguage.name} ({selectedLanguage.nativeName})</b></span>
            </div>
          </div>
        </div>

        {/* Links List */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1 text-sm text-slate-700">
          <button 
            onClick={() => navigateTo('home')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <BookOpen className="w-4 h-4" />
              </span>
              <span className="font-medium">Dashboard</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button 
            onClick={() => navigateTo('voice-translation')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <Languages className="w-4 h-4" />
              </span>
              <span className="font-medium">Voice Translation</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button 
            onClick={() => navigateTo('lessons')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                <BookOpen className="w-4 h-4" />
              </span>
              <span className="font-medium">Classroom Lessons</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button 
            onClick={() => navigateTo('worksheets')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                <FileText className="w-4 h-4" />
              </span>
              <span className="font-medium">Worksheets</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button 
            onClick={() => navigateTo('flashcards')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <span className="p-1.5 rounded-lg bg-purple-50 text-purple-700">
                <Layers className="w-4 h-4" />
              </span>
              <span className="font-medium">Flashcards</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button 
            onClick={() => navigateTo('assessments')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <span className="p-1.5 rounded-lg bg-rose-50 text-rose-700">
                <Award className="w-4 h-4" />
              </span>
              <span className="font-medium">NIPUN FLN Assessments</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button 
            onClick={() => navigateTo('history')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
                <Clock className="w-4 h-4" />
              </span>
              <span className="font-medium">Voice History</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <div className="pt-2 pb-1">
            <div className="h-px bg-slate-200 my-1" />
          </div>

          <button 
            onClick={() => navigateTo('language-select')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left text-slate-600"
          >
            <div className="flex items-center gap-3">
              <Languages className="w-4 h-4 text-slate-500" />
              <span>Change Learner Mother Tongue</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button 
            onClick={() => navigateTo('settings')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left text-slate-600"
          >
            <div className="flex items-center gap-3">
              <SettingsIcon className="w-4 h-4 text-slate-500" />
              <span>Settings & Offline Packs</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Footer Offline Quick Toggle */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {offlineMode ? (
                <WifiOff className="w-4 h-4 text-emerald-600" />
              ) : (
                <Wifi className="w-4 h-4 text-slate-500" />
              )}
              <span className="text-xs font-semibold text-slate-700">Offline Mode</span>
            </div>
            <button 
              onClick={() => setOfflineMode(!offlineMode)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                offlineMode ? 'bg-janbhasha-700' : 'bg-slate-300'
              }`}
            >
              <span 
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  offlineMode ? 'translate-x-4' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">100% offline classroom mode active</p>
        </div>
      </div>
    </div>
  );
};
