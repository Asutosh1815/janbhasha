import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mic, 
  User, 
  Feather, 
  Sun, 
  BookOpen, 
  Check, 
  Sparkles, 
  Globe2, 
  Volume2,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data/mockData';
import { LanguageId, AppDisplayLanguage } from '../../types';

export const LanguageSelectScreen: React.FC = () => {
  const { 
    currentScreen, 
    setCurrentScreen, 
    selectedLanguage, 
    setSelectedLanguageId,
    appLanguage,
    setAppLanguage,
    t,
    playBilingualAudio,
    activeAudioId
  } = useApp();

  const [activeTab, setActiveTab] = useState<'tribal' | 'ui'>('tribal');

  const displayLanguages: { id: AppDisplayLanguage; name: string; native: string; flag: string }[] = [
    { id: 'en', name: 'English', native: 'English', flag: '🌐' },
    { id: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
    { id: 'ho', name: 'Ho', native: 'हो भाषा', flag: '🌾' },
    { id: 'mundari', name: 'Mundari', native: 'मुंडारी', flag: '🏹' },
    { id: 'santhali', name: 'Santhali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🪶' },
    { id: 'gondi', name: 'Gondi', native: 'गोंडी', flag: '☀️' },
    { id: 'kurukh', name: 'Kurukh', native: 'कुड़ुख़', flag: '🌳' },
  ];

  const getLanguageIcon = (iconName: string) => {
    switch (iconName) {
      case 'mic':
        return <Mic className="w-5 h-5" />;
      case 'user':
        return <User className="w-5 h-5" />;
      case 'feather':
        return <Feather className="w-5 h-5" />;
      case 'sun':
        return <Sun className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const handleContinue = () => {
    setCurrentScreen('home');
  };

  return (
    <div className="flex flex-col h-full bg-[#fbfdf8] text-slate-800 justify-between select-none">
      {/* Top Bar */}
      <div className="pt-3 px-4 flex items-center justify-between sticky top-0 bg-[#fbfdf8]/95 backdrop-blur-xs z-10">
        <button
          onClick={() => setCurrentScreen('home')}
          className="p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
          title={t('back')}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
          {t('languageSelectTitle')}
        </span>

        <div className="w-9" />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pt-2 pb-6 overflow-y-auto no-scrollbar space-y-4">
        {/* Title Header */}
        <div className="text-center">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {t('languageSelectTitle')}
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto font-medium">
            {t('languageSelectSubtitle')}
          </p>
        </div>

        {/* Segmented Switcher (Tribal Learning Language vs UI Display Language) */}
        <div className="flex p-1 bg-slate-100/90 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('tribal')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'tribal'
                ? 'bg-white text-janbhasha-800 shadow-xs border border-emerald-100'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-janbhasha-700" />
            <span>{t('learnerMotherTongueTitle')}</span>
          </button>

          <button
            onClick={() => setActiveTab('ui')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'ui'
                ? 'bg-white text-janbhasha-800 shadow-xs border border-emerald-100'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-janbhasha-700" />
            <span>{t('appDisplayLangTitle')}</span>
          </button>
        </div>

        {/* Tab 1: Tribal Learning Mother Tongue */}
        {activeTab === 'tribal' && (
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-700 px-1 flex items-center justify-between">
              <span>{t('learnerMotherTongueTitle')}</span>
              <span className="text-[11px] text-janbhasha-700 font-semibold">
                {selectedLanguage.name} ({selectedLanguage.nativeName})
              </span>
            </div>

            {LANGUAGES.map((lang) => {
              const isSelected = selectedLanguage.id === lang.id;

              return (
                <div
                  key={lang.id}
                  onClick={() => setSelectedLanguageId(lang.id)}
                  className={`relative flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-janbhasha-700 bg-emerald-50/80 shadow-md shadow-janbhasha-700/10'
                      : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Left Icon */}
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-janbhasha-700 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {getLanguageIcon(lang.icon)}
                    </div>

                    {/* Details */}
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-bold text-sm ${isSelected ? 'text-janbhasha-900' : 'text-slate-800'}`}>
                          {lang.name}
                        </h3>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-janbhasha-700 text-white">
                            {t('selected')}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-slate-700 font-hindi">
                        {lang.nativeName}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {lang.region.split(',')[0]} • {lang.speakers}
                      </p>
                    </div>
                  </div>

                  {/* Right Audio Sample + Checkbox */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playBilingualAudio(`sample-${lang.id}`, `${lang.greeting} - ${lang.greetingHindi}`, 'tribal');
                      }}
                      className={`p-2 rounded-xl transition-colors ${
                        activeAudioId === `sample-${lang.id}`
                          ? 'bg-janbhasha-700 text-white animate-pulse'
                          : 'bg-emerald-100 text-janbhasha-800 hover:bg-emerald-200'
                      }`}
                      title={t('listenAudio')}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                        isSelected
                          ? 'border-janbhasha-700 bg-janbhasha-700 text-white'
                          : 'border-slate-300 bg-transparent'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: App UI Display Language */}
        {activeTab === 'ui' && (
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-slate-700 px-1 flex items-center justify-between">
              <span>{t('appDisplayLangTitle')}</span>
              <span className="text-[11px] text-janbhasha-700 font-semibold uppercase">
                {appLanguage}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {displayLanguages.map((lang) => {
                const isSelected = appLanguage === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setAppLanguage(lang.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all text-left ${
                      isSelected
                        ? 'border-janbhasha-700 bg-emerald-50 text-janbhasha-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{lang.flag}</span>
                      <div>
                        <div className="text-xs font-bold">{lang.name}</div>
                        <div className="text-xs text-slate-500 font-medium">{lang.native}</div>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                        isSelected
                          ? 'border-janbhasha-700 bg-janbhasha-700 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Continue Action Bar */}
      <div className="p-4 bg-white border-t border-slate-200 sticky bottom-0 z-20">
        <button
          onClick={handleContinue}
          className="w-full py-3.5 px-4 rounded-2xl bg-janbhasha-700 hover:bg-janbhasha-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
        >
          <span>{t('continue')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
