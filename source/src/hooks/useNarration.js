import { useCallback, useEffect, useRef, useState } from 'react';

export function estimateSpeechDuration(text, rate = 1) {
  const words = String(text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const baseSeconds = (words / 2.75) * 1.18;
  return Math.max(6, baseSeconds / Math.max(0.5, rate)) * 1000;
}

function pickRussianVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }
  const voices = window.speechSynthesis.getVoices() || [];
  const russian = voices.filter((voice) => /^ru(-|_)/i.test(voice.lang) || /russian|русск/i.test(voice.name));
  if (!russian.length) {
    return null;
  }
  return (
    russian.find((voice) => /milena|irina|pavel|dmitry|google/i.test(voice.name)) ||
    russian.find((voice) => voice.localService) ||
    russian[0]
  );
}

export function useNarration() {
  const [state, setState] = useState({
    playing: false,
    progress: 0,
    mode: 'idle',
    activeKey: null,
    supported: typeof window !== 'undefined' && 'speechSynthesis' in window,
  });

  const refs = useRef({
    token: 0,
    raf: null,
    fallbackTimer: null,
    safetyTimer: null,
    keepAliveTimer: null,
    startTime: 0,
    duration: 0,
    progress: 0,
    started: false,
    simulated: false,
    key: null,
    utterance: null,
    text: '',
    active: false,
  });

  const clearTimers = useCallback(() => {
    const current = refs.current;
    if (current.raf) {
      cancelAnimationFrame(current.raf);
      current.raf = null;
    }
    if (current.fallbackTimer) {
      window.clearTimeout(current.fallbackTimer);
      current.fallbackTimer = null;
    }
    if (current.safetyTimer) {
      window.clearTimeout(current.safetyTimer);
      current.safetyTimer = null;
    }
    if (current.keepAliveTimer) {
      window.clearInterval(current.keepAliveTimer);
      current.keepAliveTimer = null;
    }
  }, []);

  const cancelSpeech = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    try {
      window.speechSynthesis.cancel();
    } catch {
      // The speech engine may not be available in this browser.
    }
    refs.current.utterance = null;
  }, []);

  const stop = useCallback(
    (reset = true) => {
      refs.current.token += 1;
      refs.current.active = false;
      refs.current.started = false;
      refs.current.simulated = false;
      refs.current.key = null;
      clearTimers();
      cancelSpeech();
      if (reset) {
        setState((previous) => ({
          ...previous,
          playing: false,
          progress: 0,
          mode: 'idle',
          activeKey: null,
        }));
      }
    },
    [cancelSpeech, clearTimers],
  );

  useEffect(() => {
    return () => {
      refs.current.token += 1;
      refs.current.active = false;
      clearTimers();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // Nothing to clean up.
        }
      }
    };
  }, [clearTimers]);

  const start = useCallback(
    ({ text, pitch = 1, rate = 1, key = 'scene' }) => {
      if (!text) {
        return;
      }

      refs.current.token += 1;
      const token = refs.current.token;
      clearTimers();
      cancelSpeech();

      const duration = estimateSpeechDuration(text, rate);
      const current = refs.current;
      current.active = true;
      current.started = false;
      current.simulated = false;
      current.key = key;
      current.duration = duration;
      current.progress = 0;
      current.text = text;
      current.startTime = 0;

      setState((previous) => ({
        ...previous,
        playing: true,
        progress: 0,
        mode: 'pending',
        activeKey: key,
      }));

      const finish = () => {
        if (refs.current.token !== token || !refs.current.active) {
          return;
        }
        refs.current.active = false;
        refs.current.progress = 1;
        clearTimers();
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          try {
            window.speechSynthesis.cancel();
          } catch {
            // Speech engine may be unavailable.
          }
        }
        setState((previous) => ({
          ...previous,
          playing: false,
          progress: 1,
          mode: 'done',
          activeKey: key,
        }));
      };

      const tick = (timestamp) => {
        if (refs.current.token !== token || !refs.current.active) {
          return;
        }
        if (!refs.current.startTime) {
          refs.current.startTime = timestamp;
        }
        const elapsed = timestamp - refs.current.startTime;
        const ratio = Math.min(elapsed / refs.current.duration, 0.995);
        refs.current.progress = ratio;
        if (ratio - (refs.current.lastRendered || 0) > 0.0025) {
          refs.current.lastRendered = ratio;
          setState((previous) => ({
            ...previous,
            playing: true,
            progress: ratio,
            mode: refs.current.simulated ? 'simulated' : previous.mode,
          }));
        }
        if (elapsed >= refs.current.duration) {
          if (refs.current.simulated) {
            finish();
            return;
          }
          refs.current.raf = requestAnimationFrame(tick);
          return;
        }
        refs.current.raf = requestAnimationFrame(tick);
      };

      const beginProgress = () => {
        refs.current.startTime = 0;
        refs.current.lastRendered = 0;
        if (refs.current.raf) {
          cancelAnimationFrame(refs.current.raf);
        }
        refs.current.raf = requestAnimationFrame(tick);
      };

      const beginSimulation = () => {
        if (refs.current.token !== token || !refs.current.active || refs.current.started) {
          return;
        }
        refs.current.started = true;
        refs.current.simulated = true;
        try {
          window.speechSynthesis?.cancel();
        } catch {
          // Ignore a race with the native engine.
        }
        setState((previous) => ({
          ...previous,
          playing: true,
          mode: 'simulated',
        }));
        beginProgress();
      };

      const fallbackTimer = window.setTimeout(beginSimulation, 820);
      refs.current.fallbackTimer = fallbackTimer;

      refs.current.safetyTimer = window.setTimeout(
        () => {
          if (refs.current.token === token && refs.current.active) {
            if (!refs.current.started) {
              beginSimulation();
            }
            window.setTimeout(() => {
              if (refs.current.token === token && refs.current.active) {
                finish();
              }
            }, Math.min(duration, 12000));
          }
        },
        Math.max(2400, duration * 0.9),
      );

      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }

      const synth = window.speechSynthesis;
      let utterance;
      try {
        utterance = new SpeechSynthesisUtterance(text);
      } catch {
        beginSimulation();
        return;
      }
      const voice = pickRussianVoice();
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang || 'ru-RU';
      } else {
        utterance.lang = 'ru-RU';
      }
      utterance.pitch = Math.min(2, Math.max(0.4, pitch));
      utterance.rate = Math.min(2, Math.max(0.5, rate));
      utterance.volume = 1;

      utterance.onstart = () => {
        if (refs.current.token !== token || !refs.current.active) {
          return;
        }
        if (refs.current.fallbackTimer) {
          window.clearTimeout(refs.current.fallbackTimer);
          refs.current.fallbackTimer = null;
        }
        if (refs.current.started) {
          try {
            synth.cancel();
          } catch {
            // Ignore cancellation races.
          }
          return;
        }
        refs.current.started = true;
        refs.current.simulated = false;
        setState((previous) => ({
          ...previous,
          playing: true,
          mode: 'native',
        }));
        beginProgress();
        if (!refs.current.keepAliveTimer) {
          refs.current.keepAliveTimer = window.setInterval(() => {
            if (refs.current.token === token && refs.current.active && synth.speaking) {
              try {
                synth.resume();
              } catch {
                // Some browsers do not support resume on all platforms.
              }
            }
          }, 9000);
        }
      };

      utterance.onend = () => {
        if (refs.current.token !== token || refs.current.simulated) {
          return;
        }
        finish();
      };

      utterance.onerror = (event) => {
        if (refs.current.token !== token) {
          return;
        }
        const reason = event?.error || '';
        if (reason === 'canceled' || reason === 'interrupted') {
          return;
        }
        if (!refs.current.started) {
          beginSimulation();
        } else if (!refs.current.simulated) {
          finish();
        }
      };

      refs.current.utterance = utterance;
      try {
        synth.speak(utterance);
      } catch {
        beginSimulation();
      }
    },
    [cancelSpeech, clearTimers],
  );

  return {
    ...state,
    start,
    stop,
    supported: state.supported,
  };
}
