import React from 'react';

export const JanBhashaLogo: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 72 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer Soundwave Arcs */}
        <path d="M22 35 C15 45 15 55 22 65" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
        <path d="M12 28 C3 42 3 58 12 72" stroke="#4ade80" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="1 2" />
        <path d="M78 35 C85 45 85 55 78 65" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
        <path d="M88 28 C97 42 97 58 88 72" stroke="#4ade80" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="1 2" />
        
        {/* Central Teacher/Child Head & Halo */}
        <circle cx="50" cy="20" r="6" fill="#15803d" />
        <path d="M42 14 C46 10 54 10 58 14" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" />

        {/* Shield / Emblem Body */}
        <path d="M30 32 C30 32 50 24 70 32 C70 58 50 72 50 72 C50 72 30 58 30 32 Z" fill="#15803d" />

        {/* Open Book in White */}
        <path d="M36 50 C42 46 48 48 50 52 C52 48 58 46 64 50 L64 62 C58 58 52 60 50 64 C48 60 42 58 36 62 Z" fill="#ffffff" />
        
        {/* Small Learners heads inside book */}
        <circle cx="43" cy="42" r="3" fill="#ffffff" />
        <path d="M39 48 C39 46 47 46 47 48" fill="#ffffff" />
        <circle cx="57" cy="42" r="3" fill="#ffffff" />
        <path d="M53 48 C53 46 61 46 61 48" fill="#ffffff" />
      </svg>
    </div>
  );
};

export const TribalVillageIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <svg viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Soft Sun / Warm sky */}
        <circle cx="200" cy="70" r="50" fill="#fef08a" opacity="0.4" />
        
        {/* Distant Hills */}
        <path d="M0 120 Q80 80 160 115 T320 110 T400 118 L400 180 L0 180 Z" fill="#dcfce7" opacity="0.7" />
        <path d="M20 135 Q120 95 240 130 T400 125 L400 180 L0 180 Z" fill="#bbf7d0" opacity="0.6" />

        {/* Lush Banyan & Sal Trees */}
        <g opacity="0.9">
          {/* Left Tree */}
          <rect x="52" y="90" width="8" height="60" fill="#78350f" rx="3" />
          <ellipse cx="56" cy="75" rx="36" ry="30" fill="#15803d" />
          <ellipse cx="40" cy="68" rx="24" ry="20" fill="#16a34a" />
          <ellipse cx="72" cy="72" rx="22" ry="18" fill="#22c55e" />

          {/* Right Trees */}
          <rect x="335" y="85" width="7" height="65" fill="#78350f" rx="3" />
          <ellipse cx="338" cy="70" rx="34" ry="28" fill="#15803d" />
          <ellipse cx="355" cy="65" rx="20" ry="18" fill="#16a34a" />
          
          <rect x="305" y="95" width="6" height="55" fill="#78350f" rx="2" />
          <ellipse cx="308" cy="80" rx="25" ry="22" fill="#166534" />
        </g>

        {/* Tribal Thatched Mud Huts */}
        {/* Left Hut */}
        <path d="M10 135 L42 98 L74 135 Z" fill="#b45309" stroke="#78350f" strokeWidth="2" />
        <path d="M15 135 L15 168 L69 168 L69 135 Z" fill="#fcd34d" stroke="#d97706" strokeWidth="1.5" />
        <rect x="34" y="145" width="16" height="23" fill="#78350f" rx="2" />
        {/* Tribal wall art patterns */}
        <path d="M20 142 L28 142 M20 148 L28 148 M56 142 L64 142" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

        {/* Middle-Right Hut */}
        <path d="M125 138 L152 105 L179 138 Z" fill="#b45309" stroke="#78350f" strokeWidth="2" />
        <path d="M130 138 L130 168 L174 168 L174 138 Z" fill="#fcd34d" stroke="#d97706" strokeWidth="1.5" />
        <rect x="146" y="147" width="12" height="21" fill="#78350f" rx="1.5" />

        {/* Third Hut */}
        <path d="M225 140 L248 112 L271 140 Z" fill="#b45309" stroke="#78350f" strokeWidth="2" />
        <path d="M230 140 L230 168 L266 168 L266 140 Z" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
        <rect x="244" y="149" width="10" height="19" fill="#78350f" rx="1" />

        {/* Children walking happily with school bags */}
        <g transform="translate(195, 140)">
          {/* Child 1 */}
          <circle cx="0" cy="0" r="4.5" fill="#78350f" />
          <path d="M-3 5 L3 5 L4 18 L-4 18 Z" fill="#0284c7" />
          <rect x="-2" y="7" width="3" height="6" fill="#f97316" rx="1" /> {/* School bag */}
          <line x1="-2" y1="18" x2="-2" y2="28" stroke="#78350f" strokeWidth="2" />
          <line x1="2" y1="18" x2="3" y2="28" stroke="#78350f" strokeWidth="2" />
          
          {/* Child 2 */}
          <circle cx="14" cy="2" r="4" fill="#78350f" />
          <path d="M11 7 L17 7 L18 19 L10 19 Z" fill="#e11d48" />
          <rect x="15" y="8" width="3" height="5" fill="#eab308" rx="1" />
          <line x1="12" y1="19" x2="11" y2="27" stroke="#78350f" strokeWidth="2" />
          <line x1="16" y1="19" x2="17" y2="27" stroke="#78350f" strokeWidth="2" />
        </g>

        {/* Ground grass & stones */}
        <path d="M0 165 C80 162 160 166 240 163 C320 165 400 162 400 180 L0 180 Z" fill="#15803d" opacity="0.85" />
        <circle cx="95" cy="172" r="3" fill="#cbd5e1" />
        <circle cx="102" cy="173" r="2" fill="#94a3b8" />
        <circle cx="280" cy="172" r="2.5" fill="#cbd5e1" />
      </svg>
    </div>
  );
};

