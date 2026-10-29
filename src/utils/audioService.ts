// Audio synthesis and procedural ambient soundscape service

type AudioStatusCallback = (status: 'ready' | 'playing' | 'paused' | 'ended' | 'error', text?: string) => void;

class AudioService {
  private utterance: SpeechSynthesisUtterance | null = null;
  private currentTitle = '';
  private currentText = '';
  private rate = 1.0;
  private statusCallback: AudioStatusCallback | null = null;
  
  // Ambient Web Audio synthesizer
  private audioCtx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private isAmbiencePlaying = false;

  public setStatusCallback(cb: AudioStatusCallback | null) {
    this.statusCallback = cb;
  }

  public speak(title: string, text: string, rate = 1.0) {
    if (!('speechSynthesis' in window)) {
      if (this.statusCallback) this.statusCallback('error', 'Audio narration is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    this.currentTitle = title;
    this.currentText = text;
    this.rate = rate;

    const utterance = new SpeechSynthesisUtterance(`${title}. ${text}`);
    utterance.rate = rate;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium'))));
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => {
      if (this.statusCallback) this.statusCallback('playing', title);
    };

    utterance.onpause = () => {
      if (this.statusCallback) this.statusCallback('paused', title);
    };

    utterance.onresume = () => {
      if (this.statusCallback) this.statusCallback('playing', title);
    };

    utterance.onend = () => {
      if (this.statusCallback) this.statusCallback('ended', title);
      this.utterance = null;
    };

    utterance.onerror = () => {
      if (this.statusCallback) this.statusCallback('error', 'Narration playback encountered an error.');
      this.utterance = null;
    };

    this.utterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public pause() {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      if (this.statusCallback) this.statusCallback('paused', this.currentTitle);
    }
  }

  public resume() {
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      if (this.statusCallback) this.statusCallback('playing', this.currentTitle);
    } else if (this.currentTitle && this.currentText && !this.utterance) {
      this.speak(this.currentTitle, this.currentText, this.rate);
    }
  }

  public stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.utterance = null;
      if (this.statusCallback) this.statusCallback('ready');
    }
  }

  public setRate(rate: number) {
    this.rate = rate;
    if (this.utterance && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      // Re-speak from text at new speed
      this.speak(this.currentTitle, this.currentText, rate);
    }
  }

  public getCurrentTitle() {
    return this.currentTitle;
  }

  // Procedural Deep Sea / Space Ambient Generator
  public toggleAmbience(enabled?: boolean): boolean {
    const target = enabled !== undefined ? enabled : !this.isAmbiencePlaying;

    if (!target) {
      this.stopAmbience();
      return false;
    } else {
      this.startAmbience();
      return true;
    }
  }

  public getAmbienceState() {
    return this.isAmbiencePlaying;
  }

  private startAmbience() {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.ambientGain = this.audioCtx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.08, this.audioCtx.currentTime + 2.5);
      this.ambientGain.connect(this.audioCtx.destination);

      // Low oceanic / cosmic drone (55Hz and 110Hz harmonics)
      this.ambientOsc1 = this.audioCtx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(55, this.audioCtx.currentTime);

      this.ambientOsc2 = this.audioCtx.createOscillator();
      this.ambientOsc2.type = 'sine';
      this.ambientOsc2.frequency.setValueAtTime(110.5, this.audioCtx.currentTime);

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, this.audioCtx.currentTime);

      this.ambientOsc1.connect(filter);
      this.ambientOsc2.connect(filter);
      filter.connect(this.ambientGain);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
      this.isAmbiencePlaying = true;
    } catch {
      this.isAmbiencePlaying = false;
    }
  }

  private stopAmbience() {
    if (this.ambientGain && this.audioCtx) {
      try {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.8);
        setTimeout(() => {
          this.ambientOsc1?.stop();
          this.ambientOsc2?.stop();
          this.ambientOsc1?.disconnect();
          this.ambientOsc2?.disconnect();
          this.ambientGain?.disconnect();
          this.ambientOsc1 = null;
          this.ambientOsc2 = null;
          this.ambientGain = null;
          this.isAmbiencePlaying = false;
        }, 900);
      } catch {
        this.isAmbiencePlaying = false;
      }
    } else {
      this.isAmbiencePlaying = false;
    }
  }
}

export const audioService = new AudioService();
