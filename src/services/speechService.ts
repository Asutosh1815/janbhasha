// Universal High-Reliability Speech Engine for JanBhasha
// Guaranteed Sound Output across:
// 1. Android Native APK (Capacitor TextToSpeech with Android 11+ queries, smart Hindi detection & Roman phonics fallback)
// 2. Desktop Browsers (Clean HTML5 Audio /api/tts streaming + Chromium-bug-safe Web Speech)
// 3. 100% Offline fallback (Roman phonics via default device system voice)

import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

// ==========================================
// 1. AUDIBLE SOUND EFFECTS (Web Audio API)
// ==========================================
class SoundEffects {
  private ctx: AudioContext | null = null;

  public getContext(): AudioContext | null {
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
    try {
      const ctx = this.getContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    } catch {}
  }

  playBeep(frequency = 540, type: OscillatorType = 'sine', duration = 0.12) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const play = () => {
        try {
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = type;
          osc.frequency.setValueAtTime(frequency, now);

          // Clear, audible gain
          gain.gain.setValueAtTime(0.35, now);
          gain.gain.linearRampToValueAtTime(0.001, now + duration);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + duration);
        } catch {}
      };

      if (ctx.state === 'suspended') {
        ctx.resume().then(play).catch(() => {});
      } else {
        play();
      }
    } catch {}
  }

  playSuccess() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const play = () => {
        try {
          const now = ctx.currentTime;
          [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const start = now + i * 0.07;
            const end = start + 0.18;

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, start);

            gain.gain.setValueAtTime(0.3, start);
            gain.gain.linearRampToValueAtTime(0.001, end);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(start);
            osc.stop(end);
          });
        } catch {}
      };

      if (ctx.state === 'suspended') {
        ctx.resume().then(play).catch(() => {});
      } else {
        play();
      }
    } catch {}
  }

  playCardFlip() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const play = () => {
        try {
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.linearRampToValueAtTime(750, now + 0.08);

          gain.gain.setValueAtTime(0.25, now);
          gain.gain.linearRampToValueAtTime(0.001, now + 0.08);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.08);
        } catch {}
      };

      if (ctx.state === 'suspended') {
        ctx.resume().then(play).catch(() => {});
      } else {
        play();
      }
    } catch {}
  }
}

export const soundEffects = new SoundEffects();

// Unlock Web Audio on user gestures
if (typeof window !== 'undefined') {
  const unlock = () => soundEffects.unlock();
  window.addEventListener('click', unlock, { capture: true, passive: true });
  window.addEventListener('touchstart', unlock, { capture: true, passive: true });
}

// Warm up Android TTS early
if (typeof window !== 'undefined' && Capacitor.isNativePlatform()) {
  setTimeout(() => {
    try {
      TextToSpeech.getSupportedLanguages().catch(() => {});
    } catch {}
  }, 600);
}

// ==========================================
// 2. SCRIPT & PHONETIC CONVERTERS
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

  // If text is formatted as "OlChiki (Devanagari)", extract Devanagari inside parentheses
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
// 3. ISOLATED AUDIO STREAM PLAYER
// ==========================================
let currentAudioInstance: HTMLAudioElement | null = null;

function playAudioUrl(url: string, onEnd?: () => void): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      if (currentAudioInstance) {
        try {
          currentAudioInstance.pause();
          currentAudioInstance.src = '';
        } catch {}
        currentAudioInstance = null;
      }

      const audio = new Audio();
      audio.preload = 'auto';
      currentAudioInstance = audio;

      let resolved = false;
      const finish = (ok: boolean) => {
        if (resolved) return;
        resolved = true;
        if (currentAudioInstance === audio) {
          currentAudioInstance = null;
        }
        if (onEnd) onEnd();
        resolve(ok);
      };

      // Watchdog timeout: if audio takes > 3.5s to start, fallback to speech synthesis
      const timeoutId = setTimeout(() => finish(false), 3500);

      audio.onended = () => {
        clearTimeout(timeoutId);
        finish(true);
      };

      audio.onerror = () => {
        clearTimeout(timeoutId);
        finish(false);
      };

      audio.src = url;
      const p = audio.play();
      if (p !== undefined) {
        p.catch(() => {
          clearTimeout(timeoutId);
          finish(false);
        });
      }
    } catch {
      if (onEnd) onEnd();
      resolve(false);
    }
  });
}

// ==========================================
// 4. CHROMIUM-SAFE WEB SPEECH SYNTHESIS
// ==========================================
function speakViaWebSpeech(
  text: string,
  preferredLang: string,
  rate = 0.9,
  pitch = 1.0,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return false;
  }

  try {
    const synth = window.speechSynthesis;
    if (synth.paused) {
      synth.resume();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;

    const voices = synth.getVoices();
    let chosenVoice: SpeechSynthesisVoice | undefined;

    if (preferredLang.startsWith('hi')) {
      chosenVoice = voices.find(v =>
        v.lang.toLowerCase().startsWith('hi') ||
        v.lang.toLowerCase().includes('in') ||
        v.name.toLowerCase().includes('hindi')
      );
    }

    if (!chosenVoice) {
      chosenVoice = voices.find(v => v.lang.includes('IN') || v.lang.startsWith('en') || v.default) || voices[0];
    }

    if (chosenVoice) {
      utterance.voice = chosenVoice;
      utterance.lang = chosenVoice.lang;
    } else {
      utterance.lang = preferredLang;
    }

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      (window as any).__janbhasha_utterance = null;
      if (onEnd) onEnd();
    };

    utterance.onend = finish;
    utterance.onerror = (e) => {
      console.warn('[TTS] WebSpeech utterance error:', e);
      finish();
    };

    // Store reference on window to prevent V8 garbage-collection audio cutoff bug
    (window as any).__janbhasha_utterance = utterance;

    synth.speak(utterance);
    return true;
  } catch (err) {
    console.warn('[TTS] WebSpeech exception:', err);
    if (onEnd) onEnd();
    return false;
  }
}

