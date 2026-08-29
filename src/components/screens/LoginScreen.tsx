import React, { useState } from 'react';
import { 
  ShieldCheck, 
  GraduationCap, 
  Smile, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Lock, 
  User, 
  Building2, 
  AlertCircle,
  Languages,
  KeyRound,
  ChevronRight,
  School,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { JanBhashaLogo } from '../common/Illustrations';

export const LoginScreen: React.FC = () => {
  const { validateAndLogin, t, appLanguage, setCurrentScreen } = useApp();
  
  // Step 1: Select Role (null initially so user MUST choose first!)
  // Step 2: Enter Credentials for the chosen role
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  
  // Credentials input states
  const [userId, setUserId] = useState('');
  const [userPin, setUserPin] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Student specific selection
  const [selectedAvatar, setSelectedAvatar] = useState('👦');
  const [studentName, setStudentName] = useState('Birsa Munda');
  const [studentGrade, setStudentGrade] = useState('Class 2 (कक्षा २)');

  const studentAvatars = [
    { avatar: '👦', name: 'Birsa Munda (बिरसा)' },
    { avatar: '👧', name: 'Sanjana Soren (संजना)' },
    { avatar: '🧒', name: 'Mangal Ho (मंगल)' },
    { avatar: '👧', name: 'Sombari Kui (सोमबारी)' },
  ];

  // Helper demo credentials definitions
  const credentialsHints: Record<UserRole, { id: string; pin: string; title: string; subtitle: string; icon: any; color: string; bg: string }> = {
    admin: {
      id: 'ADM-BRC-2026',
      pin: '4029',
      title: 'Administrator / BRC Officer',
      subtitle: 'School management, district FLN metrics & language distribution',
      icon: ShieldCheck,
      color: 'text-indigo-700',
      bg: 'bg-indigo-50 border-indigo-200'
    },
    teacher: {
      id: 'TCH-JH-4029',
      pin: '1234',
      title: 'Teacher / Classroom Educator',
      subtitle: 'Live voice translator, bilingual FLN lessons & assignments',
      icon: GraduationCap,
      color: 'text-janbhasha-700',
      bg: 'bg-emerald-50 border-emerald-200'
    },
    student: {
      id: 'STD-CL2-08',
      pin: '2026',
      title: 'Student / Learner (Gidra)',
      subtitle: 'Audio math activities, stories & star rewards in mother tongue',
      icon: Smile,
      color: 'text-amber-700',
      bg: 'bg-amber-50 border-amber-200'
    }
  };

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
    setUserId('');
    setUserPin('');
  };

  const handleFillCredentials = () => {
    if (!selectedRole) return;
    const hint = credentialsHints[selectedRole];
    setUserId(hint.id);
    setUserPin(hint.pin);
    setErrorMessage(null);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    setErrorMessage(null);

    let customData = {};
    if (selectedRole === 'student') {
      customData = {
        name: studentName,
        avatar: selectedAvatar,
        classLevel: studentGrade
      };
    }

    const result = validateAndLogin(selectedRole, userId, userPin, customData);
    if (!result.success && result.error) {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-[#fbfdf8] text-slate-800 justify-between select-none p-5 pb-8 overflow-y-auto no-scrollbar">
      {/* Top Header & Branding */}
      <div className="flex flex-col items-center text-center pt-1">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-janbhasha-700 to-emerald-500 flex items-center justify-center shadow-lg shadow-janbhasha-700/20 text-white mb-2.5">
          <JanBhashaLogo className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          {t('appName')}
        </h1>
        <p className="text-xs text-slate-500 font-medium max-w-xs mt-1">
          {t('appMission')}
        </p>

        {/* Quick Language Switch Pill */}
        <button
          onClick={() => setCurrentScreen('language-select')}
          className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold hover:bg-emerald-100/70 transition-colors shadow-2xs"
        >
          <Languages className="w-3.5 h-3.5 text-janbhasha-700" />
          <span>{t('changeLanguage')}: <strong className="uppercase">{appLanguage}</strong></span>
        </button>
      </div>

      {/* STEP 1: PROMPT TO CHOOSE ROLE FIRST */}
      {!selectedRole ? (
        <div className="my-5 space-y-3.5">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              Step 1 of 2
            </span>
            <h2 className="text-base font-extrabold text-slate-900 mt-1">
              Select Your Role to Login
            </h2>
            <p className="text-xs text-slate-500">
              Are you an Admin, Teacher, or Student?
            </p>
          </div>

          {/* 3 Role Choice Cards */}
          <div className="space-y-3">
            {/* 1. Admin Role Card */}
            <div
              onClick={() => handleSelectRole('admin')}
              className="p-4 rounded-3xl bg-white border-2 border-slate-200/90 hover:border-indigo-500 hover:bg-indigo-50/40 shadow-2xs transition-all cursor-pointer flex items-center justify-between group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-indigo-900">
                      {t('roleAdmin')} (प्रशासक)
                    </h3>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-indigo-100 text-indigo-800">
                      BRC
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-tight">
                    {credentialsHints.admin.subtitle}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* 2. Teacher Role Card */}
            <div
              onClick={() => handleSelectRole('teacher')}
              className="p-4 rounded-3xl bg-white border-2 border-slate-200/90 hover:border-janbhasha-700 hover:bg-emerald-50/40 shadow-2xs transition-all cursor-pointer flex items-center justify-between group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-janbhasha-700 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-janbhasha-900">
                      {t('roleTeacher')} (शिक्षक)
                    </h3>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-emerald-100 text-emerald-800">
                      Primary
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-tight">
                    {credentialsHints.teacher.subtitle}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-janbhasha-700 group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* 3. Student Role Card */}
            <div
              onClick={() => handleSelectRole('student')}
              className="p-4 rounded-3xl bg-white border-2 border-slate-200/90 hover:border-amber-500 hover:bg-amber-50/40 shadow-2xs transition-all cursor-pointer flex items-center justify-between group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform text-2xl">
                  👦
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-amber-950">
                      {t('roleStudent')} (शिक्षार्थी / गिदरा)
                    </h3>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-amber-100 text-amber-900">
                      Learner
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-tight">
                    {credentialsHints.student.subtitle}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      ) : (
        /* STEP 2: CREDENTIALS ENTRY FORM FOR CHOSEN ROLE */
        <div className="my-3 space-y-3">
          {/* Back to Choose Role Header */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedRole(null)}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Change Role</span>
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              Step 2 of 2
            </span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
            {/* Role Header Banner */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${credentialsHints[selectedRole].bg}`}>
                  {selectedRole === 'admin' ? (
                    <ShieldCheck className="w-5 h-5 text-indigo-700" />
                  ) : selectedRole === 'teacher' ? (
                    <GraduationCap className="w-5 h-5 text-janbhasha-700" />
                  ) : (
                    <Smile className="w-5 h-5 text-amber-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 capitalize">
                    {selectedRole === 'admin' ? t('roleAdmin') : selectedRole === 'teacher' ? t('roleTeacher') : t('roleStudent')} Login
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    {credentialsHints[selectedRole].subtitle}
                  </p>
                </div>
              </div>

              {/* Quick Auto-Fill Credentials Button */}
              <button
                type="button"
                onClick={handleFillCredentials}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center gap-1 transition-colors"
                title="Auto-fill sample credentials for demo"
              >
                <KeyRound className="w-3 h-3 text-janbhasha-700" />
                <span>Auto-Fill</span>
              </button>
            </div>

            {/* Error Notification Alert */}
            {errorMessage && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-3">
              {/* Student Avatar Picker (if student) */}
              {selectedRole === 'student' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {t('selectAvatar')}
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {studentAvatars.map((item) => (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => {
                          setSelectedAvatar(item.avatar);
                          setStudentName(item.name.split(' ')[0]);
                          setUserId('STD-CL2-08');
                        }}
                        className={`flex flex-col items-center p-2 rounded-2xl border-2 transition-all ${
                          selectedAvatar === item.avatar
                            ? 'border-amber-500 bg-amber-50 shadow-2xs'
                            : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-2xl mb-0.5">{item.avatar}</span>
                        <span className="text-[9px] font-bold text-slate-700 truncate w-full text-center">
                          {item.name.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* User ID / Email Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {selectedRole === 'admin' ? 'Admin ID / Email' : selectedRole === 'teacher' ? 'Teacher ID / Mobile' : 'Student ID / Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder={credentialsHints[selectedRole].id}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-janbhasha-700 focus:bg-white"
                  />
                </div>
              </div>

              {/* PIN / Password Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {selectedRole === 'student' ? '4-Digit Student PIN' : 'Security PIN / Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={userPin}
                    onChange={(e) => setUserPin(e.target.value)}
                    placeholder="••••"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-janbhasha-700 focus:bg-white"
                  />
                </div>
              </div>

              {/* Sample Valid Credentials Hint Box */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                <span>Sample: <strong>ID: {credentialsHints[selectedRole].id} • PIN: {credentialsHints[selectedRole].pin}</strong></span>
                <button
                  type="button"
                  onClick={handleFillCredentials}
                  className="text-janbhasha-700 hover:underline font-bold"
                >
                  Fill
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.99] ${
                  selectedRole === 'admin'
                    ? 'bg-indigo-700 hover:bg-indigo-800'
                    : selectedRole === 'teacher'
                    ? 'bg-janbhasha-700 hover:bg-janbhasha-800'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                }`}
              >
                <span>Verify &amp; Enter {selectedRole.toUpperCase()} Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer Note */}
      <div className="text-center pt-2 text-[10px] text-slate-400">
        JANBHASHA v2.4 • Ministry of Tribal Affairs &amp; NEP 2020 Mission
      </div>
    </div>
  );
};
