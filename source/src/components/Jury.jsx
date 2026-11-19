import { useEffect, useRef, useState } from 'react';
import {
  Trophy,
  Sparkles,
  HeartHandshake,
  Users,
  Headphones,
  Building2,
  BrainCircuit,
  Palette,
  AudioWaveform,
  ShieldCheck,
  Database,
  ArrowRight,
  Calculator,
  TrendingUp,
  Ticket,
  Layers3,
  Quote,
  MapPin,
  Globe2,
  CircleDot,
  Coins,
  Store,
  Landmark,
  Smartphone,
  Mic,
  Cpu,
} from 'lucide-react';
import { SectionEyebrow, OrnamentDivider, SlavicCorner } from './Ornaments.jsx';

const NUMBER_FORMATTER = new Intl.NumberFormat('ru-RU');

function formatNumber(value) {
  return NUMBER_FORMATTER.format(Math.round(value));
}

function formatCompactMoney(value) {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1).replace('.', ',')} млрд ₽`;
  }
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `${Number.isInteger(millions) ? millions.toFixed(0) : millions.toFixed(1).replace('.', ',')} млн ₽`;
  }
  return `${formatNumber(value)} ₽`;
}

function formatCompactPeople(value) {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `${Number.isInteger(millions) ? millions.toFixed(0) : millions.toFixed(1).replace('.', ',')} млн`;
  }
  if (value >= 1_000) {
    return `${Math.round(value / 1000)} тыс.`;
  }
  return formatNumber(value);
}

function AnimatedNumber({ value, formatter, className = '' }) {
  const [display, setDisplay] = useState(value);
  const displayRef = useRef(value);
  const rafRef = useRef(null);

  useEffect(() => {
    const from = displayRef.current;
    const to = value;
    if (from === to) {
      return undefined;
    }
    const started = performance.now();
    const duration = 480;
    const tick = (now) => {
      const t = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (to - from) * eased;
      displayRef.current = current;
      setDisplay(current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [value]);

  return <span className={className}>{formatter(display)}</span>;
}

const VALUE_CARDS = [
  {
    number: '01',
    icon: Headphones,
    title: 'Вместо скучного аудиогида — личная история',
    text: 'Турист не слушает монолог на 40 минут, а разговаривает с местом: выбирает реплику, получает ответ, собирает артефакты. Внимание удерживается действием, а не громкостью наушников.',
    tags: ['4 сцены', '8 развилок', 'AR-объекты'],
    accent: 'gold',
    quote: 'История не рассказывается. Она происходит с тобой.',
  },
  {
    number: '02',
    icon: HeartHandshake,
    title: 'Традиционные ценности — через живые голоса',
    text: 'Семейный маршрут говорит о бережности, памяти и ответственности без назидания. Берегиня, мастер и купец становятся проводниками в локальную культуру, а региональные имена и топонимы звучат естественно.',
    tags: ['Семья 6+', 'Школьники 12+', 'Взрослые'],
    accent: 'jade',
    quote: 'Культурный код передаётся не лекцией, а совместным переживанием.',
  },
  {
    number: '03',
    icon: Building2,
    title: 'Музею не нужен собственный ИИ-отдел',
    text: 'Загрузите историческую справку — и получите готовый цифровой маршрут, голоса, AR-коллекцию и печатную QR-табличку. Один SaaS-инструмент закрывает сценарий, контент, звук и вход гостя.',
    tags: ['1 минута', 'Без кода', 'QR-вход'],
    accent: 'amber',
    quote: 'Сотрудник музея остаётся экспертом, а не техническим подрядчиком.',
  },
];

const PIPELINE_MODELS = [
  {
    number: '01',
    model: 'GigaChat',
    role: 'Нарратив и фактчекинг',
    icon: BrainCircuit,
    input: 'Архивная справка, легенды, имена',
    output: '4 сцены · 8 реплик · проверенные факты',
    points: ['Извлекает топонимы и даты', 'Держит тон под аудиторию', 'Сверяет имена и контекст'],
    accent: '#DAA552',
  },
  {
    number: '02',
    model: 'Kandinsky 3.1',
    role: 'Визуальный мир и AR',
    icon: Palette,
    input: 'Персонажи и артефакты сценария',
    output: 'Портреты · AR-объекты · стиль локации',
    points: ['Единый нео-русский стиль', '4 уникальных образа', 'Векторная AR-коллекция'],
    accent: '#2EC4B6',
  },
  {
    number: '03',
    model: 'Neural TTS & SoundGen',
    role: 'Голос и атмосфера',
    icon: AudioWaveform,
    input: 'Текст сцен и характер персонажа',
    output: '4 тембра · ru-RU · процедурный эмбиент',
    points: ['Разные высота и темп', 'Живой эквалайзер', 'Звук без внешних файлов'],
    accent: '#F4B860',
  },
];

const REVENUE_STREAMS = [
  { icon: Layers3, title: 'SaaS-подписка', text: 'Фиксированный MRR с каждой площадки' },
  { icon: Store, title: 'Партнёрские офферы', text: 'Купоны в финале маршрута' },
  { icon: Globe2, title: 'White-label', text: 'Региональные сети и отели' },
];

function ValueCard({ card }) {
  const Icon = card.icon;
  const tone =
    card.accent === 'jade'
      ? { text: 'text-jade', bg: 'bg-jade/[0.08]', border: 'border-jade/25', line: 'from-jade/60' }
      : card.accent === 'amber'
        ? { text: 'text-amber', bg: 'bg-amber/[0.07]', border: 'border-amber/25', line: 'from-amber/60' }
        : { text: 'text-gold', bg: 'bg-gold/[0.07]', border: 'border-gold/25', line: 'from-gold/60' };
  return (
    <article className="value-card glass-panel relative rounded-[26px] p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${tone.border} ${tone.bg} ${tone.text}`}>
          <Icon size={20} strokeWidth={1.6} />
        </div>
        <span className="font-display text-[30px] font-semibold leading-none text-white/[0.08]">{card.number}</span>
      </div>
      <h3 className="mt-5 text-balance font-display text-[26px] font-semibold leading-[1.03] text-parchment">{card.title}</h3>
      <p className="mt-3 text-[11.5px] leading-[1.75] text-sage/65">{card.text}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {card.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.06em] text-sage/50">
            {tag}
          </span>
        ))}
      </div>
      <div className={`mt-4 border-t border-white/[0.07] bg-gradient-to-r ${tone.line} bg-[length:100%_1px] bg-no-repeat pt-3`}>
        <p className="flex items-start gap-1.5 text-[10px] italic leading-relaxed text-sage/50">
          <Quote size={10} className={`mt-0.5 shrink-0 ${tone.text} opacity-60`} />
          {card.quote}
        </p>
      </div>
    </article>
  );
}

