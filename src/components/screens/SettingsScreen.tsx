import React, { useState } from 'react';
import { 
  ArrowLeft, 
  WifiOff, 
  Wifi, 
  Languages, 
  Download, 
  Volume2, 
  Info, 
  ChevronRight, 
  Check, 
  Loader2, 
  X, 
  Globe2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JanBhashaLogo } from '../common/Illustrations';
import { soundEffects } from '../../services/speechService';

export const SettingsScreen: React.FC = () => {
  const { 
    setCurrentScreen, 
    selectedLanguage, 
    offlineMode, 
    setOfflineMode, 
    offlinePacks, 
    downloadPack,
    voiceSpeed,
    setVoiceSpeed,
    t,
    appLanguage,
    userRole
  } = useApp();

  const [activeModal, setActiveModal] = useState<'packs' | 'voice' | 'about' | null>(null);

  const currentPack = offlinePacks.find(p => p.id === selectedLanguage.id) || offlinePacks[0];

  return (
    <div className="flex flex-col h-full bg-[#fbfdf8] text-slate-800 select-none overflow-y-auto no-scrollbar">
      {/* Top App Bar */}
      <div className="pt-3 px-4 pb-2 flex items-center justify-between sticky top-0 bg-[#fbfdf8]/95 backdrop-blur-xs z-20">
        <button
          onClick={() => setCurrentScreen('home')}
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h2 className="text-base font-extrabold text-slate-900">
          {t('settingsTitle')}
        </h2>

        <div className="w-9" />
      </div>

      <div className="px-4 pt-1 pb-8 space-y-3.5 flex-1">
        {/* Offline Mode Status Banner Card */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-4 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              offlineMode ? 'bg-emerald-100 text-janbhasha-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {offlineMode ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-slate-900">
                  {t('offlineMode')}
                </h3>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  offlineMode ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {offlineMode ? 'Active' : 'Disabled'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                All lessons &amp; audio work without internet.
              </p>
            </div>
          </div>

          {/* Switch toggle */}
          <button
            onClick={() => {
              setOfflineMode(!offlineMode);
              soundEffects.playBeep(offlineMode ? 450 : 650, 'sine', 0.1);
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              offlineMode ? 'bg-janbhasha-700' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-xs ${
                offlineMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* User Role Switcher Card */}
        <div 
          onClick={() => setCurrentScreen('role-select')}
          className="rounded-3xl bg-white border border-slate-200/90 p-4 shadow-2xs flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
              userRole === 'teacher' ? 'bg-emerald-100 text-janbhasha-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {userRole === 'teacher' ? '👩‍🏫' : '🎒'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-slate-900">
                  Switch App Mode (शिक्षक / विद्यार्थी)
                </h3>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  userRole === 'teacher' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {userRole === 'teacher' ? 'Teacher' : 'Student'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Current role: <strong>{userRole === 'teacher' ? 'Teacher (Broadcast & Translate)' : 'Student (Listen & Learn)'}</strong>
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Language Selection Card */}
        <div 
          onClick={() => setCurrentScreen('language-select')}
          className="rounded-3xl bg-white border border-slate-200/90 p-4 shadow-2xs flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                {t('languageSelectTitle')}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                App: <strong className="uppercase">{appLanguage}</strong> • Mother Tongue: <strong>{selectedLanguage.name}</strong>
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Voice Audio Speed Card */}
        <div 
          onClick={() => setActiveModal('voice')}
          className="rounded-3xl bg-white border border-slate-200/90 p-4 shadow-2xs flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                {t('audioSpeed')}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Playback rate: <strong>{voiceSpeed}x</strong> (Clear classroom voice)
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Offline Language Packs Manager */}
        <div 
          onClick={() => setActiveModal('packs')}
          className="rounded-3xl bg-white border border-slate-200/90 p-4 shadow-2xs flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                Offline Language Packs
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {selectedLanguage.name} Pack ({selectedLanguage.packSize}) • {currentPack.isDownloaded ? 'Downloaded' : 'Available'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Help & About */}
        <div 
          onClick={() => setActiveModal('about')}
          className="rounded-3xl bg-white border border-slate-200/90 p-4 shadow-2xs flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                About JANBHASHA
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Version 2.4 • NEP 2020 &amp; NIPUN Bharat
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Voice Speed Modal */}
      {activeModal === 'voice' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">{t('audioSpeed')}</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-500">Adjust the voice playback speed for classroom phonics:</p>
              
              <div className="grid grid-cols-4 gap-2">
                {[0.7, 0.8, 0.9, 1.0].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => {
                      setVoiceSpeed(rate);
                      soundEffects.playBeep(rate * 600, 'sine', 0.1);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      voiceSpeed === rate
                        ? 'bg-janbhasha-700 text-white border-janbhasha-700'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-janbhasha-700 text-white font-bold text-xs"
            >
              {t('save')}
            </button>
          </div>
        </div>
      )}

      {/* Offline Packs Modal */}
      {activeModal === 'packs' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Offline Language Packs</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {offlinePacks.map((pack) => (
                <div key={pack.id} className="p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{pack.name} ({pack.nativeName})</h4>
                    <p className="text-[10px] text-slate-500">Size: {pack.size}</p>
                  </div>

                  {pack.isDownloaded ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                      Downloaded ✓
                    </span>
                  ) : pack.isDownloading ? (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{pack.progress}%</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => downloadPack(pack.id)}
                      className="px-2.5 py-1 rounded-lg bg-janbhasha-700 text-white text-[10px] font-bold"
                    >
                      Download
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* About Modal */}
      {activeModal === 'about' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-3 animate-in fade-in zoom-in duration-200 text-center">
            <JanBhashaLogo size={52} />
            <h3 className="text-base font-extrabold text-slate-900">JANBHASHA</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Empowering indigenous tribal children with foundational literacy and numeracy (FLN) in their mother tongue while bridging to Hindi &amp; English.
            </p>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-[10px] text-emerald-900 font-semibold text-left space-y-1">
              <div>• <strong>Languages:</strong> Ho, Mundari, Santhali, Gondi, Kurukh</div>
              <div>• <strong>Alignment:</strong> NEP 2020 Clause 4.11 &amp; NIPUN Bharat</div>
              <div>• <strong>Architecture:</strong> 100% Offline Edge Client</div>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-janbhasha-700 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