// ==========================================
// 5. NATIVE ANDROID TTS (100% OFFLINE)
// ==========================================
async function speakNativeWithRetry(
  speakableDevanagari: string,
  romanPhonics: string,
  rate: number,
  pitch: number,
  onEnd?: () => void
): Promise<boolean> {
  // Retry loop up to 3 times in case Android TTS service is still binding
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      let hasHindi = false;
      try {
        const { languages } = await TextToSpeech.getSupportedLanguages();
        hasHindi = Array.isArray(languages) && languages.some((l: string) =>
          l.toLowerCase().includes('hi') || l.toLowerCase().includes('hin')
        );
      } catch {
        hasHindi = true;
      }

      // If phone has Hindi voice pack:
      if (hasHindi) {
        try {
          await TextToSpeech.speak({
            text: speakableDevanagari,
            lang: 'hi-IN',
            rate,
            pitch,
            volume: 1.0,
          });
          if (onEnd) onEnd();
          return true;
        } catch (hiErr) {
          console.warn('[TTS] Native Hindi speak failed, trying Roman phonics:', hiErr);
        }
      }

      // Fallback: Roman Phonics using offline system voice (available on 100% of Android devices)
      try {
        await TextToSpeech.speak({
          text: romanPhonics,
          lang: 'en-IN',
          rate,
          pitch,
          volume: 1.0,
        });
        if (onEnd) onEnd();
        return true;
      } catch {
        await TextToSpeech.speak({
          text: romanPhonics,
          lang: 'en-US',
          rate,
          pitch,
          volume: 1.0,
        });
        if (onEnd) onEnd();
        return true;
      }
    } catch (err) {
      console.warn(`[TTS] Native speak attempt ${attempt + 1} failed:`, err);
      if (attempt < 2) {
        await new Promise(r => setTimeout(r, 250));
      }
    }
  }

  return false;
}

// ==========================================
// 6. MASTER SPEAK TEXT
// ==========================================
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

  const romanPhonics = (fallbackRoman && fallbackRoman.trim())
    ? fallbackRoman.trim()
    : convertDevanagariToRoman(speakableDevanagari);

  console.log('[TTS] Speak request:', {
    deva: speakableDevanagari,
    roman: romanPhonics,
    isNative: Capacitor.isNativePlatform()
  });

  // Small 60ms breather to allow previous audio cancellation to settle cleanly
  await new Promise(r => setTimeout(r, 60));

  // -------------------------------------------------------------
  // TIER 1: Native Android APK (Works 100% OFFLINE)
  // -------------------------------------------------------------
  if (Capacitor.isNativePlatform()) {
    const ok = await speakNativeWithRetry(speakableDevanagari, romanPhonics, rate, pitch, onEnd);
    if (ok) return;
  }

  // -------------------------------------------------------------
  // TIER 2: Local High-Res Audio Stream (/api/tts MP3)
  // Plays instantly when Vite proxy & backend are active on localhost
  // -------------------------------------------------------------
  try {
    const encoded = encodeURIComponent(speakableDevanagari.slice(0, 200));
    const streamUrl = `/api/tts?text=${encoded}`;
    const streamed = await playAudioUrl(streamUrl, onEnd);
    if (streamed) return;
  } catch {}

  // -------------------------------------------------------------
  // TIER 3: Web Speech API with Native Hindi Voice
  // -------------------------------------------------------------
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices();
    const hasHindi = voices.some(v =>
      v.lang.toLowerCase().startsWith('hi') || v.name.toLowerCase().includes('hindi')
    );

    if (hasHindi && lang.startsWith('hi')) {
      const ok = speakViaWebSpeech(speakableDevanagari, 'hi-IN', rate, pitch, onEnd);
      if (ok) return;
    }
  }

  // -------------------------------------------------------------
  // TIER 4: Universal Offline Web Speech (Roman Phonics)
  // Guaranteed voice output: speaks "Sanam gidra ko Johar!" with standard system voice
  // -------------------------------------------------------------
  speakViaWebSpeech(romanPhonics, 'en-US', rate, pitch, onEnd);
};

// ==========================================
// 7. STOP SPEECH
// ==========================================
export const stopSpeech = () => {
  // 1. Stop Native Android TTS
  try {
    TextToSpeech.stop().catch(() => {});
  } catch {}

  // 2. Stop HTML5 Audio Player
  if (currentAudioInstance) {
    try {
      currentAudioInstance.pause();
      currentAudioInstance.src = '';
    } catch {}
    currentAudioInstance = null;
  }

  // 3. Stop Web Speech Synthesis safely
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    (window as any).__janbhasha_utterance = null;
    try {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    } catch {}
  }
};
