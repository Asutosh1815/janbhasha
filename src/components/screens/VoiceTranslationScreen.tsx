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
  VolumeX, 
  Radio, 
  Headphones, 
  Send,
  Languages,
  RotateCcw,
  Zap,
  Cpu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AudioWaveform } from '../common/AudioWaveform';
import { PRESET_TEACHER_PROMPTS, LANGUAGES } from '../../data/mockData';
import { soundEffects } from '../../services/speechService';
import { translateAuthentic } from '../../services/translatorService';
import { runIndicTrans2Pipeline, checkBackendHealth, BackendStatus } from '../../services/indicTrans2Service';
import { Capacitor } from '@capacitor/core';


export const VoiceTranslationScreen: React.FC = () => {
  const { 
    setCurrentScreen, 
    selectedLanguage, 
    setSelectedLanguageId,
    playBilingualAudio, 
    stopAudio,
    activeAudioId,
    addTranslationRecord,
    t
  } = useApp();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('नमस्ते बच्चों');
  const [tribalText, setTribalText] = useState<string>('ᱥᱟᱱᱟᱢ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱡᱚᱦᱟᱨ!');
  const [tribalDevanagari, setTribalDevanagari] = useState<string>('सनाम गिदरा को जोहार!');
  const [tribalRoman, setTribalRoman] = useState<string>('Sanam gidra ko Johar!');
  
  const [copied, setCopied] = useState<boolean>(false);
  const [autoReadAloud, setAutoReadAloud] = useState<boolean>(true);
  const [statusText, setStatusText] = useState<string>('Ready. Type or tap mic to speak in Hindi.');

  const [backendStatus, setBackendStatus] = useState<BackendStatus>({
    available: false, model_loaded: false, model_loading: false
  });

  const recognitionRef = useRef<any>(null);
  const activeReqIdRef = useRef<number>(0);
  const debounceTimerRef = useRef<any>(null);

  // Poll local AI backend server health
  useEffect(() => {
    const poll = async () => {
      const status = await checkBackendHealth();
      setBackendStatus(status);
    };
    poll();
    const interval = setInterval(poll, 3000);
    return () => clearInterval(interval);
  }, []);

  // Perform translation using official AI4Bharat IndicTrans2 Neural Model for Santhali
  const runTranslation = async (textToTranslate: string, shouldSpeak = false) => {
    const trimmed = textToTranslate.trim();
    if (!trimmed) {
      setTribalText('');
      setTribalDevanagari('');
      setTribalRoman('');
      setStatusText('Ready. Type or tap mic to speak in Hindi.');
      return;
    }

    const currentReqId = ++activeReqIdRef.current;
    setStatusText('Translating...');

    try {
      if (selectedLanguage.id === 'santhali') {
        const res = await runIndicTrans2Pipeline(trimmed);
        if (currentReqId !== activeReqIdRef.current) return;

        setTribalText(res.santaliOlChiki);
        setTribalDevanagari(res.santaliDevanagari);
        setTribalRoman(res.santaliRomanPhonics);
        setStatusText(`⚡ ${res.engine} (${res.latencyMs}ms)`);

        addTranslationRecord({
          sourceLang: 'Hindi',
          targetLang: selectedLanguage.name,
          targetLangId: selectedLanguage.id,
          sourceText: trimmed,
          sourceRoman: trimmed,
          targetText: res.santaliOlChiki,
          targetRoman: res.santaliRomanPhonics,
        });

        if (shouldSpeak || autoReadAloud) {
          playBilingualAudio('tribal-voice', res.santaliDevanagari, 'tribal', res.santaliRomanPhonics);
        }
      } else {
        const res = translateAuthentic(trimmed, selectedLanguage.id);
        if (currentReqId !== activeReqIdRef.current) return;

        setTribalText(res.tribalText);
        setTribalDevanagari(res.tribalText);
        setTribalRoman(res.tribalRoman);
        setStatusText(`Translated to ${selectedLanguage.name}!`);

        addTranslationRecord({
          sourceLang: 'Hindi',
          targetLang: selectedLanguage.name,
          targetLangId: selectedLanguage.id,
          sourceText: trimmed,
          sourceRoman: trimmed,
          targetText: res.tribalText,
          targetRoman: res.tribalRoman,
        });

        if (shouldSpeak || autoReadAloud) {
          playBilingualAudio('tribal-voice', res.tribalText, 'tribal', res.tribalRoman);
        }
      }
    } catch (err) {
      console.warn('[Translation] Error:', err);
      if (currentReqId === activeReqIdRef.current) {
        setStatusText('Ready. Tap mic or type to translate.');
      }
    }
  };

  // Re-translate when target language changes
  useEffect(() => {
    runTranslation(inputText, false);
  }, [selectedLanguage.id]);

  // Handle manual input change with smooth 250ms debouncing (no concurrent lockups!)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!text.trim()) {
      setTribalText('');
      setTribalDevanagari('');
      setTribalRoman('');
      setStatusText('Ready. Type or tap mic to speak in Hindi.');
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      runTranslation(text, false);
    }, 280);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (!inputText.trim()) return;
    runTranslation(inputText, true);
  };


  // Start / Stop Microphone Speech Recognition
  const handleMicToggle = async () => {
    if (isRecording) {
      // Stop recording
      if (Capacitor.isNativePlatform()) {
        try {
          const { SpeechRecognition } = await import('@capacitor-community/speech-recognition');
          await SpeechRecognition.stop();
          SpeechRecognition.removeAllListeners();
        } catch {}
      } else if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
      setIsRecording(false);
      setStatusText('Listening stopped.');
      soundEffects.playBeep(440, 'sine', 0.12);
      return;
    }

    stopAudio();
    soundEffects.playBeep(680, 'sine', 0.12);
    setIsRecording(true);
    setStatusText('Listening to Hindi speech... Speak now 🎙️');

    // ---- Strategy 1: Native Capacitor Speech Recognition (for Android APK) ----
    if (Capacitor.isNativePlatform()) {
      try {
        const { SpeechRecognition } = await import('@capacitor-community/speech-recognition');
        
        // 1. Check availability
        const { available } = await SpeechRecognition.available();
        if (!available) {
          console.warn('[Speech] Native speech recognition not available on device');
        }

        // 2. Request permission
        const permStatus = await SpeechRecognition.requestPermissions();
        if (permStatus.speechRecognition !== 'granted') {
          setIsRecording(false);
          setStatusText('Microphone permission not granted. Allow in Android Settings.');
          return;
        }

        // 3. Listener for partial live transcription
        let recognizedText = '';
        SpeechRecognition.addListener('partialResults', (data: any) => {
          if (data && data.matches && data.matches.length > 0) {
            recognizedText = data.matches[0];
            if (recognizedText && recognizedText.trim()) {
              setInputText(recognizedText);
              setStatusText(`Heard: "${recognizedText}"`);
            }
          }
        });

        // 4. Start speech recognition
        // popup: true ensures the native Google dialog appears, which works reliably across all Android devices
        const result = await SpeechRecognition.start({
          language: 'hi-IN',
          maxResults: 3,
          prompt: 'यहाँ हिन्दी में बोलें (Speak in Hindi)',
          partialResults: true,
          popup: true,
        });

        setIsRecording(false);
        try {
          await SpeechRecognition.removeAllListeners();
        } catch {}

        const finalMatch = (result && result.matches && result.matches[0]) || recognizedText;
        if (finalMatch && finalMatch.trim()) {
          setInputText(finalMatch);
          setStatusText(`Translating: "${finalMatch}"`);
          runTranslation(finalMatch, true);
        } else {
          setStatusText('No speech detected. Tap mic to try again.');
        }
        return;
      } catch (err: any) {
        console.warn('[Speech] Native recognition error:', err);
        setIsRecording(false);
        setStatusText('Tap mic to try speaking again.');
        return;
      }
    }

    // ---- Strategy 2: Web Speech Recognition (for localhost browser) ----
    const SpeechRecognitionWeb = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionWeb) {
      try {
        const recognition = new SpeechRecognitionWeb();
        recognition.lang = 'hi-IN';
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        recognitionRef.current = recognition;

        let finalTranscript = '';

        recognition.onresult = (event: any) => {
          let interim = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript = transcript;
            } else {
              interim += transcript;
            }
          }

          const currentText = finalTranscript || interim;
          if (currentText) {
            setInputText(currentText);
            setStatusText(`Hearing: "${currentText}"`);
          }

          if (finalTranscript) {
            setIsRecording(false);
            runTranslation(finalTranscript, true);
          }
        };

        recognition.onerror = (e: any) => {
          console.warn('[Speech] Web recognition error:', e.error);
          setIsRecording(false);
          if (e.error === 'not-allowed') {
            setStatusText('Microphone permission blocked. Please allow mic in browser.');
          } else if (e.error === 'no-speech') {
            setStatusText('No speech heard. Tap mic and speak in Hindi.');
          } else {
            setStatusText('Speech recognition error. Tap to retry.');
          }
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
        return;
      } catch (err) {
        console.log('[Speech] Web speech init error:', err);
      }
    }

