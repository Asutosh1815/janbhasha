import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  RotateCw, 
  Sparkles, 
  Heart,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_FLASHCARDS } from '../../data/mockData';
import { soundEffects } from '../../services/speechService';

export const FlashcardsScreen: React.FC = () => {
  const { setCurrentScreen, selectedLanguage, playBilingualAudio } = useApp();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFavorite, setIsFavorite] = useState<{ [id: string]: boolean }>({});

  const categories = [
    { id: 'all', label: 'All Cards' },
    { id: 'fruits', label: '🍎 Fruits' },
    { id: 'nature', label: '🌳 Nature' },
    { id: 'animals', label: '🐦 Animals' },
    { id: 'classroom', label: '📚 School' },
  ];

  const filteredCards = MOCK_FLASHCARDS.filter(card => {
    if (selectedCategory === 'all') return true;
    return card.category === selectedCategory;
  });

  const currentCard = filteredCards[currentIndex % filteredCards.length] || MOCK_FLASHCARDS[0];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    soundEffects.playCardFlip();
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    soundEffects.playBeep(580, 'sine', 0.08);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    soundEffects.playBeep(480, 'sine', 0.08);
  };

  const handlePlayAudio = () => {
    if (isFlipped) {
      playBilingualAudio(`fc-tribal-${currentCard.id}`, currentCard.tribalWord, 'tribal');
    } else {
      playBilingualAudio(`fc-hindi-${currentCard.id}`, currentCard.hindiWord, 'hindi');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#fbfdf8] text-slate-800 select-none overflow-y-auto no-scrollbar justify-between">
      {/* Top App Bar */}
      <div>
        <div className="pt-3 px-4 pb-2 flex items-center justify-between sticky top-0 bg-[#fbfdf8]/95 backdrop-blur-xs z-20">
          <button
            onClick={() => setCurrentScreen('home')}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-bold text-slate-900">
            Flashcards
          </h2>

          <div className="w-9" />
        </div>

        {/* Category Filter Pills */}
        <div className="px-4 py-1">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                  soundEffects.playBeep(520, 'sine', 0.05);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-janbhasha-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Flip Flashcard Section */}
      <div className="px-6 py-2 flex flex-col items-center justify-center my-auto">
        <div 
          onClick={handleFlip}
          className="relative w-full max-w-[280px] h-[340px] perspective-1000 cursor-pointer group"
        >
          <div 
            className={`w-full h-full duration-500 transform-style-3d relative rounded-3xl transition-transform ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT OF CARD (Hindi + Image) */}
            <div className="absolute inset-0 w-full h-full rounded-3xl bg-white border-2 border-slate-200/90 shadow-elevated p-6 flex flex-col items-center justify-between backface-hidden">
              <div className="w-full flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Hindi &bull; Tap to flip
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFavorite(prev => ({ ...prev, [currentCard.id]: !prev[currentCard.id] }));
                    soundEffects.playBeep(720, 'sine', 0.1);
                  }}
                  className="p-1 text-slate-300 hover:text-rose-500 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isFavorite[currentCard.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Realistic Visual Emoji / Illustration */}
              <div className="my-auto flex flex-col items-center">
                {currentCard.imageUrl === 'apple' ? (
                  <div className="relative w-32 h-32 flex items-center justify-center filter drop-shadow-md">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Leaf */}
                      <path d="M50 25 C55 10 70 12 70 25 C70 35 55 35 50 25 Z" fill="#22c55e" />
                      {/* Stem */}
                      <path d="M50 25 Q46 15 42 12" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
                      {/* Apple Body */}
                      <path d="M50 30 C30 25 15 45 15 65 C15 88 35 95 50 92 C65 95 85 88 85 65 C85 45 70 25 50 30 Z" fill="url(#appleGrad)" />
                      {/* Highlight shine */}
                      <ellipse cx="32" cy="48" rx="8" ry="14" fill="#ffffff" opacity="0.3" transform="rotate(-20 32 48)" />
                      <defs>
                        <linearGradient id="appleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="60%" stopColor="#dc2626" />
                          <stop offset="100%" stopColor="#991b1b" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                ) : (
                  <div className="text-7xl filter drop-shadow-md py-4">
                    {currentCard.emoji}
                  </div>
                )}

                {/* Main Hindi Name */}
                <h3 className="text-3xl font-extrabold text-slate-900 font-hindi mt-2">
                  {currentCard.hindiWord}
                </h3>
                <p className="text-base text-slate-500 font-semibold mt-0.5">
                  {currentCard.romanHindi}
                </p>
              </div>

              {/* Card Footer Hint */}
              <div className="flex items-center gap-1.5 text-xs text-janbhasha-700 font-semibold">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Flip for {selectedLanguage.name}</span>
              </div>
            </div>

            {/* BACK OF CARD (Tribal Language Translation) */}
            <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-emerald-100/50 border-2 border-emerald-300 shadow-elevated p-6 flex flex-col items-center justify-between rotate-y-180 backface-hidden text-center">
              <div className="w-full flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  {selectedLanguage.name} ({selectedLanguage.nativeName})
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-janbhasha-700 text-white font-bold">
                  Mother Tongue
                </span>
              </div>

              <div className="my-auto space-y-2">
                <span className="text-4xl block mb-2">{currentCard.emoji}</span>
                <h3 className="text-2xl font-extrabold text-janbhasha-950 font-hindi">
                  {currentCard.tribalWord}
                </h3>
                <p className="text-sm font-semibold text-emerald-800 italic">
                  Pronunciation: {currentCard.romanTribal}
                </p>
                <p className="text-xs font-bold text-slate-600 bg-white/80 py-1 px-3 rounded-full border border-emerald-200">
                  English: {currentCard.englishMeaning}
                </p>

                <div className="mt-3 p-2 bg-white/90 rounded-xl border border-emerald-200/80 text-[11px] text-slate-700">
                  <p className="font-semibold text-slate-900">{currentCard.exampleSentenceHindi}</p>
                  <p className="text-janbhasha-800 italic mt-0.5">{currentCard.exampleSentenceTribal}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Tap to flip back</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Audio & Carousel Controls */}
      <div className="px-6 pb-6 pt-2 space-y-4">
        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-6">
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="w-13 h-13 p-3.5 rounded-full bg-emerald-50 border border-emerald-200 text-janbhasha-700 hover:bg-emerald-100 active:scale-95 transition-all shadow-sm"
            title="Previous Flashcard"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Center Pronunciation Speaker */}
          <button
            onClick={handlePlayAudio}
            className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-janbhasha-800 flex items-center justify-center hover:bg-emerald-200 active:scale-95 transition-all shadow-md"
            title="Listen to Phonics"
          >
            <Volume2 className="w-8 h-8 stroke-[2.2]" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="w-13 h-13 p-3.5 rounded-full bg-emerald-50 border border-emerald-200 text-janbhasha-700 hover:bg-emerald-100 active:scale-95 transition-all shadow-sm"
            title="Next Flashcard"
          >
            <ArrowRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2">
          {filteredCards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsFlipped(false);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex % filteredCards.length === idx
                  ? 'w-6 bg-janbhasha-700'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
