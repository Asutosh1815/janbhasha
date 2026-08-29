import React from 'react';
import { 
  Menu, 
  WifiOff, 
  Wifi, 
  Mic, 
  BookOpen, 
  FileText, 
  ClipboardCheck, 
  Clock, 
  Languages, 
  Sparkles, 
  ArrowRight,
  ChevronRight,
  Star,
  ShieldCheck,
  GraduationCap,
  Smile,
  BarChart3,
  PlusCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TeacherBannerIllustration } from '../common/Illustrations';
import { ScreenType } from '../../types';

export const HomeScreen: React.FC = () => {
  const { 
    currentScreen, 
    setCurrentScreen, 
    selectedLanguage, 
    offlineMode, 
    setOfflineMode, 
    setIsDrawerOpen,
    currentUser,
    t,
    appLanguage
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

  // Teacher Quick Actions (Flashcards removed, Worksheets & Lessons front and center)
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
      id: 'worksheets',
      title: 'Assignments & Worksheets',
      description: 'Create, Assign & Print FLN Sheets',
      icon: FileText,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      badge: 'New'
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

  // Student specific quick actions
  const studentQuickActions: QuickAction[] = [
    {
      id: 'lessons',
      title: t('additionTitle'),
      description: 'Fun Apple Counting & Addition Game',
      icon: BookOpen,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      badge: '⭐ +10 Stars'
    },
    {
      id: 'worksheets',
      title: 'My Assignments & Quizzes',
      description: 'Solve teacher assignments & earn stars',
      icon: FileText,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      badge: 'Solve'
    },
    {
      id: 'voice-translation',
      title: t('voiceTranslateTitle'),
      description: 'Speak and hear mother tongue words',
      icon: Mic,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-janbhasha-700',
    },
    {
      id: 'history',
      title: 'My Practice Audio',
      description: 'Replay teacher voice lessons',
      icon: Clock,
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
  ];

  const quickActions = currentUser.role === 'student' ? studentQuickActions : teacherQuickActions;

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

        {/* User Role Badge in Header */}
        <div 
          onClick={() => setCurrentScreen('login')}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200/80 cursor-pointer border border-slate-200 transition-colors"
          title="Click to switch role or login"
        >
          <span className="text-sm">{currentUser.avatar}</span>
          <span className="text-xs font-bold text-slate-800">{currentUser.name.split(' ')[0]}</span>
          <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-janbhasha-700 text-white">
            {currentUser.role}
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
        {/* Welcome Hero Banner Card */}
        {currentUser.role === 'student' ? (
          /* Student Gamified Hero Card */
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-orange-100/50 to-amber-100/60 p-4.5 border border-amber-300 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="max-w-[62%] z-10">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-extrabold text-amber-950">
                    {t('welcomeStudent')}
                  </span>
                  <span className="animate-bounce inline-block">✨</span>
                </div>
                <p className="text-xs text-amber-900 mt-1 font-medium leading-relaxed">
                  {t('studentHeroDesc')}
                </p>

                {/* Stars Trophy Badge */}
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-xs border border-amber-300">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-black text-amber-900">
                    {currentUser.starsEarned || 48} {t('starsCollected')}
                  </span>
                </div>
              </div>

              {/* Student Mascot */}
              <div className="w-20 h-20 rounded-2xl bg-amber-200/80 flex items-center justify-center text-4xl shadow-inner border border-amber-300">
                {currentUser.avatar}
              </div>
            </div>

            {/* Language Selector Pill */}
            <div 
              onClick={() => setCurrentScreen('language-select')}
              className="mt-3.5 pt-2.5 border-t border-amber-200/80 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-950">
                <Languages className="w-3.5 h-3.5 text-amber-700" />
                <span>{selectedLanguage.name} ({selectedLanguage.nativeName})</span>
              </div>
              <div className="text-[10px] font-bold text-amber-700 flex items-center gap-0.5">
                <span>{t('changeLanguage')}</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        ) : currentUser.role === 'admin' ? (
          /* Admin Hero Card */
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 p-4.5 text-white shadow-md">
            <div className="flex items-center justify-between">
              <div className="max-w-[70%] z-10">
                <span className="text-sm font-bold text-white flex items-center gap-1">
                  {t('welcomeAdmin')} <span>🏛️</span>
                </span>
                <p className="text-xs text-indigo-100 mt-1 font-medium leading-relaxed">
                  {t('adminHeroDesc')}
                </p>

                <button
                  onClick={() => setCurrentScreen('admin-dashboard')}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-transform active:scale-95"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Open {t('adminTitle')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-indigo-700/60 flex items-center justify-center text-3xl border border-indigo-500">
                👨‍💼
              </div>
            </div>
          </div>
        ) : (
          /* Teacher Standard Hero Card */
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-amber-50/60 p-4.5 border border-emerald-200/70 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="max-w-[58%] z-10">
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
                  {t('welcomeTeacher')} <span className="animate-bounce inline-block">👋</span>
                </span>
                <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                  {t('teacherHeroDesc')}
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

            {/* Quick Live Translate CTA */}
            <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-600 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-janbhasha-700" />
                {t('activeLanguage')}: <strong>{selectedLanguage.name}</strong>
              </span>
              <button
                onClick={() => setCurrentScreen('voice-translation')}
                className="text-xs font-bold text-janbhasha-800 hover:text-janbhasha-900 flex items-center gap-0.5"
              >
                <span>{t('tapToSpeak')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Section Heading */}
        <div className="flex items-center justify-between pt-1">
          <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
            {t('quickActionsTitle')}
          </h2>
          <span className="text-[11px] font-bold text-janbhasha-700 uppercase">
            {currentUser.role} Portal
          </span>
        </div>

        {/* Quick Action Grid Tiles */}
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
