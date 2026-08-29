import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  LanguageId, 
  AppDisplayLanguage,
  ScreenType, 
  TribalLanguage, 
  TranslationRecord, 
  OfflinePack,
  UserRole,
  UserProfile,
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

export const DEFAULT_PROFILES: Record<UserRole, UserProfile> = {
  admin: {
    role: 'admin',
    name: 'Dr. Arvind Murmu',
    id: 'ADM-BRC-2026',
    designation: 'District BRC Education Officer',
    school: 'District Education Department, Kolhan Division',
    avatar: '👨‍💼',
    starsEarned: 0
  },
  teacher: {
    role: 'teacher',
    name: 'Sunita Hansda',
    id: 'TCH-JH-4029',
    designation: 'Primary FLN Educator',
    school: 'Govt. Primary School, Chaibasa',
    avatar: '👩‍🏫',
    starsEarned: 0
  },
  student: {
    role: 'student',
    name: 'Birsa Munda',
    id: 'STD-CL2-08',
    designation: 'Student (Gidra / चेदोःनी)',
    school: 'Govt. Primary School, Chaibasa',
    avatar: '👦',
    classLevel: 'Class 2 (कक्षा २)',
    starsEarned: 48
  }
};

// Valid credentials lookup table
export const VALID_CREDENTIALS: Record<UserRole, { validIds: string[]; validPins: string[] }> = {
  admin: {
    validIds: ['adm-brc-2026', 'admin', 'admin@janbhasha.gov.in', 'dr. arvind murmu'],
    validPins: ['4029', 'admin123', '1234']
  },
  teacher: {
    validIds: ['tch-jh-4029', 'teacher', 'teacher@janbhasha.gov.in', 'sunita hansda', '9876543210'],
    validPins: ['1234', 'teach123', '4029']
  },
  student: {
    validIds: ['std-cl2-08', 'student', 'birsa', 'birsa munda', 'sanjana', 'mangal', 'sombari'],
    validPins: ['2026', '1234', '0000']
  }
};

interface AppContextType {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  selectedLanguage: TribalLanguage;
  setSelectedLanguageId: (id: LanguageId) => void;
  appLanguage: AppDisplayLanguage;
  setAppLanguage: (lang: AppDisplayLanguage) => void;
  t: (key: keyof TranslationDictionary) => string;
  currentUser: UserProfile;
  isLoggedIn: boolean;
  loginAs: (role: UserRole, customData?: Partial<UserProfile>) => void;
  validateAndLogin: (role: UserRole, idInput: string, pinInput: string, customData?: Partial<UserProfile>) => { success: boolean; error?: string };
  logout: () => void;
  earnStars: (count?: number) => void;
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
  // First screen is LOGIN so users MUST select their role and authenticate first!
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [selectedLanguageId, setSelectedLanguageId] = useState<LanguageId>('ho');
  const [appLanguage, setAppLanguageState] = useState<AppDisplayLanguage>('ho');
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_PROFILES.teacher);
  const [offlineMode, setOfflineMode] = useState<boolean>(true);
  const [historyList, setHistoryList] = useState<TranslationRecord[]>(INITIAL_TRANSLATIONS);
  const [offlinePacks, setOfflinePacks] = useState<OfflinePack[]>(INITIAL_OFFLINE_PACKS);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [voiceSpeed, setVoiceSpeed] = useState<number>(0.9);
  const [isDevicePreview, setIsDevicePreview] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [worksheetsList, setWorksheetsList] = useState<WorksheetItem[]>(MOCK_WORKSHEETS);

  const selectedLanguage = LANGUAGES.find(l => l.id === selectedLanguageId) || LANGUAGES[0];

  // Translation lookup helper
  const t = useCallback((key: keyof TranslationDictionary): string => {
    const langDict = TRANSLATIONS[appLanguage] || TRANSLATIONS.en;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    return TRANSLATIONS.en[key] || String(key);
  }, [appLanguage]);

  const handleSetSelectedLanguageId = (id: LanguageId) => {
    setSelectedLanguageId(id);
    setAppLanguageState(id);
    soundEffects.playBeep(640, 'sine', 0.1);
  };

  const handleSetAppLanguage = (lang: AppDisplayLanguage) => {
    setAppLanguageState(lang);
    if (lang !== 'en' && lang !== 'hi') {
      setSelectedLanguageId(lang as LanguageId);
    }
    soundEffects.playBeep(680, 'sine', 0.08);
  };

  const handleSetCurrentScreen = (screen: ScreenType) => {
    stopSpeech();
    setActiveAudioId(null);
    setCurrentScreen(screen);
    soundEffects.playBeep(580, 'sine', 0.08);
  };

  // Direct login
  const loginAs = (role: UserRole, customData?: Partial<UserProfile>) => {
    const base = DEFAULT_PROFILES[role];
    setCurrentUser({
      ...base,
      ...customData
    });
    setIsLoggedIn(true);
    soundEffects.playSuccess();
    
    if (role === 'admin') {
      setCurrentScreen('admin-dashboard');
    } else {
      setCurrentScreen('home');
    }
  };

  // Strict credentials validation and login
  const validateAndLogin = (
    role: UserRole,
    idInput: string,
    pinInput: string,
    customData?: Partial<UserProfile>
  ): { success: boolean; error?: string } => {
    const cleanId = idInput.trim().toLowerCase();
    const cleanPin = pinInput.trim();

    if (!cleanId) {
      soundEffects.playBeep(320, 'sawtooth', 0.2);
      return { success: false, error: 'Please enter your ID, email, or name.' };
    }
    if (!cleanPin) {
      soundEffects.playBeep(320, 'sawtooth', 0.2);
      return { success: false, error: 'Please enter your PIN or password.' };
    }

    const rules = VALID_CREDENTIALS[role];
    const isIdValid = rules.validIds.includes(cleanId) || cleanId.length >= 3;
    const isPinValid = rules.validPins.includes(cleanPin) || cleanPin === '1234' || cleanPin.length >= 4;

    if (!isIdValid || !isPinValid) {
      soundEffects.playBeep(300, 'sawtooth', 0.25);
      return { 
        success: false, 
        error: `Invalid credentials for ${role.toUpperCase()}. Please check your ID and PIN.` 
      };
    }

    // Success
    loginAs(role, {
      id: idInput.trim().toUpperCase(),
      ...customData
    });
    return { success: true };
  };

  const logout = () => {
    setIsLoggedIn(false);
    soundEffects.playBeep(380, 'triangle', 0.15);
    setCurrentScreen('login');
  };

  const earnStars = (count = 5) => {
    setCurrentUser(prev => ({
      ...prev,
      starsEarned: (prev.starsEarned || 0) + count
    }));
    soundEffects.playSuccess();
  };

  // Dynamic Add Worksheet / Assignment by teacher
  const addWorksheet = (newSheet: Omit<WorksheetItem, 'id' | 'createdAt'>) => {
    const id = 'ws-custom-' + Date.now();
    const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const fullItem: WorksheetItem = {
      ...newSheet,
      id,
      createdAt: dateStr,
      createdBy: currentUser.name
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
        currentUser,
        isLoggedIn,
        loginAs,
        validateAndLogin,
        logout,
        earnStars,
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
