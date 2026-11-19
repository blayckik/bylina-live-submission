import { useCallback, useEffect, useRef, useState } from 'react';
import { Sparkles, BrainCircuit, Palette, AudioWaveform, Building2, Smartphone, Trophy, Heart, ShieldCheck, ArrowUpRight } from 'lucide-react';
import Header from './components/Header.jsx';
import Studio from './components/Studio.jsx';
import Player from './components/Player.jsx';
import Jury from './components/Jury.jsx';
import QrPosterModal from './components/QrPoster.jsx';
import { LogoMark, OrnamentDivider } from './components/Ornaments.jsx';
import { PRESETS, GENRES, AUDIENCES } from './data/presets.js';
import { buildQuest, createInitialQuest } from './lib/questEngine.js';

const EMPTY_PLAYER_STATE = {
  completed: [],
  viewIndex: 0,
  choices: {},
  artifacts: [],
};

const INITIAL_PIPELINE = {
  stepIndex: 0,
  progress: 0,
  logs: [],
};

function Footer({ onTabChange, activeTab }) {
  return (
    <footer className="relative mt-4 border-t border-gold/15">
      <div className="gold-rule opacity-45" />
      <div className="mx-auto max-w-[1440px] px-4 py-9 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-7 lg:flex-row">
          <div className="max-w-[430px]">
            <div className="flex items-center gap-3">
              <LogoMark size={38} animated={false} />
              <div>
                <div className="font-display text-[25px] font-semibold leading-none text-parchment">
                  Былина<span className="text-gold">.Live</span>
                </div>
                <div className="mt-1 text-[7.5px] font-bold uppercase tracking-[0.2em] text-gold/55">AI Cultural Engine</div>
              </div>
            </div>
            <p className="mt-4 text-[10px] leading-relaxed text-sage/45">
              Интерактивные ИИ-аудиоспектакли с дополненной реальностью для музеев-заповедников,
              городских парков и загородных отелей. Культурный код — в каждом шаге.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-gold/15 bg-white/[0.02] px-2.5 py-1 text-[8px] text-sage/35">
              <Sparkles size={9} className="text-gold/60" />
              Прототип для федерального ИИ-хакатона · креативные индустрии
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-gold/55">Разделы</p>
              <div className="mt-2.5 space-y-1.5">
                {[
                  { id: 'studio', label: 'B2B-Студия', icon: Building2 },
                  { id: 'player', label: 'Плеер туриста', icon: Smartphone },
                  { id: 'jury', label: 'Для жюри', icon: Trophy },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onTabChange(item.id)}
                      className={`flex items-center gap-1.5 text-[9.5px] transition-colors ${activeTab === item.id ? 'text-gold-soft' : 'text-sage/45 hover:text-parchment/75'}`}
                    >
                      <Icon size={10} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-gold/55">Технологии</p>
              <div className="mt-2.5 space-y-1.5 text-[9px] text-sage/45">
                <div className="flex items-center gap-1.5"><BrainCircuit size={10} className="text-gold/55" /> GigaChat Narrative</div>
                <div className="flex items-center gap-1.5"><Palette size={10} className="text-gold/55" /> Kandinsky 3.1</div>
                <div className="flex items-center gap-1.5"><AudioWaveform size={10} className="text-gold/55" /> Neural TTS & SoundGen</div>
                <div className="flex items-center gap-1.5"><Smartphone size={10} className="text-gold/55" /> React · Tailwind · Web Audio</div>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-gold/55">Принципы</p>
              <div className="mt-2.5 space-y-1.5 text-[9px] text-sage/45">
                <div className="flex items-center gap-1.5"><Heart size={10} className="text-jade/55" /> Культура через соучастие</div>
                <div className="flex items-center gap-1.5"><ShieldCheck size={10} className="text-jade/55" /> Human-in-the-loop</div>
                <div className="flex items-center gap-1.5"><Sparkles size={10} className="text-jade/55" /> Zero external assets</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/[0.055] pt-4 sm:flex-row sm:items-center">
          <p className="text-[8px] leading-relaxed text-sage/25">
            Демонстрационный MVP. GigaChat, Kandinsky 3.1 и Neural TTS показаны как продуктовая архитектура;
            генерация в прототипе воспроизводится локально, без API-ключей и внешних медиафайлов.
          </p>
          <p className="flex shrink-0 items-center gap-1.5 text-[8px] uppercase tracking-[0.14em] text-gold/35">
            Сделано для культурного кода России
            <ArrowUpRight size={10} />
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('studio');
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [archiveText, setArchiveText] = useState(PRESETS[0].archiveText);
  const [audience, setAudience] = useState('family');
  const [genre, setGenre] = useState('slavic');
  const [quest, setQuest] = useState(() => createInitialQuest());
  const [playerState, setPlayerState] = useState(EMPTY_PLAYER_STATE);
  const [playerExpanded, setPlayerExpanded] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [pipeline, setPipeline] = useState(INITIAL_PIPELINE);
  const [qrOpen, setQrOpen] = useState(false);

  const generatingRef = useRef(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const clearGenerationTimers = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearGenerationTimers();
    };
  }, [clearGenerationTimers]);

  const changeTab = (nextTab) => {
    setActiveTab(nextTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectPreset = (id) => {
    const next = PRESETS.find((preset) => preset.id === id) || PRESETS[0];
    setPresetId(next.id);
    setArchiveText(next.archiveText);
  };

  const startGeneration = () => {
    if (generatingRef.current) {
      return;
    }
    generatingRef.current = true;
    setGenerating(true);
    setQrOpen(false);

    const preset = PRESETS.find((item) => item.id === presetId) || PRESETS[0];
    const genreOption = GENRES.find((item) => item.id === genre) || GENRES[0];
    const audienceOption = AUDIENCES.find((item) => item.id === audience) || AUDIENCES[0];
    const candidate = buildQuest({ preset, archiveText, audience, genre });
    const keywordPreview = candidate.keywords.slice(0, 3).join(', ') || preset.label;
    const started = performance.now();
    const collectedLogs = [];

    const timeline = [
      { at: 0, text: 'GigaChat API: соединение установлено · режим narrative' },
      { at: 140, text: `Анализ архива: ${candidate.keywords.length} сущностей · ${keywordPreview}` },
      { at: 380, text: `Фактчекинг: сверка имён, дат и топонимов «${preset.location}»` },
      { at: 620, text: `Драматургия: архетип «${genreOption.label}» · 4 сцены` },
      { at: 850, text: `Тональность под ЦА: ${audienceOption.label} · ${audienceOption.age}` },
      { at: 1080, text: 'Ветвление: 8 реплик, 4 выбора, 4 финальных ответа' },
      { at: 1300, text: 'Kandinsky 3.1: стилизация 4 портретов в нео-русской палитре' },
      { at: 1520, text: 'AR-коллекция: ключ, печать, оберег и рунический объект' },
      { at: 1780, text: 'Neural TTS: подбор высоты и темпа для 4 характеров' },
      { at: 2010, text: 'SoundGen: ветер в кронах, гусли и редкие перезвоны' },
      { at: 2200, text: 'Вёрстка QR-таблички и паспорта маршрута' },
      { at: 2380, text: 'Финальная проверка: маршрут готов к публикации' },
    ];

    setPipeline({ stepIndex: 0, progress: 3, logs: [timeline[0].text] });
    collectedLogs.push(timeline[0].text);

    const finish = () => {
      clearGenerationTimers();
      collectedLogs.push('Готово: 4 сцены · 8 развилок · 4 AR-артефакта · 4 голоса');
      setPipeline({ stepIndex: 4, progress: 100, logs: collectedLogs });
      setQuest(candidate);
      setPlayerState({ ...EMPTY_PLAYER_STATE, completed: [], choices: {}, artifacts: [], viewIndex: 0 });
      setHasGenerated(true);
      setGenerating(false);
      generatingRef.current = false;
    };

    intervalRef.current = window.setInterval(() => {
      const elapsed = performance.now() - started;
      const progress = Math.min(99, (elapsed / 2500) * 100);
      const stepIndex = Math.min(3, Math.floor(elapsed / 625));

      let added = false;
      for (let index = 1; index < timeline.length; index += 1) {
        if (elapsed >= timeline[index].at && !collectedLogs.includes(timeline[index].text)) {
          collectedLogs.push(timeline[index].text);
          added = true;
        }
      }

      setPipeline((previous) => ({
        stepIndex,
        progress,
        logs: added || previous.logs.length !== collectedLogs.length ? [...collectedLogs] : previous.logs,
      }));

      if (elapsed >= 2500) {
        finish();
      }
    }, 90);

    timeoutRef.current = window.setTimeout(() => {
      if (generatingRef.current) {
        finish();
      }
    }, 2600);
  };

  const launchInPlayer = () => {
    setPlayerState({ ...EMPTY_PLAYER_STATE });
    setActiveTab('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onQrClose = useCallback(() => setQrOpen(false), []);

  return (
    <div className="grain relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[520px] bg-[radial-gradient(ellipse_at_50%_-10%,rgba(31,90,72,0.28),transparent_66%)]" />
      <Header activeTab={activeTab} onChange={changeTab} />

      <main className={`relative min-h-[70vh] ${playerExpanded ? 'z-[110]' : 'z-10'}`}>
        {activeTab === 'studio' ? (
          <Studio
            preset={presetId}
            archiveText={archiveText}
            audience={audience}
            genre={genre}
            onPresetSelect={selectPreset}
            onArchiveChange={setArchiveText}
            onAudienceChange={setAudience}
            onGenreChange={setGenre}
            onGenerate={startGeneration}
            generating={generating}
            pipeline={pipeline}
            quest={quest}
            onLaunch={launchInPlayer}
            onOpenQr={() => setQrOpen(true)}
            hasGenerated={hasGenerated}
          />
        ) : null}
        {activeTab === 'player' ? (
          <Player
            quest={quest}
            playerState={playerState}
            setPlayerState={setPlayerState}
            onExpandedChange={setPlayerExpanded}
          />
        ) : null}
        {activeTab === 'jury' ? <Jury /> : null}
      </main>

      <Footer onTabChange={changeTab} activeTab={activeTab} />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 pb-5 sm:px-6 lg:px-8">
        <OrnamentDivider className="opacity-40" width={1200} />
      </div>

      <QrPosterModal quest={quest} open={qrOpen} onClose={onQrClose} />
    </div>
  );
}
