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
    setIsDrawerOpen,
    userRole,
    t
  } = useApp();

  interface QuickAction {
    id: ScreenType;
    title: string;
    description: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    badge?: string;
  }

  const teacherQuickActions: QuickAction[] = [
    {
      id: 'voice-translation',
      title: t('voiceTranslateTitle'),
      description: t('voiceTranslateDesc'),
      icon: Mic,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-janbhasha-700',
      badge: 'Live'
    },
    {
      id: 'lessons',
      title: t('lessonsTitle'),
      description: t('lessonsDesc'),
      icon: BookOpen,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      id: 'flashcards',
      title: t('flashcardsTitle'),
      description: t('flashcardsDesc'),
      icon: Layers,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      badge: '3D'
    },
    {
      id: 'worksheets',
      title: t('worksheetsTitle'),
      description: t('worksheetsDesc'),
      icon: FileText,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 'assessments',
      title: t('assessmentsTitle'),
      description: t('assessmentsDesc'),
      icon: ClipboardCheck,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      id: 'history',
      title: t('historyTitle'),
      description: t('historyDesc'),
      icon: Clock,
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
  ];

  const studentQuickActions: QuickAction[] = [
    {
      id: 'live-classroom',
      title: 'Live Teacher Broadcast',
      description: 'Listen to teacher in mother tongue with Ol Chiki captions',
      icon: Mic,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700',
      badge: 'Live'
    },
    {
      id: 'flashcards',
      title: t('flashcardsTitle'),
      description: 'Learn words, animals & numbers with interactive audio cards',
      icon: Layers,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      badge: '3D'
    },
    {
      id: 'lessons',
      title: t('lessonsTitle'),
      description: 'Stories, math addition & primary school lessons',
      icon: BookOpen,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      id: 'voice-translation',
      title: 'Practice Speaking',
      description: 'Speak in mother tongue or Hindi and hear translation',
      icon: Mic,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
    },
    {
      id: 'worksheets',
      title: 'My Assignments',
      description: 'Complete class worksheets and fun drawing tasks',
      icon: FileText,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 'assessments',
      title: 'Quizzes & Stars',
      description: 'Take fun chapter tests and collect learning stars',
      icon: ClipboardCheck,
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-600',
      badge: '⭐ Stars'
    },
  ];

  const quickActions = userRole === 'student' ? studentQuickActions : teacherQuickActions;

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

        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setCurrentScreen('role-select')}>
          <h1 className="text-xl font-extrabold tracking-wider text-janbhasha-800">
            JANBHASHA
          </h1>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            userRole === 'student'
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : 'bg-emerald-100 text-emerald-800 border-emerald-300'
          }`}>
            {userRole === 'student' ? '🎒 Student' : '👩‍🏫 Teacher'}
          </span>
        </div>

        {/* Offline Mode Status Pill */}
        <button
          onClick={() => setOfflineMode(!offlineMode)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 hover:bg-slate-200/60 transition-colors text-[10px] font-semibold text-slate-700"
          title="Click to toggle offline mode"
        >
          {offlineMode ? (
            <>
              <WifiOff className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('offlineMode')}</span>
            </>
          ) : (
            <>
              <Wifi className="w-3.5 h-3.5 text-blue-600" />
              <span>{t('onlineMode')}</span>
            </>
          )}
        </button>
      </div>

      <div className="px-4 pt-2 pb-6 space-y-4">
        {/* Welcome Role Banner Card */}
        <div className={`relative overflow-hidden rounded-3xl p-4.5 border shadow-sm ${
          userRole === 'student'
            ? 'bg-gradient-to-br from-amber-50 via-orange-50/60 to-yellow-50/80 border-amber-200/90'
            : 'bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-amber-50/60 border-emerald-200/70'
        }`}>
          <div className="flex items-center justify-between">
            <div className="max-w-[58%] z-10">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
                {userRole === 'student' ? 'जोहार, प्यारे बच्चे!' : t('welcomeTeacher')} <span className="animate-bounce inline-block">👋</span>
              </span>
              <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                {userRole === 'student'
                  ? 'अपनी मातृभाषा संताली में पाठ सीखें, शब्द खेलें और पढ़ाई का आनंद लें।'
                  : t('teacherHeroDesc')}
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

            {/* Decorative Classroom Graphic */}
            <div className="w-24 h-24 flex items-center justify-center scale-105 transform translate-x-1">
              <TeacherBannerIllustration />
            </div>
          </div>

          {/* Quick CTA */}
          <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between">
            <span className="text-[11px] text-slate-600 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-janbhasha-700" />
              {t('activeLanguage')}: <strong>{selectedLanguage.name}</strong>
            </span>
            <button
              onClick={() => setCurrentScreen(userRole === 'student' ? 'live-classroom' : 'voice-translation')}
              className="text-xs font-bold text-janbhasha-800 hover:text-janbhasha-900 flex items-center gap-0.5"
            >
              <span>{userRole === 'student' ? 'Join Live Audio' : t('tapToSpeak')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* FEATURED: Live Classroom Broadcaster (Whisper ➔ IndicTrans2 ➔ Santali TTS) */}
        <div 
          onClick={() => setCurrentScreen('live-classroom')}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-janbhasha-800 via-emerald-900 to-teal-950 p-4 text-white shadow-md cursor-pointer hover:shadow-lg transition-all group active:scale-[0.99]"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1 max-w-[78%]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-rose-500/90 text-[9px] font-extrabold flex items-center gap-1 uppercase tracking-wider animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Live Broadcast
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[9px] font-bold text-emerald-200">
                  AI4Bharat IndicTrans2
                </span>
              </div>
              <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5 pt-0.5">
                <span>Classroom Broadcast &amp; Captions</span>
              </h3>
              <p className="text-[11px] text-emerald-100 font-medium leading-tight">
                Teacher speaks Hindi ➔ Whisper ➔ IndicTrans2 ➔ Santali Ol Chiki ➔ Student Audio
              </p>
            </div>

            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <ChevronRight className="w-6 h-6 text-emerald-200" />
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between pt-1">
          <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
            {t('quickActionsTitle')}
          </h2>
          <span className="text-[11px] font-bold text-janbhasha-700">
            NEP 2020 FLN
          </span>
        </div>

        {/* 6 Quick Action Grid Tiles (Flashcards Restored) */}
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                onClick={() => setCurrentScreen(action.id)}
                className="group relative flex flex-col justify-between p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-janbhasha-700/40 hover:shadow-md transition-all duration-200 cursor-pointer text-left active:scale-[0.98]"
              >
                {action.badge && (
                  <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded-md bg-emerald-100 text-janbhasha-800 text-[9px] font-bold border border-emerald-200">
                    {action.badge}
                  </span>
                )}
                <div>
                  <div className={`w-10 h-10 rounded-xl ${action.iconBg} ${action.iconColor} flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 shadow-2xs`}>
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h3 className="font-bold text-xs text-slate-900 group-hover:text-janbhasha-800 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium line-clamp-2 mt-0.5 leading-tight">
                    {action.description}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-janbhasha-700">
                  <span>{t('continue')}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
