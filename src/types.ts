export type SupportedLanguage = 'hindi' | 'sanskrit' | 'english';

export interface StoryScene {
  id: number;
  slug: string;
  title: string;
  hindiTitle: string;
  sanskritTitle: string;
  chapterNumber: number;
  startTime: number; // in seconds
  endTime: number;   // in seconds
  subtitle: string;
  hindiSubtitle: string;
  sanskritSubtitle: string;
  narration: string;        // English
  hindiNarration: string;   // Dramatic Hindi voiceover
  sanskritShloka: string;   // Sacred Sanskrit Shloka
  sanskritMeaning: string;  // Meaning of Sanskrit Shloka
  narrationCues: {
    text: string;
    start: number;
    duration: number;
  }[];
  directorNotes: {
    cameraMove: string;
    palette: string;
    atmosphere: string;
    lighting: string;
    focalPoint: string;
    actionImpact?: 'none' | 'light' | 'medium' | 'heavy' | 'colossal';
  };
  audioCue: {
    theme: 'temple' | 'ayodhya' | 'forest' | 'suspense' | 'abduction' | 'alliance' | 'ocean_leap' | 'lanka' | 'gathering' | 'battle' | 'coronation' | 'epilogue';
    sfx: string[];
    tempo: 'slow' | 'serene' | 'tense' | 'frenetic' | 'triumphant' | 'solemn';
  };
  videoGenerationPrompt: {
    veo3Prompt: string;
    cameraMotion: string;
    styleLock: string;
    characterLock: string;
  };
}

export interface CharacterProfile {
  id: string;
  name: string;
  hindiName: string;
  sanskritName: string;
  title: string;
  role: string;
  appearance: string;
  divineAttributes: string[];
  weaponsAndSymbols: string[];
  dharmaTheme: string;
  powerLevel: string;
  colorTheme: string;
}

export type PlaybackState = 'idle' | 'playing' | 'paused' | 'ended';
