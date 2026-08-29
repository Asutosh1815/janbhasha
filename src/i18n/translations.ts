export type SupportedLanguage = 'en' | 'hi' | 'ho' | 'mundari' | 'santhali' | 'gondi' | 'kurukh';

export interface TranslationDictionary {
  // General & App Branding
  appName: string;
  appTagline: string;
  appMission: string;
  offlineMode: string;
  onlineMode: string;
  step: string;
  of: string;
  continue: string;
  back: string;
  save: string;
  cancel: string;
  selected: string;
  download: string;
  downloaded: string;
  downloading: string;
  loading: string;
  searchPlaceholder: string;
  viewAll: string;
  listenAudio: string;
  stopAudio: string;
  logout: string;
  switchRole: string;

  // Roles & Authentication
  roleAdmin: string;
  roleTeacher: string;
  roleStudent: string;
  adminSubtitle: string;
  teacherSubtitle: string;
  studentSubtitle: string;
  loginTitle: string;
  loginSubtitle: string;
  loginBtn: string;
  demoLogin: string;
  enterId: string;
  enterPin: string;
  selectAvatar: string;
  selectClass: string;
  welcomeBack: string;
  loggedAs: string;

  // Navigation Items
  navHome: string;
  navTranslate: string;
  navLessons: string;
  navFlashcards: string;
  navWorksheets: string;
  navAssessments: string;
  navHistory: string;
  navSettings: string;
  navAdmin: string;
  navLanguage: string;

  // Home Screen
  welcomeTeacher: string;
  welcomeAdmin: string;
  welcomeStudent: string;
  teacherHeroDesc: string;
  studentHeroDesc: string;
  adminHeroDesc: string;
  quickActionsTitle: string;
  activeLanguage: string;
  changeLanguage: string;
  starsCollected: string;
  dailyGoal: string;

  // Screen Names & Descriptions
  voiceTranslateTitle: string;
  voiceTranslateDesc: string;
  lessonsTitle: string;
  lessonsDesc: string;
  worksheetsTitle: string;
  worksheetsDesc: string;
  flashcardsTitle: string;
  flashcardsDesc: string;
  assessmentsTitle: string;
  assessmentsDesc: string;
  historyTitle: string;
  historyDesc: string;
  adminTitle: string;
  adminDesc: string;
  settingsTitle: string;
  settingsDesc: string;
  languageSelectTitle: string;
  languageSelectSubtitle: string;
  appDisplayLangTitle: string;
  learnerMotherTongueTitle: string;

  // Voice Translation Screen
  teacherHindiCard: string;
  learnerTribalCard: string;
  tapToSpeak: string;
  listening: string;
  speaking: string;
  audioSpeed: string;
  clearHistoryConfirm: string;
  presetPhrases: string;
  copySuccess: string;
  swapLanguages: string;

  // Lessons & Activities
  lessonClass2Math: string;
  additionTitle: string;
  explanationHeading: string;
  interactiveActivity: string;
  addApplesInstruction: string;
  practiceQuestions: string;
  checkAnswer: string;
  correctAnswer: string;
  tryAgain: string;
  totalSum: string;

  // Flashcards
  tapCardToFlip: string;
  frontHindi: string;
  backTribal: string;
  meaning: string;
  exampleSentence: string;
  categoryAll: string;
  categoryFruits: string;
  categoryAnimals: string;
  categoryNature: string;
  categoryNumbers: string;
  categoryClassroom: string;

  // Worksheets & Assessments
  worksheetFilters: string;
  printableSheet: string;
  nipunCompetencies: string;
  studentsTested: string;
  oralTesting: string;
  passScore: string;

  // Admin Dashboard
  totalSchools: string;
  activeTeachers: string;
  studentsAssessed: string;
  flnIndex: string;
  offlineSyncRate: string;
  schoolDirectory: string;
  syncLanguagePacks: string;
  packsSyncSuccess: string;
  districtReport: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  // English
  en: {
    appName: "JANBHASHA",
    appTagline: "Bridging classroom language for tribal learners",
    appMission: "When the teacher speaks Hindi, the child hears their mother tongue.",
    offlineMode: "Offline Mode",
    onlineMode: "Online Mode",
    step: "Step",
    of: "of",
    continue: "Continue",
    back: "Back",
    save: "Save",
    cancel: "Cancel",
    selected: "Selected",
    download: "Download",
    downloaded: "Downloaded",
    downloading: "Downloading...",
    loading: "Loading...",
    searchPlaceholder: "Search lessons, words, worksheets...",
    viewAll: "View All",
    listenAudio: "Listen",
    stopAudio: "Stop",
    logout: "Log Out",
    switchRole: "Switch Role",

    roleAdmin: "Admin",
    roleTeacher: "Teacher",
    roleStudent: "Student",
    adminSubtitle: "BRC / District Official",
    teacherSubtitle: "Classroom Educator",
    studentSubtitle: "Learner (Gidra)",
    loginTitle: "Sign in to JANBHASHA",
    loginSubtitle: "Select your role to access personalized learning & teaching tools",
    loginBtn: "Enter Dashboard",
    demoLogin: "Quick One-Click Demo Login",
    enterId: "Enter ID / Mobile / Email",
    enterPin: "Enter 4-Digit Security PIN",
    selectAvatar: "Choose Student Avatar",
    selectClass: "Select Class Grade",
    welcomeBack: "Welcome back",
    loggedAs: "Logged in as",

    navHome: "Home",
    navTranslate: "Translate",
    navLessons: "Lessons",
    navFlashcards: "Cards",
    navWorksheets: "Sheets",
    navAssessments: "Assess",
    navHistory: "History",
    navSettings: "Settings",
    navAdmin: "Admin",
    navLanguage: "Language",

    welcomeTeacher: "Welcome, Teacher",
    welcomeAdmin: "Welcome, Administrator",
    welcomeStudent: "Johar, Dear Student!",
    teacherHeroDesc: "Teach in Hindi. Learn in Mother Tongue.",
    studentHeroDesc: "Explore fun stories, numbers & words in your mother tongue!",
    adminHeroDesc: "District FLN & Tribal Language Learning Overview",
    quickActionsTitle: "Classroom Learning Modules",
    activeLanguage: "Active Tribal Language",
    changeLanguage: "Change Language",
    starsCollected: "Stars Earned",
    dailyGoal: "Daily Learning Goal",

    voiceTranslateTitle: "Live Voice Translation",
    voiceTranslateDesc: "Real-time Hindi ↔ Mother Tongue",
    lessonsTitle: "Classroom Lessons",
    lessonsDesc: "Bilingual Class 1-5 Curriculum",
    worksheetsTitle: "Worksheets",
    worksheetsDesc: "Interactive & Printable FLN",
    flashcardsTitle: "Visual Flashcards",
    flashcardsDesc: "Phonics & 3D Interactive Cards",
    assessmentsTitle: "FLN Assessments",
    assessmentsDesc: "NIPUN Bharat Competencies",
    historyTitle: "Translation History",
    historyDesc: "Past Voice Audio & Logs",
    adminTitle: "Admin Dashboard",
    adminDesc: "School Analytics & FLN Metrics",
    settingsTitle: "App Settings",
    settingsDesc: "Offline Packs & Speech Controls",
    languageSelectTitle: "Choose Language",
    languageSelectSubtitle: "Select display & mother tongue languages",
    appDisplayLangTitle: "App Display Language",
    learnerMotherTongueTitle: "Learner Tribal Mother Tongue",

    teacherHindiCard: "Teacher (Hindi)",
    learnerTribalCard: "Learner (Mother Tongue)",
    tapToSpeak: "Tap to Speak",
    listening: "Listening to voice...",
    speaking: "Playing audio...",
    audioSpeed: "Voice Speed",
    clearHistoryConfirm: "Clear translation logs?",
    presetPhrases: "Preset Classroom Phrases",
    copySuccess: "Copied to clipboard!",
    swapLanguages: "Swap Languages",

    lessonClass2Math: "Class 2 • Mathematics",
    additionTitle: "Chapter 1: Learning Addition (जोड़)",
    explanationHeading: "Concept Explanation",
    interactiveActivity: "Interactive Activity: Count & Add",
    addApplesInstruction: "Count the apples in both baskets and find the total sum:",
    practiceQuestions: "Practice Questions",
    checkAnswer: "Check Answer",
    correctAnswer: "Awesome! That is correct! 🎉",
    tryAgain: "Try again! Count carefully.",
    totalSum: "Total Sum",

    tapCardToFlip: "Tap card to flip for tribal translation",
    frontHindi: "Hindi & English",
    backTribal: "Mother Tongue & Phonics",
    meaning: "Meaning",
    exampleSentence: "Example Sentence",
    categoryAll: "All",
    categoryFruits: "Fruits",
    categoryAnimals: "Animals",
    categoryNature: "Nature",
    categoryNumbers: "Numbers",
    categoryClassroom: "Classroom",

    worksheetFilters: "Filter by Subject / Language",
    printableSheet: "Printable FLN Worksheet",
    nipunCompetencies: "NIPUN Bharat Competencies",
    studentsTested: "Students Assessed",
    oralTesting: "Oral Testing Mode",
    passScore: "Target Benchmark",

    totalSchools: "Total Schools",
    activeTeachers: "Active Teachers",
    studentsAssessed: "Students Assessed",
    flnIndex: "FLN Competency Index",
    offlineSyncRate: "Offline Sync Rate",
    schoolDirectory: "School Performance Directory",
    syncLanguagePacks: "Sync Language Packs to Schools",
    packsSyncSuccess: "Language packs pushed to 48 school tablets!",
    districtReport: "District Tribal Education Summary"
  },

