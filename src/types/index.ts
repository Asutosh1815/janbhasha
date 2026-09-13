export type LanguageId = 'ho' | 'mundari' | 'santhali' | 'gondi' | 'kurukh';
export type AppDisplayLanguage = 'en' | 'hi' | 'ho' | 'mundari' | 'santhali' | 'gondi' | 'kurukh';
export type UserRole = 'teacher' | 'student';

export interface TribalLanguage {
  id: LanguageId;
  name: string;
  nativeName: string;
  script: string;
  icon: string;
  region: string;
  speakers: string;
  greeting: string;
  greetingHindi: string;
  packSize: string;
  packSizeBytes: number;
  isDownloaded: boolean;
}

export type ScreenType = 
  | 'splash'
  | 'role-select'
  | 'language-select'
  | 'home'
  | 'voice-translation'
  | 'live-classroom'
  | 'lessons'
  | 'worksheets'
  | 'flashcards'
  | 'assessments'
  | 'history'
  | 'settings';

export interface TranslationRecord {
  id: string;
  timestamp: string;
  dateGroup: 'Today' | 'Yesterday' | 'Earlier';
  sourceLang: 'Hindi';
  targetLang: string;
  targetLangId: LanguageId;
  sourceText: string;
  sourceRoman: string;
  targetText: string;
  targetRoman: string;
  isFavorite?: boolean;
}

export interface WordGlossary {
  word: string;
  translation: string;
  pronunciation: string;
  pos: string;
}

export interface LessonContent {
  id: string;
  classLevel: string;
  subject: string;
  title: string;
  titleHindi: string;
  subtitle: string;
  translatedTo: string;
  bannerImage: string;
  explanationSections: {
    hindiHeading: string;
    hindiText: string;
    tribalHeading: string;
    tribalText: string;
    romanTribalText: string;
    words: WordGlossary[];
  }[];
  activity: {
    title: string;
    instructionHindi: string;
    instructionTribal: string;
    num1: number;
    num2: number;
    itemName: string;
    itemEmoji: string;
  };
  practice: {
    id: string;
    questionHindi: string;
    questionTribal: string;
    options: number[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface WorksheetQuestion {
  id: string;
  qHindi: string;
  qTribal: string;
  prompt: string;
  type: 'multiple-choice' | 'match' | 'count';
  options?: string[];
  answer: string | number;
}

export interface WorksheetItem {
  id: string;
  title: string;
  classLevel: string;
  subject: string;
  language: string;
  color: string;
  level: string;
  createdBy?: string;
  createdAt?: string;
  questions: WorksheetQuestion[];
}

export interface FlashcardItem {
  id: string;
  category: 'fruits' | 'animals' | 'nature' | 'classroom' | 'numbers';
  hindiWord: string;
  romanHindi: string;
  tribalWord: string;
  romanTribal: string;
  englishMeaning: string;
  emoji: string;
  imageUrl: string;
  exampleSentenceHindi: string;
  exampleSentenceTribal: string;
}

export interface AssessmentItem {
  id: string;
  title: string;
  classLevel: string;
  type: 'literacy' | 'numeracy';
  scorePercent: number;
  totalStudentsTested: number;
  questions: {
    id: string;
    promptHindi: string;
    promptTribal: string;
    romanTribal: string;
    targetCompetency: string;
    options: string[];
    correctIndex: number;
  }[];
}

export interface OfflinePack {
  id: LanguageId;
  name: string;
  nativeName: string;
  size: string;
  isDownloaded: boolean;
  isDownloading: boolean;
  progress: number;
}
