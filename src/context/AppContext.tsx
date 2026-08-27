import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  LanguageId, 
  ScreenType, 
  TribalLanguage, 
  TranslationRecord, 
  OfflinePack 
} from '../types';
import { 
  LANGUAGES, 
  INITIAL_TRANSLATIONS, 
  INITIAL_OFFLINE_PACKS, 
  PRESET_TEACHER_PROMPTS 
} from '../data/mockData';
import { speakText, stopSpeech, soundEffects } from '../services/speechService';

interface AppContextType {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  selectedLanguage: TribalLanguage;
  setSelectedLanguageId: (id: LanguageId) => void;
  offlineMode: boolean;
  setOfflineMode: (offline: boolean) => void;
  historyList: TranslationRecord[];
  addTranslationRecord: (record: Omit<TranslationRecord, 'id' | 'timestamp' | 'dateGroup'>) => void;
  clearHistory: () => void;
  toggleFavoriteHistory: (id: string) => void;
  offlinePacks: OfflinePack[];
  downloadPack: (id: LanguageId) => void;
  activeAudioId: string | null;
  playBilingualAudio: (id: string, text: string, langType?: 'hindi' | 'tribal') => void;
  stopAudio: () => void;
  voiceSpeed: number;
  setVoiceSpeed: (speed: number) => void;
  isDevicePreview: boolean;
  setIsDevicePreview: (preview: boolean) => void;
  translateHindiToTribal: (hindiText: string) => { tribalText: string; tribalRoman: string };
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [selectedLanguageId, setSelectedLanguageId] = useState<LanguageId>('ho');
  const [offlineMode, setOfflineMode] = useState<boolean>(true);
  const [historyList, setHistoryList] = useState<TranslationRecord[]>(INITIAL_TRANSLATIONS);
  const [offlinePacks, setOfflinePacks] = useState<OfflinePack[]>(INITIAL_OFFLINE_PACKS);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [voiceSpeed, setVoiceSpeed] = useState<number>(0.9);
  const [isDevicePreview, setIsDevicePreview] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const selectedLanguage = LANGUAGES.find(l => l.id === selectedLanguageId) || LANGUAGES[0];

  const handleSetSelectedLanguageId = (id: LanguageId) => {
    setSelectedLanguageId(id);
    soundEffects.playBeep(640, 'sine', 0.1);
  };

  const handleSetCurrentScreen = (screen: ScreenType) => {
    stopSpeech();
    setActiveAudioId(null);
    setCurrentScreen(screen);
    soundEffects.playBeep(580, 'sine', 0.08);
  };

  const addTranslationRecord = (record: Omit<TranslationRecord, 'id' | 'timestamp' | 'dateGroup'>) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newRecord: TranslationRecord = {
      ...record,
      id: 'h-' + Date.now(),
      timestamp: timeStr,
      dateGroup: 'Today',
      isFavorite: false,
    };
    setHistoryList(prev => [newRecord, ...prev]);
  };

  const clearHistory = () => {
    setHistoryList([]);
    soundEffects.playBeep(350, 'triangle', 0.2);
  };

  const toggleFavoriteHistory = (id: string) => {
    setHistoryList(prev => prev.map(item => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item));
    soundEffects.playBeep(720, 'sine', 0.1);
  };

  const downloadPack = (id: LanguageId) => {
    setOfflinePacks(prev => prev.map(p => p.id === id ? { ...p, isDownloading: true, progress: 10 } : p));
    soundEffects.playBeep(480, 'sine', 0.15);

    let progress = 10;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        clearInterval(interval);
        setOfflinePacks(prev => prev.map(p => p.id === id ? { ...p, isDownloading: false, isDownloaded: true, progress: 100 } : p));
        soundEffects.playSuccess();
      } else {
        setOfflinePacks(prev => prev.map(p => p.id === id ? { ...p, progress } : p));
      }
    }, 400);
  };

  const playBilingualAudio = (id: string, text: string, langType: 'hindi' | 'tribal' = 'hindi') => {
    if (activeAudioId === id) {
      stopSpeech();
      setActiveAudioId(null);
      return;
    }

    setActiveAudioId(id);
    soundEffects.playBeep(520, 'sine', 0.05);

    const pitch = langType === 'tribal' ? 1.05 : 0.95;
    speakText(text, 'hi-IN', voiceSpeed, pitch, () => {
      setActiveAudioId(null);
    });
  };

  const stopAudio = () => {
    stopSpeech();
    setActiveAudioId(null);
  };

  const translateHindiToTribal = (hindiText: string): { tribalText: string; tribalRoman: string } => {
    const trimmed = hindiText.trim().toLowerCase();
    const matched = PRESET_TEACHER_PROMPTS.find(p => p.hindi.toLowerCase().includes(trimmed) || trimmed.includes(p.hindi.toLowerCase().slice(0, 8)));
    
    if (matched) {
      if (selectedLanguageId === 'ho') {
        return { tribalText: matched.ho, tribalRoman: matched.hoRoman };
      }
      if (selectedLanguageId === 'mundari') {
        return { tribalText: matched.mundari, tribalRoman: 'Teheng aabu leka-jodaw ebun chaado-a.' };
      }
      if (selectedLanguageId === 'santhali') {
        return { tribalText: matched.santhali, tribalRoman: 'Tehenj aabo leka-misa ebo chaado-a.' };
      }
      if (selectedLanguageId === 'gondi') {
        return { tribalText: 'नेंद माट जोड़ कीना अभ्यास कीकट।', tribalRoman: 'Nend maat jod keena abhyaas keekat.' };
      }
      if (selectedLanguageId === 'kurukh') {
        return { tribalText: 'इन्नम एम जोड़ नन्ना सीक्खोत।', tribalRoman: 'Innam em jod nanna seekkhot.' };
      }
    }

    // Dynamic phrase translation synthesis for custom mic inputs
    if (hindiText.includes('जोड़') || hindiText.includes('प्लस') || hindiText.includes('+')) {
      return {
        tribalText: 'आमे नाम बोंगा रे आकड़ा सदोम रेयाङ्गा। (लेका-जोड़ाव)',
        tribalRoman: 'Aame naam bonga re aakda sadom reyanga.'
      };
    }
    if (hindiText.includes('किताब') || hindiText.includes('पढ़')) {
      return {
        tribalText: 'सबेन गिदरा आपन-आपन पुथी झिज पे आर पाड़ाव पे।',
        tribalRoman: 'Saben gidra aapan-aapan puthi jhij pe aar padaaw pe.'
      };
    }
    if (hindiText.includes('नमस्ते') || hindiText.includes('शुभ प्रभात')) {
      return {
        tribalText: 'सबेन को के जोहार! सेता जोहार।',
        tribalRoman: 'Saben ko ke Johar! Seta Johar.'
      };
    }

    return {
      tribalText: `[${selectedLanguage.name}] ${hindiText} (मातृभाषा अनुवाद)`,
      tribalRoman: `Aame naam bonga re aakda sadom reyanga.`
    };
  };

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen: handleSetCurrentScreen,
        selectedLanguage,
        setSelectedLanguageId: handleSetSelectedLanguageId,
        offlineMode,
        setOfflineMode,
        historyList,
        addTranslationRecord,
        clearHistory,
        toggleFavoriteHistory,
        offlinePacks,
        downloadPack,
        activeAudioId,
        playBilingualAudio,
        stopAudio,
        voiceSpeed,
        setVoiceSpeed,
        isDevicePreview,
        setIsDevicePreview,
        translateHindiToTribal,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