  // Hindi (हिन्दी)
  hi: {
    appName: "जनभाषा (JANBHASHA)",
    appTagline: "जनजातीय बच्चों के लिए मातृभाषा शिक्षा सेतु",
    appMission: "जब शिक्षक हिन्दी बोलते हैं, बच्चा अपनी मातृभाषा में सुनता है।",
    offlineMode: "ऑफलाइन मोड",
    onlineMode: "ऑनलाइन मोड",
    step: "चरण",
    of: "का",
    continue: "आगे बढ़ें",
    back: "पीछे जाएं",
    save: "सुरक्षित करें",
    cancel: "रद्द करें",
    selected: "चयनित",
    download: "डाउनलोड करें",
    downloaded: "डाउनलोड हो गया",
    downloading: "डाउनलोड हो रहा है...",
    loading: "लोड हो रहा है...",
    searchPlaceholder: "पाठ, शब्द, वर्कशीट खोजें...",
    viewAll: "सभी देखें",
    listenAudio: "सुनें",
    stopAudio: "रोकें",
    logout: "लॉग आउट",
    switchRole: "भूमिका बदलें",

    roleAdmin: "प्रशासक (Admin)",
    roleTeacher: "शिक्षक (Teacher)",
    roleStudent: "विद्यार्थी (Student)",
    adminSubtitle: "बीआरसी / जिला शिक्षा अधिकारी",
    teacherSubtitle: "कक्षा अध्यापक / मार्गदर्शक",
    studentSubtitle: "शिक्षार्थी / नन्हे बच्चे",
    loginTitle: "जनभाषा में लॉगिन करें",
    loginSubtitle: "अपनी भूमिका चुनकर अनुकूलित शिक्षा पोर्टल में प्रवेश करें",
    loginBtn: "डैशबोर्ड में प्रवेश करें",
    demoLogin: "त्वरित एक-क्लिक डेमो लॉगिन",
    enterId: "आईडी / मोबाइल नंबर दर्ज करें",
    enterPin: "4-अंकों का सुरक्षा पिन दर्ज करें",
    selectAvatar: "विद्यार्थी का अवतार चुनें",
    selectClass: "कक्षा का चयन करें",
    welcomeBack: "पुनः स्वागत है",
    loggedAs: "लॉगिन भूमिका",

    navHome: "होम",
    navTranslate: "अनुवाद",
    navLessons: "पाठ",
    navFlashcards: "कार्ड",
    navWorksheets: "वर्कशीट",
    navAssessments: "मूल्यांकन",
    navHistory: "इतिहास",
    navSettings: "सेटिंग्स",
    navAdmin: "प्रशासन",
    navLanguage: "भाषा",

    welcomeTeacher: "नमस्ते, शिक्षक जी",
    welcomeAdmin: "नमस्ते, शिक्षा प्रशासक जी",
    welcomeStudent: "जोहार, प्यारे बच्चे!",
    teacherHeroDesc: "हिन्दी में पढ़ाएं। बच्चा मातृभाषा में समझे।",
    studentHeroDesc: "अपनी मातृभाषा में मजेदार कहानियां, गिनती और शब्द सीखें!",
    adminHeroDesc: "जिला स्तरीय बुनियादी साक्षरता एवं भाषा अधिगम डैशबोर्ड",
    quickActionsTitle: "कक्षा शिक्षण एवं अधिगम मॉड्यूल",
    activeLanguage: "सक्रिय जनजातीय मातृभाषा",
    changeLanguage: "भाषा बदलें",
    starsCollected: "प्राप्त सितारे",
    dailyGoal: "दैनिक सीखने का लक्ष्य",

    voiceTranslateTitle: "सजीव ध्वनि अनुवाद",
    voiceTranslateDesc: "हिन्दी ↔ जनजातीय मातृभाषा का त्वरित अनुवाद",
    lessonsTitle: "द्विभाषी पाठ",
    lessonsDesc: "कक्षा १-५ बुनियादी पाठ्यक्रम",
    worksheetsTitle: "कार्यपत्रक (Worksheets)",
    worksheetsDesc: "इंटरैक्टिव एवं प्रिंटेबल एफएलएन अभ्यास",
    flashcardsTitle: "चित्र फ्लैशकार्ड",
    flashcardsDesc: "३डी फ्लिप कार्ड एवं ध्वनि उच्चारण",
    assessmentsTitle: "निपुण मूल्यांकन",
    assessmentsDesc: "निपुण भारत बुनियादी साक्षरता परीक्षा",
    historyTitle: "अनुवाद इतिहास",
    historyDesc: "पूर्व अनुवाद रिकॉर्ड एवं ध्वनि लॉग",
    adminTitle: "प्रशासनिक डैशबोर्ड",
    adminDesc: "विद्यालय विश्लेषण एवं एफएलएन प्रगति",
    settingsTitle: "ऐप सेटिंग्स",
    settingsDesc: "ऑफलाइन भाषा पैक एवं ध्वनि गति",
    languageSelectTitle: "भाषा का चयन",
    languageSelectSubtitle: "ऐप प्रदर्शन भाषा एवं शिक्षार्थी की मातृभाषा चुनें",
    appDisplayLangTitle: "ऐप प्रदर्शन भाषा (UI Language)",
    learnerMotherTongueTitle: "शिक्षार्थी की जनजातीय मातृभाषा",

    teacherHindiCard: "शिक्षक (हिन्दी)",
    learnerTribalCard: "शिक्षार्थी (मातृभाषा)",
    tapToSpeak: "बोलने के लिए माइक दबाएं",
    listening: "आवाज सुनी जा रही है...",
    speaking: "ध्वनि सुनाई जा रही है...",
    audioSpeed: "ध्वनि गति",
    clearHistoryConfirm: "क्या आप सभी अनुवाद रिकॉर्ड हटाना चाहते हैं?",
    presetPhrases: "कक्षा के सामान्य निर्देश",
    copySuccess: "कॉपी कर लिया गया!",
    swapLanguages: "भाषाएं आपस में बदलें",

    lessonClass2Math: "कक्षा २ • गणित",
    additionTitle: "अध्याय १: जोड़ सीखना (Addition)",
    explanationHeading: "अवधारणा की समझ",
    interactiveActivity: "इंटरैक्टिव गतिविधि: गिनें और जोड़ें",
    addApplesInstruction: "दोनों टोकरियों के सेबों को गिनकर कुल जोड़ बताएं:",
    practiceQuestions: "अभ्यास प्रश्न",
    checkAnswer: "उत्तर जांचें",
    correctAnswer: "शाबाश! आपका उत्तर बिल्कुल सही है! 🎉",
    tryAgain: "पुनः प्रयास करें! ध्यान से गिनें।",
    totalSum: "कुल जोड़",

    tapCardToFlip: "मातृभाषा अनुवाद देखने के लिए कार्ड पर टैप करें",
    frontHindi: "हिन्दी एवं अंग्रेजी",
    backTribal: "मातृभाषा एवं उच्चारण",
    meaning: "अर्थ",
    exampleSentence: "उदाहरण वाक्य",
    categoryAll: "सभी",
    categoryFruits: "फल",
    categoryAnimals: "पशु",
    categoryNature: "प्रकृति",
    categoryNumbers: "संख्याएं",
    categoryClassroom: "कक्षा",

    worksheetFilters: "विषय / भाषा अनुसार फिल्टर करें",
    printableSheet: "प्रिंटेबल एफएलएन अभ्यास पत्रक",
    nipunCompetencies: "निपुण भारत दक्षता स्तर",
    studentsTested: "परीक्षित विद्यार्थी",
    oralTesting: "मौखिक परीक्षा मोड",
    passScore: "लक्ष्य मानक",

    totalSchools: "कुल विद्यालय",
    activeTeachers: "सक्रिय शिक्षक",
    studentsAssessed: "परीक्षित बच्चे",
    flnIndex: "एफएलएन दक्षता सूचकांक",
    offlineSyncRate: "ऑफलाइन सिंक दर",
    schoolDirectory: "विद्यालय प्रदर्शन तालिका",
    syncLanguagePacks: "विद्यालयों में भाषा पैक सिंक करें",
    packsSyncSuccess: "४८ विद्यालयों के टैबलेट में भाषा पैक सफलतापूर्वक भेजे गए!",
    districtReport: "जिला जनजातीय शिक्षा प्रगति रिपोर्ट"
  },

