// Multilingual Translation Engine (Hindi -> Santali, Mundari, Ho, English)
// Provides concurrent instant offline translations across Santali, Mundari, Ho, Gondi, and Kurukh.

import { translateAuthentic } from './translatorService';
import { translateHindiToSantali } from './santaliTranslator';
import { generateVocalWavDataUrl } from './vocalSynthesizer';
import { LanguageId } from '../types';

export interface MultilingualTargetResult {
  languageId: LanguageId;
  displayName: string;
  nativeScriptText: string;
  devanagariText: string;
  romanPhonics: string;
  audioWavUrl: string;
  status: 'SUCCESS' | 'FALLBACK';
}

export interface MultilingualBroadcastPayload {
  sourceText: string;
  sourceLang: string;
  timestamp: string;
  translations: Record<LanguageId, MultilingualTargetResult>;
}

const LANGUAGE_LABELS: Record<LanguageId, { name: string; nativeName: string }> = {
  santhali: { name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  mundari: { name: 'Mundari', nativeName: 'मुण्डारी' },
  ho: { name: 'Ho', nativeName: 'हो' },
  gondi: { name: 'Gondi', nativeName: 'गोंडी' },
  kurukh: { name: 'Kurukh', nativeName: 'कुड़ुख़' }
};

export class MultilingualEngine {
  /**
   * Translates Hindi utterance to all target tribal languages simultaneously (100% offline).
   */
  public static processBroadcast(
    hindiText: string,
    targetLanguages: LanguageId[] = ['santhali', 'mundari', 'ho', 'gondi', 'kurukh']
  ): MultilingualBroadcastPayload {
    const translations: Partial<Record<LanguageId, MultilingualTargetResult>> = {};

    for (const lang of targetLanguages) {
      if (lang === 'santhali') {
        const sat = translateHindiToSantali(hindiText);
        translations[lang] = {
          languageId: 'santhali',
          displayName: LANGUAGE_LABELS[lang].name,
          nativeScriptText: sat.olChiki,
          devanagariText: sat.devanagari,
          romanPhonics: sat.romanPhonics,
          audioWavUrl: generateVocalWavDataUrl(sat.devanagari, 'sat'),
          status: 'SUCCESS'
        };
      } else {
        const res = translateAuthentic(hindiText, lang);
        translations[lang] = {
          languageId: lang,
          displayName: LANGUAGE_LABELS[lang].name,
          nativeScriptText: res.tribalText,
          devanagariText: res.tribalText,
          romanPhonics: res.tribalRoman,
          audioWavUrl: generateVocalWavDataUrl(res.tribalText, lang),
          status: 'SUCCESS'
        };
      }
    }

    return {
      sourceText: hindiText,
      sourceLang: 'Hindi',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      translations: translations as Record<LanguageId, MultilingualTargetResult>
    };
  }
}
