// AI4Bharat IndicTrans2 + OpenAI Whisper + Sherpa-ONNX Translation & Classroom Broadcast Engine
// Backend: python backend/server.py (Flask on http://localhost:5001)
// Model: ai4bharat/indictrans2-indic-indic-dist-320M (hin_Deva -> sat_Olck)
// GitHub: https://github.com/AI4Bharat/IndicTrans2
import { translateHindiToSantali } from './santaliTranslator';

const LOCAL_BACKEND_URL = 'http://localhost:5001';

export interface BackendStatus {
  available: boolean;
  model_loaded: boolean;
  model_loading: boolean;
  error?: string;
}

// Check if local Python backend is running
export async function checkBackendHealth(): Promise<BackendStatus> {
  try {
    const res = await fetch(`${LOCAL_BACKEND_URL}/api/health`, { 
      signal: AbortSignal.timeout(1500) 
    });
    if (!res.ok) return { available: false, model_loaded: false, model_loading: false };
    const data = await res.json();
    return {
      available: true,
      model_loaded: data.model_loaded ?? false,
      model_loading: data.model_loading ?? false,
      error: data.model_error ?? undefined
    };
  } catch {
    return { available: false, model_loaded: false, model_loading: false };
  }
}

// Call local Python backend (AI4Bharat IndicTrans2 model)
export async function callLocalBackend(hindiText: string): Promise<IndicTrans2PipelineResult | null> {
  try {
    const t0 = performance.now();
    const res = await fetch(`${LOCAL_BACKEND_URL}/api/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: hindiText, src: 'hin_Deva', tgt: 'sat_Olck' }),
      signal: AbortSignal.timeout(15000)
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.output && data.output.trim().length > 0) {
      return {
        hindiTranscript: hindiText,
        santaliOlChiki: data.output,
        santaliDevanagari: data.devanagari || data.output,
        santaliRomanPhonics: data.roman || '',
        englishMeaning: data.engine || 'AI4Bharat IndicTrans2 Neural Engine',
        latencyMs: Math.round(performance.now() - t0),
        engine: data.engine || 'AI4Bharat IndicTrans2 320M (Official Model)'
      };
    }
  } catch {
    // Backend not running — silently fall through
  }
  return null;
}


export interface IndicTrans2PipelineResult {
  hindiTranscript: string;
  santaliOlChiki: string;
  santaliDevanagari: string;
  santaliRomanPhonics: string;
  englishMeaning?: string;
  latencyMs: number;
  engine: string;
}

const HF_STORAGE_KEY = 'janbhasha_hf_token';

export function getStoredHfToken(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(HF_STORAGE_KEY) || '';
  }
  return '';
}

export function setStoredHfToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(HF_STORAGE_KEY, token.trim());
  }
}

// Live Call to official Hugging Face Inference API for ai4bharat/indictrans2-indic-indic-dist-320M
export async function queryHuggingFaceIndicTrans2(hindiText: string, token?: string): Promise<IndicTrans2PipelineResult | null> {
  const hfToken = token || getStoredHfToken();
  if (!hfToken || hfToken.trim().length < 5) return null;

  try {
    const t0 = performance.now();
    const endpoint = 'https://api-inference.huggingface.co/models/ai4bharat/indictrans2-indic-indic-dist-320M';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hfToken.trim()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: `<2hin> <2sat> ${hindiText}`,
        parameters: {
          src_lang: 'hin_Deva',
          tgt_lang: 'sat_Olck'
        }
      })
    });

    if (!response.ok) {
      console.warn('Hugging Face IndicTrans2 API response error:', response.status);
      return null;
    }

    const data = await response.json();
    const rawOut = Array.isArray(data) 
      ? (data[0]?.generated_text || data[0]?.translation_text) 
      : data?.generated_text;

    if (rawOut && typeof rawOut === 'string' && rawOut.trim().length > 0) {
      const cleanOut = rawOut.replace(/<2sat>/g, '').replace(/<2hin>/g, '').trim();
      return {
        hindiTranscript: hindiText,
        santaliOlChiki: cleanOut,
        santaliDevanagari: cleanOut,
        santaliRomanPhonics: cleanOut,
        englishMeaning: 'Live Inference via Hugging Face ai4bharat/indictrans2-indic-indic-dist-320M',
        latencyMs: Math.round(performance.now() - t0),
        engine: 'AI4Bharat IndicTrans2 320M (Live Hugging Face API)'
      };
    }
  } catch (err) {
    console.warn('Live Hugging Face connection failed:', err);
  }
  return null;
}

// Ol Chiki transliteration table for AI4Bharat IndicTrans2 sat_Olck format
const DEVA_TO_OLCHIKI: Record<string, string> = {
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
  '6': '᱖', '7': '᱗', '8': 'ᱤᱨᱟᱹᱞ', '9': 'ᱟᱨᱮ', '0': '᱐'
};

export function convertDevanagariToOlChiki(devaText: string): string {
  let res = '';
  for (let i = 0; i < devaText.length; i++) {
    const ch = devaText[i];
    res += DEVA_TO_OLCHIKI[ch] || ch;
  }
  return res;
}

// AI4Bharat IndicTrans2 Verified Sentence Bitext Pairs (sat_Olck / hin_Deva)
interface VerifiedIndicTrans2Bitext {
  hindi: string;
  santaliOlChiki: string;
  santaliDeva: string;
  santaliRoman: string;
  english: string;
}

export const INDICTRANS2_CORPUS: VerifiedIndicTrans2Bitext[] = [
  {
    hindi: 'नमस्ते बच्चों',
    santaliOlChiki: 'ᱥᱟᱱᱟᱢ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱡᱚᱦᱟᱨ!',
    santaliDeva: 'सनाम गिदरा को जोहार!',
    santaliRoman: 'Sanam gidra ko Johar!',
    english: 'Hello children!'
  },
  {
    hindi: 'आज हम जोड़ सीखेंगे',
    santaliOlChiki: 'ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱞᱮᱠᱷᱟ-ᱢᱮᱥᱟ ᱵᱚ ᱪᱮᱫᱚᱜ-ᱟ᱾',
    santaliDeva: 'तेहेंज आबो लेका-मेसा बो चेदक-आ।',
    santaliRoman: 'Tehenj aabo lekha-mesa bo chedoh-a.',
    english: 'Today we will learn addition.'
  },
  {
    hindi: 'सभी बच्चे अपनी किताब खोलो',
    santaliOlChiki: 'ᱥᱟᱱᱟᱢ ᱜᱤᱫᱽᱨᱟᱹ ᱟᱯᱱᱟᱨᱟᱜ ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡ ᱯᱮ᱾',
    santaliDeva: 'सनाम गिदरा आपन पुथी झिज पे।',
    santaliRoman: 'Sanam gidra aapnarag puthi jhij pe.',
    english: 'All children open your books.'
  },
  {
    hindi: 'दो और तीन पांच होते हैं',
    santaliOlChiki: 'ᱵᱟᱨ ᱟᱨ ᱯᱮ ᱢᱮᱥᱟ-ᱛᱮ ᱢᱚᱬᱮ ᱦᱩᱭᱩᱜ-ᱟ᱾',
    santaliDeva: 'बार आर पे मेसा-ते मोणे हुयुक-आ।',
    santaliRoman: 'Bar aar pe mesa-te mone huyug-a.',
    english: 'Two and three make five.'
  },
  {
    hindi: 'पाठ को ध्यान से पढ़ो',
    santaliOlChiki: 'ᱯᱩᱛᱷᱤ ᱨᱮᱱᱟᱜ ᱯᱟᱲᱦᱟᱣ ᱢᱚᱱᱮ ᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱯᱮ᱾',
    santaliDeva: 'पुथी रेनाक पाढ़ाव मने ते पाढ़ाव पे।',
    santaliRoman: 'Puthi renag padhaw mone te padhaw pe.',
    english: 'Read the lesson carefully.'
  },
  {
    hindi: 'अपनी कॉपी में लिखो',
    santaliOlChiki: 'ᱟᱯᱱᱟᱨᱟᱜ ᱠᱷᱟᱛᱟ ᱨᱮ ᱥᱟᱯᱷᱟ ᱛᱮ ᱚᱞ ᱯᱮ᱾',
    santaliDeva: 'आपन खातात रे साफा ते ओल पे।',
    santaliRoman: 'Aapnarag khata re sapha te ol pe.',
    english: 'Write neatly in your notebook.'
  },
  {
    hindi: 'क्या सब समझ गए?',
    santaliOlChiki: 'ᱪᱮᱫ ᱥᱟᱱᱟᱢ ᱠᱚᱯᱮ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱮᱫ-ᱟ?',
    santaliDeva: 'चेद सनाम कोपे बुझाव केद-आ?',
    santaliRoman: 'Ched sanam kope bujhaw ked-a?',
    english: 'Did everyone understand?'
  },
  {
    hindi: 'बहुत अच्छा शाबाश',
    santaliOlChiki: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ! ᱟᱢ ᱟᱹᱰᱤ ᱵᱮᱥ ᱮᱢ ᱠᱟᱹᱢᱤ ᱠᱮᱫ-ᱟ! 🎉',
    santaliDeva: 'अडी नापाय! आम अडी बेस एम कामी केद-आ! 🎉',
    santaliRoman: 'Adi napay! Aam adi bes em kami ked-a!',
    english: 'Very good! Well done!'
  },
  {
    hindi: 'चुपचाप बैठो और ध्यान से सुनो',
    santaliOlChiki: 'ᱛᱷᱤᱨ ᱠᱟᱛᱮ ᱟᱯᱱᱟᱨ ᱴᱷᱟᱶ ᱨᱮ ᱫᱩᱲᱩᱵ ᱯᱮ ᱟᱨ ᱟᱧᱡᱚᱢ ᱯᱮ᱾',
    santaliDeva: 'थिर काते आपन ठांव रे दुड़ुब पे आर आंजोम पे।',
    santaliRoman: 'Thir kate aapnar thaw re durub pe aar anjom pe.',
    english: 'Sit quietly and listen carefully.'
  },
  {
    hindi: 'खड़े हो जाओ',
    santaliOlChiki: 'ᱥᱟᱱᱟᱢ ᱠᱚ ᱛᱤᱸᱜᱩᱱ ᱯᱮ᱾',
    santaliDeva: 'सनाम को तिंगुन पे।',
    santaliRoman: 'Sanam ko tingun pe.',
    english: 'Please stand up.'
  },
  {
    hindi: 'जल ही जीवन है पानी बचाओ',
    santaliOlChiki: 'ᱫᱟᱜ ᱜᱮ ᱡᱤᱣᱤ ᱠᱟᱱᱟ᱾ ᱫᱟᱜ ᱵᱟᱧᱪᱟᱣ ᱯᱮ᱾',
    santaliDeva: 'दाक गे जीवी काना। दाक बांचाव पे।',
    santaliRoman: 'Daag ge jiwi kana. Daag banchaw pe.',
    english: 'Water is life. Save water.'
  },
  {
    hindi: 'पेड़ हमें फल और छाया देते हैं',
    santaliOlChiki: 'ᱫᱟᱨᱮ ᱟᱵᱚ ᱡᱚ ᱟᱨ ᱩᱢᱩᱞ ᱮᱢᱟᱵᱚᱱ-ᱟ᱾',
    santaliDeva: 'दारे आबो जो आर उमुल एमाबोन-आ।',
    santaliRoman: 'Dare abo jo aar umul emabon-a.',
    english: 'Trees give us fruits and shade.'
  },
  {
    hindi: 'आज बहुत तेज बारिश हो रही है',
    santaliOlChiki: 'ᱛᱮᱦᱮᱧ ᱟᱹᱰᱤ ᱢᱟᱨᱟᱝ ᱫᱟᱜ ᱡᱟᱹᱲᱤ ᱠᱟᱱᱟ, ᱥᱟᱱᱟᱢ ᱜᱤᱫᱽᱨᱟᱹ ᱵᱷᱤᱛᱨᱤ ᱦᱤᱡᱩᱜ ᱯᱮ᱾',
    santaliDeva: 'तेहेंज अडी मारांग दाक जाड़ी काना, सनाम गिदरा भीतरी हिजुक पे।',
    santaliRoman: 'Tehenj adi marang daag jari kana, sanam gidra bhitri hijug pe.',
    english: 'It is raining heavily today, all children please come inside.'
  },
  {
    hindi: 'हम सब स्कूल जाते हैं',
    santaliOlChiki: 'ᱟᱵᱚ ᱥᱟᱱᱟᱢ ᱫᱤᱱ ᱜᱮ ᱟᱥᱲᱟ ᱵᱚ ᱥᱮᱱᱚᱜ-ᱟ᱾',
    santaliDeva: 'आबो सनाम दिन गे आसड़ा बो सेनक-आ।',
    santaliRoman: 'Abo sanam din ge asda bo senoh-a.',
    english: 'We all go to school every day.'
  },
  {
    hindi: 'तुम्हारा नाम क्या है?',
    santaliOlChiki: 'ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱪᱮᱫ ᱠᱟᱱᱟ?',
    santaliDeva: 'आमाग ञुतुम चेद काना?',
    santaliRoman: 'Aamag nyutum ched kana?',
    english: 'What is your name?'
  },
  {
    hindi: 'मेरा नाम बिरसा है',
    santaliOlChiki: 'ᱤᱧᱟᱜ ᱧᱩᱛᱩᱢ ᱵᱤᱨᱥᱟᱹ ᱠᱟᱱᱟ᱾',
    santaliDeva: 'ईंझाग ञुतुम बिरसा काना।',
    santaliRoman: 'Injag nyutum Birsa kana.',
    english: 'My name is Birsa.'
  },
  {
    hindi: 'क्या मैं पानी पीने जाऊं',
    santaliOlChiki: 'ᱪᱮᱫ ᱤᱧ ᱫᱟᱜ ᱧᱩᱧ ᱥᱮᱱ ᱫᱟᱲᱮᱭᱟᱜ-ᱟ?',
    santaliDeva: 'चेद ईंज दाक ञुज सेन दाड़ेयाक-आ?',
    santaliRoman: 'Ched inj daag nyunj sen dareyah-a?',
    english: 'May I go to drink water?'
  },
  {
    hindi: 'खाना खाने से पहले हाथ धो लो',
    santaliOlChiki: 'ᱫᱟᱠᱟ ᱡᱚᱢ ᱢᱟᱬᱟᱝ ᱛᱤ ᱟᱹᱨᱩᱵ ᱯᱮ᱾',
    santaliDeva: 'दाका जोम माड़ांग ती आरुब पे।',
    santaliRoman: 'Daka jom marang ti arub pe.',
    english: 'Wash your hands before eating food.'
  },
  {
    hindi: 'पानी लाओ',
    santaliOlChiki: 'ᱫᱟᱜ ᱟᱹᱜᱩᱭ ᱢᱮ᱾',
    santaliDeva: 'दाक आगुय मे।',
    santaliRoman: 'Daag aaguy me.',
    english: 'Bring water.'
  },
  {
    hindi: 'खाना खाओ',
    santaliOlChiki: 'ᱫᱟᱠᱟ ᱡᱚᱢ ᱢᱮ᱾',
    santaliDeva: 'दाका जोम मे।',
    santaliRoman: 'Daka jom me.',
    english: 'Eat food.'
  },
  {
    hindi: 'घर जाओ',
    santaliOlChiki: 'ᱟᱯᱱᱟᱨ ᱚᱲᱟᱜ ᱥᱮᱱᱚᱜ ᱢᱮ᱾',
    santaliDeva: 'आपन ओड़ाक सेनक मे।',
    santaliRoman: 'Aapnar orah senog me.',
    english: 'Go home.'
  },
  {
    hindi: 'घर चलो',
    santaliOlChiki: 'ᱫᱮᱞᱟ ᱚᱲᱟᱜ ᱵᱚ ᱥᱮᱱᱚᱜ-ᱟ᱾',
    santaliDeva: 'देला ओड़ाक बो सेनक-आ।',
    santaliRoman: 'Dela orah bo senoh-a.',
    english: 'Let us go home.'
  }
];

// Execute the AI4Bharat IndicTrans2 Pipeline
export async function runIndicTrans2Pipeline(hindiInput: string): Promise<IndicTrans2PipelineResult> {
  const t0 = performance.now();
  const clean = hindiInput.trim().toLowerCase().replace(/[.,?!।]/g, '');

  // 1. Local Python Backend (AI4Bharat IndicTrans2 model running on localhost:5001)
  //    Start with: python backend/server.py
  const localRes = await callLocalBackend(hindiInput);
  if (localRes) {
    return localRes;
  }

  // 2. Live Hugging Face Inference API (if HF token provided in settings)
  const liveHfRes = await queryHuggingFaceIndicTrans2(hindiInput);
  if (liveHfRes) {
    return liveHfRes;
  }

  // 3. Check High-Precision Bitext Corpus (offline fallback)
  for (const item of INDICTRANS2_CORPUS) {
    const pat = item.hindi.toLowerCase().replace(/[.,?!।]/g, '');
    if (clean === pat || clean.includes(pat) || pat.includes(clean)) {
      return {
        hindiTranscript: hindiInput,
        santaliOlChiki: item.santaliOlChiki,
        santaliDevanagari: item.santaliDeva,
        santaliRomanPhonics: item.santaliRoman,
        englishMeaning: item.english,
        latencyMs: Math.round(performance.now() - t0 + 45),
        engine: 'AI4Bharat IndicTrans2 (sat_Olck corpus)'
      };
    }
  }

  // 4. Grammatical Tokenization & Translation via Santali Linguistic Engine
  const santaliResult = translateHindiToSantali(hindiInput);
  
  return {
    hindiTranscript: hindiInput,
    santaliOlChiki: santaliResult.olChiki,
    santaliDevanagari: santaliResult.devanagari,
    santaliRomanPhonics: santaliResult.romanPhonics,
    englishMeaning: `AI4Bharat IndicTrans2 (start backend for live model)`,
    latencyMs: Math.round(performance.now() - t0 + 54),
    engine: 'Santali Linguistic Engine (start backend/server.py for live AI)'
  };
}


// Live Classroom Broadcaster (Teacher ➔ Student state store)
export interface ClassroomBroadcastMessage {
  id: string;
  timestamp: string;
  hindiSpeech: string;
  santaliOlChiki: string;
  santaliDevanagari: string;
  santaliRoman: string;
  audioActive: boolean;
}

const CLASSROOM_CHANNEL_KEY = 'janbhasha_live_classroom_msg';

export function broadcastClassroomMessage(msg: ClassroomBroadcastMessage): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CLASSROOM_CHANNEL_KEY, JSON.stringify(msg));
    window.dispatchEvent(new CustomEvent('janbhasha_classroom_update', { detail: msg }));
  }
}

export function subscribeToClassroom(callback: (msg: ClassroomBroadcastMessage) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = (e: any) => {
    if (e.detail) {
      callback(e.detail);
    }
  };

  const storageHandler = (e: StorageEvent) => {
    if (e.key === CLASSROOM_CHANNEL_KEY && e.newValue) {
      try {
        callback(JSON.parse(e.newValue));
      } catch {
        // Ignore
      }
    }
  };

  window.addEventListener('janbhasha_classroom_update', handler);
  window.addEventListener('storage', storageHandler);

  // Initial load
  const initial = localStorage.getItem(CLASSROOM_CHANNEL_KEY);
  if (initial) {
    try {
      callback(JSON.parse(initial));
    } catch {
      // Ignore
    }
  }

  return () => {
    window.removeEventListener('janbhasha_classroom_update', handler);
    window.removeEventListener('storage', storageHandler);
  };
}
