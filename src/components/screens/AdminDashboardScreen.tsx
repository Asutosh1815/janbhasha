import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  DownloadCloud, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  Smile, 
  ArrowRight,
  BarChart3,
  Layers,
  Sparkles,
  School
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../services/speechService';

export const AdminDashboardScreen: React.FC = () => {
  const { 
    currentUser, 
    loginAs, 
    setCurrentScreen, 
    t, 
    selectedLanguage 
  } = useApp();

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncToast, setSyncToast] = useState(false);

  const handleSyncPacks = () => {
    setIsSyncing(true);
    soundEffects.playBeep(520, 'sine', 0.15);

    setTimeout(() => {
      setIsSyncing(false);
      setSyncToast(true);
      soundEffects.playSuccess();
      setTimeout(() => setSyncToast(false), 4000);
    }, 1500);
  };

  const schools = [
    { name: 'Govt. Primary School, Chaibasa', block: 'Kolhan', lang: 'Ho', teachers: 8, flnScore: '84%', sync: '100%' },
    { name: 'GPS Dumka Central', block: 'Santhal Parganas', lang: 'Santhali', teachers: 12, flnScore: '81%', sync: '98%' },
    { name: 'Khunti Tribal Model School', block: 'Khunti', lang: 'Mundari', teachers: 6, flnScore: '76%', sync: '92%' },
    { name: 'GPS Gumla Forest Block', block: 'Gumla', lang: 'Kurukh', teachers: 5, flnScore: '74%', sync: '88%' },
    { name: 'Konta Tribal Ashram Shala', block: 'Bastar', lang: 'Gondi', teachers: 7, flnScore: '72%', sync: '85%' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#fbfdf8] text-slate-800 select-none overflow-y-auto no-scrollbar pb-8">
      {/* Top Header */}
      <div className="pt-3 px-4 pb-3 flex items-center justify-between sticky top-0 bg-[#fbfdf8]/95 backdrop-blur-xs z-10 border-b border-slate-200/60">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-700 text-white flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-900 leading-tight">
              {t('adminTitle')}
            </h1>
            <p className="text-[10px] text-slate-500 font-semibold">
              {currentUser.school}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
            BRC Portal
          </span>
        </div>
      </div>

      <div className="px-4 pt-3 space-y-4">
        {/* Admin Welcome & Action Header */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                  {t('loggedAs')}: {currentUser.name}
                </span>
                <h2 className="text-lg font-black mt-0.5">
                  {t('districtReport')}
                </h2>
              </div>
              <span className="text-3xl">{currentUser.avatar}</span>
            </div>

            <p className="text-xs text-indigo-100/90 mt-2 font-medium leading-relaxed">
              Monitoring 48 tribal cluster schools across Kolhan, Khunti &amp; Santhal Parganas for NEP 2020 Mother Tongue FLN implementation.
            </p>

            {/* Push Language Updates Button */}
            <div className="mt-3.5 pt-3 border-t border-indigo-700/60 flex items-center justify-between">
              <button
                onClick={handleSyncPacks}
                disabled={isSyncing}
                className="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 disabled:opacity-75"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? t('loading') : t('syncLanguagePacks')}</span>
              </button>

              <span className="text-[10px] text-indigo-200 font-medium">
                Last synced: Today 09:30 AM
              </span>
            </div>
          </div>
        </div>

        {/* Sync Toast Alert */}
        {syncToast && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t('packsSyncSuccess')}</span>
          </div>
        )}

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold text-slate-600">{t('totalSchools')}</span>
              <School className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">48</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-0.5">● 100% Operational</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold text-slate-600">{t('activeTeachers')}</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">234</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-0.5">● 188 Active Today</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold text-slate-600">{t('studentsAssessed')}</span>
              <GraduationCap className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">4,820</div>
            <div className="text-[10px] text-indigo-600 font-bold mt-0.5">+340 this week</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold text-slate-600">{t('flnIndex')}</span>
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">78.4%</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-0.5">▲ +12% vs Q1</div>
          </div>
        </div>

        {/* Language Breakdown Distribution */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <span>Tribal Language Enrolment Share</span>
            <BarChart3 className="w-4 h-4 text-slate-400" />
          </h3>

          <div className="space-y-2">
            {[
              { name: 'Ho (हो)', pct: 42, color: 'bg-emerald-600', students: '2,024' },
              { name: 'Santhali (संताली)', pct: 28, color: 'bg-amber-500', students: '1,350' },
              { name: 'Mundari (मुंडारी)', pct: 18, color: 'bg-indigo-600', students: '867' },
              { name: 'Kurukh (कुड़ुख़)', pct: 8, color: 'bg-purple-600', students: '385' },
              { name: 'Gondi (गोंडी)', pct: 4, color: 'bg-rose-500', students: '194' },
            ].map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-700">
                  <span>{item.name}</span>
                  <span>{item.students} ({item.pct}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* School Directory Table */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            {t('schoolDirectory')}
          </h3>

          <div className="divide-y divide-slate-100">
            {schools.map((s, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between text-left">
                <div className="max-w-[62%]">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{s.name}</h4>
                  <p className="text-[10px] text-slate-500">{s.block} • {s.lang} • {s.teachers} Teachers</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-janbhasha-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {s.flnScore} FLN
                  </span>
                  <div className="text-[9px] text-slate-400 mt-0.5">Sync: {s.sync}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Switch View Buttons */}
        <div className="p-4 rounded-3xl bg-slate-100/90 border border-slate-200 space-y-2">
          <div className="text-xs font-bold text-slate-700">
            {t('switchRole')} / Preview Modules:
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => loginAs('teacher')}
              className="py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-janbhasha-800 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs hover:bg-emerald-50"
            >
              <GraduationCap className="w-4 h-4 text-janbhasha-700" />
              <span>{t('roleTeacher')} Portal</span>
            </button>

            <button
              onClick={() => loginAs('student')}
              className="py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-amber-800 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs hover:bg-amber-50"
            >
              <Smile className="w-4 h-4 text-amber-600" />
              <span>{t('roleStudent')} Portal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
