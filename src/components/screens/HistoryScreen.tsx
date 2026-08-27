import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Trash2, 
  Mic, 
  Play, 
  Pause, 
  Volume2, 
  Heart, 
  Search, 
  Clock, 
  Check, 
  Copy 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../services/speechService';

export const HistoryScreen: React.FC = () => {
  const { 
    setCurrentScreen, 
    historyList, 
    clearHistory, 
    toggleFavoriteHistory,
    playBilingualAudio, 
    stopAudio,
    activeAudioId 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredHistory = historyList.filter(item => {
    if (!searchQuery) return true;
    return item.sourceText.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.targetText.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.targetLang.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const todayItems = filteredHistory.filter(i => i.dateGroup === 'Today');
  const yesterdayItems = filteredHistory.filter(i => i.dateGroup === 'Yesterday');
  const earlierItems = filteredHistory.filter(i => i.dateGroup === 'Earlier');

  const handlePlayAudio = (id: string, text: string) => {
    if (activeAudioId === id) {
      stopAudio();
    } else {
      playBilingualAudio(id, text, 'tribal');
    }
  };

  const handleCopy = (e: React.MouseEvent, id: string, text: string) => {
    e.stopPropagation();
    navigator.clipboard?.writeText?.(text);
    setCopiedId(id);
    soundEffects.playBeep(700, 'sine', 0.08);
    setTimeout(() => setCopiedId(null), 1800);
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
          History
        </h2>

        <button
          onClick={() => {
            if (confirm('Clear all voice translation history?')) {
              clearHistory();
            }
          }}
          className="p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          title="Clear History"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="px-4 py-1">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search translated sentences..."
            className="w-full pl-9.5 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-janbhasha-500 shadow-xs"
          />
        </div>
      </div>

      {/* Timeline List */}
      <div className="px-4 pt-2 pb-6 space-y-4 flex-1">
        {/* Today Group */}
        {todayItems.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Today
            </h3>
            <div className="space-y-2">
              {todayItems.map((item) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                  isExpanded={expandedId === item.id}
                  onToggleExpand={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  isPlaying={activeAudioId === item.id}
                  onPlay={() => handlePlayAudio(item.id, item.targetText)}
                  onFavorite={() => toggleFavoriteHistory(item.id)}
                  onCopy={(e) => handleCopy(e, item.id, `${item.sourceText}\n${item.targetText}`)}
                  isCopied={copiedId === item.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Yesterday Group */}
        {yesterdayItems.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Yesterday
            </h3>
            <div className="space-y-2">
              {yesterdayItems.map((item) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                  isExpanded={expandedId === item.id}
                  onToggleExpand={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  isPlaying={activeAudioId === item.id}
                  onPlay={() => handlePlayAudio(item.id, item.targetText)}
                  onFavorite={() => toggleFavoriteHistory(item.id)}
                  onCopy={(e) => handleCopy(e, item.id, `${item.sourceText}\n${item.targetText}`)}
                  isCopied={copiedId === item.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Earlier Group */}
        {earlierItems.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Earlier
            </h3>
            <div className="space-y-2">
              {earlierItems.map((item) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                  isExpanded={expandedId === item.id}
                  onToggleExpand={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  isPlaying={activeAudioId === item.id}
                  onPlay={() => handlePlayAudio(item.id, item.targetText)}
                  onFavorite={() => toggleFavoriteHistory(item.id)}
                  onCopy={(e) => handleCopy(e, item.id, `${item.sourceText}\n${item.targetText}`)}
                  isCopied={copiedId === item.id}
                />
              ))}
            </div>
          </div>
        )}

        {filteredHistory.length === 0 && (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <Clock className="w-8 h-8 mx-auto stroke-1" />
            <p className="text-xs font-medium">No translation history found</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface HistoryCardProps {
  item: any;
  isExpanded: boolean;
  onToggleExpand: () => void;
  isPlaying: boolean;
  onPlay: () => void;
  onFavorite: () => void;
  onCopy: (e: React.MouseEvent) => void;
  isCopied: boolean;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  item,
  isExpanded,
  onToggleExpand,
  isPlaying,
  onPlay,
  onFavorite,
  onCopy,
  isCopied,
}) => {
  return (
    <div
      onClick={onToggleExpand}
      className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:border-janbhasha-300 transition-all cursor-pointer space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Green Mic Badge */}
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-janbhasha-700 flex items-center justify-center">
            <Mic className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-700">
                {item.sourceLang} &rarr; {item.targetLang}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-900 font-hindi mt-0.5 max-w-[200px] truncate">
              {item.sourceText}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400 font-medium">
            {item.timestamp}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isPlaying 
                ? 'bg-janbhasha-700 text-white' 
                : 'bg-emerald-50 text-janbhasha-700 hover:bg-emerald-100'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
        </div>
      </div>

      {/* Expanded View with Full Bilingual Details */}
      {isExpanded && (
        <div className="pt-2 border-t border-slate-100 text-xs space-y-2 animate-in fade-in">
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] font-bold text-janbhasha-800 uppercase block">
              {item.targetLang} Translation:
            </span>
            <p className="font-bold text-janbhasha-950 font-hindi mt-0.5">
              {item.targetText}
            </p>
            {item.targetRoman && (
              <p className="text-[11px] text-emerald-800/80 italic mt-0.5">
                {item.targetRoman}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-slate-500 pt-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFavorite();
              }}
              className="flex items-center gap-1 hover:text-rose-600 transition-colors"
            >
              <Heart className={`w-3.5 h-3.5 ${item.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="text-[11px]">{item.isFavorite ? 'Saved' : 'Bookmark'}</span>
            </button>

            <button
              onClick={onCopy}
              className="flex items-center gap-1 hover:text-slate-900 transition-colors"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{isCopied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
