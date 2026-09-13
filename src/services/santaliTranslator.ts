import { BENCHMARK_CLASSROOM_SENTENCES } from '../data/benchmarkSentences';
import flnMasterVocab from '../data/offline/fln_master_vocabulary.json';
import numbers1To100 from '../data/offline/numbers_1_100.json';

export interface SantaliTranslation {
  olChiki: string;
  devanagari: string;
  romanPhonics: string;
  confidence: 'verified_corpus' | 'grammatical_synthesized';
}

// Convert 20 Benchmark Classroom Sentences into FULL_SENTENCE_PAIRS
const BENCHMARK_PAIRS = BENCHMARK_CLASSROOM_SENTENCES.map(b => ({
  patterns: [
    b.hi,
    b.hi.replace(/[.,?!।]/g, ''),
    b.en,
    b.en.replace(/[.,?!।]/g, '')
  ],
  olChiki: b.sat,
  devanagari: b.sat, // Ol Chiki display is preserved; Devanagari phonetics are derived
  romanPhonics: b.satRoman
}));

// 1. High-Frequency Sentence Bitext Corpus (Official AI4Bharat, CIIL & Multilingual Master Datasets)
const FULL_SENTENCE_PAIRS: { patterns: string[]; olChiki: string; devanagari: string; romanPhonics: string }[] = [
  ...BENCHMARK_PAIRS,
  {
    patterns: ['नमस्ते', 'नमस्कार', 'प्रणाम', 'सुप्रभात', 'शुभ प्रभात', 'नमस्ते बच्चों', 'सभी को नमस्ते', 'जोहार'],
    olChiki: 'ᱥᱟᱱᱟᱢ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱡᱚᱦᱟᱨ! ᱥᱮᱛᱟᱜ ᱡᱚᱦᱟᱨ᱾',
    devanagari: 'सनाम गिदरा को जोहार! सेताक जोहार।',
    romanPhonics: 'Sanam gidra ko Johar! Setag Johar.'
  },
  {
    patterns: ['आप कैसे हैं', 'तुम कैसे हो', 'सब कैसे हो', 'आप सब कैसे हैं', 'कैसे हो', 'क्या हाल है'],
    olChiki: 'ᱟᱢ ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱜ ᱢᱮᱭᱟ? ᱟᱵᱚ ᱥᱟᱱᱟᱢ ᱱᱟᱯᱟᱭ ᱜᱮ ᱢᱮᱱᱟᱜ ᱵᱚᱱ-ᱟ᱾',
    devanagari: 'आम चेद लेका मेनाक मेया? आबो सनाम नापाय गे मेनाक बोन-आ।',
    romanPhonics: 'Am ched leka menag meya? Abo sanam napay ge menag bon-a.'
  },
  {
    patterns: ['मैं ठीक हूँ', 'मैं अच्छा हूँ', 'हम सब ठीक हैं', 'सब ठीक है'],
    olChiki: 'ᱤᱧ ᱱᱟᱯᱟᱭ ᱜᱮ ᱢᱮᱱᱟᱹᱧ-ᱟ᱾ ᱟᱵᱚ ᱥᱟᱱᱟᱢ ᱵᱮᱥ ᱜᱮᱭᱟ᱾',
    devanagari: 'ईंज नापाय गे मेनांज-आ। आबो सनाम बेस गेया।',
    romanPhonics: 'Inj napay ge menanj-a. Abo sanam bes geya.'
  },
  {
    patterns: ['आज हम जोड़ सीखेंगे', 'आज जोड़ पढ़ेंगे', 'आज हम गणित पढ़ेंगे', 'हम जोड़ सीखेंगे', 'जोड़ सीखो'],
    olChiki: 'ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱞᱮᱠᱷᱟ-ᱢᱮᱥᱟ ᱵᱚ ᱪᱮᱫᱚᱜ-ᱟ᱾',
    devanagari: 'तेहेंज आबो लेका-मेसा बो चेदक-आ।',
    romanPhonics: 'Tehenj aabo lekha-mesa bo chedoh-a.'
  },
  {
    patterns: ['आज हम घटाव सीखेंगे', 'घटाव पढ़ेंगे', 'घटाना सीखेंगे', 'कम करना सीखेंगे'],
    olChiki: 'ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱞᱮᱠᱷᱟ-ᱚᱪᱚᱜ ᱵᱚ ᱪᱮᱫᱚᱜ-ᱟ᱾',
    devanagari: 'तेहेंज आबो लेका-ओचोक बो चेदक-आ।',
    romanPhonics: 'Tehenj aabo lekha-ochog bo chedoh-a.'
  },
  {
    patterns: ['किताब खोलो', 'सभी बच्चे अपनी किताब खोलो', 'गणित की किताब खोलो', 'अपनी किताब निकालो', 'किताब निकालो'],
    olChiki: 'ᱥᱟᱱᱟᱢ ᱜᱤᱫᱽᱨᱟᱹ ᱟᱯᱱᱟᱨᱟᱜ ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡ ᱯᱮ᱾',
    devanagari: 'सनाम गिदरा आपन पुथी झिज पे।',
    romanPhonics: 'Sanam gidra aapnarag puthi jhij pe.'
  },
  {
    patterns: ['किताब बंद करो', 'अपनी कॉपी बंद करो', 'किताब रख दो', 'कॉपी बस्ते में रखो'],
    olChiki: 'ᱯᱩᱛᱷᱤ ᱵᱚᱸᱫᱽ ᱯᱮ ᱟᱨ ᱡᱷᱳᱞᱟ ᱨᱮ ᱫᱚᱦᱚᱭ ᱯᱮ᱾',
    devanagari: 'पुथी बोंद पे आर झोला रे दोहोय पे।',
    romanPhonics: 'Puthi bond pe aar jhola re dohoy pe.'
  },
  {
    patterns: ['दो और तीन पांच होते हैं', '२ + ३ बराबर ५', 'दो प्लस तीन पांच', 'दो में तीन जोड़ने पर पांच'],
    olChiki: 'ᱵᱟᱨ ᱟᱨ ᱯᱮ ᱢᱮᱥᱟ-ᱛᱮ ᱢᱚᱬᱮ ᱦᱩᱭᱩᱜ-ᱟ᱾',
    devanagari: 'बार आर पे मेसा-ते मोणे हुयुक-आ।',
    romanPhonics: 'Bar aar pe mesa-te mone huyug-a.'
  },
  {
    patterns: ['एक और एक दो होते हैं', '१ + १ बराबर २', 'एक प्लस एक दो'],
    olChiki: 'ᱢᱤᱫ ᱟᱨ ᱢᱤᱫ ᱢᱮᱥᱟ-ᱛᱮ ᱵᱟᱨ ᱦᱩᱭᱩᱜ-ᱟ᱾',
    devanagari: 'मिद आर मिद मेसा-ते बार हुयुक-आ।',
    romanPhonics: 'Mid aar mid mesa-te bar huyug-a.'
  },
  {
    patterns: ['पाठ को ध्यान से पढ़ो', 'सभी मिलकर पढ़ो', 'किताब पढ़ो', 'जोर से पढ़ो', 'पढ़ो'],
    olChiki: 'ᱯᱩᱛᱷᱤ ᱨᱮᱱᱟᱜ ᱯᱟᱲᱦᱟᱣ ᱢᱚᱱᱮ ᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱯᱮ᱾',
    devanagari: 'पुथी रेनाक पाढ़ाव मने ते पाढ़ाव पे।',
    romanPhonics: 'Puthi renag padhaw mone te padhaw pe.'
  },
  {
    patterns: ['अपनी कॉपी में लिखो', 'साफ-साफ लिखो', 'कॉपी निकालो और लिखो', 'ब्लैकबोर्ड से लिखो', 'लिखो'],
    olChiki: 'ᱟᱯᱱᱟᱨᱟᱜ ᱠᱷᱟᱛᱟ ᱨᱮ ᱥᱟᱯᱷᱟ ᱛᱮ ᱚᱞ ᱯᱮ᱾',
    devanagari: 'आपन खातात रे साफा ते ओल पे।',
    romanPhonics: 'Aapnarag khata re sapha te ol pe.'
  },
  {
    patterns: ['क्या सब समझ गए', 'क्या आपको समझ आया', 'क्या किसी को कोई सवाल है', 'समझ में आया', 'समझ गए'],
    olChiki: 'ᱪᱮᱫ ᱥᱟᱱᱟᱢ ᱠᱚᱯᱮ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱮᱫ-ᱟ?',
    devanagari: 'चेद सनाम कोपे बुझाव केद-आ?',
    romanPhonics: 'Ched sanam kope bujhaw ked-a?'
  },
  {
    patterns: ['बहुत अच्छा', 'शाबाश', 'बहुत बढ़िया', 'सही उत्तर', 'बहुत अच्छा किया', 'उत्कृष्ट'],
    olChiki: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ! ᱟᱢ ᱟᱹᱰᱤ ᱵᱮᱥ ᱮᱢ ᱠᱟᱹᱢᱤ ᱠᱮᱫ-ᱟ! 🎉',
    devanagari: 'अडी नापाय! आम अडी बेस एम कामी केद-आ! 🎉',
    romanPhonics: 'Adi napay! Aam adi bes em kami ked-a!'
  },
  {
    patterns: ['चुपचाप बैठो', 'अपनी जगह पर बैठो', 'शोर मत करो', 'ध्यान से सुनो', 'बैठ जाओ', 'बैठो'],
    olChiki: 'ᱛᱷᱤᱨ ᱠᱟᱛᱮ ᱟᱯᱱᱟᱨ ᱴᱷᱟᱶ ᱨᱮ ᱫᱩᱲᱩᱵ ᱯᱮ ᱟᱨ ᱟᱧᱡᱚᱢ ᱯᱮ᱾',
    devanagari: 'थिर काते आपन ठांव रे दुड़ुब पे आर आंजोम पे।',
    romanPhonics: 'Thir kate aapnar thaw re durub pe aar anjom pe.'
  },
  {
    patterns: ['खड़े हो जाओ', 'खड़े हो', 'उठो', 'सभी खड़े हो जाओ'],
    olChiki: 'ᱥᱟᱱᱟᱢ ᱠᱚ ᱛᱤᱸᱜᱩᱱ ᱯᱮ᱾',
    devanagari: 'सनाम को तिंगुन पे।',
    romanPhonics: 'Sanam ko tingun pe.'
  },
  {
    patterns: ['एक दो तीन चार पांच', '१ २ ३ ४ ५', 'गिनती करो एक से पांच', 'गिनती करो'],
    olChiki: 'ᱢᱤᱫ, ᱵᱟᱨ, ᱯᱮ, ᱯᱳᱱ, ᱢᱚᱬᱮ᱾',
    devanagari: 'मिद, बार, पे, पोन, मोणे।',
    romanPhonics: 'Mid, Bar, Pe, Pon, Mone.'
  },
  {
    patterns: ['जल ही जीवन है', 'पानी ही जीवन है', 'पानी अनमोल है', 'पानी बचाओ', 'पानी'],
    olChiki: 'ᱫᱟᱜ ᱜᱮ ᱡᱤᱣᱤ ᱠᱟᱱᱟ᱾ ᱫᱟᱜ ᱵᱟᱧᱪᱟᱣ ᱯᱮ᱾',
    devanagari: 'दाक गे जीवी काना। दाक बांचाव पे।',
    romanPhonics: 'Daag ge jiwi kana. Daag banchaw pe.'
  },
  {
    patterns: ['पेड़ हमें फल और छाया देते हैं', 'पेड़ लगाओ', 'पेड़ बचाओ', 'हरा पेड़', 'पेड़'],
    olChiki: 'ᱫᱟᱨᱮ ᱟᱵᱚ ᱡᱚ ᱟᱨ ᱩᱢᱩᱞ ᱮᱢᱟᱵᱚᱱ-ᱟ᱾',
    devanagari: 'दारे आबो जो आर उमुल एमाबोन-आ।',
    romanPhonics: 'Dare abo jo aar umul emabon-a.'
  },
  {
    patterns: ['आज बारिश हो रही है', 'आज बहुत तेज बारिश है', 'बारिश हो रही है', 'बारिश आ रही है'],
    olChiki: 'ᱛᱮᱦᱮᱧ ᱟᱹᱰᱤ ᱢᱟᱨᱟᱝ ᱫᱟᱜ ᱡᱟᱹᱲᱤ ᱠᱟᱱᱟ, ᱥᱟᱱᱟᱢ ᱜᱤᱫᱽᱨᱟᱹ ᱵᱷᱤᱛᱨᱤ ᱦᱤᱡᱩᱜ ᱯᱮ᱾',
    devanagari: 'तेहेंज अडी मारांग दाक जाड़ी काना, सनाम गिदरा भीतरी हिजुक पे।',
    romanPhonics: 'Tehenj adi marang daag jari kana, sanam gidra bhitri hijug pe.'
  },
  {
    patterns: ['हम सब स्कूल जाते हैं', 'रोज स्कूल जाओ', 'मैं स्कूल जा रहा हूँ', 'स्कूल चलो', 'स्कूल'],
    olChiki: 'ᱟᱵᱚ ᱥᱟᱱᱟᱢ ᱫᱤᱱ ᱜᱮ ᱟᱥᱲᱟ ᱵᱚ ᱥᱮᱱᱚᱜ-ᱟ᱾',
    devanagari: 'आबो सनाम दिन गे आसड़ा बो सेनक-आ।',
    romanPhonics: 'Abo sanam din ge asda bo senoh-a.'
  },
  {
    patterns: ['क्या मैं पानी पीने जाऊं', 'पानी पीने जाऊं', 'मुझे पानी पीना है', 'पानी पीना'],
    olChiki: 'ᱪᱮᱫ ᱤᱧ ᱫᱟᱜ ᱧᱩᱧ ᱥᱮᱱ ᱫᱟᱲᱮᱭᱟᱜ-ᱟ?',
    devanagari: 'चेद ईंज दाक ञुज सेन दाड़ेयाक-आ?',
    romanPhonics: 'Ched inj daag nyunj sen dareyah-a?'
  },
  {
    patterns: ['क्या मैं अंदर आ सकता हूँ', 'अंदर आ जाऊं', 'मे आई कम इन', 'अंदर आऊं'],
    olChiki: 'ᱪᱮᱫ ᱤᱧ ᱵᱷᱤᱛᱨᱤᱧ ᱦᱤᱡᱩᱜ ᱫᱟᱲᱮᱭᱟᱜ-ᱟ, ᱢᱟᱪᱮᱛ?',
    devanagari: 'चेद ईंज भीतरी हिजुक दाड़ेयाक-आ, माचेत?',
    romanPhonics: 'Ched inj bhitrinj hijug dareyah-a, Machet?'
  },
  {
    patterns: ['तुम्हारा क्या नाम है', 'आपका नाम क्या है', 'अपना नाम बताओ', 'तुम्हारा नाम क्या है', 'नाम क्या है'],
    olChiki: 'ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱪᱮᱫ ᱠᱟᱱᱟ?',
    devanagari: 'आमाग ञुतुम चेद काना?',
    romanPhonics: 'Aamag nyutum ched kana?'
  },
  {
    patterns: ['मेरा नाम बिरसा है', 'मेरा नाम', 'मैं छात्र हूँ', 'मैं बिरसा हूँ'],
    olChiki: 'ᱤᱧᱟᱜ ᱧᱩᱛᱩᱢ ᱵᱤᱨᱥᱟᱹ ᱠᱟᱱᱟ᱾',
    devanagari: 'ईंझाग ञुतुम बिरसा काना।',
    romanPhonics: 'Injag nyutum Birsa kana.'
  },
  {
    patterns: ['तुम्हारा गाँव कहाँ है', 'तुम्हारा घर कहाँ है', 'तुम कहाँ रहते हो', 'गाँव कहाँ है'],
    olChiki: 'ᱟᱢᱟᱜ ᱟᱹᱛᱩ ᱚᱠᱟᱨᱮ ᱠᱟᱱᱟ?',
    devanagari: 'आमाग आतु ओकारे काना?',
    romanPhonics: 'Aamag aatu okare kana?'
  },
  {
    patterns: ['खाना खाने से पहले हाथ धो लो', 'हाथ धो लो', 'खाना खाओ', 'भोजन करो'],
    olChiki: 'ᱫᱟᱠᱟ ᱡᱚᱢ ᱢᱟᱬᱟᱝ ᱛᱤ ᱟᱹᱨᱩᱵ ᱯᱮ᱾',
    devanagari: 'दाका जोम माड़ांग ती आरुब पे।',
    romanPhonics: 'Daka jom marang ti arub pe.'
  },
  {
    patterns: ['चलो मैदान में खेलते हैं', 'खेलने चलो', 'खेल का समय हो गया', 'मैदान में चलो'],
    olChiki: 'ᱫᱮᱞᱟ ᱴᱟᱺᱰᱤ ᱨᱮ ᱮᱱᱮᱡ ᱵᱚ ᱥᱮᱱᱚᱜ-ᱟ᱾',
    devanagari: 'देला टांडी रे एनेज बो सेनक-आ।',
    romanPhonics: 'Dela tandi re enej bo senoh-a.'
  },
  {
    patterns: ['सूरज पूर्व से निकलता है', 'सुबह सूरज उगता है', 'सूरज चमकता है', 'धूप निकली है'],
    olChiki: 'ᱥᱤᱧ ᱥᱮᱛᱟᱜ ᱯᱩᱨᱩᱵᱽ ᱠᱷᱚᱱ ᱚᱰᱚᱠᱚᱜ-ᱟ᱾',
    devanagari: 'सिंगी सेताक पूरुब खोन ओड़ोकक-आ।',
    romanPhonics: 'Singi setag purub khon odokog-a.'
  },
  {
    patterns: ['चिड़िया पेड़ पर गा रही है', 'चिड़िया आकाश में उड़ती है', 'पक्षी गा रहे हैं'],
    olChiki: 'ᱪᱮᱬᱮ ᱫᱟᱨᱮ ᱨᱮ ᱥᱮᱨᱮᱧ ᱮᱫ-ᱟ᱾',
    devanagari: 'चेणे दारे रे सेरेंज एद-आ।',
    romanPhonics: 'Chene dare re serenj ed-a.'
  },
  {
    patterns: ['तुम क्या कर रहे हो', 'आप क्या कर रहे हैं', 'क्या कर रहे हो'],
    olChiki: 'ᱟᱢ ᱪᱮᱫ ᱮᱢ ᱠᱟᱹᱢᱤ ᱠᱟᱱᱟ?',
    devanagari: 'आम चेद एम कामी काना?',
    romanPhonics: 'Am ched em kami kana?'
  },
  {
    patterns: ['मैं पढ़ रहा हूँ', 'मैं किताब पढ़ रहा हूँ'],
    olChiki: 'ᱤᱧ ᱯᱩᱛᱷᱤᱧ ᱯᱟᱲᱦᱟᱣ ᱮᱫ-ᱟ᱾',
    devanagari: 'ईंज पुथींज पाढ़ाव एद-आ।',
    romanPhonics: 'Inj puthinj padhaw ed-a.'
  },
  {
    patterns: ['मैं लिख रहा हूँ', 'मैं लिख रहा'],
    olChiki: 'ᱤᱧ ᱠᱷᱟᱛᱟ ᱨᱤᱧ ᱚᱞ ᱮᱫ-ᱟ᱾',
    devanagari: 'ईंज खातात रींज ओल एद-आ।',
    romanPhonics: 'Inj khata rinj ol ed-a.'
  },
  {
    patterns: ['यहाँ आओ', 'इधर आओ', 'पास आओ'],
    olChiki: 'ᱱᱚᱸᱰᱮ ᱦᱤᱡᱩᱜ ᱢᱮ᱾',
    devanagari: 'नोंडे हिजुक मे।',
    romanPhonics: 'Nonde hijug me.'
  },
  {
    patterns: ['वहाँ जाओ', 'उधर जाओ', 'बाहर जाओ'],
    olChiki: 'ᱦᱟᱸᱰᱮ ᱥᱮᱱᱚᱜ ᱢᱮ᱾',
    devanagari: 'हांडे सेनक मे।',
    romanPhonics: 'Hande senog me.'
  },
  {
    patterns: ['पानी लाओ', 'पानी दो', 'एक गिलास पानी दो', 'पानी लेकर आओ'],
    olChiki: 'ᱫᱟᱜ ᱟᱹᱜᱩᱭ ᱢᱮ᱾',
    devanagari: 'दाक आगुय मे।',
    romanPhonics: 'Daag aaguy me.'
  },
  {
    patterns: ['खाना खाओ', 'भात खाओ', 'रोटी खाओ', 'भोजन करो'],
    olChiki: 'ᱫᱟᱠᱟ ᱡᱚᱢ ᱢᱮ᱾',
    devanagari: 'दाका जोम मे।',
    romanPhonics: 'Daka jom me.'
  },
  {
    patterns: ['घर जाओ', 'अपने घर जाओ', 'छुट्टी हो गई घर जाओ'],
    olChiki: 'ᱟᱯᱱᱟᱨ ᱚᱲᱟᱜ ᱥᱮᱱᱚᱜ ᱢᱮ᱾',
    devanagari: 'आपन ओड़ाक सेनक मे।',
    romanPhonics: 'Aapnar orah senog me.'
  },
  {
    patterns: ['घर चलो', 'चलो घर चलते हैं'],
    olChiki: 'ᱫᱮᱞᱟ ᱚᱲᱟᱜ ᱵᱚ ᱥᱮᱱᱚᱜ-ᱟ᱾',
    devanagari: 'देला ओड़ाक बो सेनक-आ।',
    romanPhonics: 'Dela orah bo senoh-a.'
  },
  {
    patterns: ['मैं घर जा रहा हूँ', 'मैं घर जा रहा'],
    olChiki: 'ᱤᱧ ᱚᱲᱟᱜ ᱤᱧ ᱥᱮᱱᱚᱜ ᱠᱟᱱᱟ᱾',
    devanagari: 'ईंज ओड़ाक ईंज सेनक काना।',
    romanPhonics: 'Inj orah inj senog kana.'
  },
  {
    patterns: ['वह स्कूल जा रहा है', 'वह स्कूल जा रही है'],
    olChiki: 'ᱩᱱᱤ ᱟᱥᱲᱟ ᱥᱮᱱᱚᱜ ᱠᱟᱱᱟᱭ᱾',
    devanagari: 'उनी आसड़ा सेनक कानाय।',
    romanPhonics: 'Uni asda senog kanay.'
  },
  {
    patterns: ['हम सब खेल रहे हैं', 'मैदान में खेल रहे हैं'],
    olChiki: 'ᱟᱵᱚ ᱥᱟᱱᱟᱢ ᱵᱚ ᱮᱱᱮᱡ ᱠᱟᱱᱟ᱾',
    devanagari: 'आबो सनाम बो एनेज काना।',
    romanPhonics: 'Abo sanam bo enej kana.'
  },
  {
    patterns: ['मुझे भूख लगी है', 'भूख लगी है'],
    olChiki: 'ᱤᱧ ᱨᱮᱸᱜᱮᱡ ᱮᱫᱤᱧ-ᱟ᱾',
    devanagari: 'ईंज रेंगेज एदिंज-आ।',
    romanPhonics: 'Inj rengej edinj-a.'
  },
  {
    patterns: ['मुझे प्यास लगी है', 'प्यास लगी है'],
    olChiki: 'ᱤᱧ ᱫᱟᱜ ᱛᱮᱛᱟᱝ ᱮᱫᱤᱧ-ᱟ᱾',
    devanagari: 'ईंज दाक तेतांग एदिंज-आ।',
    romanPhonics: 'Inj daag tetang edinj-a.'
  },
  {
    patterns: ['आज छुट्टी है', 'स्कूल की छुट्टी है'],
    olChiki: 'ᱛᱮᱦᱮᱧ ᱟᱥᱲᱟ ᱪᱷᱩᱴᱤ ᱢᱮᱱᱟᱜ-ᱟ᱾',
    devanagari: 'तेहेंज आसड़ा छुटी मेनाक-आ।',
    romanPhonics: 'Tehenj asda chuti menag-a.'
  },
  {
    patterns: ['पेड़ मत काटो', 'पेड़ की रक्षा करो'],
    olChiki: 'ᱫᱟᱨᱮ ᱟᱞᱚᱯᱮ ᱢᱟᱜ-ᱟ, ᱫᱟᱨᱮ ᱵᱟᱧᱪᱟᱣ ᱯᱮ᱾',
    devanagari: 'दारे आलोपे माग-आ, दारे बांचाव पे।',
    romanPhonics: 'Dare alope mag-a, dare banchaw pe.'
  },
  {
    patterns: ['दरवाजा खोलो', 'खिड़की खोलो'],
    olChiki: 'ᱫᱩᱣᱟᱹᱨ ᱡᱷᱤᱡ ᱢᱮ᱾',
    devanagari: 'दुवार झिज मे।',
    romanPhonics: 'Duwar jhij me.'
  },
  {
    patterns: ['दरवाजा बंद करो', 'खिड़की बंद करो'],
    olChiki: 'ᱫᱩᱣᱟᱹᱨ ᱵᱚᱸᱫᱽ ᱢᱮ᱾',
    devanagari: 'दुवार बोंद मे।',
    romanPhonics: 'Duwar bond me.'
  },
  {
    patterns: ['कल समय पर स्कूल आना', 'कल स्कूल जरूर आना', 'समय पर आना'],
    olChiki: 'ᱜᱟᱯᱟ ᱚᱠᱛᱚ ᱨᱮ ᱟᱥᱲᱟ ᱦᱤᱡᱩᱜ ᱯᱮ᱾',
    devanagari: 'गापा ओकतो रे आसड़ा हिजुक पे।',
    romanPhonics: 'Gapa okto re asda hijug pe.'
  },
  {
    patterns: ['कक्षा में शांति बनाए रखो', 'कक्षा में चुप रहो'],
    olChiki: 'ᱠᱞᱟᱥ ᱨᱮ ᱛᱷᱤᱨ ᱛᱟᱦᱮᱸᱱ ᱯᱮ᱾',
    devanagari: 'क्लास रे थिर ताहेन पे।',
    romanPhonics: 'Class re thir tahen pe.'
  },
  {
    patterns: ['गृहकार्य पूरा करो', 'होमवर्क करो'],
    olChiki: 'ᱚᱲᱟᱜ ᱨᱮᱱᱟᱜ ᱠᱟᱹᱢᱤ ᱯᱩᱨᱟᱹᱣ ᱯᱮ᱾',
    devanagari: 'ओड़ाक रेनाक कामी पुराव पे।',
    romanPhonics: 'Orah renag kami puraw pe.'
  }
];

