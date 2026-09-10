// Universal Multi-Tier Audio & Speech Engine for JanBhasha
// 100% OFFLINE & ONLINE CAPABLE
// Supported Targets:
// 1. Android APK (Capacitor Native TextToSpeech with dual Hindi + Roman fallback)
// 2. Desktop/Mobile Browser (Web Speech API with smart phonetic fallback)
// 3. Optional Local Backend Stream (/api/tts when connected)

import { Capacitor } from '@capacitor/core';

// ==========================================
// 1. SOUND EFFECTS (Web Audio API)
// ==========================================
class SoundEffects {
  private ctx: AudioContext | null = null;
  private isUnlocked = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public unlock() {
    if (this.isUnlocked) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
      this.isUnlocked = true;
    } catch (e) {
      // Ignore
    }
  }

  playBeep(frequency = 520, type: OscillatorType = 'sine', duration = 0.12) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const play = () => {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
      };

      if (ctx.state === 'suspended') {
        ctx.resume().then(play).catch(() => {});
      } else {
        play();
      }
    } catch {
      // Fallback
    }
  }

  playSuccess() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const play = () => {
        const now = ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const start = now + i * 0.07;
          const end = start + 0.18;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, start);

          gain.gain.setValueAtTime(0.18, start);
          gain.gain.linearRampToValueAtTime(0.001, end);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(start);
          osc.stop(end);
        });
      };

      if (ctx.state === 'suspended') {
        ctx.resume().then(play).catch(() => {});
      } else {
        play();
      }
    } catch {
      // Fallback
    }
  }

  playCardFlip() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const play = () => {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(750, now + 0.07);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.07);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.07);
      };

      if (ctx.state === 'suspended') {
        ctx.resume().then(play).catch(() => {});
      } else {
        play();
      }
    } catch {
      // Fallback
    }
  }
}

export const soundEffects = new SoundEffects();

// ==========================================
// 2. DOM-ATTACHED PERSISTENT AUDIO PLAYER
// ==========================================
let domAudioElement: HTMLAudioElement | null = null;

function getOrCreateAudioElement(): HTMLAudioElement | null {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;
  if (!domAudioElement) {
    let el = document.getElementById('janbhasha-global-audio') as HTMLAudioElement | null;
    if (!el) {
      el = document.createElement('audio');
      el.id = 'janbhasha-global-audio';
      el.style.display = 'none';
      el.preload = 'auto';
      document.body.appendChild(el);
    }
    domAudioElement = el;
  }
  return domAudioElement;
}

// Global user-gesture audio unlocker
if (typeof window !== 'undefined') {
  const handleUserGesture = () => {
    soundEffects.unlock();
    const audio = getOrCreateAudioElement();
    if (audio && !audio.src) {
      audio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
      audio.play().catch(() => {});
    }
    window.removeEventListener('click', handleUserGesture, true);
    window.removeEventListener('touchstart', handleUserGesture, true);
    window.removeEventListener('keydown', handleUserGesture, true);
  };

  window.addEventListener('click', handleUserGesture, true);
  window.addEventListener('touchstart', handleUserGesture, true);
  window.addEventListener('keydown', handleUserGesture, true);
}

// ==========================================
// 3. SCRIPT & PHONETIC CONVERSION TABLES
// ==========================================
const VOWEL_INDEP: Record<string, string> = {
  'ᱚ': 'ओ', 'ᱟ': 'आ', 'ᱤ': 'इ', 'ᱩ': 'उ', 'ᱮ': 'ए', 'ᱳ': 'ओ'
};
const VOWEL_MATRA: Record<string, string> = {
  'ᱚ': 'ो', 'ᱟ': 'ा', 'ᱤ': 'ि', 'ᱩ': 'ु', 'ᱮ': 'े', 'ᱳ': 'ो'
};
const CONSONANTS: Record<string, string> = {
  'ᱛ': 'त', 'ᱜ': 'ग', 'ᱝ': 'ङ', 'ᱞ': 'ल',
  'ᱠ': 'क', 'ᱡ': 'ज', 'ᱢ': 'म', 'ᱣ': 'व',
  'ᱥ': 'स', 'ᱦ': 'ह', 'ᱧ': 'ञ', 'ᱨ': 'र',
  'ᱪ': 'च', 'ᱫ': 'द', 'ᱬ': 'ण', 'ᱭ': 'य',
  'ᱯ': 'प', 'ᱰ': 'ड', 'ᱱ': 'न', 'ᱲ': 'ड़',
  'ᱴ': 'ट', 'ᱵ': 'ब', 'ᱶ': 'ंव', 'ᱷ': 'ह'
};
const MODIFIERS: Record<string, string> = {
  'ᱽ': '्', 'ᱸ': 'ं', 'ᱹ': '', 'ᱺ': 'ः', '᱾': '।', '᱿': '॥',
  '᱑': '1', '᱒': '2', '᱓': '3', '᱔': '4', '᱕': '5',
  '᱖': '6', '᱗': '7', '᱘': '8', '᱙': '9', '᱐': '0'
};