  // Ho (हो भाषा - Devanagari & Latin)
  ho: {
    appName: "जनभाषा (हो भाषा)",
    appTagline: "हो गिदरा को लागी आपन पारसी चेद सेतुम",
    appMission: "मास्टर गोमके हिन्दी ते काजी रे, गिदरा हो पारसी ते आय्युम-ए।",
    offlineMode: "ऑफलाइन मोड (बोंगे नेट)",
    onlineMode: "ऑनलाइन मोड",
    step: "चाड़ो",
    of: "रेयाः",
    continue: "माड़ांग सेनोः",
    back: "तायोम",
    save: "संजोव",
    cancel: "कागे",
    selected: "बाछावकाना",
    download: "डाउनलोड",
    downloaded: "डाउनलोड हुयुअना",
    downloading: "डाउनलोड ताना...",
    loading: "लोड ताना...",
    searchPlaceholder: "पुथी, काजी, लेका-जोड़ाव नाम पे...",
    viewAll: "सबेन नेल पे",
    listenAudio: "आय्युम पे",
    stopAudio: "ठिकाव",
    logout: "उड़ुंग (Log Out)",
    switchRole: "कामी बदल",

    roleAdmin: "प्रशासक (Admin)",
    roleTeacher: "मास्टर गोमके (Teacher)",
    roleStudent: "गिदरा / चेदोःनी (Student)",
    adminSubtitle: "बीआरसी / जिला अधिकारी",
    teacherSubtitle: "इस्कुल मास्टर गोमके",
    studentSubtitle: "हो गिदरा को",
    loginTitle: "जनभाषा रे बोलोः पे",
    loginSubtitle: "आपन कामी बाछाव केते चेद-पाड़ाव रे बोलोः पे",
    loginBtn: "डैशबोर्ड रे बोलोः पे",
    demoLogin: "मियद-क्लिक डेमो लॉगिन",
    enterId: "आईडी / फोन नंबर ओओल पे",
    enterPin: "४-अंक पिन ओओल पे",
    selectAvatar: "गिदरा रूप बाछाव पे",
    selectClass: "चानच बाछाव पे",
    welcomeBack: "जोहार! हिजुः पे",
    loggedAs: "लॉगिन भूमिका",

    navHome: "ओड़ाः (Home)",
    navTranslate: "अनुवाद",
    navLessons: "पाड़ाव",
    navFlashcards: "कार्ड",
    navWorksheets: "वर्कशीट",
    navAssessments: "लेका",
    navHistory: "इतिहास",
    navSettings: "सेटिंग्स",
    navAdmin: "प्रशासन",
    navLanguage: "पारसी (Lang)",

    welcomeTeacher: "जोहार, मास्टर गोमके",
    welcomeAdmin: "जोहार, जिला अधिकारी गोमके",
    welcomeStudent: "जोहार, दुलार गिदरा!",
    teacherHeroDesc: "हिन्दी ते पढ़ाव पे। गिदरा हो पारसी ते बुझौवा।",
    studentHeroDesc: "आपन हो पारसी ते काहनी, लेका आर काजी चेदोः पे!",
    adminHeroDesc: "कोल्हान जिला एफएलएन आर हो पारसी रिपोर्ट",
    quickActionsTitle: "इस्कुल चेद-पाड़ाव मॉड्यूल को",
    activeLanguage: "सक्रिय हो पारसी",
    changeLanguage: "पारसी बदल पे",
    starsCollected: "नामो इपिल को (Stars)",
    dailyGoal: "तेहेंगे चेदोः लेका",

    voiceTranslateTitle: "सजीव आय्युम अनुवाद",
    voiceTranslateDesc: "हिन्दी ↔ हो पारसी सजीव अनुवाद",
    lessonsTitle: "हो पाड़ाव पुथी",
    lessonsDesc: "चानच १-५ बुनियादी पाड़ाव",
    worksheetsTitle: "कामी-साकम (Worksheets)",
    worksheetsDesc: "लेका आर ओओल अभ्यास",
    flashcardsTitle: "चितार फ्लैशकार्ड",
    flashcardsDesc: "३डी फ्लिप कार्ड आर आय्युम उच्चारण",
    assessmentsTitle: "निपुण लेका-जांच",
    assessmentsDesc: "निपुण भारत एफएलएन जांच",
    historyTitle: "अनुवाद इतिहास",
    historyDesc: "माड़ांग रेयाः काजी साकम",
    adminTitle: "प्रशासनिक डैशबोर्ड",
    adminDesc: "इस्कुल नेल-काजी आर रिपोर्ट",
    settingsTitle: "ऐप सेटिंग्स",
    settingsDesc: "ऑफलाइन पारसी पैक आर आय्युम गति",
    languageSelectTitle: "पारसी बाछाव पे",
    languageSelectSubtitle: "ऐप पारसी आर गिदरा आपन पारसी बाछाव पे",
    appDisplayLangTitle: "ऐप पारसी (UI Language)",
    learnerMotherTongueTitle: "गिदरा आपन पारसी (Mother Tongue)",

    teacherHindiCard: "मास्टर गोमके (हिन्दी)",
    learnerTribalCard: "गिदरा (हो पारसी)",
    tapToSpeak: "काजी लागी माइक जोटेद पे",
    listening: "आय्युम ताना...",
    speaking: "काजी ताना...",
    audioSpeed: "आय्युम गति",
    clearHistoryConfirm: "सबेन इतिहास मेटाय गेया?",
    presetPhrases: "इस्कुल रेयाः आम काजी को",
    copySuccess: "कॉपी हुयुअना!",
    swapLanguages: "पारसी बदल पे (⇄)",

    lessonClass2Math: "चानच २ • लेका (Maths)",
    additionTitle: "पाड़ाव १: लेका-जोड़ाव (Addition)",
    explanationHeading: "अवधारणा बुझौव",
    interactiveActivity: "लेका-जोड़ाव कामी",
    addApplesInstruction: "बारिया खांची रेयाः सेब लेका केते मिसा पे:",
    practiceQuestions: "अभ्यास कुली को",
    checkAnswer: "उत्तर नेल पे",
    correctAnswer: "बेश! उत्तर बेस गेया! 🎉",
    tryAgain: "आर मिसा लेका पे।",
    totalSum: "सबेन मिसा-ते",

    tapCardToFlip: "हो पारसी नेल लागी कार्ड जोटेद पे",
    frontHindi: "हिन्दी आर अंग्रेजी",
    backTribal: "हो पारसी आर उच्चारण",
    meaning: "मुतालिक / अर्थ",
    exampleSentence: "काजी बानौव",
    categoryAll: "सबेन",
    categoryFruits: "जोः को (Fruits)",
    categoryAnimals: "जीव-जंतु (Animals)",
    categoryNature: "सिरिजन (Nature)",
    categoryNumbers: "लेका को (Numbers)",
    categoryClassroom: "इस्कुल (Classroom)",

    worksheetFilters: "पाड़ाव अनुसार बाछाव",
    printableSheet: "छापा कामी-साकम",
    nipunCompetencies: "निपुण भारत दक्षता",
    studentsTested: "जांच लेना गिदरा को",
    oralTesting: "काजी-जांच मोड",
    passScore: "लक्ष्य अंक",

    totalSchools: "सबेन इस्कुल को",
    activeTeachers: "मास्टर गोमके को",
    studentsAssessed: "जांच लेना गिदरा को",
    flnIndex: "एफएलएन दक्षता सूचकांक",
    offlineSyncRate: "ऑफलाइन सिंक दर",
    schoolDirectory: "इस्कुल रिपोर्ट तालिका",
    syncLanguagePacks: "इस्कुल को रे पारसी पैक कुल पे",
    packsSyncSuccess: "४८ इस्कुल टेबलेट रे हो पारसी पैक सेनोअना!",
    districtReport: "जिला हो पारसी शिक्षा रिपोर्ट"
  },

