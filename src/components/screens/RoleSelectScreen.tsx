import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Mic, 
  Radio, 
  Layers, 
  Volume2,
  Award,
  Languages,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JanBhashaLogo } from '../common/Illustrations';
import { UserRole } from '../../types';
import { soundEffects } from '../../services/speechService';

export const RoleSelectScreen: React.FC = () => {
  const { setCurrentScreen, setUserRole, userRole, t } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('teacher');

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setUserRole(role);
    soundEffects.playBeep(role === 'teacher' ? 580 : 680, 'sine', 0.1);
  };

  const handleProceed = () => {
    setUserRole(selectedRole);
    soundEffects.playSuccess();
    setCurrentScreen('home');
  };

  const teacherCardClasses = selectedRole === 'teacher'
    ? 'relative p-4.5 rounded-3xl cursor-pointer transition-all duration-300 transform active:scale-[0.98] border-2 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/40 border-janbhasha-700 shadow-lg shadow-emerald-700/15'
    : 'relative p-4.5 rounded-3xl cursor-pointer transition-all duration-300 transform active:scale-[0.98] border-2 bg-white border-slate-200/90 shadow-xs hover:border-slate-300 opacity-90';

  const studentCardClasses = selectedRole === 'student'
    ? 'relative p-4.5 rounded-3xl cursor-pointer transition-all duration-300 transform active:scale-[0.98] border-2 bg-gradient-to-br from-amber-50 via-white to-orange-100/40 border-amber-600 shadow-lg shadow-amber-600/15'
    : 'relative p-4.5 rounded-3xl cursor-pointer transition-all duration-300 transform active:scale-[0.98] border-2 bg-white border-slate-200/90 shadow-xs hover:border-slate-300 opacity-90';

  const teacherIconClasses = selectedRole === 'teacher'
    ? 'w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-transform bg-janbhasha-700 text-white scale-105'
    : 'w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-transform bg-emerald-100 text-emerald-800';

  const studentIconClasses = selectedRole === 'student'
    ? 'w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-transform bg-amber-600 text-white scale-105'
    : 'w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-transform bg-amber-100 text-amber-800';

  const buttonClasses = selectedRole === 'teacher'
    ? 'w-full py-4 px-6 rounded-2xl text-white font-black text-base shadow-lg flex items-center justify-center gap-2 transform active:scale-98 transition-all bg-janbhasha-700 hover:bg-janbhasha-800 shadow-janbhasha-700/25'
    : 'w-full py-4 px-6 rounded-2xl text-white font-black text-base shadow-lg flex items-center justify-center gap-2 transform active:scale-98 transition-all bg-amber-600 hover:bg-amber-700 shadow-amber-600/25';

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#f8faf2] text-slate-800 justify-between select-none relative overflow-hidden px-4 py-6">
      {/* Background Soft Ambient Accents */}
      <div className="absolute -top-24 -left-20 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* Header Branding */}
      <div className="flex flex-col items-center text-center z-10 pt-4">
        <div className="mb-2.5 transform hover:scale-105 transition-transform duration-300">
          <JanBhashaLogo size={68} />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-emerald-200/80 shadow-2xs text-[11px] font-bold text-emerald-800 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>NEP 2020 &bull; NIPUN Bharat Bridge</span>
        </div>

        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Who is using JanBhasha?
        </h1>
        <p className="text-xs text-slate-600 font-medium max-w-xs mt-1">
          आप शिक्षक हैं या विद्यार्थी? अपनी भूमिका चुनें
        </p>
      </div>

      {/* Role Selection Cards Container */}
      <div className="w-full max-w-sm mx-auto space-y-4 my-auto z-10 py-2">
        {/* 1. TEACHER CARD */}
        <div
          onClick={() => handleSelectRole('teacher')}
          className={teacherCardClasses}
        >
          {selectedRole === 'teacher' && (
            <div className="absolute top-4 right-4 bg-janbhasha-700 text-white rounded-full p-1 shadow-xs animate-in zoom-in-50">
              <CheckCircle2 className="w-4 h-4 stroke-[3]" />
            </div>
          )}

          <div className="flex items-start gap-3.5">
            <div className={teacherIconClasses}>
              👩‍🏫
            </div>

            <div className="flex-1 pr-6">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">
                  {t('roleTeacher')}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  शिक्षक
                </span>
              </div>

              <p className="text-xs text-slate-600 font-medium mt-1 leading-snug">
                Teach lessons in Hindi, broadcast translated tribal audio &amp; captions to the whole classroom.
              </p>

              {/* Teacher Features Pills */}
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                  <Mic className="w-3 h-3 text-janbhasha-700" /> Live Voice
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                  <Radio className="w-3 h-3 text-rose-500" /> Classroom Broadcast
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                  <BookOpen className="w-3 h-3 text-blue-600" /> FLN Curriculum
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. STUDENT CARD */}
        <div
          onClick={() => handleSelectRole('student')}
          className={studentCardClasses}
        >
          {selectedRole === 'student' && (
            <div className="absolute top-4 right-4 bg-amber-600 text-white rounded-full p-1 shadow-xs animate-in zoom-in-50">
              <CheckCircle2 className="w-4 h-4 stroke-[3]" />
            </div>
          )}

          <div className="flex items-start gap-3.5">
            <div className={studentIconClasses}>
              🎒
            </div>

            <div className="flex-1 pr-6">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">
                  {t('roleStudent')}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                  विद्यार्थी
                </span>
              </div>

              <p className="text-xs text-slate-600 font-medium mt-1 leading-snug">
                Listen to teacher's instructions in your mother tongue with Ol Chiki captions and interactive stories.
              </p>

              {/* Student Features Pills */}
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                  <Volume2 className="w-3 h-3 text-amber-600" /> Listen In Santali
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                  <Layers className="w-3 h-3 text-purple-600" /> 3D Flashcards
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                  <Award className="w-3 h-3 text-emerald-600" /> Earn Stars
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Continue Button */}
      <div className="w-full max-w-sm mx-auto z-10 pt-2 pb-3 flex flex-col items-center">
        <button
          onClick={handleProceed}
          className={buttonClasses}
        >
          <span>
            {selectedRole === 'teacher' ? 'Continue as Teacher (शिक्षक)' : 'Continue as Student (विद्यार्थी)'}
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-[11px] text-slate-500 mt-3 text-center flex items-center gap-1 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Offline &bull; No login required &bull; Switch anytime</span>
        </p>
      </div>
    </div>
  );
};
