import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  RotateCw, 
  Sparkles, 
  Heart,
  Layers,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_FLASHCARDS } from '../../data/mockData';
import { soundEffects } from '../../services/speechService';

export const FlashcardsScreen: React.FC = () => {
  const { setCurrentScreen, selectedLanguage, playBilingualAudio, activeAudioId, t } = useApp();
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
    soundEffects.playBeep(520, 'sine', 0.08);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    soundEffects.playBeep(480, 'sine', 0.08);
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(prev => ({ ...prev, [currentCard.id]: !prev[currentCard.id] }));
    soundEffects.playBeep(720, 'sine', 0.1);
  };

  const handlePlayAudio = (e: React.MouseEvent, text: string, type: 'hindi' | 'tribal') => {
    e.stopPropagation();
    playBilingualAudio(`fc-${currentCard.id}-${type}`, text, type);
  };

  return (
    <div className="flex flex-col h-full bg-[#fbfdf8] text-slate-800 justify-between select-none overflow-y-auto no-scrollbar pb-6">
      {/* Top Header */}
      <div className="pt-3 px-4 pb-2 flex items-center justify-between sticky top-0 bg-[#fbfdf8]/95 backdrop-blur-xs z-20">
        <button
          onClick={() => setCurrentScreen('home')}
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-base font-extrabold text-slate-900">
            {t('flashcardsTitle')}
          </h2>
          <p className="text-[10px] text-janbhasha-700 font-bold">
            Hindi ↔ {selectedLanguage.name} ({selectedLanguage.nativeName})
          </p>
        </div>

        <div className="w-9" />
      </div>

      {/* Category Filter Chips */}
      <div className="px-4 py-1">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                  soundEffects.playBeep(520, 'sine', 0.05);
                }}
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-janbhasha-700 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Flashcard Container */}
      <div className="px-4 py-3 flex-1 flex flex-col items-center justify-center">
        {/* Progress Counter */}
        <div className="mb-2 text-xs font-bold text-slate-500 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-janbhasha-700" />
          <span>Card {((currentIndex % filteredCards.length) + 1)} of {filteredCards.length}</span>
        </div>

        {/* The 3D Flip Card */}
        <div 
          onClick={handleFlip}
          className="w-full max-w-xs h-80 rounded-3xl cursor-pointer perspective-1000 relative group active:scale-[0.99] transition-transform"
        >
          <div className={`w-full h-full duration-500 transform-style-3d transition-transform relative ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            {/* FRONT SIDE (Hindi / English) */}
            <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 border-2 border-slate-200/90 shadow-md p-6 flex flex-col justify-between backface-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Hindi &amp; English
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleToggleFav}
                    className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite[currentCard.id] ? 'text-rose-500 fill-rose-500' : ''}`} />
                  </button>
                  <button
                    onClick={(e) => handlePlayAudio(e, currentCard.hindiWord, 'hindi')}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                    title="Listen Hindi"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Big Emoji / Visual Asset */}
              <div className="text-center my-auto">
                <div className="text-6xl mb-2 filter drop-shadow-sm">{currentCard.emoji}</div>
                <h3 className="text-2xl font-black text-slate-900 font-hindi tracking-wide">
                  {currentCard.hindiWord}
                </h3>
                <p className="text-xs text-slate-500 font-medium italic mt-0.5">
                  "{currentCard.romanHindi}" • {currentCard.englishMeaning}
                </p>
              </div>

              {/* Tap to Flip Prompt */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-janbhasha-700 pt-2 border-t border-slate-100">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Tap card to see {selectedLanguage.name}</span>
              </div>
            </div>

            {/* BACK SIDE (Tribal Mother Tongue & Phonics) */}
            <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-emerald-50 via-emerald-100/50 to-amber-50/60 border-2 border-janbhasha-700 shadow-md p-6 flex flex-col justify-between backface-hidden rotate-y-180">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-janbhasha-700 text-white shadow-2xs">
                  {selectedLanguage.name} ({selectedLanguage.nativeName})
                </span>

                <button
                  onClick={(e) => handlePlayAudio(e, currentCard.tribalWord, 'tribal')}
                  className="p-2.5 rounded-2xl bg-janbhasha-700 text-white hover:bg-janbhasha-800 shadow-xs"
                  title="Listen Native Audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Tribal Word & Phonics */}
              <div className="text-center my-auto">
                <div className="text-5xl mb-2">{currentCard.emoji}</div>
                <h3 className="text-2xl font-black text-janbhasha-950 font-hindi tracking-wide">
                  {currentCard.tribalWord}
                </h3>
                <p className="text-xs text-janbhasha-800 font-bold italic mt-1 bg-white/80 px-3 py-1 rounded-full inline-block border border-emerald-300">
                  Phonics: "{currentCard.romanTribal}"
                </p>
                
                {currentCard.exampleSentenceTribal && (
                  <p className="text-[11px] text-slate-600 mt-2 font-medium">
                    {currentCard.exampleSentenceTribal}
                  </p>
                )}
              </div>

              {/* Tap to Flip Back */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 pt-2 border-t border-emerald-200">
                <RotateCw className="w-3.5 h-3.5 text-janbhasha-700" />
                <span>Tap to flip back</span>
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-4 mt-5">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs hover:bg-slate-50 transition-transform active:scale-95"
            title="Previous Card"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleFlip}
            className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <RotateCw className="w-4 h-4 text-janbhasha-700" />
            <span>Flip Card</span>
          </button>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-janbhasha-700 text-white flex items-center justify-center shadow-md hover:bg-janbhasha-800 transition-transform active:scale-95"
            title="Next Card"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
