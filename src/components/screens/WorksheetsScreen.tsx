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
  CheckCircle2,
  Plus,
  BookOpen,
  Send,
  HelpCircle,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WorksheetItem, WorksheetQuestion } from '../../types';
import { soundEffects } from '../../services/speechService';
import confetti from 'canvas-confetti';

export const WorksheetsScreen: React.FC = () => {
  const { 
    setCurrentScreen, 
    selectedLanguage, 
    worksheetsList, 
    addWorksheet, 
    currentUser,
    t 
  } = useApp();

  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeWorksheet, setActiveWorksheet] = useState<WorksheetItem | null>(null);
  const [answers, setAnswers] = useState<{ [qId: string]: string }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [downloadedList, setDownloadedList] = useState<{ [id: string]: boolean }>({});
  
  // Create New Assignment Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newClass, setNewClass] = useState('Class 2');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newLang, setNewLang] = useState(selectedLanguage.name);
  const [newQHindi, setNewQHindi] = useState('');
  const [newQTribal, setNewQTribal] = useState('');
  const [newOpt1, setNewOpt1] = useState('');
  const [newOpt2, setNewOpt2] = useState('');
  const [newOpt3, setNewOpt3] = useState('');
  const [newOpt4, setNewOpt4] = useState('');
  const [newCorrectOpt, setNewCorrectOpt] = useState('0');

  const filterTabs = ['All', 'Hindi', 'Ho', 'Mundari', 'Santhali', 'Gondi', 'Kurukh'];

  const filteredWorksheets = worksheetsList.filter(ws => {
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
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {
      // Confetti fallback
    }
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newQHindi.trim()) {
      soundEffects.playBeep(320, 'sawtooth', 0.2);
      return;
    }

    const optionsList = [newOpt1 || '४', newOpt2 || '५', newOpt3 || '६', newOpt4 || '७'];
    const correctVal = optionsList[parseInt(newCorrectOpt, 10)] || optionsList[0];

    const newSheet: Omit<WorksheetItem, 'id' | 'createdAt'> = {
      title: newTitle.trim(),
      classLevel: newClass,
      subject: newSubject,
      language: newLang,
      color: 'from-emerald-600 to-teal-700',
      level: 'FLN Benchmark',
      questions: [
        {
          id: 'q-custom-1',
          qHindi: newQHindi.trim(),
          qTribal: newQTribal.trim() || `[${newLang}] ${newQHindi.trim()} (मातृभाषा प्रश्न)`,
          prompt: 'Choose correct answer / सही विकल्प चुनें:',
          type: 'multiple-choice',
          options: optionsList,
          answer: correctVal
        }
      ]
    };

    addWorksheet(newSheet);
    setIsAddModalOpen(false);
    
    // Reset form
    setNewTitle('');
    setNewQHindi('');
    setNewQTribal('');
    setNewOpt1('');
    setNewOpt2('');
    setNewOpt3('');
    setNewOpt4('');

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
    } catch {
      // Confetti
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

        <h2 className="text-base font-extrabold text-slate-900">
          {t('worksheetsTitle')}
        </h2>

        {/* Add Assignment Button for Teacher / Admin */}
        {currentUser.role !== 'student' ? (
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-janbhasha-700 hover:bg-janbhasha-800 text-white text-xs font-bold shadow-2xs transition-transform active:scale-95"
            title="Create New Assignment"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add</span>
          </button>
        ) : (
          <div className="w-9" />
        )}
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
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-janbhasha-700 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Worksheets & Assignments Card List */}
      <div className="px-4 pt-2 pb-6 space-y-3 flex-1">
        {filteredWorksheets.map((ws) => {
          const isDownloaded = downloadedList[ws.id];

          return (
            <div
              key={ws.id}
              onClick={() => handleOpenWorksheet(ws)}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-janbhasha-300 transition-all cursor-pointer group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                {/* Subject Gradient Icon */}
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${ws.color} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}
                >
                  <FileText className="w-5 h-5" />
                </div>

                {/* Details */}
                <div className="text-left">
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-janbhasha-800 transition-colors">
                    {ws.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    {ws.classLevel} • {ws.subject}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[9px] font-bold border border-emerald-200">
                      {ws.language}
                    </span>
                    {ws.createdBy && (
                      <span className="text-[9px] text-slate-400 font-medium">
                        By {ws.createdBy}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Download / Open Action */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={(e) => handleDownload(e, ws.id)}
                  className={`p-2 rounded-xl transition-all ${
                    isDownloaded
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title={isDownloaded ? 'Downloaded' : 'Download for offline use'}
                >
                  {isDownloaded ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Download className="w-4 h-4" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE NEW ASSIGNMENT MODAL (Teacher / Admin) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-3.5 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-janbhasha-700 flex items-center justify-center">
                  <Plus className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Create New Assignment</h3>
                  <p className="text-[10px] text-slate-500">Add bilingual questions for students</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Chapter 2: Addition in Ho"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-janbhasha-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1">
                    Class Level
                  </label>
                  <select
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                  >
                    <option>Class 1</option>
                    <option>Class 2</option>
                    <option>Class 3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1">
                    Tribal Language
                  </label>
                  <select
                    value={newLang}
                    onChange={(e) => setNewLang(e.target.value)}
                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                  >
                    <option>Ho (हो)</option>
                    <option>Mundari (मुंडारी)</option>
                    <option>Santhali (संताली)</option>
                    <option>Gondi (गोंडी)</option>
                    <option>Kurukh (कुड़ुख़)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Question in Hindi (शिक्षक प्रश्न)
                </label>
                <input
                  type="text"
                  required
                  value={newQHindi}
                  onChange={(e) => setNewQHindi(e.target.value)}
                  placeholder="उदा: २ सेब + ३ सेब कितने होते हैं?"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-janbhasha-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Question in Tribal Language (मातृभाषा प्रश्न)
                </label>
                <input
                  type="text"
                  value={newQTribal}
                  onChange={(e) => setNewQTribal(e.target.value)}
                  placeholder="उदा: बारिया सेब आर आपेया सेब मिसा-ते तिनाः हुयू-आ?"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-janbhasha-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">
                  Answer Options (4 Choices)
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="text"
                    value={newOpt1}
                    onChange={(e) => setNewOpt1(e.target.value)}
                    placeholder="Option 1 (उदा: ४)"
                    className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={newOpt2}
                    onChange={(e) => setNewOpt2(e.target.value)}
                    placeholder="Option 2 (उदा: ५)"
                    className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={newOpt3}
                    onChange={(e) => setNewOpt3(e.target.value)}
                    placeholder="Option 3 (उदा: ६)"
                    className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={newOpt4}
                    onChange={(e) => setNewOpt4(e.target.value)}
                    placeholder="Option 4 (उदा: ७)"
                    className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">
                  Select Correct Answer
                </label>
                <select
                  value={newCorrectOpt}
                  onChange={(e) => setNewCorrectOpt(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                >
                  <option value="0">Option 1 ({newOpt1 || 'Choice 1'})</option>
                  <option value="1">Option 2 ({newOpt2 || 'Choice 2'})</option>
                  <option value="2">Option 3 ({newOpt3 || 'Choice 3'})</option>
                  <option value="3">Option 4 ({newOpt4 || 'Choice 4'})</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-janbhasha-700 hover:bg-janbhasha-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Assignment to Students</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* WORKSHEET SOLVER / VIEWER MODAL */}
      {activeWorksheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl flex flex-col max-h-[88vh] overflow-y-auto no-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-janbhasha-700">
                  {activeWorksheet.subject} • {activeWorksheet.classLevel}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{activeWorksheet.title}</h3>
              </div>
              <button
                onClick={() => setActiveWorksheet(null)}
                className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Questions List */}
            <div className="py-4 space-y-4 flex-1 overflow-y-auto">
              {activeWorksheet.questions.map((q, idx) => {
                const selectedOpt = answers[q.id];
                const isCorrect = submitted && selectedOpt === String(q.answer);
                const isWrong = submitted && selectedOpt && selectedOpt !== String(q.answer);

                return (
                  <div key={q.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-janbhasha-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{q.qHindi}</p>
                        <p className="text-[11px] text-janbhasha-800 font-semibold mt-0.5">{q.qTribal}</p>
                      </div>
                    </div>

                    {/* Multiple Choice Options */}
                    {q.options && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {q.options.map((opt) => {
                          const isOptSelected = selectedOpt === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              disabled={submitted}
                              onClick={() => handleSelectAnswer(q.id, opt)}
                              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                                isOptSelected
                                  ? 'bg-janbhasha-700 text-white border-janbhasha-700 shadow-2xs'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                              } ${
                                submitted && opt === String(q.answer)
                                  ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-300'
                                  : ''
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Result feedback */}
                    {submitted && (
                      <div className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                        isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Correct! (सही उत्तर)</span>
                          </>
                        ) : (
                          <>
                            <HelpCircle className="w-4 h-4 text-amber-600" />
                            <span>Correct Answer: {q.answer}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              {!submitted ? (
                <button
                  onClick={handleSubmitWorksheet}
                  className="w-full py-3 rounded-2xl bg-janbhasha-700 hover:bg-janbhasha-800 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
                >
                  Submit &amp; Grade Assignment
                </button>
              ) : (
                <button
                  onClick={() => setActiveWorksheet(null)}
                  className="w-full py-2.5 rounded-2xl bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200"
                >
                  Great Work! Done ✓
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