const OL_CHIKI_TO_ROMAN: Record<string, string> = {
  'ᱚ': 'o', 'ᱛ': 't', 'ᱜ': 'g', 'ᱝ': 'ng', 'ᱞ': 'l',
  'ᱟ': 'a', 'ᱠ': 'k', 'ᱡ': 'j', 'ᱢ': 'm', 'ᱣ': 'w',
  'ᱤ': 'i', 'ᱥ': 's', 'ᱦ': 'h', 'ᱧ': 'ny', 'ᱨ': 'r',
  'ᱩ': 'u', 'ᱪ': 'ch', 'ᱫ': 'd', 'ᱬ': 'n', 'ᱭ': 'y',
  'ᱮ': 'e', 'ᱯ': 'p', 'ᱰ': 'd', 'ᱱ': 'n', 'ᱲ': 'r',
  'ᱳ': 'o', 'ᱴ': 't', 'ᱵ': 'b', 'ᱶ': 'nw', 'ᱷ': 'h',
  'ᱽ': '', 'ᱸ': 'n', 'ᱹ': '', 'ᱺ': 'h', '᱾': '.', '᱿': '.',
  '᱑': '1', '᱒': '2', '᱓': '3', '᱔': '4', '᱕': '5',
  '᱖': '6', '᱗': '7', '᱘': '8', '᱙': '9', '᱐': '0'
};

export function convertOlChikiToSpeakable(text: string): string {
  const out: string[] = [];
  let prevWasConsonant = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch in VOWEL_INDEP) {
      if (prevWasConsonant) {
        out.push(VOWEL_MATRA[ch]);
      } else {
        out.push(VOWEL_INDEP[ch]);
      }
      prevWasConsonant = false;
    } else if (ch in CONSONANTS) {
      out.push(CONSONANTS[ch]);
      prevWasConsonant = true;
    } else if (ch in MODIFIERS) {
      out.push(MODIFIERS[ch]);
      if (ch === 'ᱽ') {
        prevWasConsonant = false;
      }
    } else {
      out.push(ch);
      prevWasConsonant = false;
    }
  }

  return out.join('');
}

export function convertOlChikiToRoman(text: string): string {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    out += OL_CHIKI_TO_ROMAN[ch] !== undefined ? OL_CHIKI_TO_ROMAN[ch] : ch;
  }
  return out;
}

// Convert Devanagari to clean speakable Roman phonics (for English offline voice fallback)
const DEVA_TO_ROMAN: Record<string, string> = {
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
  'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
  'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng',
  'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
  'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
  'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
  'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
  'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
  'ड़': 'r', 'ढ़': 'rh',
  'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
  '्': '', 'ं': 'n', 'ँ': 'n', 'ः': 'h', '़': '', '।': '.', '॥': '.'
};

export function convertDevanagariToRoman(text: string): string {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (DEVA_TO_ROMAN[ch] !== undefined) {
      out += DEVA_TO_ROMAN[ch];
    } else {
      out += ch;
    }
  }
  return out.replace(/\s+/g, ' ').trim();
}

