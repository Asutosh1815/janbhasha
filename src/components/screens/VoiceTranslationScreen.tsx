import React, { useState, useEffect } from 'react';
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
  Edit3
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
    setVoiceSpeed
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

  // Sync translation when language changes or prompt index changes
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

  const handleMicToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      soundEffects.playBeep(440, 'sine', 0.15);
      return;
    }

    soundEffects.playBeep(680, 'sine', 0.15);
    setIsRecording(true);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'hi-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setHindiText(transcript);
            setHindiRoman(transcript);
            const res = translateHindiToTribal(transcript);
            setTribalText(res.tribalText);
            setTribalRoman(res.tribalRoman);

            addTranslationRecord({
              sourceLang: 'Hindi',
              targetLang: selectedLanguage.name,
              targetLangId: selectedLanguage.id,
              sourceText: transcript,
              sourceRoman: transcript,
              targetText: res.tribalText,
              targetRoman: res.tribalRoman,
            });
          }
          setIsRecording(false);
        };

        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);
        recognition.start();
        return;
      } catch {
        // Fallback to preset
      }
    }

    setTimeout(() => {
      setIsRecording(false);
      const nextIndex = (activePromptIndex + 1) % PRESET_TEACHER_PROMPTS.length;
      setActivePromptIndex(nextIndex);
      const nextPrompt = PRESET_TEACHER_PROMPTS[nextIndex];
      setHindiText(nextPrompt.hindi);
      setHindiRoman(nextPrompt.roman);
      const res = translateHindiToTribal(nextPrompt.hindi);
      setTribalText(res.tribalText);
      setTribalRoman(res.tribalRoman);

      addTranslationRecord({
        sourceLang: 'Hindi',
        targetLang: selectedLanguage.name,
        targetLangId: selectedLanguage.id,
        sourceText: nextPrompt.hindi,
        sourceRoman: nextPrompt.roman,
        targetText: res.tribalText,
        targetRoman: res.tribalRoman,
      });

      soundEffects.playSuccess();
    }, 2200);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    setHindiText(customInput);
    setHindiRoman(customInput);
    const res = translateHindiToTribal(customInput);
    setTribalText(res.tribalText);
    setTribalRoman(res.tribalRoman);

    addTranslationRecord({
      sourceLang: 'Hindi',
      targetLang: selectedLanguage.name,
      targetLangId: selectedLanguage.id,
      sourceText: customInput,
      sourceRoman: customInput,
      targetText: res.tribalText,
      targetRoman: res.tribalRoman,
    });

    setCustomInput('');
    setIsCustomMode(false);
    soundEffects.playSuccess();
  };

  const handlePlayTeacher = () => {
    if (activeAudioId === 'teacher-voice') {
      stopAudio();
    } else {
      playBilingualAudio('teacher-voice', hindiText, 'hindi');
    }
  };

  const handlePlayLearner = () => {
    if (activeAudioId === 'learner-voice') {
      stopAudio();
    } else {
      playBilingualAudio('learner-voice', tribalText, 'tribal');
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(`${hindiText}\n${tribalText}`);
    setCopied(true);
    soundEffects.playBeep(750, 'sine', 0.08);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
    soundEffects.playBeep(600, 'sine', 0.1);
  };

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
          Voice Translation
        </h2>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsCustomMode(!isCustomMode)}
            className={`p-2 rounded-xl transition-colors ${
              isCustomMode ? 'bg-janbhasha-100 text-janbhasha-800' : 'text-slate-700 hover:bg-slate-100'
            }`}
            title="Type custom sentence"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={handleSwap}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            title="Swap source and target languages"
          >
            <ArrowLeftRight className="w-5 h-5 text-janbhasha-700" />
          </button>
        </div>
      </div>

      {/* Main Dual Cards Container */}
      <div className="px-4 pt-2 pb-6 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Custom Typing Box Option */}
          {isCustomMode && (
            <form onSubmit={handleCustomSubmit} className="p-3 bg-white rounded-2xl border-2 border-janbhasha-600 shadow-md space-y-2 animate-in zoom-in-95">
              <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                <Edit3 className="w-3.5 h-3.5 text-janbhasha-700" />
                <span>Type any Hindi sentence to translate to {selectedLanguage.name}:</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="उदा. कल स्कूल की छुट्टी रहेगी..."
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-janbhasha-600 font-hindi"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-janbhasha-700 text-white font-bold text-xs flex items-center gap-1 hover:bg-janbhasha-800 active:scale-95 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Translate</span>
                </button>
              </div>
            </form>
          )}

          {/* Card 1: Teacher (Hindi) */}
          <div className="relative rounded-3xl bg-white border border-slate-200/90 p-4.5 shadow-card hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {isSwapped ? `Learner - ${selectedLanguage.name}` : 'You (Teacher) - Hindi'}
              </span>
              
              {/* Audio visualizer */}
              <AudioWaveform 
                isPlaying={isRecording || activeAudioId === 'teacher-voice'} 
                color="#15803d" 
                barCount={20}
                height={28}
              />
            </div>

            {/* Hindi Main Text */}
            <p className="text-base font-bold text-slate-900 leading-snug mt-1 font-hindi">
              {isSwapped ? tribalText : hindiText}
            </p>

            {/* Romanized Subtitle */}
            <p className="text-xs text-slate-500 mt-1 italic">
              {isSwapped ? tribalRoman : hindiRoman}
            </p>

            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>{isRecording ? '🔴 Listening...' : 'Devanagari script'}</span>
              <button
                onClick={handlePlayTeacher}
                className="p-1.5 rounded-lg text-janbhasha-700 hover:bg-emerald-50 transition-colors flex items-center gap-1 font-medium"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen</span>
              </button>
            </div>
          </div>

          {/* Swap Middle Button Indicator */}
          <div className="flex items-center justify-center -my-1">
            <button
              onClick={handleSwap}
              className="p-2 rounded-full bg-white border border-slate-200 shadow-md text-janbhasha-700 hover:bg-emerald-50 transition-all hover:scale-110 active:scale-95"
            >
              <ArrowLeftRight className="w-4 h-4 rotate-90" />
            </button>
          </div>

          {/* Card 2: Learner (Tribal Language) */}
          <div className="relative rounded-3xl bg-emerald-50/70 border border-emerald-200/90 p-4.5 shadow-card hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-janbhasha-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-janbhasha-700" />
                {isSwapped ? 'You (Teacher) - Hindi' : `Learner - ${selectedLanguage.name}`}
              </span>

              {/* Audio visualizer */}
              <AudioWaveform 
                isPlaying={activeAudioId === 'learner-voice'} 
                color="#16a34a" 
                barCount={20}
                height={28}
              />
            </div>

            {/* Tribal Translated Text */}
            <p className="text-base font-bold text-janbhasha-950 leading-snug mt-1 font-hindi">
              {isSwapped ? hindiText : tribalText}
            </p>

            {/* Romanized Phonetics */}
            <p className="text-xs text-emerald-800/80 mt-1 italic font-medium">
              {isSwapped ? hindiRoman : tribalRoman}
            </p>

            <div className="mt-3 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-xs text-emerald-700">
              <span className="font-semibold">{selectedLanguage.script}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg hover:bg-emerald-100 transition-colors text-emerald-800"
                  title="Copy translation"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handlePlayLearner}
                  className="px-2 py-1 rounded-lg bg-janbhasha-700 text-white hover:bg-janbhasha-800 transition-colors flex items-center gap-1 font-semibold"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Pronounce</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preset Classroom Quick Phrases Slider */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Classroom Quick Prompts
            </span>
            <button
              onClick={() => setIsCustomMode(!isCustomMode)}
              className="text-[11px] text-janbhasha-700 font-semibold hover:underline flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" />
              <span>Type custom</span>
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {PRESET_TEACHER_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActivePromptIndex(idx);
                  setHindiText(prompt.hindi);
                  setHindiRoman(prompt.roman);
                  const res = translateHindiToTribal(prompt.hindi);
                  setTribalText(res.tribalText);
                  setTribalRoman(res.tribalRoman);
                  soundEffects.playBeep(520, 'sine', 0.05);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                  activePromptIndex === idx
                    ? 'bg-janbhasha-700 text-white border-janbhasha-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {prompt.hindi.slice(0, 22)}...
              </button>
            ))}
          </div>
        </div>

        {/* Speed Adjustment Bar */}
        <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-white border border-slate-200/80 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <Sliders className="w-3.5 h-3.5 text-janbhasha-700" />
            <span>Voice Speed (Teaching Mode):</span>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            {[0.75, 0.9, 1.0].map((rate) => (
              <button
                key={rate}
                onClick={() => setVoiceSpeed(rate)}
                className={`px-2 py-0.5 rounded-md text-[11px] transition-colors ${
                  voiceSpeed === rate 
                    ? 'bg-janbhasha-700 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Giant Mic Controls */}
        <div className="pt-2 flex items-center justify-center gap-6">
          {/* Secondary Reset Button */}
          <button
            onClick={() => {
              setActivePromptIndex(0);
              const p = PRESET_TEACHER_PROMPTS[0];
              setHindiText(p.hindi);
              setHindiRoman(p.roman);
              const res = translateHindiToTribal(p.hindi);
              setTribalText(res.tribalText);
              setTribalRoman(res.tribalRoman);
              soundEffects.playBeep(400, 'sine', 0.1);
            }}
            className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center shadow-card hover:bg-slate-50 active:scale-95 transition-all"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Primary Pulsating Mic Button */}
          <div className="relative">
            {isRecording && (
              <div className="absolute -inset-3 rounded-full bg-janbhasha-600 animate-ping opacity-30 pointer-events-none" />
            )}
            <button
              onClick={handleMicToggle}
              className={`relative w-20 h-20 rounded-full flex items-center justify-center text-white shadow-fab transition-all duration-300 transform active:scale-95 ${
                isRecording 
                  ? 'bg-rose-600 ring-8 ring-rose-200 scale-105' 
                  : 'bg-janbhasha-700 hover:bg-janbhasha-800'
              }`}
            >
              {isRecording ? (
                <MicOff className="w-9 h-9 animate-pulse" />
              ) : (
                <Mic className="w-9 h-9" />
              )}
            </button>
          </div>

          {/* Secondary Speaker Play Button */}
          <button
            onClick={handlePlayLearner}
            className={`w-12 h-12 rounded-full bg-white border border-slate-200 text-janbhasha-700 flex items-center justify-center shadow-card hover:bg-emerald-50 active:scale-95 transition-all ${
              activeAudioId === 'learner-voice' ? 'ring-2 ring-janbhasha-500 bg-emerald-50' : ''
            }`}
            title="Play Audio"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