function ModelCard({ model }) {
  const Icon = model.icon;
  return (
    <div className="relative flex h-full flex-col rounded-[22px] border border-gold/20 bg-[linear-gradient(155deg,rgba(18,45,36,0.9),rgba(5,24,19,0.9))] p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ borderColor: `${model.accent}40`, background: `${model.accent}12`, color: model.accent }}>
          <Icon size={17} strokeWidth={1.6} />
        </span>
        <span className="font-mono text-[8px] text-sage/30">{model.number}</span>
      </div>
      <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: model.accent }}>{model.model}</p>
      <h4 className="mt-1 font-display text-[21px] font-semibold leading-tight text-parchment">{model.role}</h4>
      <div className="mt-3 space-y-2">
        <div>
          <p className="text-[7px] font-bold uppercase tracking-[0.12em] text-sage/30">Вход</p>
          <p className="mt-0.5 text-[9px] leading-snug text-sage/55">{model.input}</p>
        </div>
        <div>
          <p className="text-[7px] font-bold uppercase tracking-[0.12em] text-sage/30">Выход</p>
          <p className="mt-0.5 text-[9px] leading-snug text-parchment/65">{model.output}</p>
        </div>
      </div>
      <div className="mt-auto space-y-1.5 pt-3">
        {model.points.map((point) => (
          <div key={point} className="flex items-start gap-1.5">
            <CircleDot size={8} className="mt-0.5 shrink-0" style={{ color: model.accent }} />
            <span className="text-[8.5px] leading-snug text-sage/50">{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SliderRow({ label, hint, value, displayValue, min, max, step, onChange, icon: Icon }) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-gold/20 bg-gold/[0.05] text-gold/80">
            <Icon size={13} />
          </span>
          <div>
            <label className="text-[10px] font-semibold text-parchment/80">{label}</label>
            <p className="mt-0.5 text-[8px] text-sage/35">{hint}</p>
          </div>
        </div>
        <div className="rounded-lg border border-gold/25 bg-gold/[0.06] px-2.5 py-1 text-right">
          <span className="font-mono text-[11px] font-semibold text-gold-soft">{displayValue}</span>
        </div>
      </div>
      <div className="relative mt-3 pb-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="range-gold"
          style={{ '--fill': `${fill}%` }}
          aria-valuetext={displayValue}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between text-[7px] font-medium text-sage/30">
          <span>{formatNumber(min)}</span>
          <span>{formatNumber(max)}</span>
        </div>
      </div>
    </div>
  );
}

export default function Jury() {
  const [venues, setVenues] = useState(40);
  const [tariff, setTariff] = useState(35000);
  const [traffic, setTraffic] = useState(8000);

  const mrr = venues * tariff;
  const arr = mrr * 12;
  const reach = venues * traffic * 12;
  const avgRevenuePerVenue = traffic * 0.05 * 350 * 12;

  const formatVenues = (value) => `${formatNumber(value)} площадок`;
  const formatTariff = (value) => `${formatNumber(value)} ₽/мес`;
  const formatTraffic = (value) => `${formatNumber(value)} чел/мес`;

  return (
    <div className="tab-content-enter relative mx-auto w-full max-w-[1380px] px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[510px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(218,165,82,0.08),transparent_70%)]" />

      <div className="relative mb-8 flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
        <div className="max-w-[850px]">
          <SectionEyebrow icon={Trophy}>Для жюри · ценность и экономика</SectionEyebrow>
          <h1 className="mt-4 text-balance font-display text-[38px] font-semibold leading-[0.98] tracking-[-0.018em] text-parchment sm:text-[52px] lg:text-[58px]">
            Культурный код, <br className="hidden sm:block" />
            который <span className="gold-text italic">звучит в наушниках</span>
          </h1>
          <p className="mt-4 max-w-[700px] text-pretty text-[13px] leading-relaxed text-sage sm:text-[14px]">
            «Былина.Live» превращает архив в персонализированный аудиоспектакль с AR и понятной
            B2B-экономикой. Не ещё один гид — инструмент вовлечения и монетизации культурного места.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 xl:w-[330px]">
          {[
            { value: '×3', label: 'формата: семья / школа / взрослые' },
            { value: '4', label: 'AR-артефакта в каждом маршруте' },
            { value: '1 мин', label: 'на сборку черновика квеста' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-gold/15 bg-white/[0.025] px-2.5 py-3 text-center">
              <div className="font-display text-[25px] font-semibold leading-none text-gold-soft">{item.value}</div>
              <div className="mt-1.5 text-[7.5px] leading-snug text-sage/40">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4 px-1">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold/65">01 · Ценность и культурный код</span>
            <h2 className="mt-1.5 font-display text-[29px] font-semibold leading-tight text-parchment sm:text-[34px]">Три причины, почему это работает</h2>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-jade/20 bg-jade/[0.04] px-3 py-1.5 text-[8.5px] font-medium text-jade/65 sm:flex">
            <HeartHandshake size={11} />
            Культура через соучастие
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {VALUE_CARDS.map((card) => (
            <ValueCard key={card.number} card={card} />
          ))}
        </div>
      </section>

      <OrnamentDivider className="mx-auto mt-10 opacity-65" width={660} />

      <section className="mt-8">
        <div className="mb-4 flex flex-col justify-between gap-3 px-1 sm:flex-row sm:items-end">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold/65">02 · Архитектура ИИ-конвейера</span>
            <h2 className="mt-1.5 font-display text-[29px] font-semibold leading-tight text-parchment sm:text-[34px]">Один архив — три модели</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/18 bg-white/[0.025] px-2.5 py-1 text-[8.5px] text-sage/55">
              <Database size={10} className="text-gold/60" /> Историческая справка
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-jade/20 bg-jade/[0.04] px-2.5 py-1 text-[8.5px] text-jade/65">
              <ShieldCheck size={10} /> Human-in-the-loop
            </span>
          </div>
        </div>

        <div className="glass-panel relative overflow-hidden rounded-[28px] p-4 sm:p-6">
          <div className="fret-pattern pointer-events-none absolute inset-x-0 top-0 h-12 opacity-40" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-jade/[0.06] blur-3xl" />
          <div className="relative grid items-stretch gap-3 lg:grid-cols-[1fr_46px_1fr_46px_1fr]">
            <ModelCard model={PIPELINE_MODELS[0]} />
            <div className="hidden items-center justify-center gap-1 lg:flex">
              <div className="pipeline-connector" />
              <ArrowRight size={12} className="shrink-0 text-gold/60" />
            </div>
            <ModelCard model={PIPELINE_MODELS[1]} />
            <div className="hidden items-center justify-center gap-1 lg:flex">
              <div className="pipeline-connector" />
              <ArrowRight size={12} className="shrink-0 text-gold/60" />
            </div>
            <ModelCard model={PIPELINE_MODELS[2]} />
          </div>

          <div className="relative mt-4 flex flex-col items-stretch justify-between gap-2 rounded-xl border border-gold/15 bg-[#04130f]/65 p-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.06] text-gold">
                <FileTextIcon />
              </span>
              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-gold/65">Вход</p>
                <p className="text-[9px] text-parchment/60">Текст, фотографии, локальные легенды</p>
              </div>
            </div>
            <div className="hidden flex-1 items-center gap-2 px-2 sm:flex">
              <span className="h-px flex-1 bg-gradient-to-r from-gold/15 via-gold/40 to-gold/15" />
              <ArrowRight size={11} className="text-gold/40" />
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-jade/25 bg-jade/[0.06] text-jade">
                <Smartphone size={13} />
              </span>
              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-jade/65">Выход</p>
                <p className="text-[9px] text-parchment/60">Квест · голоса · AR · QR-табличка</p>
              </div>
            </div>
          </div>

          <div className="relative mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-white/[0.06] bg-white/[0.018] px-3.5 py-2.5">
            <span className="flex items-center gap-1.5 text-[8.5px] text-sage/50">
              <ShieldCheck size={11} className="text-jade/70" />
              Факты и имена проверяет редактор музея
            </span>
            <span className="flex items-center gap-1.5 text-[8.5px] text-sage/50">
              <Cpu size={11} className="text-gold/60" />
              Все механики прототипа работают офлайн, без API-ключей
            </span>
            <span className="ml-auto flex items-center gap-1.5 text-[8.5px] text-sage/50">
              <Mic size={11} className="text-gold/60" />
              Голос синтезируется в браузере
            </span>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex flex-col justify-between gap-3 px-1 sm:flex-row sm:items-end">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold/65">03 · Экономика для B2B / B2G</span>
            <h2 className="mt-1.5 font-display text-[29px] font-semibold leading-tight text-parchment sm:text-[34px]">SaaS-калькулятор масштабирования</h2>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-gold/18 bg-gold/[0.04] px-3 py-1.5 text-[8.5px] text-gold-soft/65">
            <Calculator size={11} />
            Модель пересчитывается в реальном времени
          </span>
        </div>

        <div className="glass-panel relative overflow-hidden rounded-[28px]">
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gold/[0.07] blur-3xl" />
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative border-b border-gold/12 p-5 sm:p-6 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-gold/25 bg-gold/[0.06] text-gold">
                  <Calculator size={15} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-parchment/80">Параметры сети</p>
                  <p className="mt-0.5 text-[8px] text-sage/35">Подвиньте ползунки — метрики обновятся</p>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <SliderRow
                  label="Площадки в сети"
                  hint="Парки, музеи-заповедники, отели"
                  value={venues}
                  displayValue={formatVenues(venues)}
                  min={5}
                  max={250}
                  step={1}
                  onChange={setVenues}
                  icon={Landmark}
                />
                <SliderRow
                  label="Средний тариф SaaS"
                  hint="Ежемесячная подписка на площадку"
                  value={tariff}
                  displayValue={formatTariff(tariff)}
                  min={15000}
                  max={80000}
                  step={1000}
                  onChange={setTariff}
                  icon={Coins}
                />
                <SliderRow
                  label="Трафик на площадку"
                  hint="Средний поток гостей в месяц"
                  value={traffic}
                  displayValue={formatTraffic(traffic)}
                  min={1000}
                  max={20000}
                  step={500}
                  onChange={setTraffic}
                  icon={Users}
                />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {REVENUE_STREAMS.map((stream) => {
                  const Icon = stream.icon;
                  return (
                    <div key={stream.title} className="rounded-xl border border-white/[0.055] bg-white/[0.02] p-2.5">
                      <Icon size={12} className="text-gold/60" />
                      <p className="mt-1.5 text-[8.5px] font-semibold leading-tight text-parchment/70">{stream.title}</p>
                      <p className="mt-0.5 text-[7px] leading-snug text-sage/30">{stream.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-jade" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-sage/55">Прогноз выручки</span>
                </div>
                <span className="flex items-center gap-1 rounded-full border border-jade/20 bg-jade/[0.04] px-2 py-1 text-[7.5px] text-jade/60">
                  <span className="pulse-dot h-1 w-1 rounded-full bg-jade" />
                  live
                </span>
              </div>

              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                <div className="metric-card rounded-2xl p-4">
                  <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-sage/45">MRR</p>
                  <p className="mt-2 font-display text-[34px] font-semibold leading-none text-gold-soft">
                    <AnimatedNumber value={mrr} formatter={formatCompactMoney} />
                  </p>
                  <p className="mt-2 text-[8px] text-sage/35">{formatNumber(mrr)} ₽ / месяц</p>
                  <div className="mt-3 flex items-center gap-1.5 text-[7.5px] text-gold/55">
                    <Coins size={9} />
                    {venues} × {formatNumber(tariff)} ₽
                  </div>
                </div>
                <div className="metric-card rounded-2xl p-4">
                  <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-sage/45">ARR</p>
                  <p className="mt-2 font-display text-[34px] font-semibold leading-none text-gold-soft">
                    <AnimatedNumber value={arr} formatter={formatCompactMoney} />
                  </p>
                  <p className="mt-2 text-[8px] text-sage/35">{formatNumber(arr)} ₽ / год</p>
                  <div className="mt-3 flex items-center gap-1.5 text-[7.5px] text-gold/55">
                    <TrendingUp size={9} />
                    MRR × 12 месяцев
                  </div>
                </div>
              </div>

              <div className="mt-2.5 rounded-2xl border border-jade/20 bg-[linear-gradient(130deg,rgba(17,68,57,0.5),rgba(7,28,22,0.6))] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-jade/55">Годовой охват туристов</p>
                    <p className="mt-2 font-display text-[38px] font-semibold leading-none text-[#9df4ea]">
                      <AnimatedNumber value={reach} formatter={formatCompactPeople} />
                    </p>
                    <p className="mt-1.5 text-[8px] text-sage/35">{formatNumber(reach)} контактов в год</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-jade/25 bg-jade/[0.08] text-jade">
                    <Globe2 size={17} />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[7.5px] text-sage/40">
                  <MapPin size={9} className="text-jade/60" />
                  {venues} площадок × {formatNumber(traffic)} гостей/мес × 12
                </div>
              </div>

              <div className="mt-2.5 rounded-xl border border-gold/15 bg-gold/[0.025] p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-gold-soft/65">
                    <Ticket size={10} />
                    Партнёрский потенциал
                  </span>
                  <span className="font-display text-[16px] font-semibold text-gold-soft/85">
                    ~{formatNumber(avgRevenuePerVenue)} ₽/год
                  </span>
                </div>
                <p className="mt-1 text-[7.5px] leading-relaxed text-sage/35">
                  Оценка дополнительной выручки одной площадки от партнёрских купонов: трафик × 5% конверсии × средний чек 350 ₽ × 12. Гипотеза, не гарантия.
                </p>
              </div>

              <p className="mt-3 text-[7.5px] leading-relaxed text-sage/25">
                Расчёт — демонстрационная SaaS-модель без revshare, рекламы и сезонности. Используется для защиты гипотезы, а не как финансовый прогноз.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="glass-panel-soft relative overflow-hidden rounded-[22px] p-5">
          <SlavicCorner className="absolute right-0 top-0 opacity-35" />
          <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.16em] text-gold/65">
            <Building2 size={11} />
            Рынок
          </div>
          <p className="mt-2 font-display text-[23px] font-semibold leading-tight text-parchment">Музеи-заповедники, парки, отели</p>
          <p className="mt-2 text-[10px] leading-relaxed text-sage/50">
            Один продукт закрывает B2B-задачу площадки и B2C-потребность гостя. Подписка масштабируется на региональные сети.
          </p>
        </div>
        <div className="glass-panel-soft relative overflow-hidden rounded-[22px] p-5">
          <SlavicCorner className="absolute right-0 top-0 opacity-35" flip />
          <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.16em] text-jade/65">
            <Sparkles size={11} />
            Дифференциация
          </div>
          <p className="mt-2 font-display text-[23px] font-semibold leading-tight text-parchment">Локальный культурный код</p>
          <p className="mt-2 text-[10px] leading-relaxed text-sage/50">
            Не универсальный городской аудиогид, а история конкретного места, собранная из его архива и голосов.
          </p>
        </div>
        <div className="glass-panel-soft relative overflow-hidden rounded-[22px] p-5">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/[0.08] blur-2xl" />
          <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.16em] text-gold/65">
            <Trophy size={11} />
            Почему сейчас
          </div>
          <p className="mt-2 font-display text-[23px] font-semibold leading-tight text-parchment">ИИ снимает стоимость контента</p>
          <p className="mt-2 text-[10px] leading-relaxed text-sage/50">
            Сценарий, визуал и озвучка создаются в одном конвейере. Музей получает цифровой продукт без собственной студии.
          </p>
        </div>
      </section>

      <div className="mt-9 flex flex-col items-center justify-center gap-2 text-center">
        <OrnamentDivider width={520} className="opacity-70" />
        <p className="mt-2 font-display text-[27px] italic text-parchment/80">«Память места должна звучать».</p>
        <p className="text-[8.5px] uppercase tracking-[0.2em] text-gold/45">Былина.Live · AI Cultural Engine</p>
      </div>
    </div>
  );
}

function FileTextIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 1.5h5l3 3v8H3v-11Z" stroke="currentColor" strokeWidth="1" />
      <path d="M8 1.5v3h3M5 7h4M5 9h4" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  );
}
