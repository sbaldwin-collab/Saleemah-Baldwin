// Web Audio API Generative Music Synthesizer

export interface MusicTrack {
  id: string;
  name: string;
  genre: string;
  description: string;
  bpm: number;
  scale: number[]; // Frequencies or MIDI notes
  chordProgression: number[][];
}

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'keynote-ambient',
    name: 'Silicon Valley Keynote',
    genre: 'Tech Ambient / Future Focus',
    description: 'Ethereal ambient pads with sparkling arpeggiated chimes and warm sub-bass.',
    bpm: 78,
    scale: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25], // C Major / Pentatonic
    chordProgression: [
      [130.81, 196.00, 261.63, 329.63], // Cmaj7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [146.83, 220.00, 261.63, 349.23], // Dm7
      [196.00, 246.94, 293.66, 392.00], // G
    ],
  },
  {
    id: 'executive-lounge',
    name: 'Executive Lounge Zen',
    genre: 'Minimalist Chill / Lo-Fi Warmth',
    description: 'Deep resonant Rhodes-style chords with gentle melodic drops and tape warmth.',
    bpm: 65,
    scale: [220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25], // A Minor / Pentatonic
    chordProgression: [
      [110.00, 164.81, 220.00, 261.63], // Am7
      [130.81, 196.00, 261.63, 329.63], // Cmaj7
      [146.83, 174.61, 220.00, 293.66], // Dm7
      [164.81, 196.00, 246.94, 329.63], // Em7
    ],
  },
  {
    id: 'interoperability-flow',
    name: 'Unified Data Flow',
    genre: 'Modern Tech Pulse / High Velocity',
    description: 'Pulsing synth sequences with crisp FM bells and panoramic stereo sweep.',
    bpm: 92,
    scale: [293.66, 329.63, 369.99, 440.00, 493.88, 587.33], // D Lydian
    chordProgression: [
      [146.83, 220.00, 293.66, 369.99], // Dmaj7
      [196.00, 246.94, 293.66, 369.99], // Gmaj7#11
      [164.81, 246.94, 293.66, 369.99], // E7
      [220.00, 277.18, 329.63, 440.00], // A
    ],
  },
];

class GenerativeMusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying: boolean = false;
  private currentTrackIndex: number = 0;
  private volume: number = 0.5;
  private timerId: number | null = null;
  private step: number = 0;

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public playTrack(trackIndex: number = 0) {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    this.currentTrackIndex = trackIndex % MUSIC_TRACKS.length;
    this.isPlaying = true;
    this.step = 0;

    if (this.timerId) {
      window.clearInterval(this.timerId);
    }

    const track = MUSIC_TRACKS[this.currentTrackIndex];
    const stepIntervalMs = (60 / track.bpm / 2) * 1000; // Eighth notes

    // Trigger initial burst
    this.tick();

    this.timerId = window.setInterval(() => {
      this.tick();
    }, stepIntervalMs);
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public togglePlay(trackIndex?: number): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.playTrack(trackIndex ?? this.currentTrackIndex);
      return true;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack(): MusicTrack {
    return MUSIC_TRACKS[this.currentTrackIndex];
  }

  public getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  private tick() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const track = MUSIC_TRACKS[this.currentTrackIndex];
    const chordIndex = Math.floor(this.step / 8) % track.chordProgression.length;
    const chord = track.chordProgression[chordIndex];

    const now = this.ctx.currentTime;

    // 1. Play Soft Pad Chord on measure boundary
    if (this.step % 8 === 0) {
      this.playPadChord(chord, now);
    }

    // 2. Play Bass note on beat 1 & 5
    if (this.step % 4 === 0) {
      const rootBass = chord[0] / 2;
      this.playBassNote(rootBass, now);
    }

    // 3. Play Arpeggio / Melodic Chimes (semi-random generative pattern)
    if (this.step % 2 === 0 || Math.random() > 0.4) {
      const scaleNotes = track.scale;
      // Select note harmonious with chord
      const note = scaleNotes[Math.floor(Math.random() * scaleNotes.length)];
      const octaveMult = Math.random() > 0.6 ? 2 : 1;
      this.playChime(note * octaveMult, now);
    }

    this.step++;
  }

  private playPadChord(chord: number[], time: number) {
    if (!this.ctx || !this.masterGain) return;

    chord.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, time);
      filter.frequency.exponentialRampToValueAtTime(1400, time + 2);
      filter.frequency.exponentialRampToValueAtTime(600, time + 4);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.04, time + 1.2);
      gain.gain.linearRampToValueAtTime(0.001, time + 4.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(time);
      osc.stop(time + 4.6);
    });
  }

  private playBassNote(freq: number, time: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 1.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 1.9);
  }

  private playChime(freq: number, time: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    const panValue = (Math.random() * 2) - 1; // -1 to 1 stereo width
    if (panner) {
      panner.pan.setValueAtTime(panValue, time);
    }

    gain.gain.setValueAtTime(0.05, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.2);

    if (panner) {
      osc.connect(gain);
      gain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      osc.connect(gain);
      gain.connect(this.masterGain);
    }

    osc.start(time);
    osc.stop(time + 1.3);
  }
}

export const musicEngine = new GenerativeMusicEngine();
