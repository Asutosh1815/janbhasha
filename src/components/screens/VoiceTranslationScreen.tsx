import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowLeftRight, 
  Volume2, 
  Mic, 
  MicOff, 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw,
  Sliders,
  Send,
  Edit3,
  VolumeX,
  Radio,
  Headphones,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AudioWaveform } from '../common/AudioWaveform';
import { PRESET_TEACHER_PROMPTS } from '../../data/mockData';
import { soundEffects } from '../../services/speechService';

export const VoiceTranslationScreen: React.FC = () => {
  const { 
    setCurrentScreen, 
    selectedLanguage, 
    playBilingualAudio, 
    stopAudio,
    activeAudioId,
    addTranslationRecord,
    translateHindiToTribal,
    voiceSpeed,
    setVoiceSpeed,
    t
  } = useApp();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);
  const [hindiText, setHindiText] = useState<string>(PRESET_TEACHER_PROMPTS[0].hindi);
  const [hindiRoman, setHindiRoman] = useState<string>(PRESET_TEACHER_PROMPTS[0].roman);
  
  const [tribalText, setTribalText] = useState<string>(PRESET_TEACHER_PROMPTS[0].ho);
  const [tribalRoman, setTribalRoman] = useState<string>(PRESET_TEACHER_PROMPTS[0].hoRoman);
  
  const [copied, setCopied] = useState<boolean>(false);
  const [isSwapped, setIsSwapped] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  
  // Auto-speak translated output aloud toggle (Enabled by default!)
  const [autoReadAloud, setAutoReadAloud] = useState<boolean>(true);
  const [statusText, setStatusText] = useState<string>('Ready to listen. Tap mic to speak.');

  const recognitionRef = useRef<any>(null);

  // Sync translation when language changes
  useEffect(() => {
    const currentPrompt = PRESET_TEACHER_PROMPTS[activePromptIndex];
    if (currentPrompt) {
      setHindiText(currentPrompt.hindi);
      setHindiRoman(currentPrompt.roman);
      const res = translateHindiToTribal(currentPrompt.hindi);
      setTribalText(res.tribalText);
      setTribalRoman(res.tribalRoman);
    }
  }, [selectedLanguage.id, activePromptIndex]);

  // Execute translation and automatically speak aloud the translated language
  const handleTranslateAndAutoSpeak = (inputText: string, romanText?: string) => {
    const res = translateHindiToTribal(inputText);
    setHindiText(inputText);
    setHindiRoman(romanText || inputText);
    setTribalText(res.tribalText);
    setTribalRoman(res.tribalRoman);
    setStatusText(`Translated to ${selectedLanguage.name}! Speaking aloud...`);

    // Record in history
    addTranslationRecord({
      sourceLang: 'Hindi',
      targetLang: selectedLanguage.name,
      targetLangId: selectedLanguage.id,
      sourceText: inputText,
      sourceRoman: romanText || inputText,
      targetText: res.tribalText,
      targetRoman: res.tribalRoman,
    });

    // AUTOMATICALLY READ ALOUD IN REAL-TIME
    if (autoReadAloud) {
      // Small timeout to allow state to settle smoothly
      setTimeout(() => {
        playBilingualAudio('tribal-voice', res.tribalText, 'tribal');
      }, 250);
    }
  };

  // Start / Stop Microphone Speech Recognition
  const handleMicToggle = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore
        }
      }
      setIsRecording(false);
      setStatusText('Listening paused.');
      soundEffects.playBeep(440, 'sine', 0.15);
      return;
    }

    stopAudio();
    soundEffects.playBeep(680, 'sine', 0.15);
    setIsRecording(true);
    setStatusText('Listening to Hindi speech... Speak now 🎙️');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'hi-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognitionRef.current = recognition;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            handleTranslateAndAutoSpeak(transcript);
          }
          setIsRecording(false);
        };

        recognition.onerror = (err: any) => {
          console.log('Speech recognition event:', err);
          setIsRecording(false);
          setStatusText('Tap mic to try speaking again.');
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
        return;
      } catch (err) {
        console.log('Speech recognition init error:', err);
      }
    }

    // Fallback simulation for environments without microphone access
    setTimeout(() => {
      setIsRecording(false);
      const nextIndex = (activePromptIndex + 1) % PRESET_TEACHER_PROMPTS.length;
      setActivePromptIndex(nextIndex);
      const nextPrompt = PRESET_TEACHER_PROMPTS[nextIndex];
      handleTranslateAndAutoSpeak(nextPrompt.hindi, nextPrompt.roman);
      soundEffects.playSuccess();
    }, 2000);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    handleTranslateAndAutoSpeak(customInput.trim());
    setCustomInput('');
    setIsCustomMode(false);
  };

  const handleSelectPreset = (idx: number) => {
    setActivePromptIndex(idx);
    const p = PRESET_TEACHER_PROMPTS[idx];
    handleTranslateAndAutoSpeak(p.hindi, p.roman);
  };

  const handlePlayTeacher = () => {
    if (activeAudioId === 'teacher-voice') {
      stopAudio();
    } else {
      playBilingualAudio('teacher-voice', hindiText, 'hindi');
    }
  };

  const handlePlayLearner = () => {
    if (activeAudioId === 'tribal-voice') {
      stopAudio();
    } else {
      playBilingualAudio('tribal-voice', tribalText, 'tribal');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${hindiText}\n${tribalText}`);
    setCopied(true);
    soundEffects.playBeep(800, 'sine', 0.08);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
    soundEffects.playBeep(600, 'triangle', 0.1);
  };

  return (
    <div className="flex flex-col h-full bg-[#fbfdf8] text-slate-800 justify-between select-none overflow-y-auto no-scrollbar pb-8">
      {/* Top Header Bar */}
      <div className="pt-3 px-4 pb-2 flex items-center justify-between sticky top-0 bg-[#fbfdf8]/95 backdrop-blur-xs z-20">
        <button
          onClick={() => setCurrentScreen('home')}
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          title="Go Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center">
          <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
            Live Voice Translation
          </h2>
          <span className="text-[10px] text-janbhasha-700 font-bold">
            Hindi ↔ {selectedLanguage.name} ({selectedLanguage.nativeName})
          </span>
        </div>

        {/* Auto Read Aloud Toggle Switch */}
        <button
          onClick={() => {
            setAutoReadAloud(!autoReadAloud);
            soundEffects.playBeep(autoReadAloud ? 400 : 700, 'sine', 0.1);
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors shadow-2xs ${
            autoReadAloud
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}
          title="Toggle Auto Read Aloud"
        >
          {autoReadAloud ? (
            <>
              <Headphones className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>Auto-Speak: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span>Auto-Speak: OFF</span>
            </>
          )}
        </button>
      </div>

      {/* Main Translation Arena */}
      <div className="px-4 pt-1 space-y-3.5 flex-1">
        {/* Status Indicator Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-2xl bg-white border border-slate-200/80 text-[11px] shadow-2xs">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : activeAudioId ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-600'}`} />
            <span className="truncate max-w-[220px]">{statusText}</span>
          </div>

          <button
            onClick={handleSwap}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 flex items-center gap-1 text-[10px] font-bold"
            title="Swap Speaker Direction"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-janbhasha-700" />
            <span>Swap</span>
          </button>
        </div>

        {/* CARD 1: Teacher Input (Hindi) */}
        <div className={`p-4 rounded-3xl border-2 transition-all shadow-2xs relative ${
          !isSwapped ? 'bg-white border-slate-200' : 'bg-emerald-50/50 border-emerald-300'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {isSwapped ? `Learner (${selectedLanguage.name})` : 'Teacher Speaks (Hindi)'}
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePlayTeacher}
                className={`p-2 rounded-xl transition-colors ${
                  activeAudioId === 'teacher-voice'
                    ? 'bg-janbhasha-700 text-white animate-pulse'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title="Listen to Hindi audio"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsCustomMode(!isCustomMode)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                title="Type custom sentence"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hindi Text Content */}
          <div className="my-1">
            <h3 className="text-base font-bold text-slate-900 font-hindi leading-snug">
              {hindiText}
            </h3>
            <p className="text-xs text-slate-500 font-medium italic mt-0.5">
              "{hindiRoman}"
            </p>
          </div>

          {/* Typing box if edit mode is toggled */}
          {isCustomMode && (
            <form onSubmit={handleCustomSubmit} className="mt-3 pt-2 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Type Hindi sentence here..."
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-janbhasha-700"
                autoFocus
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-janbhasha-700 text-white text-xs font-bold flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Translate</span>
              </button>
            </form>
          )}
        </div>

        {/* CARD 2: Learner Output (Mother Tongue) - AUTO READ ALOUD TARGET */}
        <div className={`p-4.5 rounded-3xl border-2 transition-all shadow-md relative ${
          activeAudioId === 'tribal-voice'
            ? 'bg-gradient-to-br from-emerald-50 via-emerald-100/70 to-teal-50 border-emerald-500 ring-4 ring-emerald-200/60'
            : 'bg-gradient-to-br from-emerald-50/90 to-amber-50/40 border-emerald-300'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-janbhasha-700 text-white shadow-2xs">
                {isSwapped ? 'Teacher (Hindi)' : `Child Hears (${selectedLanguage.name} • ${selectedLanguage.nativeName})`}
              </span>
              {activeAudioId === 'tribal-voice' && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 animate-pulse">
                  <Radio className="w-3 h-3 text-emerald-600" />
                  <span>Speaking Aloud...</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePlayLearner}
                className={`p-2.5 rounded-2xl transition-all shadow-xs ${
                  activeAudioId === 'tribal-voice'
                    ? 'bg-janbhasha-800 text-white scale-110 ring-2 ring-emerald-400'
                    : 'bg-janbhasha-700 text-white hover:bg-janbhasha-800'
                }`}
                title="Read aloud in Mother Tongue"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-white/90 text-slate-700 hover:bg-white border border-slate-200/80"
                title="Copy translation"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Translated Mother Tongue Text */}
          <div className="my-1.5">
            <h3 className="text-lg font-black text-janbhasha-950 font-hindi leading-snug">
              {tribalText}
            </h3>
            <p className="text-xs text-janbhasha-800 font-semibold italic mt-1 bg-white/70 px-2.5 py-1 rounded-lg inline-block border border-emerald-200/70">
              Phonics: "{tribalRoman}"
            </p>
          </div>

          {/* Animated Waveform during audio playback */}
          {activeAudioId === 'tribal-voice' && (
            <div className="mt-3 pt-2 border-t border-emerald-200/60 flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-800">Auto Live Speech Output</span>
              <AudioWaveform isPlaying={true} />
            </div>
          )}
        </div>

        {/* Quick Classroom Preset Phrases */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
            <span>Quick Classroom Instruction Phrases</span>
            <span className="text-[10px] text-janbhasha-700 font-semibold">Tap to translate &amp; speak</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto no-scrollbar">
            {PRESET_TEACHER_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(idx)}
                className={`w-full p-2.5 rounded-2xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                  activePromptIndex === idx
                    ? 'bg-emerald-50 border-janbhasha-700 text-janbhasha-900 shadow-2xs'
                    : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="truncate pr-2">
                  <div className="font-bold truncate font-hindi">{prompt.hindi}</div>
                  <div className="text-[10px] text-slate-400 italic truncate">{prompt.roman}</div>
                </div>
                <Volume2 className="w-4 h-4 text-janbhasha-700 shrink-0 opacity-70" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BIG FLOATING MIC BAR AT BOTTOM */}
      <div className="px-5 pt-3 pb-2 bg-white/95 border-t border-slate-200/80 flex flex-col items-center gap-2 sticky bottom-0 z-30">
        <div className="flex items-center gap-4">
          {/* Main Giant Glowing Mic Button */}
          <button
            onClick={handleMicToggle}
            className={`w-18 h-18 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 transform active:scale-95 ${
              isRecording
                ? 'bg-rose-600 ring-8 ring-rose-200 scale-105 animate-pulse'
                : 'bg-gradient-to-tr from-janbhasha-800 to-emerald-600 hover:from-janbhasha-900 hover:to-emerald-700 ring-4 ring-emerald-100'
            }`}
            title="Tap to speak in Hindi"
          >
            {isRecording ? (
              <MicOff className="w-8 h-8 stroke-[2.5]" />
            ) : (
              <Mic className="w-8 h-8 stroke-[2.5]" />
            )}
          </button>
        </div>

        <p className="text-[11px] font-extrabold text-slate-800 tracking-tight">
          {isRecording ? 'Listening to Hindi speech...' : 'Tap Mic • Speak Hindi ➔ Auto Speaks in ' + selectedLanguage.name}
        </p>
      </div>
    </div>
  );
};
