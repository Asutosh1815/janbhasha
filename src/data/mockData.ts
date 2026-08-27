import { TribalLanguage, LessonContent, WorksheetItem, FlashcardItem, AssessmentItem, TranslationRecord, OfflinePack } from '../types';

export const LANGUAGES: TribalLanguage[] = [
  {
    id: 'ho',
    name: 'Ho',
    nativeName: 'हो भाषा',
    script: 'Warang Citi / Devanagari',
    icon: 'mic',
    region: 'Jharkhand, Odisha (Kolhan)',
    speakers: '1.4+ Million',
    greeting: 'जोहार (Johar)',
    greetingHindi: 'नमस्ते',
    packSize: '1.2 GB',
    packSizeBytes: 1288490188,
    isDownloaded: true,
  },
  {
    id: 'mundari',
    name: 'Mundari',
    nativeName: 'मुंडारी',
    script: 'Mundari Bani / Devanagari',
    icon: 'user',
    region: 'Jharkhand, West Bengal, Odisha',
    speakers: '1.1+ Million',
    greeting: 'जोहार (Johar)',
    greetingHindi: 'नमस्ते',
    packSize: '1.1 GB',
    packSizeBytes: 1181116006,
    isDownloaded: false,
  },
  {
    id: 'santhali',
    name: 'Santhali',
    nativeName: 'संताली',
    script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ) / Devanagari',
    icon: 'feather',
    region: 'Jharkhand, West Bengal, Odisha, Assam',
    speakers: '7.6+ Million (8th Schedule)',
    greeting: 'जोहार (Johar)',
    greetingHindi: 'नमस्ते',
    packSize: '1.4 GB',
    packSizeBytes: 1503238553,
    isDownloaded: false,
  },
  {
    id: 'gondi',
    name: 'Gondi',
    nativeName: 'गोंडी',
    script: 'Gunjala Gondi / Devanagari',
    icon: 'sun',
    region: 'Madhya Pradesh, Maharashtra, Chhattisgarh',
    speakers: '2.9+ Million',
    greeting: 'सेवा जोहार (Seva Johar)',
    greetingHindi: 'नमस्ते',
    packSize: '1.3 GB',
    packSizeBytes: 1395864371,
    isDownloaded: false,
  },
  {
    id: 'kurukh',
    name: 'Kurukh',
    nativeName: 'कुड़ुख़ (Oraon)',
    script: 'Tolong Siki / Devanagari',
    icon: 'book-open',
    region: 'Jharkhand, Chhattisgarh, Odisha, Bihar',
    speakers: '2.0+ Million',
    greeting: 'जय धरम (Jai Dharam)',
    greetingHindi: 'नमस्ते',
    packSize: '1.0 GB',
    packSizeBytes: 1073741824,
    isDownloaded: false,
  }
];