  // Mundari (मुंडारी भाषा)
  mundari: {
    appName: "जनभाषा (मुंडारी)",
    appTagline: "मुंडा होनाको लागी आपन जगार सेतुम",
    appMission: "मास्टर गोमके हिन्दी ते काजी रे, होनाको मुंडारी जगार ते आय्युम-ए।",
    offlineMode: "ऑफलाइन मोड",
    onlineMode: "ऑनलाइन मोड",
    step: "धाप",
    of: "रेयाः",
    continue: "माड़ांग ते सेनोः",
    back: "तायोम",
    save: "सांचाय",
    cancel: "कागे",
    selected: "बाछावकाना",
    download: "डाउनलोड",
    downloaded: "डाउनलोड हुयुअना",
    downloading: "डाउनलोड ताना...",
    loading: "लोड ताना...",
    searchPlaceholder: "पुथी, जगार, लेका नाम पे...",
    viewAll: "सबेन नेल पे",
    listenAudio: "आय्युम पे",
    stopAudio: "ठिकाव",
    logout: "उड़ुंग",
    switchRole: "कामी बदल",

    roleAdmin: "प्रशासक (Admin)",
    roleTeacher: "मास्टर गोमके (Teacher)",
    roleStudent: "होनाको / चेदोःनी (Student)",
    adminSubtitle: "बीआरसी / खूंटी जिला अधिकारी",
    teacherSubtitle: "इस्कुल मास्टर गोमके",
    studentSubtitle: "मुंडा होनाको",
    loginTitle: "जनभाषा रे बोलोः पे",
    loginSubtitle: "आपन कामी बाछाव केते चेद-पाड़ाव रे बोलोः पे",
    loginBtn: "डैशबोर्ड रे बोलोः पे",
    demoLogin: "त्वरित डेमो लॉगिन",
    enterId: "आईडी / फोन नंबर ओओल पे",
    enterPin: "४-अंक पिन ओओल पे",
    selectAvatar: "होनाको रूप बाछाव पे",
    selectClass: "चानच बाछाव पे",
    welcomeBack: "जोहार! हिजुः पे",
    loggedAs: "लॉगिन भूमिका",

    navHome: "ओड़ाः",
    navTranslate: "अनुवाद",
    navLessons: "पाड़ाव",
    navFlashcards: "कार्ड",
    navWorksheets: "वर्कशीट",
    navAssessments: "लेका",
    navHistory: "इतिहास",
    navSettings: "सेटिंग्स",
    navAdmin: "प्रशासन",
    navLanguage: "जगार (Lang)",

    welcomeTeacher: "जोहार, मास्टर गोमके",
    welcomeAdmin: "जोहार, जिला अधिकारी गोमके",
    welcomeStudent: "जोहार, दुलार होनाको!",
    teacherHeroDesc: "हिन्दी ते पढ़ाव पे। होनाको मुंडारी जगार ते बुझौवा।",
    studentHeroDesc: "आपन मुंडारी जगार ते काहनी, लेका आर जगार चेदोः पे!",
    adminHeroDesc: "खूंटी जिला एफएलएन आर मुंडारी जगार रिपोर्ट",
    quickActionsTitle: "इस्कुल चेद-पाड़ाव मॉड्यूल को",
    activeLanguage: "सक्रिय मुंडारी जगार",
    changeLanguage: "जगार बदल पे",
    starsCollected: "नामो इपिल को (Stars)",
    dailyGoal: "तेहेंगे चेदोः लेका",

    voiceTranslateTitle: "सजीव आय्युम अनुवाद",
    voiceTranslateDesc: "हिन्दी ↔ मुंडारी जगार सजीव अनुवाद",
    lessonsTitle: "मुंडारी पाड़ाव पुथी",
    lessonsDesc: "चानच १-५ बुनियादी पाड़ाव",
    worksheetsTitle: "कामी-साकम (Worksheets)",
    worksheetsDesc: "लेका आर ओओल अभ्यास",
    flashcardsTitle: "चितार फ्लैशकार्ड",
    flashcardsDesc: "३डी फ्लिप कार्ड आर आय्युम उच्चारण",
    assessmentsTitle: "निपुण लेका-जांच",
    assessmentsDesc: "निपुण भारत एफएलएन जांच",
    historyTitle: "अनुवाद इतिहास",
    historyDesc: "माड़ांग रेयाः काजी साकम",
    adminTitle: "प्रशासनिक डैशबोर्ड",
    adminDesc: "इस्कुल नेल-काजी आर रिपोर्ट",
    settingsTitle: "ऐप सेटिंग्स",
    settingsDesc: "ऑफलाइन जगार पैक आर आय्युम गति",
    languageSelectTitle: "जगार बाछाव पे",
    languageSelectSubtitle: "ऐप जगार आर होनाको आपन जगार बाछाव पे",
    appDisplayLangTitle: "ऐप जगार (UI Language)",
    learnerMotherTongueTitle: "होनाको आपन जगार (Mother Tongue)",

    teacherHindiCard: "मास्टर गोमके (हिन्दी)",
    learnerTribalCard: "होनाको (मुंडारी जगार)",
    tapToSpeak: "काजी लागी माइक जोटेद पे",
    listening: "आय्युम ताना...",
    speaking: "काजी ताना...",
    audioSpeed: "आय्युम गति",
    clearHistoryConfirm: "सबेन इतिहास मेटाय गेया?",
    presetPhrases: "इस्कुल रेयाः आम काजी को",
    copySuccess: "कॉपी हुयुअना!",
    swapLanguages: "जगार बदल पे (⇄)",

    lessonClass2Math: "चानच २ • लेका",
    additionTitle: "पाड़ाव १: लेका-जोड़ाव (Addition)",
    explanationHeading: "अवधारणा बुझौव",
    interactiveActivity: "लेका-जोड़ाव कामी",
    addApplesInstruction: "बारिया खांची रेयाः सेब लेका केते मिसा पे:",
    practiceQuestions: "अभ्यास कुली को",
    checkAnswer: "उत्तर नेल पे",
    correctAnswer: "बेश! उत्तर बेस गेया! 🎉",
    tryAgain: "आर मिसा लेका पे।",
    totalSum: "सबेन मिसा-ते",

    tapCardToFlip: "मुंडारी जगार नेल लागी कार्ड जोटेद पे",
    frontHindi: "हिन्दी आर अंग्रेजी",
    backTribal: "मुंडारी जगार आर उच्चारण",
    meaning: "मुतालिक",
    exampleSentence: "काजी बानौव",
    categoryAll: "सबेन",
    categoryFruits: "जोः को",
    categoryAnimals: "जीव-जंतु",
    categoryNature: "सिरिजन",
    categoryNumbers: "लेका को",
    categoryClassroom: "इस्कुल",

    worksheetFilters: "पाड़ाव अनुसार बाछाव",
    printableSheet: "छापा कामी-साकम",
    nipunCompetencies: "निपुण भारत दक्षता",
    studentsTested: "जांच लेना होनाको",
    oralTesting: "काजी-जांच मोड",
    passScore: "लक्ष्य अंक",

    totalSchools: "सबेन इस्कुल को",
    activeTeachers: "मास्टर गोमके को",
    studentsAssessed: "जांच लेना होनाको",
    flnIndex: "एफएलएन दक्षता सूचकांक",
    offlineSyncRate: "ऑफलाइन सिंक दर",
    schoolDirectory: "इस्कुल रिपोर्ट तालिका",
    syncLanguagePacks: "इस्कुल को रे जगार पैक कुल पे",
    packsSyncSuccess: "४८ इस्कुल टेबलेट रे मुंडारी पैक सेनोअना!",
    districtReport: "जिला मुंडारी शिक्षा रिपोर्ट"
  },

