/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Procedural Indian Epic Sound & Music Engine (Web Audio API)
 * Zero external mp3 dependencies, 100% reliable offline/online synthesis.
 */

export class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private droneGain: GainNode | null = null;

  private isMuted: boolean = false;
  private masterVolume: number = 0.85;
  private isDucked: boolean = false;
  private activeOscillators: OscillatorNode[] = [];
  private currentTheme: string = '';
  private themeInterval: number | null = null;

  constructor() {
    // Initialized on user interaction
  }

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Music sub-bus
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      // SFX sub-bus
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      // Drone sub-bus
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.droneGain.connect(this.musicGain);

      this.startTanpuraDrone();
    } catch (e) {
      console.warn('AudioContext failed to initialize:', e);
    }
  }

  public resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime, 0.05);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public setDucking(duck: boolean) {
    if (!this.musicGain || !this.ctx || this.isDucked === duck) return;
    this.isDucked = duck;
    // Duck music by 65% when narration speaks, smooth 0.3s transition
    const targetGain = duck ? 0.25 : 0.7;
    this.musicGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.3);
  }

  /**
   * Continuous Tanpura Sacred Drone (Sa - Pa - Sa' in 136.1Hz Om frequency)
   */
  private startTanpuraDrone() {
    if (!this.ctx || !this.droneGain) return;

    const baseFreq = 136.1; // Sacred Om tone
    const partials = [
      { freq: baseFreq * 0.5, type: 'sine' as OscillatorType, vol: 0.5 },
      { freq: baseFreq, type: 'triangle' as OscillatorType, vol: 0.4 },
      { freq: baseFreq * 1.5, type: 'sine' as OscillatorType, vol: 0.35 }, // Pa (Fifth)
      { freq: baseFreq * 2.0, type: 'sine' as OscillatorType, vol: 0.25 },
      { freq: baseFreq * 2.25, type: 'sine' as OscillatorType, vol: 0.15 }, // Shuddha Re
      { freq: baseFreq * 2.5, type: 'triangle' as OscillatorType, vol: 0.2 }, // Shuddha Ga
    ];

    partials.forEach((p) => {
      if (!this.ctx || !this.droneGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = p.type;
      osc.frequency.setValueAtTime(p.freq, this.ctx.currentTime);

      // Subtle LFO drift for organic breathing
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.1 + Math.random() * 0.15, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(p.freq * 0.015, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      gain.gain.setValueAtTime(p.vol * 0.3, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.droneGain);

      osc.start();
      this.activeOscillators.push(osc);
    });
  }

  /**
   * Play resonant Sacred Temple Bell (Ghanta)
   */
  public playTempleBell() {
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const strikeFreq = 432; // Harmonic sacred pitch
    const bellPartials = [1.0, 2.76, 4.07, 5.4, 6.8];
    const decays = [5.5, 4.0, 2.5, 1.8, 1.2];
    const amplitudes = [0.6, 0.35, 0.2, 0.12, 0.08];

    bellPartials.forEach((ratio, i) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(strikeFreq * ratio, now);

      gain.gain.setValueAtTime(amplitudes[i] * 0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[i]);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + decays[i]);
    });
  }

  /**
   * Play Mridangam / Pakhawaj War Drum thump
   */
  public playDrum(type: 'deep' | 'slap' | 'conch' = 'deep') {
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    if (type === 'deep') {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);

      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.7);
    } else if (type === 'slap') {
      // High wooden rim strike
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'conch') {
      // Sacred Shankha (conch shell trumpet call)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';
      const conchBase = 220;

      osc1.frequency.setValueAtTime(conchBase, now);
      osc1.frequency.linearRampToValueAtTime(conchBase * 1.5, now + 0.8);
      osc1.frequency.linearRampToValueAtTime(conchBase * 1.48, now + 2.5);

      osc2.frequency.setValueAtTime(conchBase * 1.01, now);
      osc2.frequency.linearRampToValueAtTime(conchBase * 1.51, now + 0.8);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.4, now + 0.5);
      gain.gain.linearRampToValueAtTime(0.35, now + 2.0);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, now);
      filter.Q.setValueAtTime(3.0, now);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 3.2);
      osc2.stop(now + 3.2);
    }
  }

  /**
   * Play celestial arrow whoosh and Brahmastra energy surge
   */
  public playArrowRelease() {
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    // String twang tension
    const snapOsc = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snapOsc.type = 'triangle';
    snapOsc.frequency.setValueAtTime(800, now);
    snapOsc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
    snapGain.gain.setValueAtTime(0.8, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    snapOsc.connect(snapGain);
    snapGain.connect(this.sfxGain);
    snapOsc.start(now);
    snapOsc.stop(now + 0.2);

    // Divine solar streak whoosh
    const whooshOsc = this.ctx.createOscillator();
    const whooshGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    whooshOsc.type = 'sawtooth';
    whooshOsc.frequency.setValueAtTime(150, now + 0.05);
    whooshOsc.frequency.exponentialRampToValueAtTime(1800, now + 0.6);
    whooshOsc.frequency.exponentialRampToValueAtTime(220, now + 1.8);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, now);
    filter.Q.setValueAtTime(4, now);

    whooshGain.gain.setValueAtTime(0.01, now);
    whooshGain.gain.linearRampToValueAtTime(0.6, now + 0.4);
    whooshGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

    whooshOsc.connect(filter);
    filter.connect(whooshGain);
    whooshGain.connect(this.sfxGain);

    whooshOsc.start(now);
    whooshOsc.stop(now + 2.0);
  }

  /**
   * Ocean waves for Hanuman's Leap and Lanka Bridge
   */
  public playOceanRumble(durationSeconds: number = 5) {
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate pink noise for soft roaring surf
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
      b6 = white * 0.115926;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, now);
    filter.frequency.linearRampToValueAtTime(750, now + durationSeconds * 0.5);
    filter.frequency.linearRampToValueAtTime(220, now + durationSeconds);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 1.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + durationSeconds);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noiseSource.start(now);
    noiseSource.stop(now + durationSeconds);
  }

  /**
   * Ancient manuscript page turn sound
   */
  /**
   * Powerful Impact Boom with Sub-Bass Drop
   */
  public playImpactBoom() {
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.5);

    gain.gain.setValueAtTime(0.9, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.8);
  }

  /**
   * Violent Lightning Thunder Crash
   */
  public playThunderCrash() {
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.25));
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(80, now + 0.6);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.85, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noiseSource.start(now);
  }

  /**
   * Ancient manuscript page turn sound
   */
  public playPageTurn() {
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, now);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.linearRampToValueAtTime(400, now + 0.3);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  /**
   * Harmonize musical scene changes
   */
  public switchSceneTheme(theme: string) {
    if (this.currentTheme === theme) return;
    this.currentTheme = theme;

    if (this.themeInterval) {
      clearInterval(this.themeInterval);
      this.themeInterval = null;
    }

    switch (theme) {
      case 'temple':
        this.playTempleBell();
        break;
      case 'ayodhya':
        this.playTempleBell();
        this.themeInterval = window.setInterval(() => {
          this.playBansuriNote([432, 486, 540, 648][Math.floor(Math.random() * 4)]);
        }, 3200);
        break;
      case 'ocean_leap':
        this.playOceanRumble(8);
        this.playDrum('conch');
        break;
      case 'battle':
        this.themeInterval = window.setInterval(() => {
          this.playDrum(Math.random() > 0.4 ? 'deep' : 'slap');
        }, 1200);
        break;
      case 'coronation':
        this.playTempleBell();
        this.playDrum('conch');
        break;
      default:
        break;
    }
  }

  private playBansuriNote(freq: number) {
    if (!this.ctx || !this.musicGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    // Subtle flute vibrato
    osc.frequency.linearRampToValueAtTime(freq * 1.01, now + 0.6);
    osc.frequency.linearRampToValueAtTime(freq, now + 1.2);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(now);
    osc.stop(now + 2.2);
  }

  public destroy() {
    if (this.themeInterval) clearInterval(this.themeInterval);
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }
}

export const soundEngine = new SoundEngine();
