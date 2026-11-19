import { useMemo } from 'react';
import {
  Castle,
  Trees,
  Mountain,
  Sprout,
  Compass,
  Landmark,
  Sparkles,
  Search,
  Coins,
  WandSparkles,
  ArrowRight,
  QrCode,
  Clock,
  MapPin,
  Boxes,
  Quote,
  FileText,
  BrainCircuit,
  Palette,
  AudioWaveform,
  Loader2,
  Cpu,
  Waves,
  Gem,
  ChevronRight,
  ScanLine,
  CircleCheck,
  Users,
} from 'lucide-react';
import { AUDIENCES, GENRES, PRESETS } from '../data/presets.js';
import { extractKeywords } from '../lib/questEngine.js';
import { OrnamentDivider, SectionEyebrow, SlavicCorner, DottedPattern } from './Ornaments.jsx';
import { PortraitThumb } from './Portraits.jsx';

const PRESET_ICONS = { Castle, Trees, Mountain };
const AUDIENCE_ICONS = { Sprout, Compass, Landmark };
const GENRE_ICONS = { slavic: Sparkles, detective: Search, merchant: Coins };

const PIPELINE_STEPS = [
  {
    title: 'GigaChat API',
    short: 'Архив → смыслы',
    detail: 'Извлечение топонимов и исторических фактов',
    icon: BrainCircuit,
  },
  {
    title: 'Драматургия',
    short: '4 сцены',
    detail: 'Построение сцен и ветвящихся диалогов под ЦА',
    icon: ScrollTextIcon,
  },
  {
    title: 'Kandinsky 3.1',
    short: 'Образы и AR',
    detail: 'Генерация портретов персонажей и артефактов',
    icon: Palette,
  },
  {
    title: 'Neural TTS & SoundGen',
    short: 'Голоса и эмбиент',
    detail: 'Синтез тембров и фонового звукового ландшафта',
    icon: AudioWaveform,
  },
];

function ScrollTextIcon(props) {
  return <FileText {...props} />;
}

