import React from 'react';
import { JanBhashaLogo, TribalVillageIllustration } from '../common/Illustrations';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setCurrentScreen, t } = useApp();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#f8faf2] text-slate-800 justify-between select-none relative overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-janbhasha-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

      {/* Top Branding Section */}
      <div className="pt-12 px-6 flex flex-col items-center text-center z-10">
        <div className="mb-4 transform hover:scale-105 transition-transform duration-300">
          <JanBhashaLogo size={92} />
        </div>

        <h1 className="text-3xl font-extrabold tracking-wider text-janbhasha-800 font-sans">
          {t('appName')}
        </h1>

        <p className="text-sm text-slate-700 font-medium max-w-xs mt-3 leading-relaxed">
          {t('appMission')}
        </p>

        {/* FLN Badge */}
        <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 border border-emerald-200/80 rounded-full shadow-xs text-[11px] font-semibold text-emerald-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>FLN &bull; Tribal Mother Tongue Bridge</span>
        </div>
      </div>

      {/* Center Tribal Village Landscape Illustration */}
      <div className="w-full px-4 my-auto z-10 py-2">
        <div className="rounded-3xl overflow-hidden shadow-xs border border-emerald-100/70 bg-white/50 backdrop-blur-xs">
          <TribalVillageIllustration />
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="pb-10 px-6 flex flex-col items-center text-center z-10">
        <p className="text-sm font-semibold text-slate-800 mb-4 tracking-tight">
          {t('teacherHeroDesc')}
        </p>

        <button
          onClick={() => setCurrentScreen('language-select')}
          className="w-full py-4 px-6 rounded-2xl bg-janbhasha-700 hover:bg-janbhasha-800 text-white font-bold text-base shadow-lg shadow-janbhasha-700/25 flex items-center justify-center gap-2 transform active:scale-98 transition-all"
        >
          <span>{t('continue')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-[11px] text-slate-500 mt-3">
          Aligned with NEP 2020 &amp; NIPUN Bharat
        </p>
      </div>
    </div>
  );
};