export const INITIAL_TRANSLATIONS: TranslationRecord[] = [
  {
    id: 'h1',
    timestamp: '10:30 AM',
    dateGroup: 'Today',
    sourceLang: 'Hindi',
    targetLang: 'Ho',
    targetLangId: 'ho',
    sourceText: 'हम पौधों के भागों के बारे में पढ़ेंगे।',
    sourceRoman: 'Hum paudhon ke bhaagon ke baare mein padhenge.',
    targetText: 'आबू दारू-साकम रेयाङ्गा भाग को बाबु लेका एबुन चाड़ो-आ।',
    targetRoman: 'Aabu daru-saakam reyanga bhaag ko baabu leka ebun chaado-a.',
    isFavorite: true,
  },
  {
    id: 'h2',
    timestamp: '10:15 AM',
    dateGroup: 'Today',
    sourceLang: 'Hindi',
    targetLang: 'Ho',
    targetLangId: 'ho',
    sourceText: '२ + ३ बराबर ५ होता है।',
    sourceRoman: 'Do plus teen barabar paanch hota hai.',
    targetText: 'बारिया आर आपेया मिसा-ते मोड़ेया हुयू-आ।',
    targetRoman: 'Bariya aar aapeya misa-te modeya huyu-a.',
    isFavorite: false,
  },
  {
    id: 'h3',
    timestamp: '04:20 PM',
    dateGroup: 'Yesterday',
    sourceLang: 'Hindi',
    targetLang: 'Mundari',
    targetLangId: 'mundari',
    sourceText: 'जल ही जीवन है।',
    sourceRoman: 'Jal hi jeevan hai.',
    targetText: 'दाः गे जीदन ताना।',
    targetRoman: 'Daah ge jeedan tana.',
    isFavorite: true,
  },
  {
    id: 'h4',
    timestamp: '03:45 PM',
    dateGroup: 'Yesterday',
    sourceLang: 'Hindi',
    targetLang: 'Ho',
    targetLangId: 'ho',
    sourceText: 'यह एक सुंदर पेड़ है।',
    sourceRoman: 'Yeh ek sundar ped hai.',
    targetText: 'नेया मिद्ता बुगिन् दारू ताना।',
    targetRoman: 'Neya midta bugin daru tana.',
    isFavorite: false,
  },
  {
    id: 'h5',
    timestamp: '11:10 AM',
    dateGroup: 'Earlier',
    sourceLang: 'Hindi',
    targetLang: 'Santhali',
    targetLangId: 'santhali',
    sourceText: 'किताब का पन्ना संख्या पाँच खोलिए।',
    sourceRoman: 'Kitaab ka panna sankhya paanch kholiye.',
    targetText: 'पुथी रेयाक मोड़े साकाम झिज मे।',
    targetRoman: 'Puthi reyak mone saakam jhij me.',
    isFavorite: false,
  }
];

export const MOCK_LESSON: LessonContent = {
  id: 'math-addition-c2',
  classLevel: 'Class 2 - Mathematics',
  subject: 'Mathematics',
  title: 'Addition',
  titleHindi: 'Addition (जोड़)',
  subtitle: 'Translated to Ho',
  translatedTo: 'Ho (हो भाषा)',
  bannerImage: 'classroom-addition',
  explanationSections: [
    {
      hindiHeading: 'जोड़ क्या है?',
      hindiText: 'जब हम दो या दो से अधिक संख्याओं को एक साथ मिलाते हैं, तो उसे जोड़ कहते हैं।',
      tribalHeading: 'जोड़ ना माने?',
      tribalText: 'जदल आगे दुई या पुई-ते अधिक आकड़ा मिलाव ताहे ना जोड़ माने।',
      romanTribalText: 'Jadal aage dui ya pui-te adhik aakda milaaw tahe na jod maane.',
      words: [
        { word: 'जदल', translation: 'जब / when', pronunciation: 'Jadal', pos: 'adverb' },
        { word: 'दुई', translation: 'दो / two', pronunciation: 'Dui', pos: 'numeral' },
        { word: 'अधिक', translation: 'ज़्यादा / more', pronunciation: 'Adhik', pos: 'adjective' },
        { word: 'आकड़ा', translation: 'संख्याएँ / numbers', pronunciation: 'Aakda', pos: 'noun' },
        { word: 'मिलाव', translation: 'मिलाना / combine', pronunciation: 'Milaaw', pos: 'verb' }
      ]
    },
    {
      hindiHeading: 'उदाहरण (Example):',
      hindiText: 'यदि आपके पास २ सेब हैं और शिक्षक आपको ३ और सेब देते हैं, तो आपके पास कुल ५ सेब हो जाएँगे। (२ + ३ = ५)',
      tribalHeading: 'लेका लेकाते (Udaharan):',
      tribalText: 'अम ताहेन बारिया सेब मेनाः, आर गुरुजी अमके आपेया सेब एमामे-रे, अम ताहेन कुल मोड़ेया सेब हुयू-आ। (२ + ३ = ५)',
      romanTribalText: 'Am tahen bariya seb menaah, aar guruji amke aapeya seb emaame-re, am tahen kul modeya seb huyu-a.',
      words: [
        { word: 'बारिया', translation: 'दो (2)', pronunciation: 'Bariya', pos: 'number' },
        { word: 'आपेया', translation: 'तीन (3)', pronunciation: 'Aapeya', pos: 'number' },
        { word: 'मोड़ेया', translation: 'पाँच (5)', pronunciation: 'Modeya', pos: 'number' },
        { word: 'एमामे-रे', translation: 'देंगे तो / if gives', pronunciation: 'Emaame-re', pos: 'verb' }
      ]
    }
  ],
  activity: {
    title: 'आओ जोड़ें (Let\'s Add Together)',
    instructionHindi: 'टोकरी में सेब गिनिए और सही उत्तर चुनिए:',
    instructionTribal: 'खांची रे सेब लेका मे आर साही उत्तर बाछाव मे:',
    num1: 3,
    num2: 2,
    itemName: 'सेब (Apple)',
    itemEmoji: '🍎'
  },
  practice: [
    {
      id: 'p1',
      questionHindi: '४ + १ बराबर कितना होगा?',
      questionTribal: 'उपुनिया + मियद मिसा-ते चिमिन हुयू-आ?',
      options: [4, 5, 6, 7],
      correctIndex: 1,
      explanation: '४ + १ = ५ (उपुनिया + मियद = मोड़ेया)'
    },
    {
      id: 'p2',
      questionHindi: '२ + २ बराबर कितना होगा?',
      questionTribal: 'बारिया + बारिया मिसा-ते चिमिन हुयू-आ?',
      options: [3, 4, 5, 6],
      correctIndex: 1,
      explanation: '२ + २ = ४ (बारिया + बारिया = उपुनिया)'
    }
  ]
};