  // Santhali (संताली - ᱥᱟᱱᱛᱟᱲᱤ)
  santhali: {
    appName: "ᱡᱟᱱᱵᱷᱟᱥᱟ (ᱥᱟᱱᱛᱟᱲᱤ)",
    appTagline: "ᱥᱟᱱᱛᱟᱲ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱞᱟᱹᱜᱤᱫ ᱟᱭᱳ ᱟᱲᱟᱝ ᱥᱮᱪᱮᱫ ᱯᱚᱞ",
    appMission: "ᱜᱩᱨᱩᱡᱤ ᱦᱤᱱᱫᱤ ᱛᱮ ᱨᱚᱲ ᱡᱚᱠᱷᱮᱡ, ᱜᱤᱫᱽᱨᱟᱹ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱟᱧᱡᱚᱢ-ᱟ᱾",
    offlineMode: "ᱚᱯᱷᱞᱟᱭᱤᱱ ᱢᱳᱰ (Offline)",
    onlineMode: "ᱚᱱᱞᱟᱭᱤᱱ ᱢᱳᱰ",
    step: "ᱫᱷᱟᱯ",
    of: "ᱨᱮᱱᱟᱜ",
    continue: "ᱞᱟᱦᱟᱜ ᱢᱮ",
    back: "ᱛᱟᱭᱚᱢ",
    save: "ᱥᱟᱺᱪᱟᱣ",
    cancel: "ᱵᱟᱝ",
    selected: "ᱵᱟᱪᱷᱟᱣ ᱮᱱᱟ",
    download: "ᱰᱟᱣᱩᱱᱞᱳᱰ",
    downloaded: "ᱰᱟᱣᱩᱱᱞᱳᱰ ᱮᱱᱟ",
    downloading: "ᱰᱟᱣᱩᱱᱞᱳᱰᱚᱜ ᱠᱟᱱᱟ...",
    loading: "ᱞᱳᱰᱚᱜ ᱠᱟᱱᱟ...",
    searchPlaceholder: "ᱯᱩᱛᱷᱤ, ᱟᱲᱟᱝ, ᱞᱮᱠᱷᱟ ᱯᱟᱱᱛᱮ...",
    viewAll: "ᱥᱟᱱᱟᱢ ᱧᱮᱞ ᱢᱮ",
    listenAudio: "ᱟᱧᱡᱚᱢ ᱢᱮ",
    stopAudio: "ᱛᱷᱤᱨ",
    logout: "ᱵᱟᱦᱨᱮ (Log Out)",
    switchRole: "ᱠᱟᱹᱢᱤ ᱵᱚᱫᱚᱞ",

    roleAdmin: "ᱥᱟᱥᱚᱱᱤᱭᱟᱹ (Admin)",
    roleTeacher: "ᱢᱟᱪᱮᱛ / ᱜᱩᱨᱩᱡᱤ (Teacher)",
    roleStudent: "ᱜᱤᱫᱽᱨᱟᱹ / ᱪᱮᱛᱮᱫᱤᱭᱟᱹ (Student)",
    adminSubtitle: "ᱵᱤ.ᱟᱨ.ᱥᱤ / ᱡᱤᱞᱟᱹ ᱥᱮᱪᱮᱫ ᱟᱹᱢᱟᱹᱞᱤ",
    teacherSubtitle: "ᱟᱥᱲᱟ ᱢᱟᱪᱮᱛ ᱜᱚᱢᱠᱮ",
    studentSubtitle: "ᱥᱟᱱᱛᱟᱲ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ",
    loginTitle: "ᱡᱟᱱᱵᱷᱟᱥᱟ ᱨᱮ ᱵᱚᱞᱚᱱ ᱢᱮ",
    loginSubtitle: "ᱟᱢᱟᱜ ᱠᱟᱹᱢᱤ ᱵᱟᱪᱷᱟᱣ ᱠᱟᱛᱮ ᱥᱮᱪᱮᱫ ᱨᱮ ᱵᱚᱞᱚᱱ ᱢᱮ",
    loginBtn: "ᱰᱮᱥᱵᱳᱨᱰ ᱨᱮ ᱵᱚᱞᱚᱱ ᱢᱮ",
    demoLogin: "ᱢᱤᱫ-ᱠᱞᱤᱠ ᱰᱮᱢᱳ ᱞᱚᱜᱤᱱ",
    enterId: "ᱟᱭᱰᱤ / ᱯᱷᱳᱱ ᱱᱚᱢᱵᱚᱨ ᱚᱞ ᱢᱮ",
    enterPin: "᱔-ᱮᱞ ᱯᱤᱱ ᱚᱞ ᱢᱮ",
    selectAvatar: "ᱜᱤᱫᱽᱨᱟᱹ ᱪᱤᱛᱟᱹᱨ ᱵᱟᱪᱷᱟᱣ ᱢᱮ",
    selectClass: "ᱪᱟᱱᱟᱪ ᱵᱟᱪᱷᱟᱣ ᱢᱮ",
    welcomeBack: "ᱡᱚᱦᱟᱨ! ᱦᱤᱡᱩᱜ ᱢᱮ",
    loggedAs: "ᱞᱚᱜᱤᱱ ᱴᱷᱟᱶ",

    navHome: "ᱚᱲᱟᱜ (Home)",
    navTranslate: "ᱛᱚᱨᱡᱚᱢᱟ",
    navLessons: "ᱯᱟᱲᱦᱟᱣ",
    navFlashcards: "ᱠᱟᱨᱰ",
    navWorksheets: "ᱣᱟᱨᱠᱥᱤᱴ",
    navAssessments: "ᱞᱮᱠᱷᱟ-ᱡᱟᱸᱪ",
    navHistory: "ᱱᱟᱜᱟᱢ",
    navSettings: "ᱥᱟᱡᱟᱣ",
    navAdmin: "ᱥᱟᱥᱚᱱ",
    navLanguage: "ᱯᱟᱹᱨᱥᱤ",

    welcomeTeacher: "ᱡᱚᱦᱟᱨ, ᱢᱟᱪᱮᱛ ᱜᱚᱢᱠᱮ",
    welcomeAdmin: "ᱡᱚᱦᱟᱨ, ᱡᱤᱞᱟᱹ ᱟᱹᱢᱟᱹᱞᱤ ᱜᱚᱢᱠᱮ",
    welcomeStudent: "ᱡᱚᱦᱟᱨ, ᱫᱩᱞᱟᱹᱲ ᱜᱤᱫᱽᱨᱟᱹ!",
    teacherHeroDesc: "ᱦᱤᱱᱫᱤ ᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱢᱮ᱾ ᱜᱤᱫᱽᱨᱟᱹ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱵᱩᱡᱷᱟᱹᱣ-ᱟ᱾",
    studentHeroDesc: "ᱟᱢᱟᱜ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱠᱟᱹᱦᱱᱤ, ᱞᱮᱠᱷᱟ ᱟᱨ ᱟᱲᱟᱝ ᱪᱮᱫᱚᱜ ᱢᱮ!",
    adminHeroDesc: "ᱥᱟᱱᱛᱟᱲ ᱯᱟᱨᱜᱟᱱᱟ ᱮᱯᱷ.ᱮᱞ.ᱮᱱ ᱨᱤᱯᱳᱨᱴ",
    quickActionsTitle: "ᱟᱥᱲᱟ ᱥᱮᱪᱮᱫ ᱢᱳᱰᱩᱞ ᱠᱚ",
    activeLanguage: "ᱥᱟᱱᱛᱟᱲᱤ ᱯᱟᱹᱨᱥᱤ (Ol Chiki)",
    changeLanguage: "ᱯᱟᱹᱨᱥᱤ ᱵᱚᱫᱚᱞ",
    starsCollected: "ᱧᱟᱢ ᱟᱠᱟᱱ ᱤᱯᱤᱞ ᱠᱚ",
    dailyGoal: "ᱛᱮᱦᱮᱧ ᱪᱮᱫᱚᱜ ᱞᱮᱠᱷᱟ",

    voiceTranslateTitle: "ᱞᱟᱭᱤᱵᱷ ᱟᱲᱟᱝ ᱛᱚᱨᱡᱚᱢᱟ",
    voiceTranslateDesc: "ᱦᱤᱱᱫᱤ ↔ ᱥᱟᱱᱛᱟᱲᱤ ᱞᱟᱭᱤᱵᱷ ᱛᱚᱨᱡᱚᱢᱟ",
    lessonsTitle: "ᱥᱟᱱᱛᱟᱲᱤ ᱯᱟᱲᱦᱟᱣ ᱯᱩᱛᱷᱤ",
    lessonsDesc: "ᱪᱟᱱᱟᱪ ᱑-᱕ ᱥᱮᱪᱮᱫ ᱯᱟᱲᱦᱟᱣ",
    worksheetsTitle: "ᱠᱟᱹᱢᱤ-ᱥᱟᱠᱟᱢ",
    worksheetsDesc: "ᱞᱮᱠᱷᱟ ᱟᱨ ᱚᱞ ᱠᱟᱹᱢᱤ",
    flashcardsTitle: "ᱪᱤᱛᱟᱹᱨ ᱯᱷᱞᱮᱥᱠᱟᱨᱰ",
    flashcardsDesc: "᱓ᱰᱤ ᱯᱷᱞᱤᱯ ᱠᱟᱨᱰ ᱟᱨ ᱨᱚᱲ ᱟᱧᱡᱚᱢ",
    assessmentsTitle: "ᱱᱤᱯᱩᱱ ᱵᱤᱰᱟᱹᱣ",
    assessmentsDesc: "ᱱᱤᱯᱩᱱ ᱵᱷᱟᱨᱚᱛ ᱮᱯᱷ.ᱮᱞ.ᱮᱱ ᱡᱟᱸᱪ",
    historyTitle: "ᱛᱚᱨᱡᱚᱢᱟ ᱱᱟᱜᱟᱢ",
    historyDesc: "ᱞᱟᱦᱟ ᱨᱮᱱᱟᱜ ᱨᱚᱲ ᱨᱮᱠᱚᱨᱰ",
    adminTitle: "ᱥᱟᱥᱚᱱ ᱰᱮᱥᱵᱳᱨᱰ",
    adminDesc: "ᱟᱥᱲᱟ ᱞᱮᱠᱷᱟ ᱟᱨ ᱨᱤᱯᱳᱨᱴ",
    settingsTitle: "ᱮᱯ ᱥᱟᱡᱟᱣ",
    settingsDesc: "ᱚᱯᱷᱞᱟᱭᱤᱱ ᱯᱟᱹᱨᱥᱤ ᱯᱮᱠ ᱟᱨ ᱟᱲᱟᱝ ᱜᱚᱛᱤ",
    languageSelectTitle: "ᱯᱟᱹᱨᱥᱤ ᱵᱟᱪᱷᱟᱣ ᱢᱮ",
    languageSelectSubtitle: "ᱮᱯ ᱯᱟᱹᱨᱥᱤ ᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱟᱭᱳ ᱟᱲᱟᱝ ᱵᱟᱪᱷᱟᱣ ᱢᱮ",
    appDisplayLangTitle: "ᱮᱯ ᱯᱟᱹᱨᱥᱤ (UI Language)",
    learnerMotherTongueTitle: "ᱜᱤᱫᱽᱨᱟᱹ ᱟᱭᱳ ᱟᱲᱟᱝ (Mother Tongue)",

    teacherHindiCard: "ᱢᱟᱪᱮᱛ (ᱦᱤᱱᱫᱤ)",
    learnerTribalCard: "ᱜᱤᱫᱽᱨᱟᱹ (ᱥᱟᱱᱛᱟᱲᱤ)",
    tapToSpeak: "ᱨᱚᱲ ᱞᱟᱹᱜᱤᱫ ᱢᱟᱭᱤᱠ ᱚᱛᱟᱭ ᱢᱮ",
    listening: "ᱟᱧᱡᱚᱢᱚᱜ ᱠᱟᱱᱟ...",
    speaking: "ᱨᱚᱲ ᱮᱫᱟᱭ...",
    audioSpeed: "ᱟᱲᱟᱝ ᱜᱚᱛᱤ",
    clearHistoryConfirm: "ᱥᱟᱱᱟᱢ ᱱᱟᱜᱟᱢ ᱢᱮᱴᱟᱣ ᱜᱮᱭᱟ?",
    presetPhrases: "ᱟᱥᱲᱟ ᱨᱮᱱᱟᱜ ᱟᱲᱟᱝ ᱠᱚ",
    copySuccess: "ᱠᱚᱯᱤ ᱮᱱᱟ!",
    swapLanguages: "ᱯᱟᱹᱨᱥᱤ ᱵᱚᱫᱚᱞ (⇄)",

    lessonClass2Math: "ᱪᱟᱱᱟᱪ ᱒ • ᱞᱮᱠᱷᱟ (Maths)",
    additionTitle: "ᱯᱟᱲᱦᱟᱣ ᱑: ᱞᱮᱠᱷᱟ-ᱢᱮᱥᱟ (Addition)",
    explanationHeading: "ᱵᱩᱡᱷᱟᱹᱣ ᱥᱮᱪᱮᱫ",
    interactiveActivity: "ᱞᱮᱠᱷᱟ-ᱢᱮᱥᱟ ᱠᱟᱹᱢᱤ",
    addApplesInstruction: "ᱵᱟᱨᱭᱟ ᱴᱩᱠᱨᱤ ᱨᱮᱱᱟᱜ ᱥᱮᱣ ᱞᱮᱠᱷᱟ ᱠᱟᱛᱮ ᱢᱮᱥᱟᱭ ᱢᱮ:",
    practiceQuestions: "ᱯᱨᱮᱠᱴᱤᱥ ᱠᱩᱠᱞᱤ ᱠᱚ",
    checkAnswer: "ᱛᱮᱞᱟ ᱧᱮᱞ ᱢᱮ",
    correctAnswer: "ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ! ᱛᱮᱞᱟ ᱥᱟᱹᱨᱤ ᱜᱮᱭᱟ! 🎉",
    tryAgain: "ᱟᱨ ᱢᱤᱫ ᱫᱷᱟᱣ ᱞᱮᱠᱷᱟᱭ ᱢᱮ᱾",
    totalSum: "ᱥᱟᱱᱟᱢ ᱢᱮᱥᱟ ᱛᱮ",

    tapCardToFlip: "ᱥᱟᱱᱛᱟᱲᱤ ᱧᱮᱞ ᱞᱟᱹᱜᱤᱫ ᱠᱟᱨᱰ ᱚᱛᱟᱭ ᱢᱮ",
    frontHindi: "ᱦᱤᱱᱫᱤ ᱟᱨ ᱤᱝᱞᱤᱥ",
    backTribal: "ᱥᱟᱱᱛᱟᱲᱤ ᱟᱨ ᱨᱚᱲ",
    meaning: "ᱢᱮᱱᱮᱛ",
    exampleSentence: "ᱟᱹᱭᱟᱹᱛ ᱵᱮᱱᱟᱣ",
    categoryAll: "ᱥᱟᱱᱟᱢ",
    categoryFruits: "ᱡᱚ (Fruits)",
    categoryAnimals: "ᱡᱤᱵᱽ-ᱡᱤᱭᱟᱹᱞᱤ",
    categoryNature: "ᱥᱤᱨᱡᱚᱱ",
    categoryNumbers: "ᱮᱞ (Numbers)",
    categoryClassroom: "ᱟᱥᱲᱟ (Classroom)",

    worksheetFilters: "ᱥᱟᱛᱟᱢ ᱞᱮᱠᱟᱛᱮ ᱵᱟᱪᱷᱟᱣ",
    printableSheet: "ᱪᱷᱟᱯᱟ ᱠᱟᱹᱢᱤ-ᱥᱟᱠᱟᱢ",
    nipunCompetencies: "ᱱᱤᱯᱩᱱ ᱵᱷᱟᱨᱚᱛ ᱫᱟᱲᱮ",
    studentsTested: "ᱵᱤᱰᱟᱹᱣ ᱟᱠᱟᱱ ᱜᱤᱫᱽᱨᱟᱹ",
    oralTesting: "ᱨᱚᱲ-ᱵᱤᱰᱟᱹᱣ ᱢᱳᱰ",
    passScore: "ᱴᱟᱨᱜᱮᱴ ᱮᱞ",

    totalSchools: "ᱥᱟᱱᱟᱢ ᱟᱥᱲᱟ ᱠᱚ",
    activeTeachers: "ᱢᱟᱪᱮᱛ ᱠᱚ",
    studentsAssessed: "ᱵᱤᱰᱟᱹᱣ ᱟᱠᱟᱱ ᱜᱤᱫᱽᱨᱟᱹ",
    flnIndex: "ᱮᱯᱷ.ᱮᱞ.ᱮᱱ ᱥᱩᱪᱚᱠ",
    offlineSyncRate: "ᱚᱯᱷᱞᱟᱭᱤᱱ ᱥᱤᱝᱠ ᱫᱚᱨ",
    schoolDirectory: "ᱟᱥᱲᱟ ᱨᱤᱯᱳᱨᱴ ᱛᱟᱹᱞᱠᱟᱹ",
    syncLanguagePacks: "ᱟᱥᱲᱟ ᱠᱚ ᱨᱮ ᱯᱟᱹᱨᱥᱤ ᱯᱮᱠ ᱠᱩᱞ ᱢᱮ",
    packsSyncSuccess: "᱔᱘ ᱟᱥᱲᱟ ᱴᱮᱵᱽᱞᱮᱴ ᱨᱮ ᱯᱟᱹᱨᱥᱤ ᱯᱮᱠ ᱥᱮᱴᱮᱨ ᱮᱱᱟ!",
    districtReport: "ᱡᱤᱞᱟᱹ ᱥᱟᱱᱛᱟᱲᱤ ᱥᱮᱪᱮᱫ ᱨᱤᱯᱳᱨᱴ"
  },

