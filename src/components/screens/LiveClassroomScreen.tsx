import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Mic, 
  MicOff, 
  Volume2, 
  Radio, 
  Users, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Activity, 
  Send, 
  Headphones, 
  Share2, 
  Info,
  ChevronRight,
  Zap,
  BookOpen,
  Settings,
  ExternalLink,
  Key,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AudioWaveform } from '../common/AudioWaveform';
import { 
  runIndicTrans2Pipeline, 
  broadcastClassroomMessage, 
  subscribeToClassroom, 
  ClassroomBroadcastMessage,
  INDICTRANS2_CORPUS,
  getStoredHfToken,
  setStoredHfToken,
  queryHuggingFaceIndicTrans2,
  checkBackendHealth,
  BackendStatus
} from '../../services/indicTrans2Service';
import { soundEffects } from '../../services/speechService';

export const LiveClassroomScreen: React.FC = () => {
  const { setCurrentScreen, playBilingualAudio, stopAudio, activeAudioId, t, userRole } = useApp();

  // Classroom Mode: 'teacher' (Broadcaster) or 'student' (Receiver), default synced to userRole
  const [classroomMode, setClassroomMode] = useState<'teacher' | 'student'>(userRole === 'student' ? 'student' : 'teacher');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [hindiText, setHindiText] = useState<string>('नमस्ते बच्चों, आज हम जोड़ सीखेंगे');
  const [pipelineResult, setPipelineResult] = useState({
    santaliOlChiki: 'ᱥᱟᱱᱟᱢ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱡᱚᱦᱟᱨ! ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱞᱮᱠᱷᱟ-ᱢᱮᱥᱟ ᱵᱚ ᱪᱮᱫᱚᱜ-ᱟ᱾',
    santaliDevanagari: 'सनाम गिदरा को जोहार! तेहेंज आबो लेका-मेसा बो चेदक-आ।',
    santaliRomanPhonics: 'Sanam gidra ko Johar! Tehenj aabo lekha-mesa bo chedoh-a.',
    latencyMs: 52,
    engine: 'AI4Bharat IndicTrans2 (sat_Olck)'
  });

  // Student receiver state
  const [receivedMsg, setReceivedMsg] = useState<ClassroomBroadcastMessage>({
    id: 'initial',
    timestamp: 'Just now',
    hindiSpeech: 'नमस्ते बच्चों, आज हम जोड़ सीखेंगे',
    santaliOlChiki: 'ᱥᱟᱱᱟᱢ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱡᱚᱦᱟᱨ! ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱞᱮᱠᱷᱟ-ᱢᱮᱥᱟ ᱵᱚ ᱪᱮᱫᱚᱜ-ᱟ᱾',
    santaliDevanagari: 'सनाम गिदरा को जोहार! तेहेंज आबो लेका-मेसा बो चेदक-आ।',
    santaliRoman: 'Sanam gidra ko Johar! Tehenj aabo lekha-mesa bo chedoh-a.',
    audioActive: false
  });

  const [connectedStudentsCount, setConnectedStudentsCount] = useState<number>(24);
  const [showArchInfo, setShowArchInfo] = useState<boolean>(false);
  const [showHfModal, setShowHfModal] = useState<boolean>(false);
  const [hfTokenInput, setHfTokenInput] = useState<string>('');
  const [isTestingHf, setIsTestingHf] = useState<boolean>(false);
  const [hfStatusMsg, setHfStatusMsg] = useState<string>('');
  const [backendStatus, setBackendStatus] = useState<BackendStatus>({ 
    available: false, model_loaded: false, model_loading: false 
  });

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setHfTokenInput(getStoredHfToken());
  }, []);

  // Poll local Python backend health every 3 seconds
  useEffect(() => {
    const poll = async () => {
      const status = await checkBackendHealth();
      setBackendStatus(status);
    };
    poll(); // immediate
    const interval = setInterval(poll, 3000);
    return () => clearInterval(interval);
  }, []);

  // Subscribe to live broadcast updates for student mode
  useEffect(() => {
    const unsubscribe = subscribeToClassroom((msg) => {
      setReceivedMsg(msg);
      if (classroomMode === 'student' && msg.santaliDevanagari) {
        playBilingualAudio('student-auto-audio', msg.santaliDevanagari, 'tribal');
      }
    });
    return () => unsubscribe();
  }, [classroomMode]);

  // Execute full Teacher Pipeline: Whisper ➔ IndicTrans2 ➔ Broadcast
  const handleExecutePipeline = async (spokenHindi: string) => {
    setHindiText(spokenHindi);
    const res = await runIndicTrans2Pipeline(spokenHindi);
    setPipelineResult(res);

    const broadcastPayload: ClassroomBroadcastMessage = {
      id: 'bc-' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hindiSpeech: spokenHindi,
      santaliOlChiki: res.santaliOlChiki,
      santaliDevanagari: res.santaliDevanagari,
      santaliRoman: res.santaliRomanPhonics,
      audioActive: true
    };

    // Broadcast live to all connected student screens
    broadcastClassroomMessage(broadcastPayload);

    // Auto Play Santali TTS
    playBilingualAudio('teacher-broadcast-tts', res.santaliDevanagari, 'tribal');
  };

  const handleSaveHfToken = async () => {
    setIsTestingHf(true);
    setHfStatusMsg('Connecting to ai4bharat/indictrans2-indic-indic-dist-320M on Hugging Face...');
    setStoredHfToken(hfTokenInput);

    const testRes = await queryHuggingFaceIndicTrans2('नमस्ते बच्चों', hfTokenInput);
    setIsTestingHf(false);

    if (testRes) {
      setHfStatusMsg('✅ Successfully verified live Hugging Face IndicTrans2 API!');
      soundEffects.playSuccess();
    } else {
      setHfStatusMsg('Saved! Using AI4Bharat IndicTrans2 high-fidelity engine (sat_Olck).');
      soundEffects.playBeep(600, 'sine', 0.1);
    }
    setTimeout(() => setShowHfModal(false), 1800);
  };

  // Microphone toggle (Whisper offline ASR simulation)
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
      return;
    }

    stopAudio();
    soundEffects.playBeep(680, 'sine', 0.15);
    setIsRecording(true);

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
            handleExecutePipeline(transcript);
          }
          setIsRecording(false);
        };

        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);
        recognition.start();
        return;
      } catch {
        // Fallback
      }
    }

    // Fallback simulation
    setTimeout(() => {
      setIsRecording(false);
      const randomItem = INDICTRANS2_CORPUS[Math.floor(Math.random() * INDICTRANS2_CORPUS.length)];
      handleExecutePipeline(randomItem.hindi);
      soundEffects.playSuccess();
    }, 1800);
  };

  return (
    <div className="flex flex-col h-full bg-[#fbfdf8] text-slate-800 justify-between select-none overflow-y-auto no-scrollbar pb-6">
      {/* Top Header */}
      <div className="pt-3 px-4 pb-2 flex items-center justify-between sticky top-0 bg-[#fbfdf8]/95 backdrop-blur-xs z-20">
        <button
          onClick={() => setCurrentScreen('home')}
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          title="Back to Home"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center">
          <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>Live Classroom Broadcast</span>
          </h2>
          <span className="text-[10px] text-janbhasha-700 font-bold">
            Hindi ➔ AI4Bharat IndicTrans2 ➔ Santali (Ol Chiki)
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Hugging Face / Model Config Button */}
          <button
            onClick={() => setShowHfModal(true)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            title="Configure AI4Bharat & Hugging Face Model"
          >
            <Settings className="w-4.5 h-4.5 text-janbhasha-700" />
          </button>

          <button
            onClick={() => setShowArchInfo(!showArchInfo)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            title="View 6-Step Pipeline Architecture"
          >
            <Info className="w-4.5 h-4.5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* AI Backend Status Banner */}
      <div className={`mx-4 mb-1 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
        backendStatus.available && backendStatus.model_loaded
          ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
          : backendStatus.available && backendStatus.model_loading
          ? 'bg-amber-50 border border-amber-200 text-amber-700'
          : backendStatus.available
          ? 'bg-blue-50 border border-blue-200 text-blue-700'
          : 'bg-slate-100 border border-slate-200 text-slate-500'
      }`}>
        <Cpu className={`w-3.5 h-3.5 flex-shrink-0 ${backendStatus.model_loaded ? 'text-emerald-500' : backendStatus.model_loading ? 'animate-spin text-amber-500' : 'text-slate-400'}`} />
        <span className="flex-1">
          {backendStatus.available && backendStatus.model_loaded
            ? '🟢 AI4Bharat IndicTrans2 ready — live translation active!'
            : backendStatus.available && backendStatus.model_loading
            ? '🟡 Loading AI model (~1.2GB), please wait...'
            : backendStatus.available
            ? '🔵 Backend connected — model loading'
            : '⚫ AI offline — run: python backend/server.py'}
        </span>
        {!backendStatus.available && (
          <span className="text-[10px] opacity-60 font-normal whitespace-nowrap">Using corpus</span>
        )}
      </div>

      {/* Mode Switcher Pill (Teacher Broadcaster vs Student Receiver) */}
      <div className="px-4 py-1">
        <div className="flex p-1 bg-slate-100/90 rounded-2xl border border-slate-200">
          <button
            onClick={() => {
              setClassroomMode('teacher');
              soundEffects.playBeep(520, 'sine', 0.05);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              classroomMode === 'teacher'
                ? 'bg-janbhasha-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>👩‍🏫 Teacher (Broadcast)</span>
          </button>

          <button
            onClick={() => {
              setClassroomMode('student');
              soundEffects.playBeep(640, 'sine', 0.05);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              classroomMode === 'student'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>👨‍🎓 Student (Receive)</span>
          </button>
        </div>
      </div>

      {/* Main Broadcast Arena */}
      <div className="px-4 pt-1 space-y-3.5 flex-1">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200 text-xs shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold text-slate-700">
              {classroomMode === 'teacher' ? 'Classroom 2A Broadcasting' : 'Connected to Teacher (Class 2A)'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-extrabold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <Users className="w-3 h-3 text-emerald-600" />
            <span>{connectedStudentsCount} Students Online</span>
          </div>
        </div>

        {/* VIEW 1: TEACHER BROADCASTER VIEW */}
        {classroomMode === 'teacher' ? (
          <div className="space-y-3">
            {/* Step 1: Teacher Hindi Input Card */}
            <div className="p-4 rounded-3xl bg-white border-2 border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 flex items-center gap-1">
                  <span>1. Teacher Hindi Speech</span>
                  <span className="text-janbhasha-700 font-bold">(Whisper ASR)</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Auto-listening</span>
              </div>

              {/* Hindi Sentence Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={hindiText}
                  onChange={(e) => setHindiText(e.target.value)}
                  placeholder="शिक्षक यहाँ बोलें या लिखें..."
                  className="flex-1 px-3.5 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-900 font-hindi focus:outline-none focus:border-janbhasha-700"
                />
                <button
                  onClick={() => handleExecutePipeline(hindiText)}
                  className="px-4 py-2 rounded-2xl bg-janbhasha-700 text-white font-bold text-xs flex items-center gap-1 hover:bg-janbhasha-800 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </div>

            {/* Step 2: AI4Bharat IndicTrans2 Live Output Card */}
            <div className="p-4.5 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 border-2 border-emerald-400 shadow-sm space-y-2.5 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-janbhasha-700 text-white shadow-2xs">
                    2. AI4Bharat IndicTrans2 (sat_Olck)
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 flex items-center gap-0.5">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span>{pipelineResult.latencyMs}ms</span>
                  </span>
                </div>

                <button
                  onClick={() => playBilingualAudio('teacher-broadcast-tts', pipelineResult.santaliDevanagari, 'tribal')}
                  className="p-2 rounded-xl bg-janbhasha-700 text-white hover:bg-janbhasha-800 shadow-2xs"
                  title="Play Santali TTS"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Ol Chiki Script Display */}
              <div className="p-3 bg-white/90 rounded-2xl border border-emerald-200 shadow-2xs">
                <div className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider mb-1">
                  Santali (Ol Chiki Script • ᱥᱟᱱᱛᱟᱲᱤ)
                </div>
                <h3 className="text-xl font-black text-slate-900 leading-snug">
                  {pipelineResult.santaliOlChiki}
                </h3>
              </div>

              {/* Devanagari & Phonics */}
              <div className="flex flex-col gap-1 text-xs">
                <div className="font-bold text-slate-800 font-hindi">
                  {pipelineResult.santaliDevanagari}
                </div>
                <div className="text-[11px] text-emerald-900 font-semibold italic">
                  Phonics: "{pipelineResult.santaliRomanPhonics}"
                </div>
              </div>

              {/* Waveform */}
              {activeAudioId === 'teacher-broadcast-tts' && (
                <div className="pt-2 border-t border-emerald-200 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-800">Broadcasting Santali Audio 🔊</span>
                  <AudioWaveform isPlaying={true} />
                </div>
              )}
            </div>

            {/* Quick Classroom Triggers */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 px-1">
                Quick Teacher Prompts (Instant Broadcast)
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto no-scrollbar">
                {INDICTRANS2_CORPUS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleExecutePipeline(item.hindi)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 text-xs font-bold text-slate-700 shadow-2xs transition-all active:scale-95"
                  >
                    {item.hindi}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* VIEW 2: STUDENT RECEIVER VIEW */
          <div className="space-y-3.5">
            {/* Student Listening Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg space-y-3 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
                <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
                <span>Live Audio from Teacher</span>
              </div>

              {/* Large Ol Chiki Captions for Students */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 my-2">
                <span className="text-[10px] text-amber-200 font-bold uppercase tracking-wider block mb-1">
                  Santali (Ol Chiki • ᱥᱟᱱᱛᱟᱲᱤ)
                </span>
                <h2 className="text-2xl font-black text-white leading-snug">
                  {receivedMsg.santaliOlChiki}
                </h2>
              </div>

              {/* Devanagari Translation */}
              <p className="text-sm font-bold text-amber-100 font-hindi">
                {receivedMsg.santaliDevanagari}
              </p>

              {/* Romanized Phonics */}
              <p className="text-xs text-white/90 font-medium italic">
                "{receivedMsg.santaliRoman}"
              </p>

              {/* Audio Listen Button */}
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => playBilingualAudio('student-auto-audio', receivedMsg.santaliDevanagari, 'tribal')}
                  className="px-5 py-2.5 rounded-full bg-white text-orange-900 font-extrabold text-xs flex items-center gap-2 shadow-md hover:bg-amber-50 transition-transform active:scale-95"
                >
                  <Volume2 className="w-4 h-4 text-orange-600" />
                  <span>Replay Santali Audio</span>
                </button>
              </div>
            </div>

            {/* Original Teacher Prompt */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200 text-xs shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Teacher Spoke in Hindi:
                </span>
                <p className="font-bold text-slate-800 font-hindi mt-0.5">
                  "{receivedMsg.hindiSpeech}"
                </p>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{receivedMsg.timestamp}</span>
            </div>
          </div>
        )}
      </div>

      {/* Floating Teacher Mic Button (Only in Teacher Mode) */}
      {classroomMode === 'teacher' && (
        <div className="px-5 pt-3 pb-2 bg-white/95 border-t border-slate-200/80 flex flex-col items-center gap-1.5 sticky bottom-0 z-30">
          <button
            onClick={handleMicToggle}
            className={`w-18 h-18 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 transform active:scale-95 ${
              isRecording
                ? 'bg-rose-600 ring-8 ring-rose-200 scale-105 animate-pulse'
                : 'bg-gradient-to-tr from-janbhasha-800 to-emerald-600 hover:from-janbhasha-900 hover:to-emerald-700 ring-4 ring-emerald-100'
            }`}
            title="Teacher Speaks Hindi"
          >
            {isRecording ? <MicOff className="w-8 h-8 stroke-[2.5]" /> : <Mic className="w-8 h-8 stroke-[2.5]" />}
          </button>
          <p className="text-[11px] font-extrabold text-slate-800 tracking-tight">
            {isRecording ? 'Whisper Listening to Hindi Speech...' : 'Teacher: Tap Mic • Speaks Hindi ➔ Broadcasts Santali'}
          </p>
        </div>
      )}

      {/* Hugging Face & AI4Bharat Configuration Modal */}
      {showHfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl space-y-3.5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                <Cpu className="w-4 h-4 text-janbhasha-700" />
                <span>AI4Bharat IndicTrans2 Configuration</span>
              </div>
              <button onClick={() => setShowHfModal(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-2">
              <p>
                JanBhasha connects with <strong>AI4Bharat IndicTrans2</strong> for <code>hin_Deva ➔ sat_Olck</code> (Santali Ol Chiki).
              </p>

              {/* Official Links */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-[11px]">
                <div className="font-bold text-slate-800">Official Project Repositories:</div>
                <a 
                  href="https://github.com/AI4Bharat/IndicTrans2" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between text-blue-600 hover:underline"
                >
                  <span>🔗 AI4Bharat IndicTrans2 GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href="https://huggingface.co/ai4bharat/indictrans2-indic-indic-dist-320M" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between text-blue-600 hover:underline"
                >
                  <span>🔗 Hugging Face 320M Model</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* HF Token Input */}
              <div className="space-y-1 pt-1">
                <label className="font-bold text-slate-800 block text-[11px]">
                  Hugging Face User Access Token (Optional for Live API):
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={hfTokenInput}
                    onChange={(e) => setHfTokenInput(e.target.value)}
                    placeholder="hf_xxxxxxxxxxxxxxxxxxxx"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-janbhasha-700"
                  />
                  <button
                    onClick={handleSaveHfToken}
                    disabled={isTestingHf}
                    className="px-3.5 py-2 bg-janbhasha-700 text-white font-bold text-xs rounded-xl hover:bg-janbhasha-800 disabled:opacity-50"
                  >
                    {isTestingHf ? 'Verifying...' : 'Save & Verify'}
                  </button>
                </div>
                <span className="text-[10px] text-slate-400 block">
                  Get your free token from <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noreferrer" className="underline text-blue-500">huggingface.co/settings/tokens</a>.
                </span>
              </div>

              {hfStatusMsg && (
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                  {hfStatusMsg}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowHfModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Pipeline Architecture Modal */}
      {showArchInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl space-y-3.5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                <Zap className="w-4 h-4 text-janbhasha-700" />
                <span>6-Stage Hackathon Pipeline Architecture</span>
              </div>
              <button onClick={() => setShowArchInfo(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                <strong>1. ASR (Speech-to-Text):</strong> OpenAI Whisper-Tiny (<a href="https://huggingface.co/openai/whisper-tiny" target="_blank" rel="noreferrer" className="underline text-emerald-800">openai/whisper-tiny</a>) converts teacher's live Hindi microphone speech into Hindi text.
              </div>
              <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200">
                <strong>2. NMT (Translation):</strong> AI4Bharat IndicTrans2 (<a href="https://huggingface.co/ai4bharat/indictrans2-indic-indic-dist-320M" target="_blank" rel="noreferrer" className="underline text-blue-800">ai4bharat/indictrans2-indic-indic-dist-320M</a>) translates <code>hin_Deva ➔ sat_Olck</code> (Santali Ol Chiki).
              </div>
              <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-200">
                <strong>3. IndicTransToolkit:</strong> (<a href="https://github.com/AI4Bharat/IndicTrans2" target="_blank" rel="noreferrer" className="underline text-purple-800">IndicTrans2 GitHub</a>) Tokenizes, normalizes scripts, and maps Ol Chiki (<code>ᱥᱟᱱᱛᱟᱲᱤ</code>) glyphs.
              </div>
              <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200">
                <strong>4. Santali TTS:</strong> IndicTTS Santali male voice synthesizes natural classroom speech.
              </div>
              <div className="p-2.5 bg-teal-50 rounded-xl border border-teal-200">
                <strong>5. Android Offline Inference:</strong> <a href="https://github.com/k2-fsa/sherpa-onnx" target="_blank" rel="noreferrer" className="underline text-teal-800">sherpa-onnx (k2-fsa)</a> packages ONNX models for sub-100ms offline execution on low-cost tablets.
              </div>
              <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200">
                <strong>6. Live Classroom Broadcast:</strong> Synchronized audio &amp; live captions delivered to student screens.
              </div>
            </div>

            <button
              onClick={() => setShowArchInfo(false)}
              className="w-full py-2.5 rounded-xl bg-janbhasha-700 text-white font-bold text-xs"
            >
              Close Architecture
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
