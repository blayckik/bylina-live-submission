const CHIME_NOTES = [293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

export class AmbientEngine {
  constructor() {
    this.context = null;
    this.master = null;
    this.sources = [];
    this.lfos = [];
    this.chimeTimer = null;
    this.closeTimer = null;
    this.active = false;
    this.delay = null;
  }

  async start() {
    if (this.active) {
      if (this.context && this.context.state === 'suspended') {
        await this.context.resume();
      }
      return;
    }
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      throw new Error('Web Audio API is not supported');
    }

    const context = new AudioContextClass();
    await context.resume();
    this.context = context;
    this.active = true;

    const master = context.createGain();
    master.gain.setValueAtTime(0.0001, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.8, context.currentTime + 1.2);
    master.connect(context.destination);
    this.master = master;

    const noiseBuffer = context.createBuffer(1, context.sampleRate * 4, context.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    let brown = 0;
    for (let i = 0; i < noiseData.length; i += 1) {
      const white = Math.random() * 2 - 1;
      brown = (brown + 0.018 * white) / 1.018;
      noiseData[i] = brown * 3.2;
    }

    const wind = context.createBufferSource();
    wind.buffer = noiseBuffer;
    wind.loop = true;
    const windFilter = context.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(560, context.currentTime);
    windFilter.Q.setValueAtTime(0.7, context.currentTime);
    const windGain = context.createGain();
    windGain.gain.setValueAtTime(0.032, context.currentTime);
    wind.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(master);
    wind.start();
    this.sources.push(wind);

    const leaves = context.createBufferSource();
    leaves.buffer = noiseBuffer;
    leaves.loop = true;
    const leavesFilter = context.createBiquadFilter();
    leavesFilter.type = 'bandpass';
    leavesFilter.frequency.setValueAtTime(2200, context.currentTime);
    leavesFilter.Q.setValueAtTime(0.55, context.currentTime);
    const leavesGain = context.createGain();
    leavesGain.gain.setValueAtTime(0.0055, context.currentTime);
    leaves.connect(leavesFilter);
    leavesFilter.connect(leavesGain);
    leavesGain.connect(master);
    leaves.start();
    this.sources.push(leaves);

    const windLfo = context.createOscillator();
    const windLfoGain = context.createGain();
    windLfo.frequency.setValueAtTime(0.052, context.currentTime);
    windLfoGain.gain.setValueAtTime(0.008, context.currentTime);
    windLfo.connect(windLfoGain);
    windLfoGain.connect(windGain.gain);
    windLfo.start();
    this.lfos.push(windLfo);
    this.sources.push(windLfo);

    const filterLfo = context.createOscillator();
    const filterLfoGain = context.createGain();
    filterLfo.frequency.setValueAtTime(0.031, context.currentTime);
    filterLfoGain.gain.setValueAtTime(110, context.currentTime);
    filterLfo.connect(filterLfoGain);
    filterLfoGain.connect(windFilter.frequency);
    filterLfo.start();
    this.lfos.push(filterLfo);
    this.sources.push(filterLfo);

    const delay = context.createDelay(1.2);
    delay.delayTime.setValueAtTime(0.42, context.currentTime);
    const feedback = context.createGain();
    feedback.gain.setValueAtTime(0.24, context.currentTime);
    const damp = context.createBiquadFilter();
    damp.type = 'lowpass';
    damp.frequency.setValueAtTime(2100, context.currentTime);
    const wet = context.createGain();
    wet.gain.setValueAtTime(0.36, context.currentTime);
    delay.connect(damp);
    damp.connect(feedback);
    feedback.connect(delay);
    delay.connect(wet);
    wet.connect(master);
    this.delay = delay;

    this.scheduleChime(1400);
  }

  playChime() {
    if (!this.active || !this.context || !this.master) {
      return;
    }
    const context = this.context;
    const now = context.currentTime;
    const note = CHIME_NOTES[Math.floor(Math.random() * CHIME_NOTES.length)];
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.018, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.6);
    gain.connect(this.master);
    if (this.delay) {
      gain.connect(this.delay);
    }

    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(note, now);
    oscillator.detune.setValueAtTime(-4 + Math.random() * 8, now);
    oscillator.connect(gain);
    oscillator.start(now);
    oscillator.stop(now + 4.8);

    const overtone = context.createOscillator();
    const overtoneGain = context.createGain();
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(note * 2.01, now);
    overtoneGain.gain.setValueAtTime(0.0001, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.004, now + 0.02);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.7);
    overtone.connect(overtoneGain);
    overtoneGain.connect(this.master);
    if (this.delay) {
      overtoneGain.connect(this.delay);
    }
    overtone.start(now);
    overtone.stop(now + 2.9);

    oscillator.onended = () => {
      try {
        oscillator.disconnect();
        overtone.disconnect();
        gain.disconnect();
        overtoneGain.disconnect();
      } catch {
        // Nodes may already be released by context close.
      }
    };
  }

  scheduleChime(delayMs = null) {
    if (!this.active) {
      return;
    }
    if (this.chimeTimer) {
      window.clearTimeout(this.chimeTimer);
    }
    const nextDelay = delayMs ?? 3600 + Math.random() * 5200;
    this.chimeTimer = window.setTimeout(() => {
      this.playChime();
      this.scheduleChime();
    }, nextDelay);
  }

  stop(immediate = false) {
    this.active = false;
    if (this.chimeTimer) {
      window.clearTimeout(this.chimeTimer);
      this.chimeTimer = null;
    }
    if (!this.context) {
      return;
    }
    const context = this.context;
    const master = this.master;

    if (master && !immediate) {
      try {
        master.gain.cancelScheduledValues(context.currentTime);
        master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), context.currentTime);
        master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.32);
      } catch {
        // Gain ramp can fail if the context is already closing.
      }
    }

    this.sources.forEach((source) => {
      try {
        source.stop();
      } catch {
        // Source may have already stopped.
      }
    });
    this.sources = [];
    this.lfos = [];

    const close = () => {
      try {
        context.close();
      } catch {
        // Context may already be closed.
      }
    };

    if (immediate) {
      close();
    } else {
      this.closeTimer = window.setTimeout(close, 380);
    }
    this.context = null;
    this.master = null;
    this.delay = null;
  }

  dispose() {
    if (this.closeTimer) {
      window.clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    this.stop(true);
  }
}