export const MOCK_WORKSHEETS: WorksheetItem[] = [
  {
    id: 'ws-1',
    title: 'Addition - Level 1',
    classLevel: 'Class 2 - Mathematics',
    subject: 'Mathematics',
    language: 'Ho / Hindi',
    color: 'from-blue-500 to-cyan-500',
    level: 'Easy',
    questions: [
      {
        id: 'q1',
        qHindi: '२ + ३ = ?',
        qTribal: 'बारिया + आपेया = ?',
        prompt: 'गिनिए और जोड़िए (Count and Add)',
        type: 'multiple-choice',
        options: ['4', '5', '6', '7'],
        answer: '5'
      },
      {
        id: 'q2',
        qHindi: '४ + २ = ?',
        qTribal: 'उपुनिया + बारिया = ?',
        prompt: 'सही उत्तर चुनिए',
        type: 'multiple-choice',
        options: ['5', '6', '7', '8'],
        answer: '6'
      }
    ]
  },
  {
    id: 'ws-2',
    title: 'Subtraction - Level 1',
    classLevel: 'Class 2 - Mathematics',
    subject: 'Mathematics',
    language: 'Ho / Hindi',
    color: 'from-indigo-500 to-purple-500',
    level: 'Medium',
    questions: [
      {
        id: 'q1',
        qHindi: '५ - २ = ?',
        qTribal: 'मोड़ेया - बारिया = ?',
        prompt: 'घटाव कीजिए (Subtract)',
        type: 'multiple-choice',
        options: ['2', '3', '4', '5'],
        answer: '3'
      }
    ]
  },
  {
    id: 'ws-3',
    title: 'Number Recognition',
    classLevel: 'Class 1 - Mathematics',
    subject: 'Mathematics',
    language: 'Mundari / Hindi',
    color: 'from-emerald-500 to-teal-500',
    level: 'Beginner',
    questions: [
      {
        id: 'q1',
        qHindi: 'संख्या ३ को पहचानिए',
        qTribal: 'आपेया आकड़ा नेल मे (Recognize 3)',
        prompt: '३ के समान संख्या चुनें',
        type: 'multiple-choice',
        options: ['२', '३', '४', '५'],
        answer: '३'
      }
    ]
  },
  {
    id: 'ws-4',
    title: 'Word Formation',
    classLevel: 'Class 1 - Hindi',
    subject: 'Hindi / Tribal',
    language: 'Ho / Hindi',
    color: 'from-orange-500 to-amber-500',
    level: 'Beginner',
    questions: [
      {
        id: 'q1',
        qHindi: 'क + ल + म मिलकर क्या बनता है?',
        qTribal: 'क + ल + म मिसा-ते चेत बयना?',
        prompt: 'शब्द बनाइए',
        type: 'multiple-choice',
        options: ['कमल', 'कलम', 'मकर', 'कलश'],
        answer: 'कलम'
      }
    ]
  },
  {
    id: 'ws-5',
    title: 'Picture Matching',
    classLevel: 'Class 1 - EVS',
    subject: 'EVS',
    language: 'Santhali / Hindi',
    color: 'from-amber-500 to-yellow-500',
    level: 'Easy',
    questions: [
      {
        id: 'q1',
        qHindi: 'पेड़ (Tree) का सही चित्र चुनें',
        qTribal: 'दारू (Daru) रेयाक चिनहा',
        prompt: 'सही मिलान करें',
        type: 'multiple-choice',
        options: ['🌳 पेड़ (Tree)', '🍎 सेब', '☀️ सूरज', '🏠 घर'],
        answer: '🌳 पेड़ (Tree)'
      }
    ]
  }
];