export const TeacherBannerIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Background blackboard */}
        <rect x="10" y="15" width="80" height="55" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <path d="M20 30 L45 30 M20 40 L65 40 M20 50 L35 50" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <circle cx="60" cy="30" r="4" stroke="#facc15" strokeWidth="1.5" />
        <text x="50" y="55" fill="#4ade80" fontSize="8" fontWeight="bold">क ख ग</text>

        {/* Teacher standing on right holding open book */}
        <circle cx="118" cy="32" r="11" fill="#ea580c" />
        {/* Teacher hair */}
        <path d="M107 30 C107 20 129 20 129 30 C125 24 111 24 107 30 Z" fill="#1e293b" />
        {/* Teacher Kurta */}
        <path d="M106 43 C106 43 118 40 130 43 L134 85 L102 85 Z" fill="#15803d" />
        {/* Open green book in hand */}
        <path d="M96 55 L106 50 L116 55 L116 68 L106 63 L96 68 Z" fill="#ffffff" stroke="#166534" strokeWidth="1" />
        <path d="M106 50 L106 63" stroke="#166534" strokeWidth="1" />
        
        {/* Teacher gesturing hand */}
        <path d="M98 44 Q90 40 85 45" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />

        {/* Student heads seated in front desk */}
        <rect x="5" y="85" width="95" height="12" rx="2" fill="#78350f" />
        {/* Student 1 */}
        <circle cx="25" cy="74" r="8" fill="#c2410c" />
        <path d="M18 72 C18 64 32 64 32 72 Z" fill="#0f172a" />
        <path d="M18 82 L32 82 L34 98 L16 98 Z" fill="#0284c7" />

        {/* Student 2 */}
        <circle cx="60" cy="74" r="8" fill="#d97706" />
        <path d="M53 72 C53 64 67 64 67 72 Z" fill="#0f172a" />
        <path d="M53 82 L67 82 L69 98 L51 98 Z" fill="#e11d48" />
        
        {/* Student 3 (turning to teacher) */}
        <circle cx="90" cy="74" r="7.5" fill="#ea580c" />
        <path d="M83 72 C83 65 97 65 97 72 Z" fill="#0f172a" />
        <path d="M84 82 L96 82 L98 98 L82 98 Z" fill="#16a34a" />
      </svg>
    </div>
  );
};

export const LessonIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Wooden study table */}
        <rect x="10" y="65" width="120" height="10" rx="3" fill="#78350f" />
        <rect x="18" y="75" width="6" height="20" fill="#581c87" rx="1" opacity="0.4" />
        <rect x="116" y="75" width="6" height="20" fill="#581c87" rx="1" opacity="0.4" />

        {/* Counting blocks / Abacus on desk */}
        <rect x="52" y="52" width="36" height="14" rx="2" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
        <circle cx="60" cy="59" r="3.5" fill="#ef4444" />
        <circle cx="70" cy="59" r="3.5" fill="#3b82f6" />
        <circle cx="80" cy="59" r="3.5" fill="#22c55e" />

        {/* Boy student on left */}
        <circle cx="38" cy="38" r="10" fill="#c2410c" />
        <path d="M29 36 C29 26 47 26 47 36 Z" fill="#0f172a" />
        <path d="M28 48 C28 48 38 46 48 48 L46 66 L30 66 Z" fill="#eab308" />
        {/* Arm counting */}
        <path d="M46 54 L55 58" stroke="#c2410c" strokeWidth="3" strokeLinecap="round" />

        {/* Girl student on right */}
        <circle cx="102" cy="38" r="10" fill="#d97706" />
        {/* Girl pigtails */}
        <path d="M93 36 C93 26 111 26 111 36 Z" fill="#0f172a" />
        <circle cx="91" cy="36" r="3" fill="#e11d48" />
        <circle cx="113" cy="36" r="3" fill="#e11d48" />
        <path d="M92 48 C92 48 102 46 112 48 L110 66 L94 66 Z" fill="#e11d48" />
        {/* Arm pointing */}
        <path d="M94 54 L85 58" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
};