function QuestCover({ presetId, accent }) {
  if (presetId === 'wood') {
    return (
      <svg viewBox="0 0 760 230" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="woodSky" x1="0" y1="0" x2="760" y2="230" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0B3028" />
            <stop offset="0.6" stopColor="#0E3B2E" />
            <stop offset="1" stopColor="#071B15" />
          </linearGradient>
          <radialGradient id="woodSun" cx="0" cy="0" r="1" gradientTransform="translate(570 60) rotate(90) scale(74)">
            <stop stopColor="#F4B860" stopOpacity="0.4" />
            <stop offset="1" stopColor="#F4B860" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="760" height="230" fill="url(#woodSky)" />
        <circle cx="570" cy="60" r="74" fill="url(#woodSun)" />
        <circle cx="570" cy="60" r="21" fill="#F4B860" fillOpacity="0.14" stroke="#F4B860" strokeOpacity="0.46" />
        <path d="M0 171c93-30 159-26 227 4 55 24 111 22 171-2 90-36 166-35 362 10v47H0Z" fill="#0A241C" />
        <path d="M0 190c100-14 180-6 256 9 73 14 149 8 225-8 91-19 177-14 279 8v31H0Z" fill="#071A14" />
        <path d="M0 205c111 11 196 18 296 14 118-5 229-22 464 4v7H0Z" fill="#2EC4B6" fillOpacity="0.14" />
        <g fill="#12352A" stroke="#3D7967" strokeOpacity="0.2">
          {[42, 91, 136, 201, 257, 607, 658, 710].map((x, index) => (
            <g key={x} transform={`translate(${x} ${103 + (index % 3) * 17}) scale(${0.7 + (index % 4) * 0.16})`}>
              <path d="M0 70 -18 23 18 23Z M0 42 -24 -8 24 -8Z M0 10 -19 -34 19 -34Z" />
              <path d="M0 70v28" stroke="#0B1F19" strokeWidth="5" />
            </g>
          ))}
        </g>
        <g transform="translate(368 88)">
          <path d="M0 75 58 34 116 75Z" fill="#1A3B2E" stroke="#5D8C74" strokeOpacity="0.25" />
          <rect x="21" y="75" width="74" height="55" fill="#122D24" stroke="#6D8C75" strokeOpacity="0.2" />
          <path d="M50 75V49h16v26" fill="#071A14" />
          <path d="M0 75h116" stroke="#DAA552" strokeOpacity="0.3" />
          <circle cx="58" cy="45" r="15" fill="none" stroke="#DAA552" strokeOpacity="0.36" />
          <path d="M58 30v30M43 45h30M48 35l20 20M68 35 48 55" stroke="#DAA552" strokeOpacity="0.25" strokeWidth="0.8" />
          <path d="M111 70c-17-8-26-8-35 0-8-8-20-8-28 0" stroke="#2EC4B6" strokeOpacity="0.25" fill="none" />
          <path d="M128 125c-17-12-35-12-53-2-14-7-32-5-54 5" stroke="#2EC4B6" strokeOpacity="0.22" fill="none" />
        </g>
        <g fill="#F4B860" opacity="0.55">
          <circle cx="279" cy="58" r="1.2" />
          <circle cx="650" cy="101" r="1.5" />
          <circle cx="481" cy="41" r="1" />
          <circle cx="181" cy="88" r="1" />
        </g>
        <path d="M0 155h760" stroke="#DAA552" strokeOpacity="0.08" />
      </svg>
    );
  }

  if (presetId === 'mine') {
    return (
      <svg viewBox="0 0 760 230" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="mineSky" x1="0" y1="0" x2="760" y2="230" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0C2B27" />
            <stop offset="0.55" stopColor="#0B2420" />
            <stop offset="1" stopColor="#06130F" />
          </linearGradient>
          <linearGradient id="mineRock" x1="0" y1="50" x2="760" y2="230" gradientUnits="userSpaceOnUse">
            <stop stopColor="#284B43" />
            <stop offset="0.55" stopColor="#132F28" />
            <stop offset="1" stopColor="#081A15" />
          </linearGradient>
          <radialGradient id="mineMoon" cx="0" cy="0" r="1" gradientTransform="translate(590 55) rotate(90) scale(68)">
            <stop stopColor="#8DE8DE" stopOpacity="0.26" />
            <stop offset="1" stopColor="#8DE8DE" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="760" height="230" fill="url(#mineSky)" />
        <circle cx="590" cy="55" r="68" fill="url(#mineMoon)" />
        <circle cx="590" cy="55" r="17" fill="#A8DADC" fillOpacity="0.12" stroke="#A8DADC" strokeOpacity="0.3" />
        <path d="M0 158 82 74l41 49 50-70 65 76 57-48 66 66 75-87 63 72 46-41 66 63 50-34 59 48v42H0Z" fill="url(#mineRock)" />
        <path d="M0 176 92 105l38 31 61-37 55 55 70-43 53 45 61-54 71 42 63-31 63 37 53-20 42 37v31H0Z" fill="#0B241D" />
        <path d="M0 199c102-13 173-2 247 9 81 12 163 8 240-5 84-14 166-9 273 7v20H0Z" fill="#0A3A32" />
        <path d="M0 207c111 9 200 13 291 7 102-7 187-15 295-6 64 5 118 12 174 10v12H0Z" fill="#2EC4B6" fillOpacity="0.2" />
        <g transform="translate(95 130)">
          <path d="M0 68V31C0 8 17-5 38-5s38 13 38 36v37Z" fill="#071A15" stroke="#8DE8DE" strokeOpacity="0.25" />
          <path d="M19 68V37c0-10 8-17 19-17s19 7 19 17v31Z" fill="#0B2A22" />
          <path d="M38 20v48M33 31h10M31 42h14M29 53h18" stroke="#DAA552" strokeOpacity="0.35" />
          <path d="M-24 70h124" stroke="#DAA552" strokeOpacity="0.3" />
        </g>
        <g stroke="#8DE8DE" strokeOpacity="0.15">
          <path d="M244 22v19M235 31h18M516 26v15M509 33h14" />
        </g>
        <g fill="#A8DADC" opacity="0.55">
          <circle cx="318" cy="40" r="1.2" />
          <circle cx="692" cy="91" r="1.4" />
          <circle cx="443" cy="26" r="1" />
          <circle cx="215" cy="74" r="1" />
        </g>
        <path d="M0 153h760" stroke="#DAA552" strokeOpacity="0.08" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 760 230" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="manorSky" x1="0" y1="0" x2="760" y2="230" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D3328" />
          <stop offset="0.55" stopColor="#123B2D" />
          <stop offset="1" stopColor="#071B15" />
        </linearGradient>
        <radialGradient id="manorSun" cx="0" cy="0" r="1" gradientTransform="translate(607 54) rotate(90) scale(78)">
          <stop stopColor="#F4B860" stopOpacity="0.34" />
          <stop offset="1" stopColor="#F4B860" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="760" height="230" fill="url(#manorSky)" />
      <circle cx="607" cy="54" r="78" fill="url(#manorSun)" />
      <circle cx="607" cy="54" r="22" fill="#F4B860" fillOpacity="0.14" stroke="#F4B860" strokeOpacity="0.42" />
      <path d="M0 172c100-23 176-19 244 7 69 26 149 23 222-3 91-32 177-31 294 1v53H0Z" fill="#0A241C" />
      <path d="M0 196c83-15 161-11 239 4 87 17 175 13 260-5 90-19 171-15 261 3v32H0Z" fill="#071A14" />
      <g transform="translate(353 84)">
        <path d="M-92 90C-70 53-40 36 0 32 40 36 70 53 92 90Z" fill="#1A3D2F" />
        <rect x="-58" y="66" width="116" height="50" fill="#132F25" stroke="#6D8C75" strokeOpacity="0.24" />
        <path d="M-68 66H68L48 49H-48Z" fill="#214436" stroke="#DAA552" strokeOpacity="0.18" />
        <path d="M-15 116V86c0-18 30-18 30 0v30" fill="#071A14" />
        <path d="M-44 78h17v12h-17ZM27 78h17v12H27Z" fill="#DAA552" fillOpacity="0.16" stroke="#DAA552" strokeOpacity="0.25" />
        <path d="M-58 116H58" stroke="#DAA552" strokeOpacity="0.34" />
        <path d="M0 32V6M-8 13H8M-5 22H5" stroke="#DAA552" strokeOpacity="0.45" />
      </g>
      <g fill="#12352A" stroke="#3D7967" strokeOpacity="0.2">
        {[28, 92, 145, 665, 722, 776].map((x, index) => (
          <g key={x} transform={`translate(${x} ${111 + (index % 2) * 16}) scale(${0.7 + (index % 3) * 0.14})`}>
            <circle cx="0" cy="-8" r="27" />
            <path d="M0 18v31" stroke="#0B1F19" strokeWidth="5" />
          </g>
        ))}
      </g>
      <path d="M0 210c98 6 178 12 267 7 108-7 195-18 289-12 75 5 138 9 204 7v18H0Z" fill="#2EC4B6" fillOpacity="0.16" />
      <path d="M0 216c93 4 173 7 258 3 112-5 199-12 291-8 74 3 138 5 211 2" stroke="#8DE8DE" strokeOpacity="0.18" fill="none" />
      <g fill="#F4B860" opacity="0.5">
        <circle cx="188" cy="55" r="1.2" />
        <circle cx="469" cy="35" r="1" />
        <circle cx="691" cy="112" r="1.4" />
        <circle cx="311" cy="89" r="0.9" />
      </g>
      <path d="M0 155h760" stroke="#DAA552" strokeOpacity="0.08" />
    </svg>
  );
}

function PresetChips({ preset, onSelect }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {PRESETS.map((item) => {
        const Icon = PRESET_ICONS[item.icon] || Castle;
        const active = preset === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            aria-pressed={active}
            data-active={active}
            className="chip group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left"
          >
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${active ? 'border-gold/35 bg-gold/10 text-amber' : 'border-white/10 bg-white/[0.025] text-sage/70'}`}>
              <Icon size={13} strokeWidth={1.7} />
            </span>
            <span className="min-w-0">
              <span className="block text-[10.5px] font-semibold leading-tight">{item.label}</span>
              <span className="mt-0.5 block text-[8.5px] leading-tight opacity-55">{item.tagline}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function GenerationPipeline({ pipeline }) {
  const stepIndex = pipeline.stepIndex;
  const progress = pipeline.progress;
  return (
    <div className="glass-panel relative overflow-hidden rounded-[28px] p-5 sm:p-7">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-jade/10 blur-3xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <SectionEyebrow icon={Cpu}>Нейросетевой конвейер</SectionEyebrow>
          <h3 className="mt-4 font-display text-[32px] font-semibold leading-none text-parchment">
            Собираем <span className="gold-text italic">живой маршрут</span>
          </h3>
          <p className="mt-2 text-[12px] text-sage">Архивный текст превращается в сцены, голоса и AR-слой.</p>
        </div>
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-jade/30 bg-jade/[0.06]">
          <span className="absolute inset-1 rounded-full border border-dashed border-jade/25 spin-slow" />
          <Loader2 size={19} className="animate-spin text-jade" />
        </div>
      </div>

      <div className="relative mt-6">
        <div className="absolute bottom-4 left-[19px] top-4 w-px bg-gradient-to-b from-gold/35 via-jade/25 to-transparent" />
        <div className="space-y-2.5">
          {PIPELINE_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isDone = index < stepIndex;
            const isActive = index === stepIndex;
            return (
              <div
                key={step.title}
                data-state={isDone ? 'done' : isActive ? 'active' : 'idle'}
                className="pipeline-step relative flex items-center gap-3 rounded-xl p-3 pl-3.5"
              >
                <span
                  className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                    isDone
                      ? 'border-gold/45 bg-gold/15 text-gold-soft'
                      : isActive
                        ? 'border-jade/50 bg-jade/10 text-jade'
                        : 'border-white/10 bg-[#071a14] text-sage/35'
                  }`}
                >
                  {isDone ? <CircleCheck size={16} /> : <Icon size={15} />}
                  {isActive ? <span className="absolute inset-0 animate-ping rounded-full border border-jade/20" /> : null}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className={`truncate text-[11.5px] font-semibold ${isActive ? 'text-parchment' : isDone ? 'text-gold-soft/90' : 'text-sage/45'}`}>
                        {step.title}
                      </p>
                      <p className="mt-0.5 truncate text-[9.5px] text-sage/45">{step.detail}</p>
                    </div>
                    <span className={`shrink-0 text-[8.5px] font-semibold uppercase tracking-[0.1em] ${isActive ? 'text-jade' : isDone ? 'text-gold/70' : 'text-sage/25'}`}>
                      {isDone ? 'Готово' : isActive ? 'В работе' : 'Ожидание'}
                    </span>
                  </div>
                  <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className={`h-full rounded-full transition-[width] duration-300 ${isDone ? 'bg-gradient-to-r from-gold to-amber' : 'bg-gradient-to-r from-jade to-[#7de2d6]'}`}
                      style={{ width: isDone ? '100%' : isActive ? `${Math.max(8, (progress - index * 25) * 4)}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1.5 text-sage/60">
          <Waves size={12} className="text-jade/70" />
          GigaChat Narrative · Kandinsky · TTS
        </span>
        <span className="font-mono font-semibold text-gold-soft">{Math.round(progress)}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold via-amber to-jade transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-jade/15 bg-[#03110d]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-3.5 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E06C5A]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#E3B45A]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#57B68B]" />
          </div>
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-jade/50">bylina://pipeline/live</span>
          <span className="flex items-center gap-1 font-mono text-[8px] text-jade/60">
            <span className="pulse-dot h-1 w-1 rounded-full bg-jade" /> STREAM
          </span>
        </div>
        <div className="scroll-fine h-[138px] space-y-1.5 overflow-y-auto p-3 font-mono text-[9.5px] leading-relaxed">
          {pipeline.logs.length ? (
            pipeline.logs.map((log, index) => (
              <div key={`${log}-${index}`} className="flex gap-2">
                <span className="shrink-0 text-sage/25">{String(index + 1).padStart(2, '0')}:</span>
                <span className={index === pipeline.logs.length - 1 ? 'text-jade/90' : 'text-sage/50'}>{log}</span>
              </div>
            ))
          ) : (
            <div className="text-jade/80">Инициализация моделей...</div>
          )}
          <div className="flex items-center gap-1 pt-1 text-gold/70">
            <span>{'>'}</span>
            <span className="inline-block h-2.5 w-1 animate-pulse bg-gold/70" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[9.5px] text-sage/40">
        <Sparkles size={11} className="text-gold/60" />
        Без внешних ключей: демонстрационный конвейер работает локально и воспроизводимо.
      </div>
    </div>
  );
}

function GeneratedResult({ quest, onLaunch, onOpenQr, hasGenerated }) {
  return (
    <div className="glass-panel fade-up relative overflow-hidden rounded-[28px]">
      <div className="relative min-h-[190px] overflow-hidden border-b border-gold/20">
        <QuestCover presetId={quest.presetId} accent={quest.accent} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071b15] via-[#071b15]/40 to-transparent" />
        <SlavicCorner className="absolute left-3 top-3 opacity-55" />
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-jade/25 bg-[#061a14]/75 px-2.5 py-1 text-[8.5px] font-semibold uppercase tracking-[0.12em] text-jade/85 backdrop-blur">
          <CircleCheck size={10} />
          {hasGenerated ? 'Только что собрано' : 'Готовый маршрут'}
        </div>
        <div className="absolute inset-x-4 bottom-4 sm:inset-x-5">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full border border-gold/30 bg-[#081e17]/80 px-2.5 py-1 text-[8.5px] font-semibold uppercase tracking-[0.13em] text-gold-soft/90 backdrop-blur">
              {quest.genre.label}
            </span>
            <span className="rounded-full border border-white/15 bg-[#081e17]/80 px-2.5 py-1 text-[8.5px] font-medium text-parchment/75 backdrop-blur">
              {quest.audience.label} · {quest.audience.age}
            </span>
          </div>
          <h3 className="max-w-[560px] font-display text-[30px] font-semibold leading-[1.03] tracking-[-0.01em] text-parchment sm:text-[37px]">
            {quest.title}
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-sage/75">
            <MapPin size={10} className="text-gold/70" /> {quest.location}
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { icon: Clock, value: '45 мин', label: 'длительность' },
            { icon: MapPin, value: '4', label: 'точки маршрута' },
            { icon: Boxes, value: '8', label: 'развилки' },
            { icon: Gem, value: '4', label: 'AR-артефакта' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
                <Icon size={11} className="mb-1 text-gold/65" />
                <div className="font-display text-lg font-semibold leading-none text-parchment">{item.value}</div>
                <div className="mt-1 text-[8px] uppercase tracking-[0.08em] text-sage/45">{item.label}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-sage/70">Сцены маршрута</h4>
          <div className="flex items-center gap-1 text-[9px] text-jade/65">
            <AudioWaveform size={10} />
            4 голоса · ru-RU
          </div>
        </div>

        <div className="mt-2.5 space-y-2">
          {quest.points.map((point, index) => (
            <div
              key={point.id}
              className="group flex items-start gap-3 rounded-xl border border-white/[0.065] bg-white/[0.022] p-2.5 transition-colors hover:border-gold/25 hover:bg-white/[0.035]"
            >
              <div className="relative shrink-0">
                <PortraitThumb archetype={point.character.archetype} name={point.character.name} className="h-[54px] w-[54px]" />
                <span className="absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-gold/50 bg-[#0a221a] font-display text-[9px] font-bold text-gold-soft">
                  {point.number}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-[11.5px] font-semibold leading-snug text-parchment/95">{point.displayTitle}</p>
                    <p className="mt-0.5 text-[8.5px] uppercase tracking-[0.09em] text-sage/45">
                      {point.character.name} · {point.character.role}
                    </p>
                  </div>
                  <ChevronRight size={13} className="mt-1 shrink-0 text-sage/25 transition-transform group-hover:translate-x-0.5 group-hover:text-gold/70" />
                </div>
                <p className="mt-1.5 line-clamp-2 text-[10px] italic leading-relaxed text-sage/65">
                  <Quote size={8} className="mr-1 inline text-gold/50" />
                  {point.character.quote}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-1">
                  <span className="inline-flex items-center gap-1 rounded-full border border-gold/15 bg-gold/[0.04] px-1.5 py-0.5 text-[7.5px] text-gold-soft/75">
                    <Gem size={7} />
                    {point.artifact.name}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.02] px-1.5 py-0.5 text-[7.5px] text-sage/50">
                    <ScanLine size={7} />
                    AR
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {quest.keywords.length ? (
          <div className="mt-4 rounded-xl border border-gold/15 bg-gold/[0.03] p-3">
            <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-gold-soft/75">
              <BrainCircuit size={11} />
              GigaChat вплёл в сюжет
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {quest.keywords.slice(0, 6).map((keyword) => (
                <span key={keyword} className="rounded-full border border-gold/20 bg-[#061a14]/70 px-2 py-0.5 text-[8.5px] text-parchment/65">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-4 grid gap-2 sm:grid-cols-[1.3fr_1fr]">
          <button
            type="button"
            onClick={onLaunch}
            className="btn-gold flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.04em]"
          >
            Запустить в плеере туриста
            <ArrowRight size={15} />
          </button>
          <button
            type="button"
            onClick={onOpenQr}
            className="btn-outline flex items-center justify-center gap-2 rounded-xl px-3.5 py-3 text-[10.5px] font-semibold"
          >
            <QrCode size={14} className="text-gold/80" />
            QR-табличка для входа в парк
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Studio({
  preset,
  archiveText,
  audience,
  genre,
  onPresetSelect,
  onArchiveChange,
  onAudienceChange,
  onGenreChange,
  onGenerate,
  generating,
  pipeline,
  quest,
  onLaunch,
  onOpenQr,
  hasGenerated,
}) {
  const selectedPreset = PRESETS.find((item) => item.id === preset) || PRESETS[0];
  const keywords = useMemo(() => extractKeywords(archiveText, selectedPreset), [archiveText, selectedPreset]);
  const selectedAudience = AUDIENCES.find((item) => item.id === audience) || AUDIENCES[0];

  return (
    <div className="tab-content-enter relative mx-auto w-full max-w-[1440px] px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-[400px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(46,196,182,0.07),transparent_63%)]" />
      <div className="relative mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-[760px]">
          <SectionEyebrow icon={WandSparkles}>B2B-студия · конструктор маршрутов</SectionEyebrow>
          <h1 className="mt-4 text-balance font-display text-[38px] font-semibold leading-[0.98] tracking-[-0.018em] text-parchment sm:text-[52px] lg:text-[58px]">
            Из архивной справки — <br className="hidden sm:block" />
            в <span className="gold-text italic">живое приключение</span>
          </h1>
          <p className="mt-4 max-w-[620px] text-pretty text-[13px] leading-relaxed text-sage sm:text-[14px]">
            Вставьте историю места, выберите аудиторию и жанр. GigaChat Narrative соберёт 4 сцены,
            Kandinsky — образы и AR-артефакты, а Neural TTS подарит каждому персонажу свой голос.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-end">
          {[
            { label: 'GigaChat Narrative', icon: BrainCircuit },
            { label: 'Kandinsky 3.1', icon: Palette },
            { label: 'Neural TTS', icon: AudioWaveform },
            { label: '0 API-ключей', icon: Cpu },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <span key={item.label} className="inline-flex items-center gap-1.5 rounded-full border border-gold/18 bg-white/[0.025] px-3 py-1.5 text-[9px] font-medium text-sage/70">
                <Icon size={11} className="text-gold/75" />
                {item.label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="relative grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:gap-7">
        <div className="glass-panel relative h-fit overflow-hidden rounded-[28px]">
          <div className="fret-pattern pointer-events-none absolute inset-x-0 top-0 h-14 opacity-50" />
          <DottedPattern className="pointer-events-none absolute -right-5 top-8 h-24 w-40 opacity-20" />
          <SlavicCorner className="pointer-events-none absolute right-0 top-0 opacity-40" />

          <div className="relative border-b border-gold/12 px-5 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/35 bg-gold/[0.07] font-display text-[11px] font-bold text-gold-soft">
                  01
                </span>
                <div>
                  <h2 className="text-[12px] font-bold uppercase tracking-[0.13em] text-parchment/90">Основа маршрута</h2>
                  <p className="mt-0.5 text-[9px] text-sage/50">Один текст — четыре сцены</p>
                </div>
              </div>
              <span className="hidden items-center gap-1 rounded-full border border-jade/20 bg-jade/[0.04] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-jade/70 sm:flex">
                <FileText size={9} />
                Редактор архива
              </span>
            </div>
          </div>

          <div className="relative space-y-6 p-5 sm:p-6">
            <section>
              <div className="mb-2.5 flex items-center justify-between">
                <label className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-sage/55">Быстрый пресет локации</label>
                <span className="text-[8.5px] text-sage/35">3 сценария</span>
              </div>
              <PresetChips preset={preset} onSelect={onPresetSelect} />
            </section>

            <section>
              <div className="mb-2.5 flex items-end justify-between gap-3">
                <label htmlFor="archive-text" className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-sage/55">
                  Историческая справка / архив места
                </label>
                <span className="shrink-0 font-mono text-[8.5px] text-sage/35">{archiveText.length} / 3000</span>
              </div>
              <div className="relative">
                <textarea
                  id="archive-text"
                  value={archiveText}
                  onChange={(event) => onArchiveChange(event.target.value.slice(0, 3000))}
                  rows={8}
                  spellCheck={false}
                  className="input-field scroll-fine resize-none px-4 py-3.5 text-[12px] leading-[1.7] text-parchment/90"
                  placeholder="Вставьте историческую справку, фрагмент архива или местное предание..."
                />
              </div>

              <div className="mt-3 rounded-xl border border-gold/15 bg-gold/[0.025] p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-gold-soft/75">
                    <BrainCircuit size={11} />
                    GigaChat извлёк смысловые опоры
                  </div>
                  <span className="font-mono text-[8.5px] text-sage/35">{keywords.length} сущностей</span>
                </div>
                {keywords.length ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {keywords.map((keyword, index) => (
                      <span
                        key={keyword}
                        className="fade-in inline-flex items-center gap-1 rounded-full border border-gold/20 bg-[#071d17]/80 px-2 py-0.5 text-[9px] text-parchment/70"
                        style={{ animationDelay: `${index * 45}ms` }}
                      >
                        <span className="h-0.5 w-0.5 rounded-full bg-gold/70" />
                        {keyword}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-[9.5px] leading-relaxed text-sage/45">
                    Добавьте имена и топонимы — ИИ вплетёт их в название и описания точек.
                  </p>
                )}
              </div>
            </section>

            <section>
              <div className="mb-2.5 flex items-center justify-between">
                <label className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-sage/55">Целевая аудитория</label>
                <span className="flex items-center gap-1 text-[8.5px] text-sage/35">
                  <Users size={9} /> тон и сложность
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {AUDIENCES.map((item) => {
                  const Icon = AUDIENCE_ICONS[item.icon] || Compass;
                  const active = audience === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onAudienceChange(item.id)}
                      aria-pressed={active}
                      className={`genre-card rounded-xl p-3 text-left ${active ? 'gold-border-glow' : ''}`}
                      data-active={active}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${active ? 'bg-gold/12 text-amber' : 'bg-white/[0.03] text-sage/60'}`}>
                          <Icon size={13} />
                        </span>
                        <span className={`rounded-full px-1.5 py-0.5 text-[7.5px] font-bold uppercase tracking-[0.08em] ${active ? 'bg-gold/15 text-gold-soft' : 'bg-white/[0.03] text-sage/35'}`}>
                          {item.age}
                        </span>
                      </div>
                      <div className={`mt-2 text-[10.5px] font-semibold leading-tight ${active ? 'text-parchment' : 'text-parchment/65'}`}>{item.label}</div>
                      <div className="mt-1 text-[8.5px] leading-snug text-sage/45">{item.short}</div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 flex items-start gap-1.5 text-[9px] leading-relaxed text-sage/40">
                <Sparkles size={10} className="mt-0.5 shrink-0 text-gold/50" />
                {selectedAudience.description}
              </p>
            </section>

            <section>
              <div className="mb-2.5 flex items-center justify-between">
                <label className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-sage/55">Жанр драматургии</label>
                <span className="text-[8.5px] text-sage/35">атмосфера сцен</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {GENRES.map((item) => {
                  const Icon = GENRE_ICONS[item.id] || Sparkles;
                  const active = genre === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onGenreChange(item.id)}
                      aria-pressed={active}
                      className={`genre-card rounded-xl p-3 text-left ${active ? 'gold-border-glow' : ''}`}
                      data-active={active}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${active ? 'bg-gold/12 text-amber' : 'bg-white/[0.03] text-sage/60'}`}>
                          <Icon size={13} />
                        </span>
                        {active ? <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(218,165,82,0.8)]" /> : null}
                      </div>
                      <div className={`mt-2 text-[10.5px] font-semibold leading-tight ${active ? 'text-parchment' : 'text-parchment/65'}`}>{item.label}</div>
                      <div className="mt-1 line-clamp-2 text-[8.5px] leading-snug text-sage/45">{item.description}</div>
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="pt-1">
              <button
                type="button"
                onClick={onGenerate}
                disabled={generating}
                className="btn-gold group flex w-full items-center justify-between gap-3 rounded-2xl px-5 py-4 text-left"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1c3b2e]/30 bg-[#10291f]/10">
                    {generating ? <Loader2 size={18} className="animate-spin" /> : <WandSparkles size={18} />}
                  </span>
                  <span>
                    <span className="block text-[12.5px] font-extrabold uppercase tracking-[0.04em] sm:text-[13px]">
                      {generating ? 'Собираем маршрут...' : 'Сгенерировать маршрут через ИИ'}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-[8.5px] font-semibold uppercase tracking-[0.11em] opacity-60">
                      <Sparkles size={9} />
                      GigaChat Narrative + Kandinsky Art
                    </span>
                  </span>
                </span>
                <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="mt-2 flex items-center justify-between gap-2 px-1 text-[8px] text-sage/35">
                <span className="flex items-center gap-1">
                  <Clock size={9} /> Генерация ≈ 2,5 секунды
                </span>
                <span>4 сцены · 8 развилок · 4 AR-объекта</span>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/35 bg-gold/[0.07] font-display text-[11px] font-bold text-gold-soft">
                02
              </span>
              <div>
                <h2 className="text-[12px] font-bold uppercase tracking-[0.13em] text-parchment/90">Результат генерации</h2>
                <p className="mt-0.5 text-[9px] text-sage/50">Сценарий, голоса и AR — в одном маршруте</p>
              </div>
            </div>
            <span className={`hidden items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.11em] sm:flex ${generating ? 'border-jade/25 bg-jade/[0.05] text-jade/80' : 'border-gold/20 bg-gold/[0.04] text-gold-soft/70'}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${generating ? 'bg-jade pulse-dot' : 'bg-gold'}`} />
              {generating ? 'Конвейер работает' : 'Готов к публикации'}
            </span>
          </div>

          {generating ? <GenerationPipeline pipeline={pipeline} /> : <GeneratedResult quest={quest} onLaunch={onLaunch} onOpenQr={onOpenQr} hasGenerated={hasGenerated} />}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.018] px-4 py-3">
            <div className="flex items-center gap-2 text-[9px] text-sage/45">
              <ScanLine size={12} className="text-jade/60" />
              AR-слой и озвучка запускаются прямо в браузере
            </div>
            <div className="flex items-center gap-3 text-[8.5px] text-sage/35">
              <span className="flex items-center gap-1"><Gem size={9} className="text-gold/60" /> 4 артефакта</span>
              <span className="flex items-center gap-1"><AudioWaveform size={9} className="text-jade/60" /> 4 тембра</span>
            </div>
          </div>
        </div>
      </div>

      <OrnamentDivider className="mx-auto mt-10 opacity-70" width={620} />

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          {
            number: '01',
            title: 'Архив становится сюжетом',
            text: 'GigaChat извлекает имена, топонимы и даты — и вплетает их в сцены и развилки.',
          },
          {
            number: '02',
            title: 'Один маршрут — три тональности',
            text: 'Семейная сказка, школьная экспедиция и взрослая драма собираются из одного архива.',
          },
          {
            number: '03',
            title: 'Доход площадки — внутри истории',
            text: 'Партнёрский купон в финале превращает культурный опыт в визит в кафе и сувенирную лавку.',
          },
        ].map((item) => (
          <div key={item.number} className="glass-panel-soft rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-semibold text-gold/50">{item.number}</span>
              <span className="h-px flex-1 mx-3 bg-gradient-to-r from-gold/30 to-transparent" />
              <Sparkles size={12} className="text-gold/40" />
            </div>
            <h3 className="mt-2 font-display text-[20px] font-semibold leading-tight text-parchment/90">{item.title}</h3>
            <p className="mt-1.5 text-[10px] leading-relaxed text-sage/55">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