export const MOCK_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-1',
    category: 'fruits',
    hindiWord: 'सेब',
    romanHindi: 'Seb',
    tribalWord: 'सेब / उली लेका जो',
    romanTribal: 'Seb / Uli Leka Jo',
    englishMeaning: 'Apple',
    emoji: '🍎',
    imageUrl: 'apple',
    exampleSentenceHindi: 'सेब स्वास्थ्य के लिए बहुत अच्छा होता है।',
    exampleSentenceTribal: 'सेब जोम-ते हड़मो बुगिन ताहेना।'
  },
  {
    id: 'fc-2',
    category: 'nature',
    hindiWord: 'पेड़',
    romanHindi: 'Ped',
    tribalWord: 'दारू (Daru)',
    romanTribal: 'Daru',
    englishMeaning: 'Tree',
    emoji: '🌳',
    imageUrl: 'tree',
    exampleSentenceHindi: 'यह एक बड़ा हरा पेड़ है।',
    exampleSentenceTribal: 'नेया मिद्ता मारांग हरियर दारू ताना।'
  },
  {
    id: 'fc-3',
    category: 'nature',
    hindiWord: 'सूरज',
    romanHindi: 'Sooraj',
    tribalWord: 'सिंगी (Singi)',
    romanTribal: 'Singi',
    englishMeaning: 'Sun',
    emoji: '☀️',
    imageUrl: 'sun',
    exampleSentenceHindi: 'सुबह सूरज पूर्व दिशा से उगता है।',
    exampleSentenceTribal: 'सेता-रे सिंगी पूरब-ते ओलोंगा।'
  },
  {
    id: 'fc-4',
    category: 'nature',
    hindiWord: 'पानी',
    romanHindi: 'Paani',
    tribalWord: 'दाः (Daah)',
    romanTribal: 'Daah',
    englishMeaning: 'Water',
    emoji: '💧',
    imageUrl: 'water',
    exampleSentenceHindi: 'हमें साफ़ पानी पीना चाहिए।',
    exampleSentenceTribal: 'आबू साफ दाः नू दरकार।'
  },
  {
    id: 'fc-5',
    category: 'animals',
    hindiWord: 'चिड़िया',
    romanHindi: 'Chidiya',
    tribalWord: 'चेड़ो (Chero / Chede)',
    romanTribal: 'Chede',
    englishMeaning: 'Bird',
    emoji: '🐦',
    imageUrl: 'bird',
    exampleSentenceHindi: 'चिड़िया आकाश में उड़ती है।',
    exampleSentenceTribal: 'चेड़ो सिरमा-रे उड़ौ-आ।'
  },
  {
    id: 'fc-6',
    category: 'classroom',
    hindiWord: 'किताब',
    romanHindi: 'Kitaab',
    tribalWord: 'पुथी (Puthi)',
    romanTribal: 'Puthi',
    englishMeaning: 'Book',
    emoji: '📚',
    imageUrl: 'book',
    exampleSentenceHindi: 'किताब खोलो और पढ़ो।',
    exampleSentenceTribal: 'पुथी झिज मे आर पाड़ाव मे।'
  }
];

