import { Building2, Smartphone, Trophy, Sparkles, ShieldCheck } from 'lucide-react';
import { LogoMark, AiBadge } from './Ornaments.jsx';

const TABS = [
  {
    id: 'studio',
    label: 'B2B-Студия',
    longLabel: 'B2B-Студия',
    sublabel: 'Для парков и музеев',
    icon: Building2,
  },
  {
    id: 'player',
    label: 'Плеер туриста',
    longLabel: 'Плеер туриста',
    sublabel: 'Мобайл-демо',
    icon: Smartphone,
  },
  {
    id: 'jury',
    label: 'Для жюри',
    longLabel: 'Для жюри',
    sublabel: 'О проекте и экономика',
    icon: Trophy,
  },
];

export default function Header({ activeTab, onChange }) {
  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-gold/10 bg-[#04120f]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => onChange('studio')}
            className="group flex min-w-0 items-center gap-3 text-left"
            aria-label="Былина.Live — на главную"
          >
            <span className="relative flex shrink-0 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-jade/10 blur-xl transition-opacity group-hover:opacity-100" />
              <LogoMark size={44} />
            </span>
            <span className="min-w-0">
              <span className="flex items-baseline gap-0.5 font-display text-[26px] font-semibold leading-none tracking-[-0.02em] text-parchment sm:text-[30px]">
                Былина<span className="text-gold">.Live</span>
              </span>
              <span className="mt-1.5 flex items-center gap-2">
                <AiBadge />
              </span>
            </span>
          </button>

          <nav
            className="tab-shell hidden items-stretch gap-1 rounded-2xl p-1.5 lg:flex"
            aria-label="Разделы прототипа"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  data-active={active}
                  onClick={() => onChange(tab.id)}
                  aria-current={active ? 'page' : undefined}
                  className="tab-button flex min-w-[172px] items-center gap-2.5 rounded-xl px-3.5 py-2 text-left"
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      active ? 'border-gold/35 bg-gold/10 text-amber' : 'border-white/10 bg-white/[0.025] text-sage/75'
                    }`}
                  >
                    <Icon size={15} strokeWidth={1.7} />
                  </span>
                  <span>
                    <span className="block text-[12px] font-semibold leading-tight">{tab.longLabel}</span>
                    <span className="mt-0.5 block text-[9.5px] font-medium leading-tight text-sage/60">{tab.sublabel}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-jade/20 bg-jade/[0.05] px-3 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.15em] text-jade/85">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-jade" />
              MVP · Live
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/15 bg-white/[0.025] px-3 py-1.5 text-[9.5px] font-medium uppercase tracking-[0.12em] text-sage/70">
              <ShieldCheck size={11} />
              Zero external assets
            </span>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <span className="flex items-center gap-1 rounded-full border border-jade/20 bg-jade/[0.05] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-jade/85">
              <Sparkles size={9} />
              AI
            </span>
            <span className="rounded-full border border-gold/20 bg-gold/[0.05] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-gold-soft/80">
              MVP
            </span>
          </div>
        </div>

        <div className="border-t border-gold/[0.08] px-3 pb-3 lg:hidden">
          <nav className="tab-shell flex items-stretch gap-1 overflow-x-auto rounded-xl p-1" aria-label="Разделы прототипа">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  data-active={active}
                  onClick={() => onChange(tab.id)}
                  aria-current={active ? 'page' : undefined}
                  className="tab-button flex min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2 text-[10px] font-semibold sm:text-[11px]"
                >
                  <Icon size={13} strokeWidth={1.7} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="gold-rule opacity-60" />
    </header>
  );
}
