import React, { useState } from 'react';
import { 
  ArrowLeft, 
  WifiOff, 
  Wifi, 
  Languages, 
  Download, 
  Volume2, 
  HelpCircle, 
  Info, 
  ChevronRight, 
  Check, 
  Loader2, 
  Sparkles, 
  X, 
  BookOpen, 
  ShieldCheck 
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
    setVoiceSpeed
  } = useApp();

  const [activeModal, setActiveModal] = useState<'packs' | 'voice' | 'help' | 'about' | null>(null);

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

        <h2 className="text-lg font-bold text-slate-900">
          Settings
        </h2>

        <div className="w-9" />
      </div>

      <div className="px-4 pt-1 pb-6 space-y-4 flex-1">
        {/* Offline Mode Status Banner Card */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-4 shadow-card flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
              offlineMode ? 'bg-emerald-100 text-janbhasha-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {offlineMode ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Offline Mode
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  offlineMode ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {offlineMode ? 'Active' : 'Disabled'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                All core features are available offline.
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

        {/* Settings Navigation List */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-card divide-y divide-slate-100 overflow-hidden">
          {/* Chosen Language */}
          <div
            onClick={() => setCurrentScreen('language-select')}
            className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-janbhasha-700 flex items-center justify-center">
                <Languages className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Chosen Language
                </h4>
                <p className="text-xs text-slate-500">
                  {selectedLanguage.name} ({selectedLanguage.nativeName})
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* Download Language Pack */}
          <div
            onClick={() => setActiveModal('packs')}
            className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Download Language Pack
                </h4>
                <p className="text-xs text-slate-500">
                  {selectedLanguage.name} ({currentPack.size})
                </p>
              </div>
            </div>
            {currentPack.isDownloaded ? (
              <span className="p-1 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center gap-1 font-semibold px-2">
                <Check className="w-3.5 h-3.5" /> Ready
              </span>
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-400" />
            )}
          </div>

          {/* Voice Settings */}
          <div
            onClick={() => setActiveModal('voice')}
            className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Voice
                </h4>
                <p className="text-xs text-slate-500">
                  Teacher (Hindi) / {selectedLanguage.name}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* Help & Support */}
          <div
            onClick={() => setActiveModal('help')}
            className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Help & Support
                </h4>
                <p className="text-xs text-slate-500">
                  Teacher guides & tribal phonetics
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* About JANBHASHA */}
          <div
            onClick={() => setActiveModal('about')}
            className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  About JANBHASHA
                </h4>
                <p className="text-xs text-slate-500">
                  v2.4 • NEP 2020 FLN Initiative
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Language Pack Manager Modal */}
      {activeModal === 'packs' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3">
          <div className="bg-white rounded-3xl w-full max-w-sm max-h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Offline Language Packs
                </h3>
                <p className="text-xs text-slate-500">Download once for 100% offline classrooms</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full hover:bg-slate-200/70 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 no-scrollbar">
              {offlinePacks.map((pack) => (
                <div
                  key={pack.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{pack.name}</h4>
                      <p className="text-xs text-slate-500">{pack.size}</p>
                    </div>

                    {pack.isDownloaded ? (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Downloaded
                      </span>
                    ) : pack.isDownloading ? (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold flex items-center gap-1">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> {pack.progress}%
                      </span>
                    ) : (
                      <button
                        onClick={() => downloadPack(pack.id)}
                        className="px-3 py-1.5 bg-janbhasha-700 hover:bg-janbhasha-800 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    )}
                  </div>

                  {pack.isDownloading && (
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${pack.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 bg-white">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voice Tuning Modal */}
      {activeModal === 'voice' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl flex flex-col p-5 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Voice & Speech Tuning</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Speech Rate: {voiceSpeed}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={voiceSpeed}
                  onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                  className="w-full accent-janbhasha-700"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0.5x (Slow)</span>
                  <span>1.0x (Normal)</span>
                  <span>1.5x (Fast)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                <p className="font-semibold">💡 Teaching Tip:</p>
                <p className="mt-0.5">Use 0.8x or 0.9x speed for younger Class 1 children learning new tribal vocabulary.</p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-janbhasha-700 text-white font-bold text-xs hover:bg-janbhasha-800"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {activeModal === 'help' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3">
          <div className="bg-white rounded-3xl w-full max-w-sm max-h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <h3 className="text-base font-bold text-slate-900">Teacher FLN Guide</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto space-y-3 text-xs text-slate-700 no-scrollbar">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <h4 className="font-bold text-emerald-900 mb-1">1. How Voice Translation Works</h4>
                <p>Speak in simple Hindi sentences. The app instantly translates and articulates in the child's mother tongue (Ho, Mundari, Santhali, etc.).</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                <h4 className="font-bold text-amber-900 mb-1">2. Offline Classroom Support</h4>
                <p>Ensure your school tablets have downloaded the relevant tribal pack once. No active internet required during classroom teaching.</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-1">3. NEP 2020 Multi-lingual Bridge</h4>
                <p>Gradually bridge foundational concepts from tribal mother tongue to regional state language and Hindi.</p>
              </div>
            </div>
            <div className="p-3 border-t border-slate-100">
              <button onClick={() => setActiveModal(null)} className="w-full py-2.5 bg-janbhasha-700 text-white rounded-xl font-bold text-xs">
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About JANBHASHA Modal */}
      {activeModal === 'about' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 text-center space-y-4 animate-in zoom-in-95">
            <JanBhashaLogo size={64} className="mx-auto" />
            <div>
              <h3 className="text-xl font-extrabold text-janbhasha-800">JANBHASHA</h3>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">जनभाषा &bull; Tribal Bridge Learning Companion</p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designed for educators to bridge language barriers in tribal primary schools across India. Aligned with NIPUN Bharat Foundational Literacy and Numeracy goals.
            </p>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
              Supports Ho, Mundari, Santhali, Gondi, Kurukh &amp; more.
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
