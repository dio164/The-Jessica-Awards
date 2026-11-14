/**
 * Procedural Web Audio API sound synthesizer for the Royal Awards Ceremony.
 * Zero external audio files required. Completely private, offline-ready, and lightweight.
 */

class RoyalSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;

  constructor() {
    // Starts muted by default
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!muted) {
      this.initContext();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Delicate crystal bell / chime for button clicks & subtle UI transitions
   */
  public playGentleChime(freq = 880, duration = 0.8) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.1);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // AudioContext error handling
    }
  }

  /**
   * Royal harp glissando for nominee reveals
   */
  public playHarpSweep() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51]; // C5, E5, G5, B5, C6, E6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.6);
      });
    } catch {
      // AudioContext safe
    }
  }

  /**
   * Suspenseful royal drum roll / timpani pulse before winner reveal
   */
  public playDrumRoll(duration = 1.2) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Low frequency filtered noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now);
      filter.frequency.linearRampToValueAtTime(260, now + duration);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0.12, now + duration - 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // AudioContext safe
    }
  }

  /**
   * Majestic Royal Fanfare & Celebration Chords when the winner is revealed
   */
  public playWinnerFanfare() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      // Royal brass & organ harmony: D major / F# / A / D
      const chords = [
        { time: 0.0, freqs: [293.66, 369.99, 440.00], dur: 0.35, vol: 0.08 },
        { time: 0.35, freqs: [369.99, 440.00, 554.37], dur: 0.35, vol: 0.09 },
        { time: 0.70, freqs: [440.00, 554.37, 659.25], dur: 0.40, vol: 0.10 },
        { time: 1.10, freqs: [587.33, 739.99, 880.00, 1174.66], dur: 1.8, vol: 0.14 },
      ];

      chords.forEach(({ time, freqs, dur, vol }) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + time;
        freqs.forEach(freq => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);

          // Low pass filter for warm brass warmth
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1600, now);

          gain.gain.setValueAtTime(vol, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + dur);
        });
      });

      // Overlay celestial chimes
      setTimeout(() => {
        this.playGentleChime(1318.51, 1.2);
        setTimeout(() => this.playGentleChime(1760.00, 1.4), 180);
      }, 1100);
    } catch {
      // AudioContext safe
    }
  }

  /**
   * Royal Court entrance flourish
   */
  public playCourtEntrance() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const chords = [
        { time: 0.0, freqs: [440, 554.37], dur: 0.4 },
        { time: 0.3, freqs: [554.37, 659.25], dur: 0.4 },
        { time: 0.6, freqs: [659.25, 880], dur: 1.2 },
      ];
      chords.forEach(({ time, freqs, dur }) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + time;
        freqs.forEach(freq => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.07, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + dur);
        });
      });
    } catch {
      // AudioContext safe
    }
  }
}

export const royalAudio = new RoyalSoundEngine();

