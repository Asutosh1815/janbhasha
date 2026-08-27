import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Filter, 
  Download, 
  Check, 
  FileText, 
  Printer, 
  X, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_WORKSHEETS } from '../../data/mockData';
import { WorksheetItem } from '../../types';
import { soundEffects } from '../../services/speechService';
import confetti from 'canvas-confetti';

export const WorksheetsScreen: React.FC = () => {
  const { setCurrentScreen, selectedLanguage } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeWorksheet, setActiveWorksheet] = useState<WorksheetItem | null>(null);
  const [answers, setAnswers] = useState<{ [qId: string]: string }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [downloadedList, setDownloadedList] = useState<{ [id: string]: boolean }>({});

  const filterTabs = ['All', 'Hindi', 'Ho', 'Mundari', 'Santhali'];

  const filteredWorksheets = MOCK_WORKSHEETS.filter(ws => {
    if (selectedFilter === 'All') return true;
    return ws.language.toLowerCase().includes(selectedFilter.toLowerCase()) || 
           ws.subject.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  const handleDownload = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    soundEffects.playBeep(640, 'sine', 0.1);
    setDownloadedList(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      soundEffects.playSuccess();
    }, 600);
  };

  const handleOpenWorksheet = (ws: WorksheetItem) => {
    setActiveWorksheet(ws);
    setAnswers({});
    setSubmitted(false);
    soundEffects.playBeep(540, 'sine', 0.08);
  };

  const handleSelectAnswer = (qId: string, opt: string) => {
    setAnswers(prev => ({ ...prev, [qId]: opt }));
    soundEffects.playBeep(480, 'sine', 0.05);
  };

  const handleSubmitWorksheet = () => {
    setSubmitted(true);
    soundEffects.playSuccess();
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {
      // Confetti fallback
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
          Worksheets
        </h2>

        <button 
          onClick={() => soundEffects.playBeep(600, 'sine', 0.1)}
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <Filter className="w-5 h-5 text-janbhasha-700" />
        </button>
      </div>

      {/* Filter Horizontal Chips */}
      <div className="px-4 py-1">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {filterTabs.map((filter) => {
            const isSelected = selectedFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => {
                  setSelectedFilter(filter);
                  soundEffects.playBeep(520, 'sine', 0.05);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-janbhasha-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Worksheets Card List */}
      <div className="px-4 pt-2 pb-6 space-y-3 flex-1">
        {filteredWorksheets.map((ws) => {
          const isDownloaded = downloadedList[ws.id];

          return (
            <div
              key={ws.id}
              onClick={() => handleOpenWorksheet(ws)}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:border-janbhasha-300 transition-all cursor-pointer group active:scale-98"
            >
              <div className="flex items-center gap-3.5">
                {/* File Icon with Subject Gradient */}
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${ws.color} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}
                >
                  <FileText className="w-5 h-5" />
                </div>

                {/* Details */}
                <div className="text-left">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-janbhasha-800 transition-colors">
                    {ws.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {ws.classLevel}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-semibold">
                    {ws.language}
                  </span>
                </div>
              </div>

              {/* Download / Status Action */}
              <button
                onClick={(e) => handleDownload(e, ws.id)}
                className={`p-2.5 rounded-xl transition-all ${
                  isDownloaded
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-600 hover:bg-janbhasha-50 hover:text-janbhasha-700'
                }`}
                title={isDownloaded ? 'Downloaded' : 'Download for offline use'}
              >
                {isDownloaded ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Interactive Worksheet Modal / Print View */}
      {activeWorksheet && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3">
          <div className="bg-white rounded-3xl w-full max-w-sm max-h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div>
                <span className="text-[10px] font-bold text-janbhasha-700 uppercase">
                  {activeWorksheet.classLevel}
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {activeWorksheet.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveWorksheet(null)}
                className="p-1.5 rounded-full hover:bg-slate-200/70 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Questions Body */}
            <div className="p-4 overflow-y-auto space-y-4 no-scrollbar">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>FLN Bilingual Assessment Worksheet • Interactive Mode</span>
              </div>

              {activeWorksheet.questions.map((q, idx) => (
                <div key={q.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500">
                      Problem #{idx + 1}
                    </span>
                    <span className="text-[10px] text-janbhasha-700 font-semibold">{q.prompt}</span>
                  </div>

                  <p className="text-sm font-bold text-slate-900 font-hindi">
                    {q.qHindi}
                  </p>
                  <p className="text-xs text-emerald-800 font-semibold italic">
                    {q.qTribal}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {q.options?.map((opt) => {
                      const isSelected = answers[q.id] === opt;
                      const isCorrect = opt === q.answer;

                      let style = 'bg-white border-slate-200 text-slate-800';
                      if (submitted) {
                        if (isCorrect) style = 'bg-emerald-600 text-white border-emerald-600';
                        else if (isSelected && !isCorrect) style = 'bg-rose-600 text-white border-rose-600';
                      } else if (isSelected) {
                        style = 'bg-janbhasha-700 text-white border-janbhasha-700';
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => !submitted && handleSelectAnswer(q.id, opt)}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition-all active:scale-95 ${style}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-2">
              <button
                onClick={() => {
                  window.print?.();
                  soundEffects.playBeep(600, 'sine', 0.1);
                }}
                className="p-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center"
                title="Print Printable Worksheet"
              >
                <Printer className="w-5 h-5" />
              </button>

              {!submitted ? (
                <button
                  onClick={handleSubmitWorksheet}
                  className="flex-1 py-3 rounded-2xl bg-janbhasha-700 hover:bg-janbhasha-800 text-white font-bold text-sm shadow-md transition-all active:scale-98"
                >
                  Submit & Grade
                </button>
              ) : (
                <div className="flex-1 p-2 bg-emerald-100 rounded-2xl text-center text-xs font-bold text-emerald-900 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-janbhasha-700" />
                  <span>Worksheet Completed!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
