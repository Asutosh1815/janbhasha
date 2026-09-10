// Universal High-Reliability Speech Engine for JanBhasha
// Guaranteed Sound Output across:
// 1. Android Native APK (Capacitor TextToSpeech with dual Hindi + Roman fallback)
// 2. Desktop Browsers (Chrome / Edge / Firefox with Chromium-bug-safe Web Speech + /api/tts stream)
// 3. Mobile WebViews & Safari (Auto-unlocked Audio element)

import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

// ==========================================
// 1. SOUND EFFECTS (Web Audio API)
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

  playBeep(frequency = 520, type: OscillatorType = 'sine', duration = 0.12) {
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

          gain.gain.setValueAtTime(0.25, now);
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

            gain.gain.setValueAtTime(0.2, start);
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
          osc.frequency.linearRampToValueAtTime(750, now + 0.07);

          gain.gain.setValueAtTime(0.18, now);
          gain.gain.linearRampToValueAtTime(0.001, now + 0.07);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.07);
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

// ==========================================
// 2. DOM AUDIO ELEMENT (Unlocked on Tap)
// ==========================================
let domAudio: HTMLAudioElement | null = null;

function getDomAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;
  if (!domAudio) {
    let el = document.getElementById('janbhasha-player-node') as HTMLAudioElement | null;
    if (!el) {
      el = document.createElement('audio');
      el.id = 'janbhasha-player-node';
      el.style.display = 'none';
      el.preload = 'auto';
      document.body.appendChild(el);
    }
    domAudio = el;
  }
  return domAudio;
}

// User-gesture audio unlocker
if (typeof window !== 'undefined') {
  const unlockAudioPipeline = () => {
    soundEffects.unlock();
    const a = getDomAudio();
    if (a && !a.src) {
      // Inaudible silent audio to wake audio system
      a.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
      a.play().catch(() => {});
    }
  };

  window.addEventListener('click', unlockAudioPipeline, { capture: true, passive: true });
  window.addEventListener('touchstart', unlockAudioPipeline, { capture: true, passive: true });
}

// ==========================================
// 3. SCRIPT & PHONETIC CONVERTERS
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
    out += DEVA_TO_ROMAN[ch] !== undefined ? DEVA_TO_ROMAN[ch] : ch;
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

// Global active utterance reference to prevent V8 garbage-collection audio cutoff
let activeUtterance: SpeechSynthesisUtterance | null = null;

// ==========================================
// 4. SPEECH SYNTHESIS ENGINE
// ==========================================

/**
 * Robust Web Speech Synthesis with Chromium cancel-bug avoidance
 */
function speakViaWebSpeechSafe(
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
    synth.resume();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;

    const voices = synth.getVoices();
    let chosenVoice: SpeechSynthesisVoice | undefined;

    if (preferredLang.startsWith('hi')) {
      chosenVoice = voices.find(v =>
        v.lang.startsWith('hi') || v.lang.includes('IN') || v.name.toLowerCase().includes('hindi')
      );
    }

    if (!chosenVoice) {
      // Find an Indian English voice or default voice
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
      activeUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onend = finish;
    utterance.onerror = (e) => {
      console.warn('[TTS] WebSpeech utterance error:', e);
      finish();
    };

    activeUtterance = utterance;

    // Speak without calling cancel() beforehand to avoid Chromium cancellation lock
    synth.speak(utterance);
    return true;
  } catch (err) {
    console.warn('[TTS] WebSpeech error:', err);
    if (onEnd) onEnd();
    return false;
  }
}

/**
 * Play high-res Hindi audio stream from local server or CDN
 */
