import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  LanguageId, 
  AppDisplayLanguage,
  ScreenType, 
  TribalLanguage, 
  TranslationRecord, 
  OfflinePack,
  WorksheetItem
} from '../types';
import { 
  LANGUAGES, 
  INITIAL_TRANSLATIONS, 
  INITIAL_OFFLINE_PACKS, 
  PRESET_TEACHER_PROMPTS,
  MOCK_WORKSHEETS
} from '../data/mockData';
import { TRANSLATIONS, TranslationDictionary } from '../i18n/translations';
import { speakText, stopSpeech, soundEffects } from '../services/speechService';
import { translateAuthentic } from '../services/translatorService';

interface AppContextType {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  selectedLanguage: TribalLanguage;
  setSelectedLanguageId: (id: LanguageId) => void;
  appLanguage: AppDisplayLanguage;
  setAppLanguage: (lang: AppDisplayLanguage) => void;
  t: (key: keyof TranslationDictionary) => string;
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
  worksheetsList: WorksheetItem[];
  addWorksheet: (worksheet: Omit<WorksheetItem, 'id' | 'createdAt'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default screen starts at Splash, default app display language is English ('en'), default tribal language is Santali
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [selectedLanguageId, setSelectedLanguageId] = useState<LanguageId>('santhali');
  const [appLanguage, setAppLanguageState] = useState<AppDisplayLanguage>('en');
  
  const [offlineMode, setOfflineMode] = useState<boolean>(true);
  const [historyList, setHistoryList] = useState<TranslationRecord[]>(INITIAL_TRANSLATIONS);
  const [offlinePacks, setOfflinePacks] = useState<OfflinePack[]>(INITIAL_OFFLINE_PACKS);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [voiceSpeed, setVoiceSpeed] = useState<number>(0.9);
  const [isDevicePreview, setIsDevicePreview] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [worksheetsList, setWorksheetsList] = useState<WorksheetItem[]>(MOCK_WORKSHEETS);

  const selectedLanguage = LANGUAGES.find(l => l.id === selectedLanguageId) || LANGUAGES[0];

  // Translation lookup helper (default English)
  const t = useCallback((key: keyof TranslationDictionary): string => {
    const langDict = TRANSLATIONS[appLanguage] || TRANSLATIONS.en;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    return TRANSLATIONS.en[key] || String(key);
  }, [appLanguage]);

  const handleSetSelectedLanguageId = (id: LanguageId) => {
    setSelectedLanguageId(id);
    soundEffects.playBeep(640, 'sine', 0.1);
  };

  const handleSetAppLanguage = (lang: AppDisplayLanguage) => {
    setAppLanguageState(lang);
    soundEffects.playBeep(680, 'sine', 0.08);
  };

  const handleSetCurrentScreen = (screen: ScreenType) => {
    stopSpeech();
    setActiveAudioId(null);
    setCurrentScreen(screen);
    soundEffects.playBeep(580, 'sine', 0.08);
  };

  // Dynamic Add Worksheet / Assignment
  const addWorksheet = (newSheet: Omit<WorksheetItem, 'id' | 'createdAt'>) => {
    const id = 'ws-custom-' + Date.now();
    const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const fullItem: WorksheetItem = {
      ...newSheet,
      id,
      createdAt: dateStr
    };
    setWorksheetsList(prev => [fullItem, ...prev]);
    soundEffects.playSuccess();
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
    const res = translateAuthentic(hindiText, selectedLanguageId);
    return {
      tribalText: res.tribalText,
      tribalRoman: res.tribalRoman
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
        appLanguage,
        setAppLanguage: handleSetAppLanguage,
        t,
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
        worksheetsList,
        addWorksheet
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
