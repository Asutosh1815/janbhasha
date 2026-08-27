import React from 'react';
import { ArrowLeft, Mic, User, Feather, Sun, BookOpen, Check, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data/mockData';
import { LanguageId } from '../../types';

export const LanguageSelectScreen: React.FC = () => {
  const { 
    currentScreen, 
    setCurrentScreen, 
    selectedLanguage, 
    setSelectedLanguageId 
  } = useApp();

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

  return (
    <div className="flex flex-col h-full bg-[#fbfdf8] text-slate-800 justify-between select-none">
      {/* Top Bar */}
      <div className="pt-3 px-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('splash')}
          className="p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          Step 1 of 2
        </span>
        <div className="w-9" /> {/* Spacer */}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-5 pt-2 overflow-y-auto no-scrollbar">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Choose Learner <br />
            <span className="text-janbhasha-700">Mother Tongue</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 max-w-xs mx-auto">
            Select the tribal language for translation and learning.
          </p>
        </div>

        {/* Language Options List */}
        <div className="space-y-3.5 pb-4">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage.id === lang.id;

            return (
              <div
                key={lang.id}
                onClick={() => setSelectedLanguageId(lang.id)}
                className={`relative flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-janbhasha-700 bg-emerald-50/80 shadow-md shadow-janbhasha-700/10'
                    : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Left Circle Icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-janbhasha-700 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {getLanguageIcon(lang.icon)}
                  </div>

                  {/* Text Details */}
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-bold text-base ${isSelected ? 'text-janbhasha-900' : 'text-slate-800'}`}>
                        {lang.name}
                      </h3>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-janbhasha-700 text-white">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-slate-600 font-hindi">
                      {lang.nativeName}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {lang.region.split(',')[0]} • {lang.speakers}
                    </p>
                  </div>
                </div>

                {/* Right Selection Indicator */}
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
            );
          })}
        </div>
      </div>

      {/* Bottom Continue Button */}
      <div className="p-5 border-t border-slate-100 bg-white/90 backdrop-blur-xs">
        <button
          onClick={() => setCurrentScreen('home')}
          className="w-full py-3.5 px-6 rounded-2xl bg-janbhasha-700 hover:bg-janbhasha-800 text-white font-semibold text-base shadow-lg shadow-janbhasha-700/25 flex items-center justify-center gap-2 transform active:scale-98 transition-all"
        >
          <span>Continue</span>
        </button>
        <p className="text-center text-[11px] text-slate-500 mt-2">
          You can change later in settings
        </p>
      </div>
    </div>
  );
};
