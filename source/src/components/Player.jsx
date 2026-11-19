import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Smartphone,
  Maximize2,
  Minimize2,
  MapPin,
  Sparkles,
  ShoppingBag,
  Award,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ScanLine,
  ArrowRight,
  Clock,
  Gem,
  Boxes,
  Headphones,
  Camera,
  Compass,
  Waves,
  Check,
  ChevronRight,
  Lock,
  FileText,
  Mic,
  Trophy,
  BatteryFull,
  Wifi,
  Signal,
  Loader2,
  MessageCircleQuestion,
  Search,
  Flame,
  BookOpen,
  Coins,
  Wind,
  Hand,
  Bird,
  CircleCheck,
  Radio,
} from 'lucide-react';
import ParkMap from './ParkMap.jsx';
import CharacterPortrait, { PortraitThumb } from './Portraits.jsx';
import ArtifactFigure from './Artifacts.jsx';
import KaraokeText from './KaraokeText.jsx';
import Equalizer from './Equalizer.jsx';
import Certificate from './player/Certificate.jsx';
import BagSheet from './player/BagSheet.jsx';
import ArMode from './player/ArMode.jsx';
import { SectionEyebrow, OrnamentDivider, AiBadge, SlavicCorner } from './Ornaments.jsx';
import { useNarration } from '../hooks/useNarration.js';
import { AmbientEngine } from '../lib/audio.js';

const CHOICE_ICONS = {
  Search,
  MessageCircleQuestion,
  Waves,
  Flame,
  BookOpen,
  Coins,
  Wind,
  Compass,
  Hand,
  Bird,
  Sparkles,
};

const INITIAL_STATE = {
  completed: [],
  viewIndex: 0,
  choices: {},
  artifacts: [],
};

function StatusBar({ time }) {
  return (
    <div className="flex h-8 shrink-0 items-center justify-between px-5 pt-1 text-[8.5px] font-semibold text-parchment/80">
      <span className="w-14 tabular-nums">{time}</span>
      <div className="relative h-[22px] w-[82px] rounded-full bg-[#020b08] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
        <span className="absolute right-2 top-1/2 h-1 w-10 -translate-y-1/2 rounded-full bg-[#071510]" />
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#184137]" />
      </div>
      <div className="flex w-14 items-center justify-end gap-1">
        <Signal size={10} strokeWidth={2.2} />
        <Wifi size={10} strokeWidth={2.2} />
        <BatteryFull size={14} strokeWidth={1.8} />
      </div>
    </div>
  );
}

function PhoneHeader({ quest, viewIndex, points, artifactsCount, onExpand, expanded, onBag, onCertificate, completedAll, pointsPulse }) {
  return (
    <div className="shrink-0 border-b border-gold/15 bg-[#051812]/95 backdrop-blur-xl">
      <StatusBar time={new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} />
      <div className="flex items-center gap-2 px-3 pb-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.04]">
          <Compass size={14} className="text-gold" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-gold/65">Аудиоспектакль</span>
            <span className="h-0.5 w-0.5 rounded-full bg-sage/30" />
            <span className="text-[7px] font-medium uppercase tracking-[0.12em] text-jade/55">AR</span>
          </div>
          <p className="truncate text-[11px] font-semibold leading-tight text-parchment/95">{quest.title}</p>
        </div>
        {completedAll ? (
          <button
            type="button"
            onClick={onCertificate}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.08] text-gold"
            aria-label="Открыть грамоту"
          >
            <Award size={13} />
          </button>
        ) : null}
        <button
          type="button"
          onClick={onExpand}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sage/65"
          aria-label={expanded ? 'Свернуть экран' : 'Раскрыть на весь экран'}
        >
          {expanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1.5 px-3 pb-2.5">
        <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.025] px-2 py-1.5">
          <MapPin size={10} className="text-gold/70" />
          <div className="min-w-0">
            <p className="text-[7px] uppercase tracking-[0.08em] text-sage/35">Точка</p>
            <p className="text-[9px] font-semibold leading-tight text-parchment/85">{viewIndex + 1} / {quest.points.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.025] px-2 py-1.5">
          <Sparkles size={10} className="text-gold/70" />
          <div className="min-w-0">
            <p className="text-[7px] uppercase tracking-[0.08em] text-sage/35">Очки</p>
            <p key={points} className={`text-[9px] font-semibold leading-tight tabular-nums ${pointsPulse ? 'toast-enter text-amber' : 'text-gold-soft/95'}`}>{points}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onBag}
          className="flex items-center gap-1.5 rounded-lg border border-gold/20 bg-gold/[0.045] px-2 py-1.5 text-left transition-colors hover:bg-gold/[0.08]"
        >
          <ShoppingBag size={10} className="text-gold/80" />
          <div className="min-w-0">
            <p className="text-[7px] uppercase tracking-[0.08em] text-gold/45">Сумка</p>
            <p className="text-[9px] font-semibold leading-tight text-gold-soft/95">({artifactsCount})</p>
          </div>
        </button>
      </div>
    </div>
  );
}