//     // Fallback preset demo if browser has zero speech support
//     setTimeout(() => {
//       setIsRecording(false);
//       const randomPrompt = PRESET_TEACHER_PROMPTS[Math.floor(Math.random() * PRESET_TEACHER_PROMPTS.length)];
//       setInputText(randomPrompt.hindi);
//       runTranslation(randomPrompt.hindi, true);
//       soundEffects.playSuccess();
//     }, 1500);
   };

  const handlePlayHindi = () => {
    if (activeAudioId === 'hindi-voice') {
      stopAudio();
    } else {
      playBilingualAudio('hindi-voice', inputText, 'hindi');
    }
  };

  const handlePlayTribal = () => {
    if (activeAudioId === 'tribal-voice') {
      stopAudio();
    } else {
      const textToSpeak = tribalDevanagari || tribalText;
      playBilingualAudio('tribal-voice', textToSpeak, 'tribal', tribalRoman);
    }
  };


  const handleCopy = () => {
    navigator.clipboard.writeText(`${inputText}\n${tribalText}`);
    setCopied(true);
    soundEffects.playBeep(800, 'sine', 0.08);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#fbfdf8] text-slate-800 justify-between select-none overflow-y-auto no-scrollbar pb-6">
      {/* Top Header Bar */}
      <div className="pt-3 px-4 pb-1 flex items-center justify-between sticky top-0 bg-[#fbfdf8]/95 backdrop-blur-xs z-20">
        <button
          onClick={() => setCurrentScreen('home')}
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          title="Go Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center">
          <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
            Live Voice Translator
          </h2>
          <span className="text-[10px] text-janbhasha-700 font-bold flex items-center gap-1">
            <span>Hindi ➔ {selectedLanguage.name} ({selectedLanguage.nativeName})</span>
          </span>
        </div>

        {/* Auto Read Aloud Toggle */}
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
          title="Toggle Auto Voice Playback"
        >
          {autoReadAloud ? (
            <>
              <Headphones className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>Voice: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span>Voice: OFF</span>
            </>
          )}
        </button>
      </div>

      {/* Language Quick Selector Bar (Direct 1-Tap Switching) */}
      <div className="px-4 py-1 flex gap-1.5 overflow-x-auto no-scrollbar">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setSelectedLanguageId(lang.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all border ${
              selectedLanguage.id === lang.id
                ? 'bg-janbhasha-700 text-white border-janbhasha-700 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {lang.name} ({lang.nativeName})
          </button>
        ))}
      </div>

      {/* AI Model Status Badge */}
      <div className={`mx-4 mt-1 mb-1 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center justify-between transition-all ${
        backendStatus.available && backendStatus.model_loaded
          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
          : backendStatus.available && backendStatus.model_loading
          ? 'bg-amber-50 border border-amber-200 text-amber-800'
          : 'bg-slate-50 border border-slate-200 text-slate-600'
      }`}>
        <div className="flex items-center gap-1.5">
          <Cpu className={`w-3.5 h-3.5 ${backendStatus.model_loaded ? 'text-emerald-600' : 'text-slate-400'}`} />
          <span>
            {backendStatus.available && backendStatus.model_loaded
              ? 'AI4Bharat IndicTrans2 Neural Engine: ONLINE'
              : backendStatus.available && backendStatus.model_loading
              ? 'Loading AI4Bharat Model...'
              : 'AI Backend: Offline (Using Local Corpus)'}
          </span>
        </div>
        <span className="text-[10px] font-medium opacity-75">
          {selectedLanguage.id === 'santhali' ? 'sat_Olck' : selectedLanguage.id}
        </span>
      </div>

      {/* Main Translation Arena */}
      <div className="px-4 pt-1 space-y-3 flex-1">
        {/* Status Indicator */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-2xl bg-white border border-slate-200/80 text-[11px] shadow-2xs">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <span className={`w-2 h-2 rounded-full ${
              isRecording ? 'bg-rose-500 animate-ping' : 
              activeAudioId ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-600'
            }`} />
            <span className="truncate max-w-[240px]">{statusText}</span>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-extrabold flex items-center gap-1 border border-emerald-200">
            <Zap className="w-2.5 h-2.5 text-emerald-600" />
            <span>AI4Bharat sat_Olck</span>
          </span>
        </div>

        {/* CARD 1: Teacher Input (Hindi) with ALWAYS VISIBLE Interactive Typing & Speak */}
        <div className="p-4 rounded-3xl border-2 border-slate-200/90 bg-white shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              Teacher Speaks / Types (Hindi)
            </span>

            <button
              onClick={handlePlayHindi}
              className={`p-2 rounded-xl transition-colors ${
                activeAudioId === 'hindi-voice'
                  ? 'bg-janbhasha-700 text-white animate-pulse'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title="Listen Hindi"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Direct Always-Active Hindi Input Box */}
          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="यहाँ हिन्दी में लिखें या बोलें..."
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-900 font-hindi focus:outline-none focus:border-janbhasha-700 focus:bg-white"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-2xl bg-janbhasha-700 hover:bg-janbhasha-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 shrink-0"
              title="Translate and Speak Aloud"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Translate</span>
            </button>
          </form>

          {/* Quick Classroom Phrase Chips */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {[
              'नमस्ते बच्चों',
              'किताब खोलो',
              'अपनी कॉपी में लिखो',
              'आज हम जोड़ सीखेंगे',
              'पानी लाओ',
              'घर जाओ',
              'बहुत अच्छा'
            ].map((phrase) => (
              <button
                key={phrase}
                type="button"
                onClick={() => {
                  setInputText(phrase);
                  runTranslation(phrase, true);
                }}
                className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 hover:bg-janbhasha-100 text-slate-700 hover:text-janbhasha-900 border border-slate-200 transition-colors whitespace-nowrap shrink-0"
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>

        {/* CARD 2: Learner Output (Mother Tongue) - Instant Native Audio */}
        <div className={`p-4.5 rounded-3xl border-2 transition-all shadow-md relative ${
          activeAudioId === 'tribal-voice'
            ? 'bg-gradient-to-br from-emerald-50 via-emerald-100/70 to-teal-50 border-emerald-500 ring-4 ring-emerald-200/60'
            : 'bg-gradient-to-br from-emerald-50/90 to-amber-50/40 border-emerald-300'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-janbhasha-700 text-white shadow-2xs">
                Child Hears ({selectedLanguage.name} • {selectedLanguage.nativeName})
              </span>
              {activeAudioId === 'tribal-voice' && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 animate-pulse">
                  <Radio className="w-3 h-3 text-emerald-600" />
                  <span>Speaking Aloud...</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {/* Big Native Speak Button */}
              <button
                onClick={handlePlayTribal}
                className={`p-2.5 rounded-2xl transition-all shadow-xs flex items-center gap-1 font-bold text-xs ${
                  activeAudioId === 'tribal-voice'
                    ? 'bg-janbhasha-800 text-white scale-105 ring-2 ring-emerald-400'
                    : 'bg-janbhasha-700 text-white hover:bg-janbhasha-800'
                }`}
                title="Speak Aloud in Mother Tongue"
              >
                <Volume2 className="w-4 h-4" />
                <span>Speak</span>
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
          <div className="my-2 space-y-1.5">
            <h3 className="text-2xl font-black text-janbhasha-950 leading-snug tracking-wide">
              {tribalText || 'यहाँ अनुवाद दिखाई देगा...'}
            </h3>

            {tribalDevanagari && tribalDevanagari !== tribalText && (
              <div className="text-sm font-bold text-slate-800 font-hindi bg-white/75 px-3 py-1 rounded-xl inline-block border border-emerald-200/80 shadow-2xs">
                <span className="text-xs text-slate-500 font-medium">उच्चारण: </span>
                <span className="text-janbhasha-900 font-extrabold">{tribalDevanagari}</span>
              </div>
            )}

            {tribalRoman && (
              <div>
                <p className="text-xs text-janbhasha-800 font-semibold italic bg-white/80 px-3 py-1.5 rounded-xl inline-block border border-emerald-200/80 shadow-2xs">
                  Phonics: "{tribalRoman}"
                </p>
              </div>
            )}
          </div>


          {/* Animated Waveform during audio playback */}
          {activeAudioId === 'tribal-voice' && (
            <div className="mt-3 pt-2 border-t border-emerald-200/60 flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-800">Auto Live Speech Output</span>
              <AudioWaveform isPlaying={true} />
            </div>
          )}
        </div>
      </div>

      {/* BIG FLOATING MIC BAR AT BOTTOM */}
      <div className="px-5 pt-3 pb-2 bg-white/95 border-t border-slate-200/80 flex flex-col items-center gap-1.5 sticky bottom-0 z-30">
        <div className="flex items-center gap-4">
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
          {isRecording ? 'Listening to Hindi speech...' : 'Tap Mic • Speak Hindi ➔ Translates to ' + selectedLanguage.name}
        </p>
      </div>
    </div>
  );
};
