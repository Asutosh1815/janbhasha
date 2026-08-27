import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ClipboardList, 
  Volume2, 
  X, 
  Award, 
  Check, 
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_ASSESSMENTS } from '../../data/mockData';
import { AssessmentItem } from '../../types';
import { soundEffects } from '../../services/speechService';
import confetti from 'canvas-confetti';

export const AssessmentsScreen: React.FC = () => {
  const { setCurrentScreen, selectedLanguage, playBilingualAudio } = useApp();
  const [activeTab, setActiveTab] = useState<'All' | 'Literacy' | 'Numeracy'>('All');
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentItem | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [evalScores, setEvalScores] = useState<{ [qId: string]: number }>({});
  const [testComplete, setTestComplete] = useState<boolean>(false);

  const tabs: ('All' | 'Literacy' | 'Numeracy')[] = ['All', 'Literacy', 'Numeracy'];

  const filteredAssessments = MOCK_ASSESSMENTS.filter((item) => {
    if (activeTab === 'All') return true;
    return item.type.toLowerCase() === activeTab.toLowerCase();
  });

  const handleStartTest = (ass: AssessmentItem) => {
    setSelectedAssessment(ass);
    setCurrentQIndex(0);
    setEvalScores({});
    setTestComplete(false);
    soundEffects.playBeep(580, 'sine', 0.08);
  };

  const handleRecordScore = (qId: string, optIndex: number) => {
    setEvalScores((prev) => ({ ...prev, [qId]: optIndex }));
    soundEffects.playBeep(640, 'sine', 0.05);

    if (selectedAssessment && currentQIndex < selectedAssessment.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      setTestComplete(true);
      soundEffects.playSuccess();
      try {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      } catch {
        // Confetti fallback
      }
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
          Assessments
        </h2>

        <div className="w-9" />
      </div>

      <div className="px-4 pt-1 pb-6 space-y-3.5 flex-1">
        {/* Top NIPUN Bharat Aligned Assessment Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-amber-50/60 border border-emerald-200/90 p-4.5 shadow-card flex items-center justify-between">
          <div className="max-w-[70%]">
            <h3 className="text-base font-extrabold text-slate-900 leading-tight">
              NIPUN Bharat Aligned Assessment
            </h3>
            <p className="text-xs font-semibold text-janbhasha-700 mt-1">
              FLN - Foundational Literacy &amp; Numeracy
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white border border-emerald-200 shadow-sm flex items-center justify-center text-janbhasha-700">
            <ClipboardList className="w-7 h-7 stroke-[2.2]" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200/80 px-2 text-sm font-semibold text-slate-500">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  soundEffects.playBeep(520, 'sine', 0.05);
                }}
                className={`pb-2.5 px-4 transition-all relative ${
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

        {/* Assessment Modules List */}
        <div className="space-y-3 pt-1">
          {filteredAssessments.map((ass) => (
            <div
              key={ass.id}
              onClick={() => handleStartTest(ass)}
              className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:border-janbhasha-300 transition-all cursor-pointer group active:scale-98"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-janbhasha-700 flex items-center justify-center font-bold text-sm">
                  <ClipboardList className="w-5 h-5" />
                </div>

                <div className="text-left">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-janbhasha-800 transition-colors">
                    {ass.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {ass.classLevel}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full border-2 border-emerald-500 bg-emerald-50 flex items-center justify-center">
                  <span className="text-xs font-extrabold text-emerald-800">
                    {ass.scorePercent}%
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-janbhasha-700 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Assessment Modal */}
      {selectedAssessment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3">
          <div className="bg-white rounded-3xl w-full max-w-sm max-h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div>
                <span className="text-[10px] font-bold text-janbhasha-700 uppercase">
                  {selectedAssessment.classLevel} &bull; Assessment
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedAssessment.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAssessment(null)}
                className="p-1.5 rounded-full hover:bg-slate-200/70 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Test Content */}
            <div className="p-5 overflow-y-auto space-y-4 no-scrollbar">
              {!testComplete ? (
                <>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Item {currentQIndex + 1} of {selectedAssessment.questions.length}</span>
                    <span className="font-semibold text-janbhasha-700">Oral Prompt Mode</span>
                  </div>

                  {/* Question Card */}
                  <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                        Teacher Instruction (Hindi):
                      </span>
                      <p className="text-sm font-bold text-slate-900 font-hindi mt-0.5">
                        {selectedAssessment.questions[currentQIndex].promptHindi}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-emerald-200/60">
                      <span className="text-[10px] font-bold text-janbhasha-800 uppercase tracking-wider">
                        Learner Oral Prompt ({selectedLanguage.name}):
                      </span>
                      <p className="text-sm font-bold text-janbhasha-950 font-hindi mt-0.5">
                        {selectedAssessment.questions[currentQIndex].promptTribal}
                      </p>
                      <p className="text-xs text-emerald-800/80 italic mt-0.5">
                        {selectedAssessment.questions[currentQIndex].romanTribal}
                      </p>
                    </div>

                    <button
                      onClick={() => playBilingualAudio(`eval-${currentQIndex}`, selectedAssessment.questions[currentQIndex].promptTribal, 'tribal')}
                      className="w-full py-2 px-3 rounded-xl bg-janbhasha-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:bg-janbhasha-800"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Speak Question in {selectedLanguage.name}</span>
                    </button>
                  </div>

                  {/* Teacher Rubric Evaluation Buttons */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 block">
                      Record Student Competency:
                    </span>
                    <div className="space-y-2">
                      {selectedAssessment.questions[currentQIndex].options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRecordScore(selectedAssessment.questions[currentQIndex].id, idx)}
                          className="w-full p-3 rounded-xl border border-slate-200 text-left text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:border-emerald-300 transition-all flex items-center justify-between active:scale-98 bg-slate-50"
                        >
                          <span>{opt}</span>
                          <Check className="w-4 h-4 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Completed Summary */
                <div className="text-center py-4 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-janbhasha-700 flex items-center justify-center mx-auto shadow-sm">
                    <Award className="w-9 h-9 stroke-[2.2]" />
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      Assessment Completed!
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      FLN Competency recorded successfully for {selectedLanguage.name}
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-left space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Competency Achieved:</span>
                      <span className="font-bold text-emerald-800">Mastered (NIPUN L1)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">FLN Benchmark:</span>
                      <span className="font-bold text-janbhasha-700">88% / 100%</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedAssessment(null)}
                    className="w-full py-3 rounded-2xl bg-janbhasha-700 text-white font-bold text-sm shadow-md hover:bg-janbhasha-800 active:scale-98 transition-all"
                  >
                    Done &amp; Back to Assessments
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