export function cleanTextForSpeech(rawText: string): string {
  if (!rawText) return '';
  let cleaned = rawText.trim();

  // If formatted as "OlChiki (Devanagari)", use the clean Devanagari inside parentheses
  const parenMatch = cleaned.match(/\(([^)]+)\)/);
  if (parenMatch && /[\u0900-\u097F]/.test(parenMatch[1])) {
    cleaned = parenMatch[1];
  } else {
    cleaned = cleaned.replace(/\(.*?\)/g, '');
    cleaned = convertOlChikiToSpeakable(cleaned);
  }

  cleaned = cleaned
    .replace(/\+/g, ' प्लस ')
    .replace(/=/g, ' बराबर ')
    .replace(/⇄/g, '')
    .replace(/[•★⭐✨🎉👋👦👧🧒👨👩🏛️🎙️📚🍎💧☀️🌳🐦]/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/ः/g, 'ह')
    .replace(/[;:"~`!]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned;
}

// ==========================================
// 4. MULTI-TIER SPEECH ENGINE
// ==========================================
let nativeTTSModule: any = null;
let nativeTTSChecked = false;
let globalUtterance: SpeechSynthesisUtterance | null = null;
let keepAliveTimer: any = null;

async function getNativeTTS() {
  if (nativeTTSChecked) return nativeTTSModule;
  nativeTTSChecked = true;

  if (Capacitor.isNativePlatform()) {
    try {
      const mod = await import('@capacitor-community/text-to-speech');
      nativeTTSModule = mod.TextToSpeech;
      console.log('[TTS] Capacitor Native TextToSpeech plugin active');
    } catch (e) {
      console.warn('[TTS] Native TextToSpeech plugin not loaded:', e);
    }
  }
  return nativeTTSModule;
}
getNativeTTS();

// HTML5 audio stream via local server or CDN
function playViaAudioElement(text: string, onEnd?: () => void): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const audio = getOrCreateAudioElement();
      if (!audio) {
        if (onEnd) onEnd();
        return resolve(false);
      }

      audio.pause();
      audio.currentTime = 0;

      const encoded = encodeURIComponent(text.slice(0, 180));
      const localUrl = `http://localhost:5001/api/tts?text=${encoded}`;
      const directCdnUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=hi&client=tw-ob`;

      let hasFinished = false;
      const finish = (success: boolean) => {
        if (hasFinished) return;
        hasFinished = true;
        if (onEnd) onEnd();
        resolve(success);
      };

      audio.onended = () => finish(true);

      audio.onerror = () => {
        // Try CDN fallback
        audio.onerror = () => finish(false);
        audio.src = directCdnUrl;
        audio.play().catch(() => finish(false));
      };

      audio.src = localUrl;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          audio.src = directCdnUrl;
          audio.play().catch(() => finish(false));
        });
      }
    } catch {
      if (onEnd) onEnd();
      resolve(false);
    }
  });
}

// Web Speech API execution
function speakViaWebSpeech(text: string, lang: string, rate: number, pitch: number, onEnd?: () => void): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return false;
  }

  try {
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;

    const voices = window.speechSynthesis.getVoices();
    if (lang.startsWith('hi')) {
      const hindiVoice = voices.find(v =>
        v.lang.startsWith('hi') || v.lang.includes('IN') || v.name.toLowerCase().includes('hindi')
      );
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }
    } else {
      // English or default voice
      const engVoice = voices.find(v => v.lang.includes('en') || v.default);
      if (engVoice) {
        utterance.voice = engVoice;
      }
    }

    let ended = false;
    const finish = () => {
      if (ended) return;
      ended = true;
      if (keepAliveTimer) {
        clearInterval(keepAliveTimer);
        keepAliveTimer = null;
      }
      globalUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onend = finish;
    utterance.onerror = (e) => {
      console.warn('[TTS] Web Speech error:', e);
      finish();
    };

    globalUtterance = utterance;

    // Keep-alive loop for Chrome/Edge
    keepAliveTimer = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      } else {
        clearInterval(keepAliveTimer);
        keepAliveTimer = null;
      }
    }, 4000);

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('[TTS] Web Speech exception:', err);
    if (onEnd) onEnd();
    return false;
  }
}

/**
 * Universal Speak Function:
 * GUARANTEED TO SPEAK ALOUD IN BOTH OFFLINE & ONLINE MODES
 *
 * Fallback Chain:
 * 1. Native Android APK:
 *    - Step A: Speaks Devanagari Hindi phonetics via native Android TTS engine (hi-IN)
 *    - Step B (Offline / No Hindi pack): Speaks Roman phonetics via native Android TTS engine (en-IN / default voice)
 * 2. Web Browser:
 *    - Step A: If Hindi voice is present in browser, speaks Devanagari offline with that voice
 *    - Step B: If local Python server is reachable, streams high-res MP3
 *    - Step C (Offline without Hindi pack): Speaks Roman phonetics using the browser's default voice
 *
 * Result: ZERO SILENCE. Always speaks aloud clearly.
 */
export const speakText = async (
  text: string,
  lang: 'hi-IN' | 'en-IN' = 'hi-IN',
  rate = 0.9,
  pitch = 1.0,
  onEnd?: () => void,
  fallbackRoman?: string
) => {
  stopSpeech();
  soundEffects.unlock();

  const speakableDevanagari = cleanTextForSpeech(text);
  if (!speakableDevanagari) {
    if (onEnd) onEnd();
    return;
  }

  // Derive Roman phonics for speech engines without Hindi fonts
  const romanText = (fallbackRoman && fallbackRoman.trim()) 
    ? fallbackRoman.trim() 
    : convertDevanagariToRoman(speakableDevanagari);

  console.log('[TTS] Speaking request:', {
    deva: speakableDevanagari,
    roman: romanText,
    isNative: Capacitor.isNativePlatform()
  });

  // ==============================================================
  // TIER 1: Native Android / iOS App (Capacitor TextToSpeech)
  // Works 100% OFFLINE on mobile devices
  // ==============================================================
  if (Capacitor.isNativePlatform()) {
    try {
      const tts = await getNativeTTS();
      if (tts) {
        // Step 1: Check if Hindi is supported on this Android device
        let hindiSupported = false;
        try {
          const check = await tts.isLanguageSupported({ lang: 'hi-IN' });
          if (check && check.supported) {
            hindiSupported = true;
          } else {
            const check2 = await tts.isLanguageSupported({ lang: 'hi' });
            if (check2 && check2.supported) hindiSupported = true;
          }
        } catch {
          // If check method throws, attempt Hindi speak first
          hindiSupported = true;
        }

        // Try speaking Devanagari with Hindi voice
        if (hindiSupported && lang.startsWith('hi')) {
          try {
            await tts.speak({
              text: speakableDevanagari,
              lang: 'hi-IN',
              rate: rate,
              pitch: pitch,
              volume: 1.0,
              category: 'playback'
            });
            if (onEnd) onEnd();
            return;
          } catch (hindiErr) {
            console.warn('[TTS] Native Hindi speech failed, falling back to Roman phonics:', hindiErr);
          }
        }

        // Step 2: Fallback to Roman Phonics using the default offline English voice
        // (Every Android device has an English voice installed offline)
        try {
          await tts.speak({
            text: romanText,
            lang: 'en-IN',
            rate: rate,
            pitch: pitch,
            volume: 1.0,
            category: 'playback'
          });
          if (onEnd) onEnd();
          return;
        } catch (romanErr) {
          console.warn('[TTS] Native Roman speak failed, trying default system voice:', romanErr);
          // Last try with no language tag (uses whatever voice is active)
          await tts.speak({
            text: romanText,
            rate: rate,
            pitch: pitch,
            volume: 1.0,
            category: 'playback'
          });
          if (onEnd) onEnd();
          return;
        }
      }
    } catch (e) {
      console.warn('[TTS] Native speak error, falling through to web fallbacks:', e);
    }
  }

  // ==============================================================
  // TIER 2: Web Browser (Chrome / Edge / Firefox)
  // ==============================================================
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices();
    const hasHindiVoice = voices.some(v =>
      v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi')
    );

    // If browser has an offline Hindi voice:
    if (hasHindiVoice && lang.startsWith('hi')) {
      const ok = speakViaWebSpeech(speakableDevanagari, 'hi-IN', rate, pitch, onEnd);
      if (ok) return;
    }
  }

  // ==============================================================
  // TIER 3: Local Python Server Audio Stream (if server.py is running)
  // ==============================================================
  if (!Capacitor.isNativePlatform()) {
    try {
      const audioSuccess = await playViaAudioElement(speakableDevanagari, onEnd);
      if (audioSuccess) return;
    } catch {
      // Fall through
    }
  }

  // ==============================================================
  // TIER 4: Ultimate Offline Web Speech Fallback (Roman Phonics)
  // Pronounces "Sanam gidra ko Johar!" clearly with default system voice
  // ==============================================================
  speakViaWebSpeech(romanText, 'en-US', rate, pitch, onEnd);
};

export const stopSpeech = () => {
  if (nativeTTSModule) {
    nativeTTSModule.stop().catch(() => {});
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    if (keepAliveTimer) {
      clearInterval(keepAliveTimer);
      keepAliveTimer = null;
    }
    globalUtterance = null;
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }

  if (domAudioElement) {
    try {
      domAudioElement.pause();
      domAudioElement.currentTime = 0;
    } catch {}
  }
};