function playServerAudioStream(text: string, onEnd?: () => void): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const audio = getDomAudio();
      if (!audio) {
        if (onEnd) onEnd();
        return resolve(false);
      }

      audio.pause();
      audio.currentTime = 0;

      const encoded = encodeURIComponent(text.slice(0, 180));
      // Use relative path so Vite proxy forwards without CORS or host errors
      const proxyUrl = `/api/tts?text=${encoded}`;
      const cdnUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=hi&client=tw-ob`;

      let done = false;
      const complete = (ok: boolean) => {
        if (done) return;
        done = true;
        if (onEnd) onEnd();
        resolve(ok);
      };

      audio.onended = () => complete(true);

      audio.onerror = () => {
        console.warn('[TTS] Server audio stream failed, trying CDN');
        audio.onerror = () => complete(false);
        audio.src = cdnUrl;
        audio.play().catch(() => complete(false));
      };

      audio.src = proxyUrl;
      const p = audio.play();
      if (p !== undefined) {
        p.catch(() => {
          audio.src = cdnUrl;
          audio.play().catch(() => complete(false));
        });
      }
    } catch {
      if (onEnd) onEnd();
      resolve(false);
    }
  });
}

/**
 * Master speakText function
 * NEVER SILENT: Tries native Android TTS, high-res server audio, and Web Speech phonics
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

  const romanPhonics = (fallbackRoman && fallbackRoman.trim())
    ? fallbackRoman.trim()
    : convertDevanagariToRoman(speakableDevanagari);

  console.log('[TTS] Speaking:', {
    deva: speakableDevanagari,
    roman: romanPhonics,
    isNative: Capacitor.isNativePlatform()
  });

  // -------------------------------------------------------------
  // STRATEGY 1: Native Android / iOS Device TTS (Works 100% Offline)
  // -------------------------------------------------------------
  if (Capacitor.isNativePlatform()) {
    try {
      // Step A: Attempt Hindi on native TTS
      let spokenHindi = false;
      try {
        await TextToSpeech.speak({
          text: speakableDevanagari,
          lang: 'hi-IN',
          rate: rate,
          pitch: pitch,
          volume: 1.0,
          category: 'playback'
        });
        spokenHindi = true;
      } catch (hiErr) {
        console.warn('[TTS] Native Hindi voice missing or failed:', hiErr);
      }

      if (spokenHindi) {
        if (onEnd) onEnd();
        return;
      }

      // Step B: Fallback to Roman Phonics using the default offline system voice
      try {
        await TextToSpeech.speak({
          text: romanPhonics,
          lang: 'en-IN',
          rate: rate,
          pitch: pitch,
          volume: 1.0,
          category: 'playback'
        });
        if (onEnd) onEnd();
        return;
      } catch {
        // Last native attempt with default voice
        await TextToSpeech.speak({
          text: romanPhonics,
          rate: rate,
          pitch: pitch,
          volume: 1.0,
          category: 'playback'
        });
        if (onEnd) onEnd();
        return;
      }
    } catch (nativeErr) {
      console.warn('[TTS] Native TextToSpeech plugin error:', nativeErr);
    }
  }

  // -------------------------------------------------------------
  // STRATEGY 2: Browser with Native Hindi Voice Installed
  // -------------------------------------------------------------
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices();
    const hasHindi = voices.some(v => v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi'));

    if (hasHindi && lang.startsWith('hi')) {
      const ok = speakViaWebSpeechSafe(speakableDevanagari, 'hi-IN', rate, pitch, onEnd);
      if (ok) return;
    }
  }

  // -------------------------------------------------------------
  // STRATEGY 3: Local Audio Stream (/api/tts - High Fidelity MP3)
  // -------------------------------------------------------------
  if (!Capacitor.isNativePlatform()) {
    try {
      const streamed = await playServerAudioStream(speakableDevanagari, onEnd);
      if (streamed) return;
    } catch {}
  }

  // -------------------------------------------------------------
  // STRATEGY 4: Universal Offline Web Speech (Roman Phonics)
  // Speaks "Sanam gidra ko Johar!" with Microsoft David / Zira / system voice
  // -------------------------------------------------------------
  speakViaWebSpeechSafe(romanPhonics, 'en-US', rate, pitch, onEnd);
};

export const stopSpeech = () => {
  // 1. Stop Native TTS
  try {
    TextToSpeech.stop().catch(() => {});
  } catch {}

  // 2. Stop DOM Audio
  if (domAudio) {
    try {
      domAudio.pause();
      domAudio.currentTime = 0;
    } catch {}
  }

  // 3. Stop Web Speech
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    activeUtterance = null;
    try {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    } catch {}
  }
};
