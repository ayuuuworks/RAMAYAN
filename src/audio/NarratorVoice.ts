/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Sage Narrator Voice Controller (Multilingual: Hindi, Sanskrit & English)
 */

import { soundEngine } from './SoundEngine';
import { SupportedLanguage } from '../types';

export class NarratorVoiceController {
  private isEnabled: boolean = true;
  private currentLanguage: SupportedLanguage = 'hindi'; // Default to powerful Hindi as requested
  private hindiVoice: SpeechSynthesisVoice | null = null;
  private englishVoice: SpeechSynthesisVoice | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking: boolean = false;
  private onSubtitleCallback: ((text: string) => void) | null = null;

  constructor() {
    this.initVoices();
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const findVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      // 1. Look for Hindi voices
      const hi = voices.find((v) => v.lang.startsWith('hi') || v.lang.includes('IN') && /hindi|lekha|madhav|hemant|neerja/i.test(v.name));
      if (hi) {
        this.hindiVoice = hi;
      } else {
        // Fallback to any Indian accent voice
        this.hindiVoice = voices.find((v) => v.lang === 'en-IN' || v.lang.includes('IN')) || null;
      }

      // 2. Look for English resonant male voice
      const enIndian = voices.find((v) => (v.lang === 'en-IN' || v.lang.includes('IN')) && /male|prabhat|rishi|deep/i.test(v.name));
      const enDeep = voices.find((v) => v.lang.startsWith('en') && /male|deep|george|david|daniel|guy|arthur/i.test(v.name));
      this.englishVoice = enIndian || enDeep || voices.find((v) => v.lang.startsWith('en')) || null;
    };

    findVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = findVoices;
    }
  }

  public setLanguage(lang: SupportedLanguage) {
    this.currentLanguage = lang;
    if (this.isSpeaking) {
      this.cancel();
    }
  }

  public getLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled && this.isSpeaking) {
      this.cancel();
    }
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  public onSubtitle(cb: (text: string) => void) {
    this.onSubtitleCallback = cb;
  }

  public speak(
    text: string,
    sceneIntensity: 'slow' | 'serene' | 'tense' | 'frenetic' | 'triumphant' | 'solemn' = 'serene'
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!this.isEnabled || !text) return;

    this.cancel();

    // Configure pitch & rate based on language and emotional intensity
    let pitch = 0.82; // Deep baritone resonance
    let rate = 0.92;  // Punchy, dignified pacing

    if (this.currentLanguage === 'hindi') {
      pitch = 0.80;
      rate = 0.95; // Punchy heroic Hindi delivery
      if (sceneIntensity === 'frenetic') rate = 1.05;
    } else if (this.currentLanguage === 'sanskrit') {
      pitch = 0.76; // Deep Vedic chant tone
      rate = 0.84;  // Measured Vedic cadence
    } else {
      if (sceneIntensity === 'frenetic') rate = 1.0;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Pick voice according to language
    if (this.currentLanguage === 'hindi' || this.currentLanguage === 'sanskrit') {
      if (this.hindiVoice) {
        utterance.voice = this.hindiVoice;
        utterance.lang = 'hi-IN';
      }
    } else {
      if (this.englishVoice) {
        utterance.voice = this.englishVoice;
        utterance.lang = 'en-IN';
      }
    }

    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      soundEngine.setDucking(true);
      if (this.onSubtitleCallback) {
        this.onSubtitleCallback(text);
      }
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      soundEngine.setDucking(false);
      this.currentUtterance = null;
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      soundEngine.setDucking(false);
      this.currentUtterance = null;
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public cancel() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      soundEngine.setDucking(false);
      this.currentUtterance = null;
    }
  }
}

export const narratorVoice = new NarratorVoiceController();