  // Gondi (गोंडी भाषा)
  gondi: {
    appName: "जनभाषा (गोंडी भाषा)",
    appTagline: "कोया पुनेम नेंड माट आपन गोटी चेदकट",
    appMission: "गुरूजी हिन्दी ते वेहतोर, पिल्लुर गोंडी गोटी ते केंजतोर।",
    offlineMode: "ऑफलाइन मोड",
    onlineMode: "ऑनलाइन मोड",
    step: "धाप",
    of: "ना",
    continue: "मुन्ने दायका",
    back: "पजा",
    save: "सांचाय",
    cancel: "हले",
    selected: "बाछाव कीता",
    download: "डाउनलोड",
    downloaded: "डाउनलोड आता",
    downloading: "डाउनलोड आता...",
    loading: "लोड आता...",
    searchPlaceholder: "पोथी, गोटी, लेका पस्तोर...",
    viewAll: "सब्वे नेंड सूर",
    listenAudio: "केंज",
    stopAudio: "थिर",
    logout: "पेसी (Log Out)",
    switchRole: "कामी बदल",

    roleAdmin: "प्रशासक (Admin)",
    roleTeacher: "गुरूजी / मास्टर (Teacher)",
    roleStudent: "पिल्लुर / चेदोःनी (Student)",
    adminSubtitle: "बीआरसी / बस्तर जिला अधिकारी",
    teacherSubtitle: "शाला गुरूजी गोमके",
    studentSubtitle: "गोंड पिल्लुर",
    loginTitle: "जनभाषा ते बोलोः कीकट",
    loginSubtitle: "आपन कामी बाछाव कीसी पाड़ाव ते बोलोः कीकट",
    loginBtn: "डैशबोर्ड ते बोलोः कीकट",
    demoLogin: "मियद-क्लिक डेमो लॉगिन",
    enterId: "आईडी / फोन नंबर ओओल कीकट",
    enterPin: "४-अंक पिन ओओल कीकट",
    selectAvatar: "पिल्लुर रूप बाछाव कीकट",
    selectClass: "चानच बाछाव कीकट",
    welcomeBack: "सेवा जोहार! वाड़ा",
    loggedAs: "लॉगिन भूमिका",

    navHome: "रोन (Home)",
    navTranslate: "अनुवाद",
    navLessons: "पाड़ाव",
    navFlashcards: "कार्ड",
    navWorksheets: "वर्कशीट",
    navAssessments: "लेका",
    navHistory: "इतिहास",
    navSettings: "सेटिंग्स",
    navAdmin: "प्रशासन",
    navLanguage: "गोटी (Lang)",

    welcomeTeacher: "सेवा जोहार, गुरूजी",
    welcomeAdmin: "सेवा जोहार, जिला अधिकारी",
    welcomeStudent: "सेवा जोहार, दुलार पिल्लुर!",
    teacherHeroDesc: "हिन्दी ते पढ़ाव कीकट। पिल्लुर गोंडी गोटी ते बुझायतोर।",
    studentHeroDesc: "आपन गोंडी गोटी ते काहनी, लेका आर गोटी चेदकट!",
    adminHeroDesc: "बस्तर जिला एफएलएन आर गोंडी गोटी रिपोर्ट",
    quickActionsTitle: "शाला चेद-पाड़ाव मॉड्यूल को",
    activeLanguage: "सक्रिय गोंडी गोटी",
    changeLanguage: "गोटी बदल कीकट",
    starsCollected: "नामो इपिल को (Stars)",
    dailyGoal: "नेंड चेदोः लेका",

    voiceTranslateTitle: "सजीव केंज अनुवाद",
    voiceTranslateDesc: "हिन्दी ↔ गोंडी गोटी सजीव अनुवाद",
    lessonsTitle: "गोंडी पाड़ाव पोथी",
    lessonsDesc: "चानच १-५ बुनियादी पाड़ाव",
    worksheetsTitle: "कामी-साकम (Worksheets)",
    worksheetsDesc: "लेका आर ओओल अभ्यास",
    flashcardsTitle: "चितार फ्लैशकार्ड",
    flashcardsDesc: "३डी फ्लिप कार्ड आर केंज उच्चारण",
    assessmentsTitle: "निपुण लेका-जांच",
    assessmentsDesc: "निपुण भारत एफएलएन जांच",
    historyTitle: "अनुवाद इतिहास",
    historyDesc: "माड़ांग ना गोटी साकम",
    adminTitle: "प्रशासनिक डैशबोर्ड",
    adminDesc: "शाला नेल-गोटी आर रिपोर्ट",
    settingsTitle: "ऐप सेटिंग्स",
    settingsDesc: "ऑफलाइन गोटी पैक आर केंज गति",
    languageSelectTitle: "गोटी बाछाव कीकट",
    languageSelectSubtitle: "ऐप गोटी आर पिल्लुर आपन गोटी बाछाव कीकट",
    appDisplayLangTitle: "ऐप गोटी (UI Language)",
    learnerMotherTongueTitle: "पिल्लुर आपन गोटी (Mother Tongue)",

    teacherHindiCard: "गुरूजी (हिन्दी)",
    learnerTribalCard: "पिल्लुर (गोंडी गोटी)",
    tapToSpeak: "गोटी लागी माइक जोटेद कीकट",
    listening: "केंज ताना...",
    speaking: "वेहतोर...",
    audioSpeed: "केंज गति",
    clearHistoryConfirm: "सब्वे इतिहास मेटाय कीकट?",
    presetPhrases: "शाला ना आम गोटी को",
    copySuccess: "कॉपी आता!",
    swapLanguages: "गोटी बदल कीकट (⇄)",

    lessonClass2Math: "चानच २ • लेका",
    additionTitle: "पाड़ाव १: जोड़ कीकट (Addition)",
    explanationHeading: "अवधारणा बुझाय",
    interactiveActivity: "लेका-जोड़ कामी",
    addApplesInstruction: "रंड खांची ना सेब लेका कीसी मिसाय कीकट:",
    practiceQuestions: "अभ्यास कुली को",
    checkAnswer: "उत्तर नेल कीकट",
    correctAnswer: "बेश! उत्तर बेस आता! 🎉",
    tryAgain: "आर मिसा लेका कीकट।",
    totalSum: "सब्वे मिसाय-ते",

    tapCardToFlip: "गोंडी गोटी नेल लागी कार्ड जोटेद कीकट",
    frontHindi: "हिन्दी आर अंग्रेजी",
    backTribal: "गोंडी गोटी आर उच्चारण",
    meaning: "अर्थ",
    exampleSentence: "गोटी बानौव",
    categoryAll: "सब्वे",
    categoryFruits: "फळ (Fruits)",
    categoryAnimals: "मर्का / जंतु",
    categoryNature: "सिरिजन",
    categoryNumbers: "लेका को",
    categoryClassroom: "शाला",

    worksheetFilters: "पाड़ाव अनुसार बाछाव",
    printableSheet: "छापा कामी-साकम",
    nipunCompetencies: "निपुण भारत दक्षता",
    studentsTested: "जांच लेना पिल्लुर",
    oralTesting: "गोटी-जांच मोड",
    passScore: "लक्ष्य अंक",

    totalSchools: "सब्वे शाला को",
    activeTeachers: "गुरूजी को",
    studentsAssessed: "जांच लेना पिल्लुर",
    flnIndex: "एफएलएन दक्षता सूचकांक",
    offlineSyncRate: "ऑफलाइन सिंक दर",
    schoolDirectory: "शाला रिपोर्ट तालिका",
    syncLanguagePacks: "शाला को ते गोटी पैक कुल कीकट",
    packsSyncSuccess: "४८ शाला टेबलेट ते गोंडी पैक सेनोअना!",
    districtReport: "जिला गोंडी शिक्षा रिपोर्ट"
  },