export const MOCK_ASSESSMENTS: AssessmentItem[] = [
  {
    id: 'ass-1',
    title: 'Letter Recognition (Ho)',
    classLevel: 'Class 1 - Literacy',
    type: 'literacy',
    scorePercent: 86,
    totalStudentsTested: 24,
    questions: [
      {
        id: 'q1',
        promptHindi: 'बच्चे से "अ" अक्षर पहचानने को कहें',
        promptTribal: 'गिदरा के "अ" चिनहा नेल आर काजी रिके मे',
        romanTribal: 'Gidra ke "A" chinha nel aar kaaji rike me',
        targetCompetency: 'FLN-L1: Akshar Pehchan',
        options: ['पहचान लिया (Mastered)', 'मदद से पहचाना (Developing)', 'नहीं पहचान पाया (Emerging)'],
        correctIndex: 0
      },
      {
        id: 'q2',
        promptHindi: 'बच्चे से ध्वनि सुनकर पहला अक्षर बताने को कहें: "सेब" का पहला अक्षर',
        promptTribal: '"सेब" रेयाङ्गा पहिल साड़िम चेत ताना?',
        romanTribal: '"Seb" reyanga pahil saadhim chet tana?',
        targetCompetency: 'FLN-L1: Dhwani Jagrukta',
        options: ['स (Sa)', 'ब (Ba)', 'क (Ka)', 'म (Ma)'],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'ass-2',
    title: 'Number Sense',
    classLevel: 'Class 2 - Numeracy',
    type: 'numeracy',
    scorePercent: 78,
    totalStudentsTested: 22,
    questions: [
      {
        id: 'q1',
        promptHindi: 'बच्चा १ से २० तक सही क्रम में गिन सकता है?',
        promptTribal: 'गिदरा १ खोन २० धाबिक लेका दारे-या?',
        romanTribal: 'Gidra 1 khon 20 dhabik leka daare-ya?',
        targetCompetency: 'FLN-N1: Counting 1-20',
        options: ['धाराप्रवाह (Fluent)', 'कुछ त्रुटियों के साथ (Developing)', 'मार्गदर्शन चाहिए (Beginner)'],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'ass-3',
    title: 'Word Reading',
    classLevel: 'Class 2 - Literacy',
    type: 'literacy',
    scorePercent: 90,
    totalStudentsTested: 26,
    questions: [
      {
        id: 'q1',
        promptHindi: '२-अक्षर वाले सरल शब्द पढ़ना (घर, जल, फल)',
        promptTribal: 'बार-अक्षर शब्द पाड़ाव (घर, दाः, जो)',
        romanTribal: 'Bar-akshar shabd padaaw',
        targetCompetency: 'FLN-L2: Simple Word Reading',
        options: ['३/३ सही पढ़े (100%)', '२/३ सही पढ़े (66%)', '१/३ सही पढ़े (33%)'],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'ass-4',
    title: 'Addition Assessment',
    classLevel: 'Class 2 - Numeracy',
    type: 'numeracy',
    scorePercent: 82,
    totalStudentsTested: 25,
    questions: [
      {
        id: 'q1',
        promptHindi: 'वस्तुओं को मिलाकर एक अंक का जोड़ (३ + २ = ५)',
        promptTribal: 'सामान मिलाव-ते लेका-जोड़ाव (३ + २ = ५)',
        romanTribal: 'Samaan milaaw-te leka-jodaw (3 + 2 = 5)',
        targetCompetency: 'FLN-N2: Single Digit Addition',
        options: ['सही उत्तर दिया (Correct)', 'वस्तुओं की सहायता से (With Aids)', 'त्रुटि हुई (Incorrect)'],
        correctIndex: 0
      }
    ]
  }
];

export const PRESET_TEACHER_PROMPTS = [
  {
    hindi: 'आज हम जोड़ का अभ्यास करेंगे।',
    roman: 'Aaj hum jod ka abhyas karenge.',
    ho: 'आमे नाम बोंगा रे आकड़ा सदोम रेयाङ्गा।',
    hoRoman: 'Aame naam bonga re aakda sadom reyanga.',
    mundari: 'तेहेंग आबु लेका-जोड़ाव एबुन चाड़ो-आ।',
    santhali: 'तेहेञ आबो लेका-मिसा एबो चाड़ो-आ।'
  },
  {
    hindi: 'सभी बच्चे अपनी गणित की किताब खोलें।',
    roman: 'Sabhi bachche apni ganit ki kitaab kholein.',
    ho: 'सबेन गिदरा आपन-आपन लेका पुथी झिज पे।',
    hoRoman: 'Saben gidra aapan-aapan leka puthi jhij pe.',
    mundari: 'सबेन होनाको आपन-आपन लेका पुथी झिज पे।',
    santhali: 'सानाम गिदरा आपन-आपन लेका पुथी झिज पे।'
  },
  {
    hindi: '२ और ३ मिलकर कितने होते हैं?',
    roman: 'Do aur teen milkar kitne hote hain?',
    ho: 'बारिया आर आपेया मिलाव-ते चिमिन हुयू-आ?',
    hoRoman: 'Bariya aar aapeya milaaw-te chimin huyu-a?',
    mundari: 'बारिया आर आपेया मिसा-ते चिमिन हुयू-आ?',
    santhali: 'बार आर पे मिसा-ते तिनाः हुयू-आ?'
  },
  {
    hindi: 'शाबाश! आपका उत्तर बिल्कुल सही है।',
    roman: 'Shabaash! Aapka uttar bilkul sahi hai.',
    ho: 'बुगिन काजी! अम-आ उत्तर साही ताना।',
    hoRoman: 'Bugin kaaji! Am-aa uttar saahi tana.',
    mundari: 'बुगिन! अम-आ उत्तर साही ताना।',
    santhali: 'बेश! आमाक उत्तर साही गिया।'
  },
  {
    hindi: 'कृपया एक-एक करके बोलें।',
    roman: 'Kripya ek-ek karke bolein.',
    ho: 'मिद्-मिद् ते काजी पे।',
    hoRoman: 'Mid-mid te kaaji pe.',
    mundari: 'मियद-मियद ते काजी पे।',
    santhali: 'मित्-मित् ते रोड़ पे।'
  }
];

export const INITIAL_OFFLINE_PACKS: OfflinePack[] = [
  {
    id: 'ho',
    name: 'Ho (हो भाषा)',
    nativeName: '𑲏𑲍𑲵 / Ho Language Pack',
    size: '1.2 GB',
    isDownloaded: true,
    isDownloading: false,
    progress: 100,
  },
  {
    id: 'mundari',
    name: 'Mundari (मुंडारी)',
    nativeName: 'ᱢᱩᱱᱰᱟᱨᱤ / Mundari Pack',
    size: '1.1 GB',
    isDownloaded: false,
    isDownloading: false,
    progress: 0,
  },
  {
    id: 'santhali',
    name: 'Santhali (संताली)',
    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ / Santhali Pack',
    size: '1.4 GB',
    isDownloaded: false,
    isDownloading: false,
    progress: 0,
  },
  {
    id: 'gondi',
    name: 'Gondi (गोंडी)',
    nativeName: 'Gondi Language Pack',
    size: '1.3 GB',
    isDownloaded: false,
    isDownloading: false,
    progress: 0,
  },
  {
    id: 'kurukh',
    name: 'Kurukh (कुड़ुख़)',
    nativeName: 'Tolong Siki Pack',
    size: '1.0 GB',
    isDownloaded: false,
    isDownloading: false,
    progress: 0,
  }
];
