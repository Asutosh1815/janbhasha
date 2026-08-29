// Web Audio and Speech Synthesis/Recognition Service

class SoundEffects {
  private ctx: AudioContext | null = null;

  private getContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playBeep(frequency = 520, type: OscillatorType = 'sine', duration = 0.15) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext fallback
    }
  }

  playSuccess() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.12, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.25);
      });
    } catch {
      // Ignore
    }
  }

  playCardFlip() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Ignore
    }
  }
}

export const soundEffects = new SoundEffects();

// Map Ol Chiki characters to phonetic Devanagari sounds so TTS reads full Santhali sentences cleanly
function convertOlChikiToSpeakable(text: string): string {
  const olChikiMap: Record<string, string> = {
    'ᱚ': 'ओ', 'ᱛ': 'त', 'ᱜ': 'ग', 'ᱝ': 'ंग', 'ᱞ': 'ल',
    'ᱟ': 'आ', 'ᱠ': 'क', 'ᱡ': 'ज', 'ᱢ': 'म', 'ᱣ': 'व',
    'ᱤ': 'इ', 'ᱥ': 'स', 'ᱦ': 'ह', 'ᱧ': 'ञ', 'ᱨ': 'र',
    'ᱩ': 'उ', 'ᱪ': 'च', 'ᱫ': 'द', 'ᱬ': 'ण', 'ᱭ': 'य',
    'ᱮ': 'ए', 'ᱯ': 'प', 'ᱰ': 'ड', 'ᱱ': 'न', 'ᱲ': 'ड़',
    'ᱳ': 'ओ', 'ᱴ': 'ट', 'ᱵ': 'ब', 'ᱶ': 'ंव', 'ᱷ': 'ह',
    'ᱸ': 'ं', 'ᱹ': '़', 'ᱺ': 'ः', 'ᱻ': '\'', 'ᱼ': '-',
    'ᱽ': '्', '᱾': '।', '᱿': '॥'
  };

  let result = '';
  for (const char of text) {
    result += olChikiMap[char] || char;
  }
  return result;
}

// Prepare clean, fluent speakable text for SpeechSynthesis without hiccups
export function cleanTextForSpeech(rawText: string): string {
  if (!rawText) return '';

  let cleaned = rawText;

  // Convert Ol Chiki to phonetic Devanagari
  cleaned = convertOlChikiToSpeakable(cleaned);

  // Replace symbols and equations with speakable words
  cleaned = cleaned
    .replace(/\+/g, ' प्लस ')
    .replace(/=/g, ' बराबर ')
    .replace(/⇄/g, '')
    .replace(/[•★⭐✨🎉👋👦👧🧒👨👩🏛️🎙️📚🍎💧☀️🌳🐦]/g, '') // strip emojis & symbols
    .replace(/\(.*?\)/g, (match) => {
      // If parenthesis has words, keep clean text
      return match.replace(/[()]/g, ' ');
    })
    .replace(/\[.*?\]/g, (match) => match.replace(/[[\]]/g, ' '))
    .replace(/ः/g, 'ह') // soften visarga to aspirate h for natural flow
    .replace(/[;:"~`]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned;
}

// Persistent global reference to prevent browser garbage collection of active speech
let globalActiveUtterance: SpeechSynthesisUtterance | null = null;
let speechKeepAliveTimer: any = null;

export const speakText = (
  text: string, 
  lang: 'hi-IN' | 'en-IN' = 'hi-IN', 
  rate = 0.9, 
  pitch = 1.0,
  onEnd?: () => void
) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  // Clean & cancel existing speech
  stopSpeech();

  const speakableString = cleanTextForSpeech(text);
  if (!speakableString) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(speakableString);
  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = pitch;

  // Store in global reference
  globalActiveUtterance = utterance;

  // Find best Indian voice
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN')) || voices[0];
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  const cleanup = () => {
    if (speechKeepAliveTimer) {
      clearInterval(speechKeepAliveTimer);
      speechKeepAliveTimer = null;
    }
    globalActiveUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onend = cleanup;
  utterance.onerror = (e) => {
    console.log('Speech error/cancelled:', e);
    cleanup();
  };

  // Browser keep-alive: prevents Chrome from cutting off utterances after 10-15 seconds
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.resume();
    speechKeepAliveTimer = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      } else {
        clearInterval(speechKeepAliveTimer);
        speechKeepAliveTimer = null;
      }
    }, 4000);
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    if (speechKeepAliveTimer) {
      clearInterval(speechKeepAliveTimer);
      speechKeepAliveTimer = null;
    }
    globalActiveUtterance = null;
    window.speechSynthesis.cancel();
  }
};
