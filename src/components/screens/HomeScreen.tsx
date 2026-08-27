import React from 'react';
import { 
  Menu, 
  WifiOff, 
  Wifi, 
  Mic, 
  BookOpen, 
  FileText, 
  Layers, 
  ClipboardCheck, 
  Clock, 
  Languages, 
  Sparkles, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TeacherBannerIllustration } from '../common/Illustrations';
import { ScreenType } from '../../types';

export const HomeScreen: React.FC = () => {
  const { 
    setCurrentScreen, 
    selectedLanguage, 
    offlineMode, 
    setOfflineMode, 
    setIsDrawerOpen 
  } = useApp();

  interface QuickAction {
    id: ScreenType;
    title: string;
    description: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
  }

  const quickActions: QuickAction[] = [
    {
      id: 'voice-translation',
      title: 'Voice Translation',
      description: 'Real-time Hindi ↔ Mother Tongue',
      icon: Mic,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-janbhasha-700',
    },
    {
      id: 'lessons',
      title: 'Lessons',
      description: 'Bilingual Class 1-5 Curriculum',
      icon: BookOpen,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      id: 'worksheets',
      title: 'Worksheets',
      description: 'Interactive & Printable FLN',
      icon: FileText,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Phonics & Visual Vocabulary',
      icon: Layers,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      id: 'assessments',
      title: 'Assessments',
      description: 'NIPUN Bharat FLN Evaluation',
      icon: ClipboardCheck,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      id: 'history',
      title: 'History',
      description: 'Past Voice Recordings & Logs',
      icon: Clock,
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#fbfdf8] text-slate-800 select-none overflow-y-auto no-scrollbar">
      {/* Top Header */}
      <div className="pt-3 px-4 pb-2 flex items-center justify-between sticky top-0 bg-[#fbfdf8]/95 backdrop-blur-xs z-20">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-6 h-6 stroke-[2.2]" />
        </button>

        <h1 className="text-xl font-extrabold tracking-wider text-janbhasha-800">
          JANBHASHA
        </h1>

        {/* Offline Mode Status Pill */}
        <button
          onClick={() => setOfflineMode(!offlineMode)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 hover:bg-slate-200/60 transition-colors text-[10px] font-semibold text-slate-700"
          title="Click to toggle offline mode"
        >
          {offlineMode ? (
            <>
              <WifiOff className="w-3.5 h-3.5 text-emerald-600" />
              <span>Offline Mode</span>
            </>
          ) : (
            <>
              <Wifi className="w-3.5 h-3.5 text-blue-600" />
              <span>Online Mode</span>
            </>
          )}
        </button>
      </div>

      <div className="px-4 pt-2 pb-6 space-y-4">
        {/* Welcome Teacher Banner Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-amber-50/60 p-4.5 border border-emerald-200/70 shadow-card">
          <div className="flex items-center justify-between">
            <div className="max-w-[58%] z-10">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
                Welcome, Teacher <span className="animate-bounce inline-block">👋</span>
              </span>
              <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                Teach in Hindi. Learn in Your Mother Tongue.
              </p>

              {/* Active Mother Tongue Badge */}
              <div 
                onClick={() => setCurrentScreen('language-select')}
                className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-emerald-300 shadow-xs cursor-pointer hover:bg-white transition-colors"
              >
                <Languages className="w-3.5 h-3.5 text-janbhasha-700" />
                <span className="text-[11px] font-bold text-janbhasha-800">
                  {selectedLanguage.name} ({selectedLanguage.nativeName})
                </span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </div>
            </div>

            {/* Illustration */}
            <div className="w-[38%] -mr-1">
              <TeacherBannerIllustration />
            </div>
          </div>
        </div>

        {/* Quick Actions Grid Header */}
        <div className="flex items-center justify-between pt-1">
          <h2 className="text-base font-bold text-slate-900">
            Quick Actions
          </h2>
          <span className="text-xs text-janbhasha-700 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> FLN Tools
          </span>
        </div>

        {/* 6 Grid Cards (3 rows x 2 cols) */}
        <div className="grid grid-cols-3 gap-2.5">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <div
                key={action.id}
                onClick={() => setCurrentScreen(action.id)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200/80 shadow-card hover:shadow-md hover:border-janbhasha-300 transition-all duration-200 cursor-pointer text-center group active:scale-95"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 transition-transform duration-200 group-hover:scale-110 ${action.iconBg} ${action.iconColor}`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-xs font-bold text-slate-800 leading-tight">
                  {action.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Today's FLN Classroom Recommendation */}
        <div 
          onClick={() => setCurrentScreen('lessons')}
          className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-card flex items-center justify-between cursor-pointer hover:border-janbhasha-300 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm">
              +
            </div>
            <div>
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                Recommended Lesson
              </span>
              <h4 className="text-sm font-bold text-slate-900">
                Class 2 • Addition (जोड़)
              </h4>
              <p className="text-[11px] text-slate-500">
                Translated to {selectedLanguage.name} • 3 Activities
              </p>
            </div>
          </div>
          <div className="p-2 rounded-full bg-slate-50 text-janbhasha-700 group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
