import React from 'react';
import { Home, BookOpen, Mic, ClipboardList, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ScreenType } from '../../types';

export const BottomNav: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useApp();

  // Hidden on splash / onboarding screens
  if (currentScreen === 'splash' || currentScreen === 'language-select') {
    return null;
  }

  interface NavTab {
    id: ScreenType;
    label: string;
    icon: React.ElementType;
    isPrimaryFab?: boolean;
  }

  const tabs: NavTab[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'lessons', label: 'Content', icon: BookOpen },
    { id: 'voice-translation', label: 'Translate', icon: Mic, isPrimaryFab: true },
    { id: 'assessments', label: 'Assessments', icon: ClipboardList },
    { id: 'settings', label: 'Profile', icon: User },
  ];

  return (
    <nav className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 pt-2 pb-3 flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentScreen === tab.id;

        if (tab.isPrimaryFab) {
          return (
            <div key={tab.id} className="relative -top-5 flex flex-col items-center">
              <button
                onClick={() => setCurrentScreen('voice-translation')}
                className={`relative w-14 h-14 rounded-full bg-janbhasha-700 text-white flex items-center justify-center shadow-fab transition-all duration-300 transform active:scale-95 hover:bg-janbhasha-800 ${
                  isActive ? 'ring-4 ring-janbhasha-300 scale-105' : ''
                }`}
                title="Voice Translation"
              >
                <div className="absolute inset-0 rounded-full bg-janbhasha-600 animate-ping opacity-20" />
                <Icon className="w-7 h-7" />
              </button>
            </div>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => setCurrentScreen(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 transition-all duration-200 ${
              isActive 
                ? 'text-janbhasha-700 font-semibold' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 transition-transform duration-200 ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] tracking-tight">{tab.label}</span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-janbhasha-700 mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