function JourneyAside({ quest, completedSet, activeIndex, viewIndex, onSelect }) {
  return (
    <aside className="hidden lg:block">
      <div className="glass-panel sticky top-28 overflow-hidden rounded-[24px]">
        <div className="fret-pattern h-8 opacity-45" />
        <div className="p-5">
          <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.18em] text-gold/70">
            <Compass size={11} />
            Полевой дневник
          </div>
          <p className="mt-2 font-display text-[24px] font-semibold leading-[1.02] text-parchment">{quest.title}</p>
          <p className="mt-1.5 text-[9px] leading-relaxed text-sage/50">{quest.presetLabel} · {quest.location}</p>

          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {[
              { icon: Clock, value: '45', label: 'минут' },
              { icon: Boxes, value: '4', label: 'точки' },
              { icon: Gem, value: '4', label: 'AR' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-2 text-center">
                  <Icon size={10} className="mx-auto text-gold/60" />
                  <div className="mt-1 font-display text-[17px] font-semibold leading-none text-parchment/90">{item.value}</div>
                  <div className="mt-0.5 text-[7px] uppercase tracking-[0.08em] text-sage/35">{item.label}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-sage/45">Главы</span>
            <span className="font-mono text-[8px] text-gold/50">{completedSet.size} / 4</span>
          </div>
          <div className="mt-2 space-y-1">
            {quest.points.map((point, index) => {
              const isCompleted = completedSet.has(point.id);
              const isActive = index === activeIndex;
              const isUnlocked = isCompleted || index <= activeIndex;
              return (
                <button
                  key={point.id}
                  type="button"
                  onClick={() => isUnlocked && onSelect(index)}
                  disabled={!isUnlocked}
                  className={`flex w-full items-center gap-2 rounded-lg border px-2 py-2 text-left transition-colors ${
                    index === viewIndex
                      ? 'border-gold/35 bg-gold/[0.06]'
                      : 'border-transparent bg-transparent hover:border-white/[0.06] hover:bg-white/[0.025]'
                  } ${!isUnlocked ? 'opacity-40' : ''}`}
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[8px] font-bold ${isCompleted ? 'border-gold/45 bg-gold/15 text-gold-soft' : isActive ? 'border-jade/40 bg-jade/10 text-jade' : 'border-white/10 text-sage/40'}`}>
                    {isCompleted ? <Check size={10} /> : isUnlocked ? point.number : <Lock size={9} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[9.5px] font-medium text-parchment/70">{point.displayTitle}</span>
                    <span className="block truncate text-[7.5px] text-sage/35">{isActive ? 'Текущая точка' : isCompleted ? 'Пройдена' : 'Закрыта'}</span>
                  </span>
                  {index === viewIndex ? <span className="h-1 w-1 shrink-0 rounded-full bg-gold" /> : null}
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-xl border border-jade/15 bg-jade/[0.04] p-3">
            <div className="flex items-center gap-1.5 text-[8.5px] font-semibold text-jade/75">
              <Headphones size={11} />
              Лучше в наушниках
            </div>
            <p className="mt-1 text-[8.5px] leading-relaxed text-sage/45">
              Голоса персонажей синтезируются в браузере. Атмосфера места — процедурный звук без загрузки файлов.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function ArtifactAside({ quest, artifacts, currentPoint, onBag }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 space-y-3">
        <div className="glass-panel overflow-hidden rounded-[24px]">
          <div className="border-b border-gold/12 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.16em] text-gold/70">
                <Gem size={11} />
                AR-сувениры
              </div>
              <span className="font-mono text-[8px] text-jade/55">{artifacts.length}/4</span>
            </div>
            <p className="mt-2 font-display text-[21px] font-semibold leading-tight text-parchment">Коллекция места</p>
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {quest.points.map((point) => {
                const collected = artifacts.find((item) => item.id === point.artifact.id);
                return (
                  <button
                    key={point.id}
                    type="button"
                    onClick={onBag}
                    className={`group relative aspect-square overflow-hidden rounded-lg border transition-colors ${collected ? 'border-gold/25 bg-[#081f18]' : 'border-white/[0.06] bg-white/[0.02]'}`}
                    aria-label={collected ? `Открыть сумку: ${point.artifact.name}` : 'Артефакт ещё не собран'}
                  >
                    {collected ? (
                      <ArtifactFigure type={point.artifact.type} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="relative flex h-full flex-col items-center justify-center gap-1 overflow-hidden bg-[radial-gradient(circle_at_50%_30%,rgba(218,165,82,0.06),transparent_62%)]">
                        <span className="absolute font-display text-[35px] font-semibold leading-none text-gold/[0.06]">{point.number}</span>
                        <Lock size={12} className="relative text-sage/25" />
                        <span className="relative text-[6.5px] uppercase tracking-[0.08em] text-sage/25">Соберите в AR</span>
                      </div>
                    )}
                    {collected ? (
                      <span className="absolute bottom-1 left-1 right-1 truncate rounded bg-[#03110d]/70 px-1 py-0.5 text-[6.5px] text-gold-soft/70 backdrop-blur">
                        {point.artifact.name}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={onBag}
              className="mt-2.5 flex w-full items-center justify-between rounded-lg border border-gold/18 bg-gold/[0.04] px-3 py-2 text-[8.5px] font-semibold text-gold-soft/75"
            >
              Открыть сумку
              <ChevronRight size={11} />
            </button>
          </div>
        </div>

        <div className="glass-panel relative overflow-hidden rounded-[24px] p-4">
          <SlavicCorner className="absolute right-0 top-0 opacity-35" />
          <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.15em] text-jade/65">
            <Radio size={11} />
            Голос сцены
          </div>
          <p className="mt-2 font-display text-[18px] italic leading-snug text-parchment/85">«{currentPoint.character.quote}»</p>
          <div className="mt-3 flex items-center gap-2">
            <PortraitThumb archetype={currentPoint.character.archetype} name={currentPoint.character.name} className="h-9 w-9" />
            <div>
              <p className="text-[9px] font-semibold text-parchment/75">{currentPoint.character.name}</p>
              <p className="text-[7.5px] uppercase tracking-[0.08em] text-sage/40">{currentPoint.character.role}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
            <AiBadge />
            <span className="flex items-center gap-1 text-[7.5px] text-sage/40">
              <Mic size={9} className="text-jade/60" />
              Neural Voice
            </span>
          </div>
        </div>

        <div className="rounded-[24px] border border-gold/15 bg-[radial-gradient(circle_at_80%_0%,rgba(218,165,82,0.08),transparent_55%)] p-4">
          <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.16em] text-gold/60">
            <Camera size={11} />
            AR-подсказка
          </div>
          <p className="mt-2 text-[9px] leading-relaxed text-sage/50">
            Нажмите «Навести камеру» внутри плеера. Если камера недоступна, откроется атмосферный AR-слой — сцена всё равно работает.
          </p>
          <div className="mt-3 flex items-center gap-2 text-[8px] text-jade/50">
            <span className="pulse-dot h-1 w-1 rounded-full bg-jade" />
            Fallback предусмотрен
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function Player({ quest, playerState, setPlayerState, onExpandedChange }) {
  const safeState = {
    ...INITIAL_STATE,
    ...(playerState || {}),
    completed: playerState?.completed || [],
    choices: playerState?.choices || {},
    artifacts: playerState?.artifacts || [],
  };
  const completedSet = useMemo(() => new Set(safeState.completed), [safeState.completed]);
  const viewIndex = Math.min(Math.max(0, safeState.viewIndex || 0), quest.points.length - 1);
  const currentPoint = quest.points[viewIndex];
  const activeIndex = quest.points.findIndex((point) => !completedSet.has(point.id));
  const allCompleted = quest.points.every((point) => completedSet.has(point.id));
  const points = 150 + safeState.completed.length * 100;
  const selectedRecord = safeState.choices[currentPoint.id];
  const selectedChoice = selectedRecord ? currentPoint.choices.find((choice) => choice.id === selectedRecord.choiceId) : null;

  const [expanded, setExpanded] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [arOpen, setArOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [ambientOn, setAmbientOn] = useState(false);
  const [ambientPending, setAmbientPending] = useState(false);
  const [toast, setToast] = useState(null);
  const [pointsPulse, setPointsPulse] = useState(false);

  const narration = useNarration();
  const ambientRef = useRef(null);
  const ambientRequestRef = useRef(0);
  const toastTimerRef = useRef(null);
  const finishTimerRef = useRef(null);
  const pointsTimerRef = useRef(null);
  const scrollRef = useRef(null);

  const showToast = useCallback((message) => {
    setToast(message);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 3000);
  }, []);

  const stopAmbient = useCallback(() => {
    ambientRequestRef.current += 1;
    if (ambientRef.current) {
      ambientRef.current.stop();
    }
    setAmbientOn(false);
    setAmbientPending(false);
  }, []);

  const getAmbientEngine = useCallback(() => {
    if (!ambientRef.current) {
      ambientRef.current = new AmbientEngine();
    }
    return ambientRef.current;
  }, []);

  useEffect(() => {
    narration.stop();
    stopAmbient();
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [viewIndex, quest.id, narration.stop, stopAmbient]);

  useEffect(() => {
    setBagOpen(false);
    setArOpen(false);
    setCertificateOpen(false);
    setExpanded(false);
    narration.stop();
    stopAmbient();
  }, [quest.id, narration.stop, stopAmbient]);

  useEffect(() => {
    if (onExpandedChange) {
      onExpandedChange(expanded);
    }
    return () => {
      if (onExpandedChange) {
        onExpandedChange(false);
      }
    };
  }, [expanded, onExpandedChange]);

  useEffect(() => {
    if (!expanded) {
      return undefined;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', handleKey);
    };
  }, [expanded]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
      if (finishTimerRef.current) {
        window.clearTimeout(finishTimerRef.current);
      }
      if (pointsTimerRef.current) {
        window.clearTimeout(pointsTimerRef.current);
      }
      if (ambientRef.current) {
        ambientRef.current.dispose();
        ambientRef.current = null;
      }
    };
  }, []);

  const updateState = useCallback(
    (updater) => {
      setPlayerState((previous) => {
        const base = { ...INITIAL_STATE, ...(previous || {}) };
        return typeof updater === 'function' ? updater(base) : { ...base, ...updater };
      });
    },
    [setPlayerState],
  );

  const selectPoint = useCallback(
    (index) => {
      if (completedSet.has(quest.points[index].id) || index <= activeIndex) {
        updateState({ viewIndex: index });
        setBagOpen(false);
        setArOpen(false);
      }
    },
    [completedSet, activeIndex, quest.points, updateState],
  );

  const speakScene = () => {
    if (narration.playing && narration.activeKey === 'scene') {
      narration.stop();
      return;
    }
    narration.start({
      text: currentPoint.scene,
      pitch: currentPoint.character.pitch,
      rate: currentPoint.character.rate,
      key: 'scene',
    });
  };

  const speakReply = () => {
    if (!selectedChoice) {
      return;
    }
    narration.start({
      text: selectedChoice.response,
      pitch: currentPoint.character.pitch,
      rate: currentPoint.character.rate,
      key: 'reply',
    });
  };

  const toggleAmbient = async () => {
    if (ambientOn || ambientPending) {
      stopAmbient();
      return;
    }
    const request = ambientRequestRef.current + 1;
    ambientRequestRef.current = request;
    setAmbientPending(true);
    try {
      await getAmbientEngine().start();
      if (ambientRequestRef.current !== request) {
        getAmbientEngine().stop(true);
        return;
      }
      setAmbientOn(true);
    } catch {
      setAmbientOn(false);
      showToast('Браузер не разрешил Web Audio. Атмосфера недоступна.');
    } finally {
      if (ambientRequestRef.current === request) {
        setAmbientPending(false);
      }
    }
  };

  const addArtifact = (artifact) => {
    const exists = safeState.artifacts.some((item) => item.id === artifact.id);
    if (exists) {
      return false;
    }
    updateState((previous) => {
      const previousArtifacts = previous.artifacts || [];
      if (previousArtifacts.some((item) => item.id === artifact.id)) {
        return previous;
      }
      return {
        ...previous,
        artifacts: [
          ...previousArtifacts,
          {
            ...artifact,
            pointTitle: currentPoint.displayTitle,
            collectedAt: new Date().toISOString(),
            source: 'ar',
          },
        ],
      };
    });
    return true;
  };

  const handleChoice = (choice) => {
    if (selectedRecord) {
      return;
    }
    narration.stop();
    narration.start({
      text: choice.response,
      pitch: currentPoint.character.pitch,
      rate: currentPoint.character.rate,
      key: 'reply',
    });

    const willCompleteRoute = safeState.completed.length === quest.points.length - 1;

    updateState((previous) => {
      const previousCompleted = previous.completed || [];
      if (previousCompleted.includes(currentPoint.id)) {
        return previous;
      }
      const previousArtifacts = previous.artifacts || [];
      const hasArtifact = previousArtifacts.some((item) => item.id === currentPoint.artifact.id);
      const nextArtifacts = hasArtifact
        ? previousArtifacts
        : [
            ...previousArtifacts,
            {
              ...currentPoint.artifact,
              pointTitle: currentPoint.displayTitle,
              collectedAt: new Date().toISOString(),
              source: 'scene',
            },
          ];
      return {
        ...previous,
        completed: [...previousCompleted, currentPoint.id],
        choices: {
          ...(previous.choices || {}),
          [currentPoint.id]: { choiceId: choice.id, response: choice.response },
        },
        artifacts: nextArtifacts,
      };
    });

    setPointsPulse(true);
    if (pointsTimerRef.current) {
      window.clearTimeout(pointsTimerRef.current);
    }
    pointsTimerRef.current = window.setTimeout(() => {
      setPointsPulse(false);
      pointsTimerRef.current = null;
    }, 1400);

    showToast('+100 очков краеведа · сцена пройдена');

    if (willCompleteRoute) {
      if (finishTimerRef.current) {
        window.clearTimeout(finishTimerRef.current);
      }
      finishTimerRef.current = window.setTimeout(() => {
        narration.stop();
        stopAmbient();
        setCertificateOpen(true);
        finishTimerRef.current = null;
      }, 2400);
    }
  };

  const goNext = () => {
    if (allCompleted) {
      if (finishTimerRef.current) {
        window.clearTimeout(finishTimerRef.current);
        finishTimerRef.current = null;
      }
      narration.stop();
      stopAmbient();
      setCertificateOpen(true);
      return;
    }
    if (activeIndex >= 0) {
      updateState({ viewIndex: activeIndex });
    }
  };

  const openBag = useCallback(() => {
    narration.stop();
    setBagOpen(true);
    setArOpen(false);
    setCertificateOpen(false);
  }, [narration.stop]);

  const openCertificate = useCallback(() => {
    if (finishTimerRef.current) {
      window.clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }
    narration.stop();
    stopAmbient();
    setCertificateOpen(true);
    setBagOpen(false);
    setArOpen(false);
  }, [narration.stop, stopAmbient]);

  const openAr = useCallback(() => {
    narration.stop();
    stopAmbient();
    setArOpen(true);
    setBagOpen(false);
    setCertificateOpen(false);
  }, [narration.stop, stopAmbient]);

  const resetProgress = () => {
    narration.stop();
    stopAmbient();
    if (finishTimerRef.current) {
      window.clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }
    setPointsPulse(false);
    updateState({
      completed: [],
      viewIndex: 0,
      choices: {},
      artifacts: [],
    });
    setCertificateOpen(false);
    setBagOpen(false);
    setArOpen(false);
    showToast('Маршрут начат заново · 150 очков на счету');
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const sceneProgress = narration.activeKey === 'scene' ? narration.progress : 0;
  const replyProgress = narration.activeKey === 'reply' ? narration.progress : 0;
  const scenePlaying = narration.playing && narration.activeKey === 'scene';
  const replyPlaying = narration.playing && narration.activeKey === 'reply';
  const archiveText = currentPoint.archiveNote;
  const nextPointIndex = activeIndex >= 0 ? activeIndex : -1;
  const ChoiceIcon = selectedChoice ? CHOICE_ICONS[selectedChoice.icon] || Search : null;

  return (
    <div className="tab-content-enter relative mx-auto w-full max-w-[1380px] px-4 pb-16 pt-7 sm:px-6 sm:pt-10 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(46,196,182,0.08),transparent_68%)]" />

      <div className="relative mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div className="max-w-[780px]">
          <SectionEyebrow icon={Smartphone}>B2C-плеер · гостевой опыт</SectionEyebrow>
          <h1 className="mt-4 text-balance font-display text-[38px] font-semibold leading-[0.98] tracking-[-0.018em] text-parchment sm:text-[50px] lg:text-[56px]">
            Один маршрут. <br className="hidden sm:block" />
            <span className="gold-text italic">Четыре голоса места.</span>
          </h1>
          <p className="mt-3 max-w-[620px] text-pretty text-[12.5px] leading-relaxed text-sage sm:text-[13.5px]">
            Наденьте наушники, идите по карте и слушайте, как оживают архивные имена. Каждая развилка
            меняет разговор, а AR-артефакты остаются в коллекции.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 xl:justify-end">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/18 bg-white/[0.025] px-3 py-1.5 text-[9px] font-medium text-sage/65">
            <Headphones size={11} className="text-gold/70" /> Neural Voice · ru-RU
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-jade/20 bg-jade/[0.04] px-3 py-1.5 text-[9px] font-medium text-jade/70">
            <ScanLine size={11} /> AR-слой
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/18 bg-white/[0.025] px-3 py-1.5 text-[9px] font-medium text-sage/65">
            <Volume2 size={11} className="text-gold/70" /> Web Audio
          </span>
        </div>
      </div>

      <div className="relative flex items-start justify-center gap-6 xl:gap-8">
        <JourneyAside
          quest={quest}
          completedSet={completedSet}
          activeIndex={activeIndex}
          viewIndex={viewIndex}
          onSelect={selectPoint}
        />

        <div className={`w-full max-w-[412px] shrink-0 ${expanded ? 'fixed inset-0 z-[95] flex max-w-none items-center justify-center bg-[#020d0a]/95 px-4 py-6 backdrop-blur-xl' : ''}`}>
          {expanded ? (
            <button
              type="button"
              className="absolute inset-0 cursor-default"
              onClick={() => setExpanded(false)}
              aria-label="Свернуть полноэкранный плеер"
            />
          ) : null}
          <div className={`relative w-full ${expanded ? 'max-w-[430px]' : ''}`}>
            <div className="phone-frame">
              <div
                className="phone-screen flex flex-col"
                style={
                  expanded
                    ? { height: 'calc(100dvh - 64px)', maxHeight: '900px' }
                    : { height: 'min(820px, calc(100dvh - 170px))', minHeight: 620 }
                }
              >
                <PhoneHeader
                  quest={quest}
                  viewIndex={viewIndex}
                  points={points}
                  artifactsCount={safeState.artifacts.length}
                  onExpand={() => setExpanded((value) => !value)}
                  expanded={expanded}
                  onBag={openBag}
                  onCertificate={openCertificate}
                  completedAll={allCompleted}
                  pointsPulse={pointsPulse}
                />

                <div ref={scrollRef} className="scroll-fine relative min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#061a14] px-3 pb-6 pt-3">
                  <ParkMap
                    points={quest.points}
                    completed={completedSet}
                    activeIndex={activeIndex}
                    viewIndex={viewIndex}
                    onSelect={selectPoint}
                  />

                  <section className="mt-2.5 overflow-hidden rounded-[20px] border border-gold/22 bg-[linear-gradient(160deg,rgba(17,46,37,0.98),rgba(7,26,20,0.98))]">
                    <div className="relative overflow-hidden border-b border-gold/15">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(218,165,82,0.14),transparent_50%)]" />
                      <div className="relative flex gap-3 p-3">
                        <div className="relative shrink-0">
                          <CharacterPortrait
                            archetype={currentPoint.character.archetype}
                            name={currentPoint.character.name}
                            className="h-[90px] w-[104px] rounded-xl border border-gold/30"
                          />
                          <span className="absolute -bottom-1 -right-1 flex items-center gap-1 rounded-full border border-jade/40 bg-[#061a14] px-1.5 py-0.5 text-[6.5px] font-bold uppercase tracking-[0.08em] text-jade/90">
                            <span className="h-1 w-1 rounded-full bg-jade" />
                            AI
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1">
                            <span className="rounded-full border border-gold/25 bg-gold/[0.07] px-1.5 py-0.5 text-[6.5px] font-bold uppercase tracking-[0.09em] text-gold-soft/85">
                              GigaChat
                            </span>
                            <span className="rounded-full border border-jade/25 bg-jade/[0.06] px-1.5 py-0.5 text-[6.5px] font-bold uppercase tracking-[0.09em] text-jade/80">
                              Neural Voice
                            </span>
                          </div>
                          <h2 className="mt-1.5 font-display text-[24px] font-semibold leading-none text-parchment">{currentPoint.character.name}</h2>
                          <p className="mt-1 text-[7.5px] uppercase tracking-[0.1em] text-sage/45">{currentPoint.character.role}</p>
                          <p className="mt-1.5 line-clamp-3 text-[9.5px] italic leading-[1.5] text-sage/70">
                            «{currentPoint.character.quote}»
                          </p>
                        </div>
                      </div>
                      <div className="relative flex items-center justify-between border-t border-gold/10 px-3 py-1.5">
                        <span className="flex items-center gap-1 text-[7.5px] font-semibold uppercase tracking-[0.1em] text-gold-soft/65">
                          <MapPin size={8} />
                          Сцена {currentPoint.number} · {currentPoint.place}
                        </span>
                        <span className="flex items-center gap-1 text-[7px] text-sage/35">
                          <Clock size={8} /> ≈ 3 мин
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5">
                      <KaraokeText
                        text={currentPoint.scene}
                        progress={sceneProgress}
                        playing={scenePlaying}
                        className="text-[11px] leading-[1.8] text-parchment/85"
                      />

                      <div className="mt-2.5 flex items-start gap-1.5 rounded-lg border border-gold/12 bg-gold/[0.035] px-2.5 py-2">
                        <FileText size={10} className="mt-0.5 shrink-0 text-gold/65" />
                        <p className="text-[8px] leading-relaxed text-sage/55">{archiveText}</p>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={speakScene}
                          className={`${scenePlaying ? 'border border-gold/40 bg-gold/12 text-gold-soft' : 'btn-gold'} flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[9.5px] font-extrabold uppercase tracking-[0.03em]`}
                        >
                          {scenePlaying ? <Pause size={13} /> : <Play size={13} />}
                          <span className="truncate">{scenePlaying ? 'Остановить' : 'Слушать сцену'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={toggleAmbient}
                          className="ambient-toggle flex w-[122px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-xl border border-gold/20 bg-[#081f18] px-2 py-1.5 text-[8.5px] font-semibold leading-tight text-sage/70"
                          data-active={ambientOn}
                          aria-pressed={ambientOn}
                          aria-label="Атмосфера места (звук)"
                        >
                          <span className="flex items-center gap-1 whitespace-nowrap text-[8px]">
                            {ambientOn ? <Volume2 size={11} /> : ambientPending ? <Loader2 size={11} className="animate-spin" /> : <VolumeX size={11} />}
                            {ambientPending ? 'Включаем' : 'Атмосфера места'}
                          </span>
                          <span className="whitespace-nowrap text-[6.5px] uppercase tracking-[0.06em] opacity-45">{ambientOn ? 'звук идёт' : 'звук · Web Audio'}</span>
                        </button>
                      </div>

                      <div className="mt-2 flex items-center gap-2.5 rounded-lg border border-white/[0.055] bg-white/[0.02] px-2.5 py-2">
                        <Equalizer active={scenePlaying} />
                        <div className="min-w-0 flex-1">
                          <div className="h-1 overflow-hidden rounded-full bg-white/[0.07]">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-gold to-jade transition-[width] duration-150"
                              style={{ width: `${sceneProgress * 100}%` }}
                            />
                          </div>
                          <div className="mt-1 flex items-center justify-between gap-2">
                            <span className="truncate text-[7px] font-medium uppercase tracking-[0.08em] text-sage/40">
                              {scenePlaying
                                ? 'Нейроголос · караоке'
                                : sceneProgress >= 1
                                  ? 'Сцена прочитана'
                                  : '12-полосный эквалайзер'}
                            </span>
                            <span className="shrink-0 font-mono text-[7px] text-sage/30">{Math.round(sceneProgress * 100)}%</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={openAr}
                        className="group mt-2.5 flex w-full items-center justify-between gap-2 rounded-xl border border-jade/25 bg-[linear-gradient(110deg,rgba(10,45,37,0.9),rgba(10,38,31,0.8))] px-3 py-2.5 text-left transition-colors hover:border-jade/50"
                      >
                        <span className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-jade/30 bg-jade/[0.08] text-jade">
                            <Camera size={13} />
                          </span>
                          <span>
                            <span className="block text-[9.5px] font-semibold text-jade/90">Навести камеру (AR)</span>
                            <span className="mt-0.5 block text-[7px] text-sage/40">Найти: {currentPoint.artifact.name}</span>
                          </span>
                        </span>
                        <ScanLine size={15} className="text-jade/60 transition-transform group-hover:scale-110" />
                      </button>

                      <div className="mt-3 border-t border-gold/12 pt-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.14em] text-gold-soft/65">
                            <Sparkles size={10} />
                            Ваш ход
                          </div>
                          <span className="text-[7.5px] text-sage/30">развилка · +100 очков</span>
                        </div>

                        {!selectedChoice ? (
                          <div className="mt-2 space-y-1.5">
                            {currentPoint.choices.map((choice, index) => {
                              const Icon = CHOICE_ICONS[choice.icon] || Search;
                              return (
                                <button
                                  key={choice.id}
                                  type="button"
                                  onClick={() => handleChoice(choice)}
                                  className="choice-button flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left"
                                >
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.055] font-display text-[9px] font-bold text-gold-soft/80">
                                    {index === 0 ? 'А' : 'Б'}
                                  </span>
                                  <span className="min-w-0 flex-1 text-[9.5px] font-medium leading-snug text-parchment/80">{choice.label}</span>
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 text-sage/45">
                                    <Icon size={11} />
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="fade-up mt-2 rounded-xl border border-gold/25 bg-[linear-gradient(140deg,rgba(37,62,45,0.85),rgba(9,30,23,0.9))] p-2.5">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                                  <ChoiceIcon size={10} />
                                </span>
                                <span className="text-[8px] font-semibold text-gold-soft/80">{currentPoint.character.name} отвечает</span>
                              </div>
                              <span className="flex items-center gap-1 rounded-full border border-jade/25 bg-jade/[0.07] px-1.5 py-0.5 text-[7px] font-bold text-jade">
                                <CircleCheck size={8} /> +100
                              </span>
                            </div>
                            <KaraokeText
                              text={selectedChoice.response}
                              progress={replyProgress}
                              playing={replyPlaying}
                              className="mt-2 text-[9.5px] leading-[1.7] text-parchment/75"
                            />
                            <div className="mt-2 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Equalizer active={replyPlaying} tone="jade" className="h-5 scale-75 origin-left" />
                                <span className="text-[7px] uppercase tracking-[0.08em] text-sage/35">
                                  {replyPlaying ? 'Голос персонажа' : 'Ответ в архиве'}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={speakReply}
                                className="flex items-center gap-1 rounded-full border border-gold/20 bg-white/[0.025] px-2 py-1 text-[7px] font-semibold text-gold-soft/65"
                              >
                                <Volume2 size={9} />
                                {replyPlaying ? 'Заново' : 'Озвучить'}
                              </button>
                            </div>
                          </div>
                        )}

                        {selectedChoice ? (
                          <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-jade/15 bg-jade/[0.035] px-2 py-1.5">
                            <Check size={9} className="shrink-0 text-jade" />
                            <p className="text-[7.5px] leading-snug text-jade/60">
                              {allCompleted
                                ? 'Маршрут завершён. Грамота уже ждёт вас.'
                                : nextPointIndex >= 0
                                  ? `Точка ${nextPointIndex + 1} открыта на карте.`
                                  : 'Сцена сохранена в вашем маршруте.'}
                            </p>
                          </div>
                        ) : null}

                        {selectedChoice ? (
                          <button
                            type="button"
                            onClick={goNext}
                            className="btn-gold mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[9.5px] font-extrabold uppercase tracking-[0.025em]"
                          >
                            {allCompleted ? (
                              <>
                                <Trophy size={13} />
                                Открыть грамоту
                              </>
                            ) : (
                              <>
                                Перейти к следующей точке
                                <ArrowRight size={13} />
                              </>
                            )}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </section>

                  <div className="mt-2.5 flex items-center justify-between rounded-xl border border-white/[0.055] bg-white/[0.018] px-3 py-2">
                    <span className="flex items-center gap-1.5 text-[7.5px] text-sage/35">
                      <ShieldIcon />
                      Прогресс сохраняется в сессии
                    </span>
                    <span className="font-mono text-[7.5px] text-gold/45">{safeState.artifacts.length} / 4 AR</span>
                  </div>
                </div>

                {bagOpen ? (
                  <BagSheet
                    artifacts={safeState.artifacts}
                    onClose={() => setBagOpen(false)}
                    onOpenAr={() => {
                      setBagOpen(false);
                      openAr();
                    }}
                  />
                ) : null}

                {arOpen ? (
                  <ArMode
                    point={currentPoint}
                    onClose={() => setArOpen(false)}
                    onCollect={addArtifact}
                  />
                ) : null}

                {certificateOpen ? (
                  <Certificate
                    quest={quest}
                    playerState={safeState}
                    onClose={() => setCertificateOpen(false)}
                    onReset={resetProgress}
                  />
                ) : null}

                {toast ? (
                  <div className="toast-enter pointer-events-none absolute bottom-4 left-1/2 z-[90] w-[calc(100%-28px)] max-w-[340px] -translate-x-1/2">
                    <div className="flex items-center gap-2 rounded-xl border border-gold/30 bg-[#0a241b]/95 px-3 py-2 text-[9px] font-medium text-parchment/90 shadow-xl backdrop-blur">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                        <Sparkles size={10} />
                      </span>
                      {toast}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {!expanded ? (
              <div className="mt-3 flex items-center justify-between px-1 text-[8px] text-sage/30">
                <span className="flex items-center gap-1.5">
                  <div className="flex gap-1">
                    <span className="h-1 w-1 rounded-full bg-gold/60" />
                    <span className="h-1 w-1 rounded-full bg-gold/30" />
                    <span className="h-1 w-1 rounded-full bg-gold/15" />
                  </div>
                  {quest.audience.label} · {quest.genre.label}
                </span>
                <span className="flex items-center gap-1">
                  <Maximize2 size={8} />
                  Разверните плеер
                </span>
              </div>
            ) : null}
          </div>
        </div>

        <ArtifactAside
          quest={quest}
          artifacts={safeState.artifacts}
          currentPoint={currentPoint}
          onBag={openBag}
        />
      </div>

      <OrnamentDivider className="mx-auto mt-9 opacity-60" width={560} />
      <p className="mx-auto mt-4 max-w-[620px] text-center text-[9px] leading-relaxed text-sage/35">
        Демо-плеер работает без бэкенда: голос синтезируется браузером, атмосфера — на Web Audio API,
        а AR-слой автоматически переходит в атмосферную сцену, если камера недоступна.
      </p>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M6 1.2 9.8 2.7v3.2c0 2.4-1.6 4.1-3.8 5-2.2-.9-3.8-2.6-3.8-5V2.7L6 1.2Z" stroke="#2EC4B6" strokeOpacity="0.55" />
      <path d="m4.2 5.9 1.2 1.2 2.4-2.4" stroke="#2EC4B6" strokeOpacity="0.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
