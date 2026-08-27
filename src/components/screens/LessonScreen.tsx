import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Plus,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LessonIllustration } from '../common/Illustrations';
import { MOCK_LESSON } from '../../data/mockData';
import { soundEffects } from '../../services/speechService';
import confetti from 'canvas-confetti';

export const LessonScreen: React.FC = () => {
  const { 
    setCurrentScreen, 
    selectedLanguage, 
    playBilingualAudio, 
    stopAudio,
    activeAudioId 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'Explanation' | 'Activity' | 'Practice'>('Explanation');
  const [selectedWord, setSelectedWord] = useState<any | null>(null);
  
  // Interactive Activity State
  const [basketCount1, setBasketCount1] = useState<number>(3);
  const [basketCount2, setBasketCount2] = useState<number>(2);
  const [userSumGuess, setUserSumGuess] = useState<number | null>(null);
  const [activitySuccess, setActivitySuccess] = useState<boolean>(false);

  // Practice Tab State
  const [practiceAnswers, setPracticeAnswers] = useState<{ [id: string]: number }>({});
  const [practiceSubmitted, setPracticeSubmitted] = useState<boolean>(false);

  const isPlayingLesson = activeAudioId === 'lesson-audio';

  const handleToggleLessonAudio = () => {
    if (isPlayingLesson) {
      stopAudio();
    } else {
      const fullTextToRead = `${MOCK_LESSON.explanationSections[0].hindiHeading}. ${MOCK_LESSON.explanationSections[0].hindiText} ${MOCK_LESSON.explanationSections[0].tribalHeading}. ${MOCK_LESSON.explanationSections[0].tribalText}`;
      playBilingualAudio('lesson-audio', fullTextToRead, 'hindi');
    }
  };

  const handleCheckActivity = (sum: number) => {
    setUserSumGuess(sum);
    if (sum === basketCount1 + basketCount2) {
      setActivitySuccess(true);
      soundEffects.playSuccess();
      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      } catch {
        // Confetti fallback
      }
    } else {
      setActivitySuccess(false);
      soundEffects.playBeep(320, 'triangle', 0.2);
    }
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
          Lesson
        </h2>

        <div className="w-9" />
      </div>

      {/* Main Content Area */}
      <div className="px-4 pt-1 pb-24 space-y-3.5 flex-1">
        {/* Lesson Header Card */}
        <div className="rounded-3xl bg-gradient-to-br from-amber-50/70 via-emerald-50/60 to-white border border-emerald-200/80 p-4 shadow-card flex items-center justify-between">
          <div className="max-w-[62%]">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
              {MOCK_LESSON.classLevel}
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5 font-hindi">
              {MOCK_LESSON.titleHindi}
            </h3>
            <p className="text-xs font-semibold text-janbhasha-700 mt-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Translated to {selectedLanguage.name}
            </p>
          </div>

          <div className="w-[36%] -mr-1">
            <LessonIllustration />
          </div>
        </div>

        {/* Tab Navigation Switcher */}
        <div className="flex items-center justify-between border-b border-slate-200/80 px-2 text-sm font-semibold text-slate-500">
          {(['Explanation', 'Activity', 'Practice'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  soundEffects.playBeep(580, 'sine', 0.05);
                }}
                className={`pb-2.5 px-3 transition-all relative ${
                  isActive ? 'text-janbhasha-800 font-bold' : 'hover:text-slate-800'
                }`}
              >
                <span>{tab}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-janbhasha-700 rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Explanation */}
        {activeTab === 'Explanation' && (
          <div className="space-y-4 pt-1 animate-in fade-in duration-200">
            {MOCK_LESSON.explanationSections.map((sec, idx) => (
              <div key={idx} className="rounded-3xl bg-white border border-slate-200/90 p-4.5 shadow-card space-y-3">
                {/* Hindi Concept */}
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 font-hindi">
                    {sec.hindiHeading}
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-hindi">
                    {sec.hindiText}
                  </p>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Tribal Mother Tongue Translation */}
                <div className="space-y-1 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/80">
                  <h4 className="text-xs font-bold text-janbhasha-900 font-hindi flex items-center justify-between">
                    <span>{sec.tribalHeading}</span>
                    <span className="text-[10px] text-emerald-700 font-normal">
                      {selectedLanguage.name} Mother Tongue
                    </span>
                  </h4>
                  <p className="text-sm font-semibold text-janbhasha-950 leading-relaxed font-hindi">
                    {sec.tribalText}
                  </p>
                  <p className="text-xs text-emerald-800/80 italic">
                    {sec.romanTribalText}
                  </p>
                </div>

                {/* Interactive Word Glossary */}
                <div className="pt-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Tap word for tribal phonics & meaning:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sec.words.map((w, wIdx) => (
                      <button
                        key={wIdx}
                        onClick={() => {
                          setSelectedWord(w);
                          playBilingualAudio(`word-${w.word}`, w.word, 'tribal');
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                          selectedWord?.word === w.word
                            ? 'bg-janbhasha-700 text-white border-janbhasha-700 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50'
                        }`}
                      >
                        {w.word}
                      </button>
                    ))}
                  </div>

                  {selectedWord && (
                    <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between animate-in fade-in">
                      <div>
                        <b>{selectedWord.word}</b> ({selectedWord.pronunciation}) = <span>{selectedWord.translation}</span>
                      </div>
                      <button
                        onClick={() => playBilingualAudio(`gloss-${selectedWord.word}`, selectedWord.word, 'tribal')}
                        className="p-1 rounded-md bg-amber-200/70 hover:bg-amber-200"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Activity */}
        {activeTab === 'Activity' && (
          <div className="rounded-3xl bg-white border border-slate-200/90 p-4.5 shadow-card space-y-4 animate-in fade-in duration-200">
            <div>
              <h4 className="text-base font-bold text-slate-900">
                {MOCK_LESSON.activity.title}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                {MOCK_LESSON.activity.instructionHindi}
              </p>
              <p className="text-xs font-semibold text-janbhasha-800 mt-0.5 italic">
                {MOCK_LESSON.activity.instructionTribal}
              </p>
            </div>

            {/* Visual Addition Counting Trays */}
            <div className="flex items-center justify-center gap-3 py-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              {/* Tray 1 */}
              <div className="flex flex-col items-center">
                <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex gap-1 text-2xl min-w-[70px] justify-center">
                  {Array.from({ length: basketCount1 }).map((_, i) => (
                    <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                      {MOCK_LESSON.activity.itemEmoji}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-700 mt-1">
                  {basketCount1} (३)
                </span>
              </div>

              <div className="w-8 h-8 rounded-full bg-janbhasha-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                +
              </div>

              {/* Tray 2 */}
              <div className="flex flex-col items-center">
                <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex gap-1 text-2xl min-w-[70px] justify-center">
                  {Array.from({ length: basketCount2 }).map((_, i) => (
                    <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}>
                      {MOCK_LESSON.activity.itemEmoji}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-700 mt-1">
                  {basketCount2} (२)
                </span>
              </div>
            </div>

            {/* Answer Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block text-center">
                Choose the total number of apples:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleCheckActivity(num)}
                    className={`py-3 rounded-2xl font-bold text-base border transition-all active:scale-95 ${
                      userSumGuess === num
                        ? activitySuccess
                          ? 'bg-janbhasha-700 text-white border-janbhasha-700 shadow-md'
                          : 'bg-rose-600 text-white border-rose-600'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-janbhasha-400'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {activitySuccess && (
              <div className="p-3 bg-emerald-100/80 border border-emerald-300 rounded-2xl text-xs text-emerald-900 font-semibold flex items-center gap-2 animate-in zoom-in-95">
                <CheckCircle2 className="w-5 h-5 text-janbhasha-700 shrink-0" />
                <span>
                  शाबाश! ३ + २ = ५ सेब! (बारिया + आपेया = मोड़ेया सेब)
                </span>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Practice */}
        {activeTab === 'Practice' && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            {MOCK_LESSON.practice.map((item, qIdx) => (
              <div key={item.id} className="rounded-3xl bg-white border border-slate-200/90 p-4 shadow-card space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-janbhasha-700 uppercase">
                    Question {qIdx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 font-hindi mt-0.5">
                    {item.questionHindi}
                  </h4>
                  <p className="text-xs text-emerald-800 font-semibold italic mt-0.5">
                    {item.questionTribal}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {item.options.map((opt, optIdx) => {
                    const isSelected = practiceAnswers[item.id] === optIdx;
                    const isCorrect = optIdx === item.correctIndex;
                    
                    let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800';
                    if (practiceSubmitted) {
                      if (isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-600';
                      else if (isSelected && !isCorrect) btnStyle = 'bg-rose-600 text-white border-rose-600';
                    } else if (isSelected) {
                      btnStyle = 'bg-janbhasha-700 text-white border-janbhasha-700';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => {
                          setPracticeAnswers({ ...practiceAnswers, [item.id]: optIdx });
                          soundEffects.playBeep(520, 'sine', 0.05);
                        }}
                        className={`py-2.5 px-3 rounded-xl font-bold text-sm border transition-all active:scale-95 ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {practiceSubmitted && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <p className="font-semibold">व्याख्या: {item.explanation}</p>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() => {
                setPracticeSubmitted(true);
                soundEffects.playSuccess();
              }}
              className="w-full py-3 rounded-2xl bg-janbhasha-700 text-white font-bold text-sm shadow-md hover:bg-janbhasha-800 active:scale-98 transition-all"
            >
              Submit Answers & Evaluate
            </button>
          </div>
        )}
      </div>

      {/* Floating Bottom Synchronized Audio Bar */}
      <div className="fixed bottom-14 left-0 right-0 px-4 z-20 pointer-events-auto">
        <div className="max-w-md mx-auto rounded-2xl bg-slate-900/95 backdrop-blur-md text-white p-3 shadow-elevated border border-slate-700/60 flex items-center justify-between gap-3">
          <button
            onClick={handleToggleLessonAudio}
            className="w-10 h-10 rounded-full bg-janbhasha-600 text-white flex items-center justify-center hover:bg-janbhasha-500 active:scale-95 transition-all shadow-md shrink-0"
          >
            {isPlayingLesson ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300 mb-1">
              <span className="truncate">Audio Companion ({selectedLanguage.name})</span>
              <span>{isPlayingLesson ? 'Playing...' : 'Ready'}</span>
            </div>
            {/* Audio Progress Bar */}
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-janbhasha-400 rounded-full ${
                  isPlayingLesson ? 'w-3/5 animate-pulse' : 'w-1/4'
                }`} 
              />
            </div>
          </div>

          <button
            onClick={() => soundEffects.playBeep(640, 'sine', 0.1)}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            title="Audio Volume"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