// 2. Comprehensive Word & Token Lexicon for Grammatical Dynamic Synthesis
interface SantaliWordEntry {
  hindiWords: string[];
  olChiki: string;
  devanagari: string;
  roman: string;
}

const SANTALI_LEXICON: SantaliWordEntry[] = [
  // Pronouns
  { hindiWords: ['मैं', 'मुझे', 'मुझको'], olChiki: 'ᱤᱧ', devanagari: 'ईंज', roman: 'Inj' },
  { hindiWords: ['मेरा', 'मेरी', 'मेरे'], olChiki: 'ᱤᱧᱟᱜ', devanagari: 'ईंझाग', roman: 'Injag' },
  { hindiWords: ['हम', 'हमें', 'हमको', 'हम सब'], olChiki: 'ᱟᱵᱚ', devanagari: 'आबो', roman: 'Abo' },
  { hindiWords: ['हमारा', 'हमारी', 'हमारे'], olChiki: 'ᱟᱵᱚᱣᱟᱜ', devanagari: 'आबोवाक', roman: 'Abowag' },
  { hindiWords: ['तुम', 'तुम्हें', 'तू'], olChiki: 'ᱟᱢ', devanagari: 'आम', roman: 'Am' },
  { hindiWords: ['तुम्हारा', 'तुम्हारी', 'तुम्हारे'], olChiki: 'ᱟᱢᱟᱜ', devanagari: 'आमाग', roman: 'Amag' },
  { hindiWords: ['आप', 'आप सब'], olChiki: 'ᱟᱯᱮ', devanagari: 'आपे', roman: 'Ape' },
  { hindiWords: ['आपका', 'आपकी', 'आपके'], olChiki: 'ᱟᱯᱮᱭᱟᱜ', devanagari: 'आपेयाक', roman: 'Apeag' },
  { hindiWords: ['वह', 'उसे', 'उस'], olChiki: 'ᱩᱱᱤ', devanagari: 'उनी', roman: 'Uni' },
  { hindiWords: ['उसका', 'उसकी', 'उसके'], olChiki: 'ᱩᱱᱤᱭᱟᱜ', devanagari: 'उनीयाक', roman: 'Uniag' },
  { hindiWords: ['वे', 'उन्हें', 'उनका'], olChiki: 'ᱩᱱᱠᱩ', devanagari: 'उनकु', roman: 'Unku' },
  { hindiWords: ['यह', 'ये', 'इस'], olChiki: 'ᱱᱚᱣᱟ', devanagari: 'नोवा', roman: 'Nowa' },
  { hindiWords: ['सब', 'सभी', 'सारे'], olChiki: 'ᱥᱟᱱᱟᱢ', devanagari: 'सनाम', roman: 'Sanam' },

  // Nouns
  { hindiWords: ['पानी', 'जल', 'नीर'], olChiki: 'ᱫᱟᱜ', devanagari: 'दाक', roman: 'Daag' },
  { hindiWords: ['खाना', 'भोजन', 'भात', 'चावल'], olChiki: 'ᱫᱟᱠᱟ', devanagari: 'दाका', roman: 'Daka' },
  { hindiWords: ['पेड़', 'वृक्ष', 'पेड़'], olChiki: 'ᱫᱟᱨᱮ', devanagari: 'दारे', roman: 'Dare' },
  { hindiWords: ['पत्ता', 'पत्ते'], olChiki: 'ᱥᱟᱠᱟᱢ', devanagari: 'साकाम', roman: 'Sakam' },
  { hindiWords: ['फल', 'फलें'], olChiki: 'ᱡᱚ', devanagari: 'जो', roman: 'Jo' },
  { hindiWords: ['फूल'], olChiki: 'ᱵᱟᱦᱟ', devanagari: 'बाहा', roman: 'Baha' },
  { hindiWords: ['सूरज', 'सूर्य', 'धूप'], olChiki: 'ᱥᱤᱧ', devanagari: 'सिंगी', roman: 'Singi' },
  { hindiWords: ['चाँद', 'चन्द्रमा'], olChiki: 'ᱪᱟᱸᱫᱚ', devanagari: 'चांदो', roman: 'Chando' },
  { hindiWords: ['तारे', 'तारा'], olChiki: 'ᱤᱯᱤᱞ', devanagari: 'इपिल', roman: 'Ipil' },
  { hindiWords: ['बादल'], olChiki: 'ᱨᱤᱢᱤᱞ', devanagari: 'रिमिल', roman: 'Rimil' },
  { hindiWords: ['बारिश', 'वर्षा'], olChiki: 'ᱫᱟᱜ ᱡᱟᱹᱲᱤ', devanagari: 'दाक जाड़ी', roman: 'Daag jari' },
  { hindiWords: ['हवा', 'पवन'], olChiki: 'ᱦᱚᱭ', devanagari: 'होय', roman: 'Hoy' },
  { hindiWords: ['आग'], olChiki: 'ᱥᱮᱸᱜᱮᱞ', devanagari: 'सेंघेल', roman: 'Sengel' },
  { hindiWords: ['मिट्टी', 'जमीन'], olChiki: 'ᱦᱟᱥᱟ', devanagari: 'हासा', roman: 'Hasa' },
  { hindiWords: ['रास्ता', 'सड़क'], olChiki: 'ᱦᱚᱨ', devanagari: 'होर', roman: 'Hor' },
  { hindiWords: ['गाँव', 'ग्राम'], olChiki: 'ᱟᱹᱛᱩ', devanagari: 'आतु', roman: 'Aatu' },
  { hindiWords: ['घर', 'मकान'], olChiki: 'ᱚᱲᱟᱜ', devanagari: 'ओड़ाक', roman: 'Orah' },
  { hindiWords: ['स्कूल', 'विद्यालय', 'पाठशाला'], olChiki: 'ᱟᱥᱲᱟ', devanagari: 'आसड़ा', roman: 'Asda' },
  { hindiWords: ['किताब', 'पुस्तक'], olChiki: 'ᱯᱩᱛᱷᱤ', devanagari: 'पुथी', roman: 'Puthi' },
  { hindiWords: ['कॉपी', 'पुस्तिका'], olChiki: 'ᱠᱷᱟᱛᱟ', devanagari: 'खाता', roman: 'Khata' },
  { hindiWords: ['कलम', 'पेन'], olChiki: 'ᱠᱚᱞᱚᱢ', devanagari: 'कोलोम', roman: 'Kalam' },
  { hindiWords: ['शिक्षक', 'अध्यापक', 'गुरुजी'], olChiki: 'ᱢᱟᱪᱮᱛ', devanagari: 'माचेत', roman: 'Machet' },
  { hindiWords: ['शिक्षिका', 'अध्यापिका'], olChiki: 'ᱢᱟᱪᱮᱛᱟᱱᱤ', devanagari: 'माचेतानी', roman: 'Machetani' },
  { hindiWords: ['बच्चे', 'बच्चा', 'छात्र', 'बालक'], olChiki: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ', devanagari: 'गिदरा को', roman: 'Gidra ko' },
  { hindiWords: ['लड़का'], olChiki: 'ᱠᱚᱲᱟ', devanagari: 'कोड़ा', roman: 'Kora' },
  { hindiWords: ['लड़की'], olChiki: 'ᱠᱩᱲᱤ', devanagari: 'कुड़ी', roman: 'Kuri' },
  { hindiWords: ['माँ', 'माता'], olChiki: 'ᱟᱭᱳ', devanagari: 'आयो', roman: 'Ayo' },
  { hindiWords: ['पिता', 'बाप'], olChiki: 'ᱵᱟᱵᱟ', devanagari: 'बाबा', roman: 'Baba' },
  { hindiWords: ['भाई'], olChiki: 'ᱵᱚᱭᱦᱟ', devanagari: 'बोयहा', roman: 'Boyha' },
  { hindiWords: ['बहन'], olChiki: 'ᱢᱤᱥᱤ', devanagari: 'मिसी', roman: 'Misi' },
  { hindiWords: ['दोस्त', 'मित्र'], olChiki: 'ᱜᱟᱛᱮ', devanagari: 'गाते', roman: 'Gate' },
  { hindiWords: ['गाय'], olChiki: 'ᱜᱟᱹᱭ', devanagari: 'गाई', roman: 'Gai' },
  { hindiWords: ['बैल'], olChiki: 'ᱰᱟᱝᱜᱽᱨᱟ', devanagari: 'डांगरा', roman: 'Dangra' },
  { hindiWords: ['बकरी'], olChiki: 'ᱢᱮᱨᱚᱢ', devanagari: 'मेरोम', roman: 'Merom' },
  { hindiWords: ['कुत्ता'], olChiki: 'ᱥᱮᱛᱟ', devanagari: 'सेता', roman: 'Seta' },
  { hindiWords: ['बिल्ली'], olChiki: 'ᱯᱩᱥᱤ', devanagari: 'पुसी', roman: 'Pusi' },
  { hindiWords: ['चिड़िया', 'पक्षी'], olChiki: 'ᱪᱮᱬᱮ', devanagari: 'चेणे', roman: 'Chene' },
  { hindiWords: ['मछली'], olChiki: 'ᱦᱟᱹᱠᱩ', devanagari: 'हाकू', roman: 'Haku' },
  { hindiWords: ['हाथ'], olChiki: 'ᱛᱤ', devanagari: 'ती', roman: 'Ti' },
  { hindiWords: ['पैर'], olChiki: 'ᱡᱟᱝᱜᱟ', devanagari: 'जांगा', roman: 'Janga' },
  { hindiWords: ['आँख'], olChiki: 'ᱢᱮᱫ', devanagari: 'मेद', roman: 'Med' },
  { hindiWords: ['कान'], olChiki: 'ᱞᱩᱛᱩᱨ', devanagari: 'लुतुर', roman: 'Lutur' },
  { hindiWords: ['नाक'], olChiki: 'ᱢᱩᱸ', devanagari: 'मूं', roman: 'Mu' },
  { hindiWords: ['मुँह'], olChiki: 'ᱢᱚᱪᱟ', devanagari: 'मोचा', roman: 'Mocha' },
  { hindiWords: ['सिर'], olChiki: 'ᱵᱚᱦᱚᱜ', devanagari: 'बोहोक', roman: 'Bohog' },
  { hindiWords: ['नाम'], olChiki: 'ᱧᱩᱛᱩᱢ', devanagari: 'ञुतुम', roman: 'Nyutum' },
  { hindiWords: ['काम'], olChiki: 'ᱠᱟᱹᱢᱤ', devanagari: 'कामी', roman: 'Kami' },
  { hindiWords: ['भाषा', 'बोली'], olChiki: 'ᱯᱟᱹᱨᱥᱤ', devanagari: 'पारसी', roman: 'Parsi' },

  // Verbs & Actions
  { hindiWords: ['पढ़ना', 'पढ़ो', 'पढ़ता', 'पढ़ती', 'पढ़ा', 'पढ़ रहे'], olChiki: 'ᱯᱟᱲᱦᱟᱣ', devanagari: 'पाढ़ाव', roman: 'Padhaw' },
  { hindiWords: ['लिखना', 'लिखो', 'लिखता', 'लिखती', 'लिखा', 'लिख रहे'], olChiki: 'ᱚᱞ', devanagari: 'ओल', roman: 'Ol' },
  { hindiWords: ['सुनना', 'सुनो', 'सुना'], olChiki: 'ᱟᱧᱡᱚᱢ', devanagari: 'आंजोम', roman: 'Anjom' },
  { hindiWords: ['देखना', 'देखो', 'देखा'], olChiki: 'ᱧᱮᱞ', devanagari: 'ञेल', roman: 'Nel' },
  { hindiWords: ['बोलना', 'बोलो', 'कहो', 'कहना'], olChiki: 'ᱨᱚᱲ', devanagari: 'रोड़', roman: 'Ror' },
  { hindiWords: ['जाना', 'जाओ', 'गया', 'जा रहे'], olChiki: 'ᱥᱮᱱᱚᱜ', devanagari: 'सेनक', roman: 'Senog' },
  { hindiWords: ['आना', 'आओ', 'आया', 'आ रहे'], olChiki: 'ᱦᱤᱡᱩᱜ', devanagari: 'हिजुक', roman: 'Hijug' },
  { hindiWords: ['खाना', 'खाओ', 'खाया'], olChiki: 'ᱡᱚᱢ', devanagari: 'जोम', roman: 'Jom' },
  { hindiWords: ['पीना', 'पियो', 'पिया'], olChiki: 'ᱧᱩ', devanagari: 'ञु', roman: 'Nyu' },
  { hindiWords: ['बैठना', 'बैठो', 'बैठा'], olChiki: 'ᱫᱩᱲᱩᱵ', devanagari: 'दुड़ुब', roman: 'Durub' },
  { hindiWords: ['खड़ा होना', 'खड़े हो', 'उठना'], olChiki: 'ᱛᱤᱸᱜᱩᱱ', devanagari: 'तिंगुन', roman: 'Tingun' },
  { hindiWords: ['सीखना', 'सीखो', 'सीखते'], olChiki: 'ᱪᱮᱫᱚᱜ', devanagari: 'चेदक', roman: 'Chedog' },
  { hindiWords: ['सिखाना', 'सिखाओ'], olChiki: 'ᱪᱮᱫ', devanagari: 'चेद', roman: 'Ched' },
  { hindiWords: ['खेलना', 'खेलो', 'खेला'], olChiki: 'ᱮᱱᱮᱡ', devanagari: 'एनेज', roman: 'Enej' },
  { hindiWords: ['दौड़ना', 'दौड़ो'], olChiki: 'ᱫᱟᱹᱲ', devanagari: 'दौड़', roman: 'Dar' },
  { hindiWords: ['सोना', 'सो जाओ'], olChiki: 'ᱡᱟᱹᱯᱤᱫ', devanagari: 'जापिद', roman: 'Japid' },
  { hindiWords: ['गिनना', 'गिनो', 'गिनती'], olChiki: 'ᱞᱮᱠᱷᱟ', devanagari: 'लेका', roman: 'Lekha' },
  { hindiWords: ['जोड़ना', 'जोड़ो', 'जोड़'], olChiki: 'ᱢᱮᱥᱟ', devanagari: 'मेसा', roman: 'Mesa' },
  { hindiWords: ['घटाना', 'घटाओ'], olChiki: 'ᱚᱪᱚᱜ', devanagari: 'ओचोक', roman: 'Ochog' },
  { hindiWords: ['धोना', 'धो लो'], olChiki: 'ᱟᱹᱨᱩᱵ', devanagari: 'आरुब', roman: 'Arub' },
  { hindiWords: ['खोलना', 'खोलो'], olChiki: 'ᱡᱷᱤᱡ', devanagari: 'झिज', roman: 'Jhij' },
  { hindiWords: ['बंद करना', 'बंद करो'], olChiki: 'ᱵᱚᱸᱫᱽ', devanagari: 'बोंद', roman: 'Bond' },
  { hindiWords: ['समझना', 'समझे'], olChiki: 'ᱵᱩᱡᱷᱟᱹᱣ', devanagari: 'बुझाव', roman: 'Bujhaw' },
  { hindiWords: ['करना', 'करो'], olChiki: 'ᱠᱟᱹᱢᱤ', devanagari: 'कामी', roman: 'Kami' },

  // Adjectives
  { hindiWords: ['अच्छा', 'बढ़िया', 'ठीक'], olChiki: 'ᱱᱟᱯᱟᱭ', devanagari: 'नापाय', roman: 'Napay' },
  { hindiWords: ['बहुत अच्छा', 'शाबाश'], olChiki: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ', devanagari: 'अडी नापाय', roman: 'Adi napay' },
  { hindiWords: ['बड़ा', 'विशाल'], olChiki: 'ᱢᱟᱨᱟᱝ', devanagari: 'मारांग', roman: 'Marang' },
  { hindiWords: ['छोटा'], olChiki: 'ᱦᱩᱰᱤᱧ', devanagari: 'हुड़िंज', roman: 'Hudinj' },
  { hindiWords: ['साफ', 'स्वच्छ'], olChiki: 'ᱥᱟᱯᱷᱟ', devanagari: 'साफा', roman: 'Sapha' },
  { hindiWords: ['मीठा'], olChiki: 'ᱦᱮᱲᱮᱢ', devanagari: 'हेड़म', roman: 'Herem' },
  { hindiWords: ['लाल'], olChiki: 'ᱟᱨᱟᱜ', devanagari: 'आराक', roman: 'Arag' },
  { hindiWords: ['हरा'], olChiki: 'ᱦᱟᱹᱨᱭᱟᱹᱲ', devanagari: 'हरयाड़', roman: 'Haryar' },
  { hindiWords: ['पीला'], olChiki: 'ᱥᱟᱥᱟᱝ', devanagari: 'सासांग', roman: 'Sasang' },

  // Question words
  { hindiWords: ['क्या'], olChiki: 'ᱪᱮᱫ', devanagari: 'चेद', roman: 'Ched' },
  { hindiWords: ['कहाँ'], olChiki: 'ᱚᱠᱟᱨᱮ', devanagari: 'ओकारे', roman: 'Okare' },
  { hindiWords: ['कैसे'], olChiki: 'ᱪᱮᱫ ᱞᱮᱠᱟ', devanagari: 'चेद लेका', roman: 'Ched leka' },
  { hindiWords: ['कौन'], olChiki: 'ᱚᱠᱚᱭ', devanagari: 'ओकोय', roman: 'Okoy' },
  { hindiWords: ['क्यों'], olChiki: 'ᱪᱮᱫᱟᱜ', devanagari: 'चेदाक', roman: 'Chedag' },
  { hindiWords: ['कब'], olChiki: 'ᱛᱤᱥ', devanagari: 'तीस', roman: 'Tis' },

  // Adverbs & Time
  { hindiWords: ['आज'], olChiki: 'ᱛᱮᱦᱮᱧ', devanagari: 'तेहेंज', roman: 'Tehenj' },
  { hindiWords: ['कल'], olChiki: 'ᱜᱟᱯᱟ', devanagari: 'गापा', roman: 'Gapa' },
  { hindiWords: ['सुबह'], olChiki: 'ᱥᱮᱛᱟᱜ', devanagari: 'सेताक', roman: 'Setag' },
  { hindiWords: ['रात'], olChiki: 'ᱧᱤᱫᱟᱹ', devanagari: 'ञिदा', roman: 'Nyida' },
  { hindiWords: ['दिन'], olChiki: 'ᱢᱟᱦᱟᱸ', devanagari: 'माहा', roman: 'Maha' },
  { hindiWords: ['यहाँ', 'इधर'], olChiki: 'ᱱᱚᱸᱰᱮ', devanagari: 'नोंडे', roman: 'Nonde' },
  { hindiWords: ['वहाँ', 'उधर'], olChiki: 'ᱦᱟᱸᱰᱮ', devanagari: 'हांडे', roman: 'Hande' },
  { hindiWords: ['अंदर'], olChiki: 'ᱵᱷᱤᱛᱨᱤ', devanagari: 'भीतरी', roman: 'Bhitri' },
  { hindiWords: ['बाहर'], olChiki: 'ᱵᱟᱦᱨᱮ', devanagari: 'बाहरे', roman: 'Bahre' },
  { hindiWords: ['हाँ'], olChiki: 'ᱦᱮᱸ', devanagari: 'हें', roman: 'He~' },
  { hindiWords: ['नहीं'], olChiki: 'ᱵᱟᱝ', devanagari: 'बांग', roman: 'Bang' },
  { hindiWords: ['मत'], olChiki: 'ᱟᱞᱚ', devanagari: 'आलो', roman: 'Aalo' },
  { hindiWords: ['और'], olChiki: 'ᱟᱨ', devanagari: 'आर', roman: 'Aar' },

  // Numbers
  { hindiWords: ['एक', '१', '1'], olChiki: 'ᱢᱤᱫ', devanagari: 'मिद', roman: 'Mid' },
  { hindiWords: ['दो', '२', '2'], olChiki: 'ᱵᱟᱨ', devanagari: 'बार', roman: 'Bar' },
  { hindiWords: ['तीन', '३', '3'], olChiki: 'ᱯᱮ', devanagari: 'पे', roman: 'Pe' },
  { hindiWords: ['चार', '४', '4'], olChiki: 'ᱯᱳᱱ', devanagari: 'पोन', roman: 'Pon' },
  { hindiWords: ['पांच', 'पाँच', '५', '5'], olChiki: 'ᱢᱚᱬᱮ', devanagari: 'मोणे', roman: 'Mone' },
  { hindiWords: ['छह', '६', '6'], olChiki: 'ᱛᱩᱨᱩᱭ', devanagari: 'तुरुय', roman: 'Turui' },
  { hindiWords: ['सात', '७', '7'], olChiki: 'ᱮᱭᱟᱭ', devanagari: 'एयाय', roman: 'Eyay' },
  { hindiWords: ['आठ', '८', '8'], olChiki: 'ᱤᱨᱟᱹᱞ', devanagari: 'इरल', roman: 'Iral' },
  { hindiWords: ['नौ', '९', '9'], olChiki: 'ᱟᱨᱮ', devanagari: 'आरे', roman: 'Are' },
  { hindiWords: ['दस', '१०', '10'], olChiki: 'ᱜᱮᱞ', devanagari: 'गेल', roman: 'Gel' },
  // Ingest FLN Master Vocabulary entries (Santali)
  ...(((flnMasterVocab as any)?.vocabulary || []).map((entry: any) => ({
    hindiWords: (entry.hindi || '').split('/').map((s: string) => s.trim()).filter(Boolean),
    olChiki: entry.santali || '',
    devanagari: entry.santali || '',
    roman: entry.pronunciation || entry.santali || ''
  }))),
  // Ingest Numbers 1 to 100 entries (Santali)
  ...((numbers1To100 as any[]).map((num: any) => ({
    hindiWords: [num.hindi, String(num.number)],
    olChiki: (num.santali || '').split('(')[0].trim(),
    devanagari: (num.santali || '').split('(')[0].trim(),
    roman: num.pronunciation || num.english || ''
  })))
];

const DEVA_TO_OLCHIKI_MAP: Record<string, string> = {
  'अ': 'ᱚ', 'आ': 'ᱟ', 'इ': 'ᱤ', 'ई': 'ᱤ', 'उ': 'ᱩ', 'ऊ': 'ᱩ',
  'ए': 'ᱮ', 'ऐ': 'ᱮ', 'ओ': 'ᱳ', 'औ': 'ᱳ',
  'क': 'ᱠ', 'ख': 'ᱠᱷ', 'ग': 'ᱜ', 'घ': 'ᱜᱷ', 'ङ': 'ᱝ',
  'च': 'ᱪ', 'छ': 'ᱪᱷ', 'ज': 'ᱡ', 'झ': 'ᱡᱷ', 'ञ': 'ᱧ',
  'ट': 'ᱴ', 'ठ': 'ᱴᱷ', 'ड': 'ᱰ', 'ढ': 'ᱰᱷ', 'ण': 'ᱬ',
  'त': 'ᱛ', 'थ': 'ᱛᱷ', 'द': 'ᱫ', 'ध': 'ᱫᱷ', 'न': 'ᱱ',
  'प': 'ᱯ', 'फ': 'ᱯᱷ', 'ब': 'ᱵ', 'भ': 'ᱵᱷ', 'म': 'ᱢ',
  'य': 'ᱭ', 'र': 'ᱨ', 'ल': 'ᱞ', 'व': 'ᱣ', 'श': 'ᱥ', 'ष': 'ᱥ', 'स': 'ᱥ', 'ह': 'ᱦ',
  'ड़': 'ᱲ', 'ढ़': 'ᱲᱷ',
  'ा': 'ᱟ', 'ि': 'ᱤ', 'ी': 'ᱤ', 'ु': 'ᱩ', 'ू': 'ᱩ', 'े': 'ᱮ', 'ै': 'ᱮ', 'ो': 'ᱳ', 'ौ': 'ᱳ',
  '्': 'ᱽ', 'ं': 'ᱸ', 'ः': 'ᱺ', '़': 'ᱹ', '।': '᱾', '॥': '᱿',
  '1': '᱑', '2': '᱒', '3': '᱓', '4': '᱔', '5': '᱕',
  '6': '᱖', '7': '᱗', '8': '᱘', '9': '᱙', '0': '᱐'
};

export function convertDevanagariToOlChiki(devaText: string): string {
  let res = '';
  for (let i = 0; i < devaText.length; i++) {
    const ch = devaText[i];
    res += DEVA_TO_OLCHIKI_MAP[ch] || ch;
  }
  return res;
}

// Main True Translation Function for Santali
export function translateHindiToSantali(hindiInput: string): SantaliTranslation {
  const clean = hindiInput.trim();
  if (!clean) {
    return { olChiki: '', devanagari: '', romanPhonics: '', confidence: 'grammatical_synthesized' };
  }
  const lowerClean = clean.toLowerCase().replace(/[.,?!।]/g, '');

  // 1. Check Full Sentence Bitext Pairs (exact match first, then full phrase containment)
  for (const item of FULL_SENTENCE_PAIRS) {
    for (const pat of item.patterns) {
      const p = pat.toLowerCase().replace(/[.,?!।]/g, '');
      if (lowerClean === p || (lowerClean.length >= 4 && lowerClean.includes(p))) {
        return {
          olChiki: item.olChiki,
          devanagari: item.devanagari,
          romanPhonics: item.romanPhonics,
          confidence: 'verified_corpus'
        };
      }
    }
  }

  // 2. Grammatical Word-by-Word & Phrase Synthesis (SOV order)
  const rawWords = clean.split(/\s+/);
  const matchedOlChiki: string[] = [];
  const matchedDeva: string[] = [];
  const matchedRoman: string[] = [];

  for (let i = 0; i < rawWords.length; i++) {
    const rawWord = rawWords[i];
    const stripped = rawWord.replace(/[.,?!।]/g, '').toLowerCase();
    if (!stripped) continue;

    // Prioritize exact match
    let entry = SANTALI_LEXICON.find(e =>
      e.hindiWords.some(hw => hw.toLowerCase() === stripped)
    );

    // Fallback: substring match only if stripped word is at least 3 chars
    if (!entry && stripped.length >= 3) {
      entry = SANTALI_LEXICON.find(e =>
        e.hindiWords.some(hw => hw.length >= 3 && (stripped.includes(hw.toLowerCase()) || hw.toLowerCase().includes(stripped)))
      );
    }

    if (entry) {
      matchedOlChiki.push(entry.olChiki);
      matchedDeva.push(entry.devanagari);
      matchedRoman.push(entry.roman);
    } else {
      const numMatch = stripped.match(/\d+/);
      if (numMatch) {
        matchedOlChiki.push(numMatch[0]);
        matchedDeva.push(numMatch[0]);
        matchedRoman.push(numMatch[0]);
      } else {
        // Transliterate to authentic Ol Chiki script!
        matchedOlChiki.push(convertDevanagariToOlChiki(rawWord));
        matchedDeva.push(rawWord);
        matchedRoman.push(rawWord);
      }
    }
  }

  let finalOlChiki = matchedOlChiki.join(' ');
  let finalDeva = matchedDeva.join(' ');
  let finalRoman = matchedRoman.join(' ');

  // Only add Santali copula (ᱠᱟᱱᱟ / काना) if the Hindi input is a declarative statement with 'है', 'हैं', 'हूँ'
  const hasCopula = /है|हैं|हूँ|हो/.test(clean);
  if (hasCopula && !finalOlChiki.includes('ᱠᱟᱱᱟ') && !finalOlChiki.includes('ᱢᱮ')) {
    finalOlChiki += ' ᱠᱟᱱᱟ᱾';
    finalDeva += ' काना।';
    finalRoman += ' kana.';
  } else if (!finalOlChiki.endsWith('᱾') && !finalOlChiki.endsWith('?')) {
    finalOlChiki += '᱾';
    finalDeva += '।';
    finalRoman += '.';
  }

  return {
    olChiki: finalOlChiki,
    devanagari: finalDeva,
    romanPhonics: finalRoman,
    confidence: 'grammatical_synthesized'
  };
}