  // Kurukh (कुड़ुख़ / उरांव भाषा)
  kurukh: {
    appName: "जनभाषा (कुड़ुख़ भाषा)",
    appTagline: "कुड़ुख़ खद्दर गही लागी तंगहै कत्था सेतुम",
    appMission: "मास्टर गोमके हिन्दी नू कछनखर, खद्दर कुड़ुख़ कत्था नू मेनर।",
    offlineMode: "ऑफलाइन मोड",
    onlineMode: "ऑनलाइन मोड",
    step: "धाप",
    of: "गही",
    continue: "मुन्दे काला",
    back: "खोहा",
    save: "सांचाय",
    cancel: "मला",
    selected: "बाछाव मंज्जा",
    download: "डाउनलोड",
    downloaded: "डाउनलोड मंज्जा",
    downloading: "डाउनलोड मनो लगिया...",
    loading: "लोड मनो लगिया...",
    searchPlaceholder: "पुथी, कत्था, लेका बिद्दार...",
    viewAll: "हूर्मिन एरा",
    listenAudio: "मेना",
    stopAudio: "थिर",
    logout: "उरखा (Log Out)",
    switchRole: "कामी बदल",

    roleAdmin: "प्रशासक (Admin)",
    roleTeacher: "मास्टर गोमके (Teacher)",
    roleStudent: "खद्दर / चेदोःनी (Student)",
    adminSubtitle: "बीआरसी / गुमला जिला अधिकारी",
    teacherSubtitle: "इस्कुल मास्टर गोमके",
    studentSubtitle: "कुड़ुख़ खद्दर",
    loginTitle: "जनभाषा नू बोलोः के",
    loginSubtitle: "तंगहै कामी बाछाव केते पाड़ाव नू बोलोः के",
    loginBtn: "डैशबोर्ड नू बोलोः के",
    demoLogin: "मियद-क्लिक डेमो लॉगिन",
    enterId: "आईडी / फोन नंबर टुड़ा",
    enterPin: "४-अंक पिन टुड़ा",
    selectAvatar: "खद्दर रूप बाछाव के",
    selectClass: "चानच बाछाव के",
    welcomeBack: "गोले जोहार! बरके",
    loggedAs: "लॉगिन भूमिका",

    navHome: "एर्पा (Home)",
    navTranslate: "अनुवाद",
    navLessons: "पाड़ाव",
    navFlashcards: "कार्ड",
    navWorksheets: "वर्कशीट",
    navAssessments: "लेका",
    navHistory: "इतिहास",
    navSettings: "सेटिंग्स",
    navAdmin: "प्रशासन",
    navLanguage: "कत्था (Lang)",

    welcomeTeacher: "गोले जोहार, मास्टर गोमके",
    welcomeAdmin: "गोले जोहार, जिला अधिकारी",
    welcomeStudent: "गोले जोहार, दुलार खद्दर!",
    teacherHeroDesc: "हिन्दी नू पढ़ाव के। खद्दर कुड़ुख़ कत्था नू बुझर्रर।",
    studentHeroDesc: "तंगहै कुड़ुख़ कत्था नू काहनी, लेका आर कत्था चेदके!",
    adminHeroDesc: "गुमला जिला एफएलएन आर कुड़ुख़ कत्था रिपोर्ट",
    quickActionsTitle: "इस्कुल चेद-पाड़ाव मॉड्यूल को",
    activeLanguage: "सक्रिय कुड़ुख़ कत्था",
    changeLanguage: "कत्था बदल के",
    starsCollected: "नामो इपिल को (Stars)",
    dailyGoal: "इन्ना चेदोः लेका",

    voiceTranslateTitle: "सजीव मेनना अनुवाद",
    voiceTranslateDesc: "हिन्दी ↔ कुड़ुख़ कत्था सजीव अनुवाद",
    lessonsTitle: "कुड़ुख़ पाड़ाव पुथी",
    lessonsDesc: "चानच १-५ बुनियादी पाड़ाव",
    worksheetsTitle: "कामी-साकम (Worksheets)",
    worksheetsDesc: "लेका आर टुड़ना अभ्यास",
    flashcardsTitle: "चितार फ्लैशकार्ड",
    flashcardsDesc: "३डी फ्लिप कार्ड आर मेनना उच्चारण",
    assessmentsTitle: "निपुण लेका-जांच",
    assessmentsDesc: "निपुण भारत एफएलएन जांच",
    historyTitle: "अनुवाद इतिहास",
    historyDesc: "माड़ांग गही कत्था साकम",
    adminTitle: "प्रशासनिक डैशबोर्ड",
    adminDesc: "इस्कुल एरा-कत्था आर रिपोर्ट",
    settingsTitle: "ऐप सेटिंग्स",
    settingsDesc: "ऑफलाइन कत्था पैक आर मेनना गति",
    languageSelectTitle: "कत्था बाछाव के",
    languageSelectSubtitle: "ऐप कत्था आर खद्दर तंगहै कत्था बाछाव के",
    appDisplayLangTitle: "ऐप कत्था (UI Language)",
    learnerMotherTongueTitle: "खद्दर तंगहै कत्था (Mother Tongue)",

    teacherHindiCard: "मास्टर गोमके (हिन्दी)",
    learnerTribalCard: "खद्दर (कुड़ुख़ कत्था)",
    tapToSpeak: "कछनखरा लागी माइक जोटेद के",
    listening: "मेनना लगिया...",
    speaking: "कछनखर लगिया...",
    audioSpeed: "मेनना गति",
    clearHistoryConfirm: "हूर्मिन इतिहास मेटाय गे?",
    presetPhrases: "इस्कुल गही आम कत्था को",
    copySuccess: "कॉपी मंज्जा!",
    swapLanguages: "कत्था बदल के (⇄)",

    lessonClass2Math: "चानच २ • लेका",
    additionTitle: "पाड़ाव १: जोड़ नन्ना (Addition)",
    explanationHeading: "अवधारणा बुझर्रना",
    interactiveActivity: "लेका-जोड़ कामी",
    addApplesInstruction: "एन्ड खांची गही सेब लेका केते मिसाय के:",
    practiceQuestions: "अभ्यास कुली को",
    checkAnswer: "उत्तर एरा",
    correctAnswer: "बेश! उत्तर बेस मंज्जा! 🎉",
    tryAgain: "आर मिसा लेका के।",
    totalSum: "हूर्मिन मिसाय-ते",

    tapCardToFlip: "कुड़ुख़ कत्था एरा लागी कार्ड जोटेद के",
    frontHindi: "हिन्दी आर अंग्रेजी",
    backTribal: "कुड़ुख़ कत्था आर उच्चारण",
    meaning: "अर्थ",
    exampleSentence: "कत्था बानौव",
    categoryAll: "हूर्मिन",
    categoryFruits: "जोः को",
    categoryAnimals: "जीव-जंतु",
    categoryNature: "सिरिजन",
    categoryNumbers: "लेका को",
    categoryClassroom: "इस्कुल",

    worksheetFilters: "पाड़ाव अनुसार बाछाव",
    printableSheet: "छापा कामी-साकम",
    nipunCompetencies: "निपुण भारत दक्षता",
    studentsTested: "जांच मंज्जा खद्दर",
    oralTesting: "कत्था-जांच मोड",
    passScore: "लक्ष्य अंक",

    totalSchools: "हूर्मिन इस्कुल को",
    activeTeachers: "मास्टर गोमके को",
    studentsAssessed: "जांच मंज्जा खद्दर",
    flnIndex: "एफएलएन दक्षता सूचकांक",
    offlineSyncRate: "ऑफलाइन सिंक दर",
    schoolDirectory: "इस्कुल रिपोर्ट तालिका",
    syncLanguagePacks: "इस्कुल को नू कत्था पैक कुल के",
    packsSyncSuccess: "४८ इस्कुल टेबलेट नू कुड़ुख़ पैक सेनोअना!",
    districtReport: "जिला कुड़ुख़ शिक्षा रिपोर्ट"
  }
};
