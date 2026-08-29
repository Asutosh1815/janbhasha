import React from 'react';
import { JanBhashaLogo, TribalVillageIllustration } from '../common/Illustrations';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Sparkles, Languages, LogIn } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setCurrentScreen, t, appLanguage } = useApp();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#f8faf2] text-slate-800 justify-between select-none relative overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-janbhasha-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

      {/* Top Branding Section */}
      <div className="pt-10 px-6 flex flex-col items-center text-center z-10">
        <div className="mb-3 transform hover:scale-105 transition-transform duration-300">
          <JanBhashaLogo size={84} />
        </div>

        <h1 className="text-3xl font-black tracking-wider text-janbhasha-800 font-sans">
          {t('appName')}
        </h1>

        <p className="text-xs text-slate-700 font-medium max-w-xs mt-2 leading-relaxed">
          {t('appMission')}
        </p>

        {/* FLN Badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 border border-emerald-200/80 rounded-full shadow-2xs text-[11px] font-semibold text-emerald-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>NEP 2020 &bull; NIPUN Bharat FLN</span>
        </div>
      </div>

      {/* Center Tribal Village Landscape Illustration */}
      <div className="w-full px-4 my-auto z-10 py-1">
        <div className="rounded-3xl overflow-hidden shadow-xs border border-emerald-100/70 bg-white/50 backdrop-blur-xs">
          <TribalVillageIllustration />
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="pb-8 px-6 flex flex-col items-center text-center z-10 space-y-2.5">
        <p className="text-xs font-bold text-slate-800 tracking-tight">
          {t('teacherHeroDesc')}
        </p>

        {/* Sign In Button */}
        <button
          onClick={() => setCurrentScreen('login')}
          className="w-full py-3.5 px-6 rounded-2xl bg-janbhasha-700 hover:bg-janbhasha-800 text-white font-bold text-sm shadow-lg shadow-janbhasha-700/25 flex items-center justify-center gap-2 transform active:scale-98 transition-all"
        >
          <LogIn className="w-4 h-4" />
          <span>{t('loginTitle')} (Admin / Teacher / Student)</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Choose Language Secondary Action */}
        <button
          onClick={() => setCurrentScreen('language-select')}
          className="w-full py-2.5 px-4 rounded-xl bg-white/90 hover:bg-white text-slate-700 font-bold text-xs border border-slate-200 shadow-2xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Languages className="w-3.5 h-3.5 text-janbhasha-700" />
          <span>{t('languageSelectTitle')}</span>
        </button>

        <p className="text-[10px] text-slate-400 mt-1">
          Supported in Ho, Mundari, Santhali, Gondi, Kurukh, Hindi, English
        </p>
      </div>
    </div>
  );
};
