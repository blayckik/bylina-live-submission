import { useMemo } from 'react';
import { X, RotateCcw, ArrowLeft, Ticket, Sparkles, CalendarDays, MapPin, Check } from 'lucide-react';
import ArtifactFigure from '../Artifacts.jsx';
import { PARTNER_COUPON } from '../../data/presets.js';
import { OrnamentDivider } from '../Ornaments.jsx';

function CertificateCrest() {
  return (
    <svg viewBox="0 0 120 120" className="h-[92px] w-[92px]" aria-hidden="true">
      <defs>
        <linearGradient id="certGold" x1="30" y1="20" x2="92" y2="105" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4D69B" />
          <stop offset="0.45" stopColor="#C58F3D" />
          <stop offset="1" stopColor="#8D5D23" />
        </linearGradient>
        <radialGradient id="certGlow" cx="0" cy="0" r="1" gradientTransform="translate(60 55) rotate(90) scale(48)">
          <stop stopColor="#2EC4B6" stopOpacity="0.3" />
          <stop offset="1" stopColor="#2EC4B6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="58" r="48" fill="url(#certGlow)" />
      <circle cx="60" cy="54" r="36" fill="none" stroke="url(#certGold)" strokeWidth="1.2" />
      <circle cx="60" cy="54" r="31" fill="none" stroke="#B98232" strokeOpacity="0.4" strokeDasharray="1 4" />
      <path d="M60 22 83 54 60 86 37 54 60 22Z" fill="#173229" fillOpacity="0.08" stroke="url(#certGold)" strokeWidth="1.4" />
      <path d="M60 32 74 54 60 76 46 54 60 32Z" fill="url(#certGold)" fillOpacity="0.24" stroke="#A9742A" strokeOpacity="0.7" />
      <path d="M60 40 67 54 60 68 53 54 60 40Z" fill="url(#certGold)" />
      <circle cx="60" cy="54" r="4" fill="#F5E6C6" stroke="#A9742A" />
      <path d="M35 93h50M40 88h40" stroke="#B98232" strokeOpacity="0.55" />
      <path d="M44 98 52 112 60 104 68 112 76 98" fill="#173229" fillOpacity="0.85" stroke="#B98232" strokeOpacity="0.4" />
      <circle cx="60" cy="13" r="2" fill="#C58F3D" />
      <path d="M27 54h-9M102 54h9M60 93v8" stroke="#B98232" strokeOpacity="0.4" />
    </svg>
  );
}

export default function Certificate({ quest, playerState, onClose, onReset }) {
  const artifacts = useMemo(() => {
    const collected = playerState.artifacts || [];
    return quest.points.map((point) => {
      const found = collected.find((item) => item.id === point.artifact.id);
      return { ...point.artifact, ...(found || {}), pointTitle: point.displayTitle };
    });
  }, [quest, playerState.artifacts]);

  const completed = playerState.completed?.length || 0;
  const points = 150 + completed * 100;
  const date = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

  return (
    <div className="absolute inset-0 z-[84] flex flex-col bg-[#020d0a]/94 backdrop-blur-md">
      <div className="flex shrink-0 items-center justify-between border-b border-gold/15 px-4 py-3">
        <div>
          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-gold/80">Маршрут завершён · 4 / 4</p>
          <p className="mt-0.5 text-[10px] font-semibold text-parchment/90">Грамота Первооткрывателя</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sage/70"
          aria-label="Закрыть грамоту"
        >
          <X size={15} />
        </button>
      </div>

      <div className="scroll-fine min-h-0 flex-1 overflow-y-auto p-3">
        <article className="certificate-frame relative overflow-hidden rounded-[18px] border border-[#B98232]/60 px-4 pb-4 pt-5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)]">
          <div className="pointer-events-none absolute inset-[7px] rounded-[13px] border border-[#A9742A]/35" />
          <div className="pointer-events-none absolute inset-[11px] rounded-[10px] border border-[#A9742A]/16" />
          <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-[#2EC4B6]/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-44 w-44 rounded-full bg-[#C58F3D]/15 blur-2xl" />

          <div className="relative flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-[#A9742A]/50" />
              <span className="text-[7px] font-extrabold uppercase tracking-[0.24em] text-[#8C6429]">Былина.Live</span>
              <span className="h-px w-8 bg-[#A9742A]/50" />
            </div>
            <CertificateCrest />
            <p className="mt-1 text-[7.5px] font-bold uppercase tracking-[0.26em] text-[#8C6429]">AI Cultural Engine · 2026</p>
            <h2 className="mt-2 font-display text-[30px] font-bold leading-[0.94] text-[#173229]">
              Грамота <br />
              <span className="italic">Первооткрывателя</span>
            </h2>
            <div className="my-2.5 flex w-full items-center justify-center">
              <OrnamentDivider width={280} className="opacity-70" />
            </div>
            <p className="text-[8px] uppercase tracking-[0.18em] text-[#6D756A]">вручается</p>
            <p className="mt-1 font-display text-[20px] font-semibold text-[#173229]">Хранителю истории</p>
            <p className="mt-1 text-[8.5px] leading-relaxed text-[#6D756A]">за полное прохождение интерактивного аудиоспектакля</p>
            <p className="mt-2 max-w-[260px] font-display text-[17px] font-semibold leading-tight text-[#173229]">«{quest.title}»</p>
            <div className="mt-1.5 flex items-center justify-center gap-1 text-[8px] text-[#6D756A]">
              <MapPin size={9} className="text-[#A9742A]" />
              {quest.location}
            </div>

            <div className="mt-3.5 grid w-full grid-cols-3 gap-1.5">
              <div className="rounded-lg border border-[#A9742A]/25 bg-white/35 px-2 py-2">
                <div className="font-display text-[24px] font-bold leading-none text-[#173229]">{points}</div>
                <div className="mt-1 text-[6.5px] font-bold uppercase tracking-[0.1em] text-[#7B735F]">очков краеведа</div>
              </div>
              <div className="rounded-lg border border-[#A9742A]/25 bg-white/35 px-2 py-2">
                <div className="font-display text-[24px] font-bold leading-none text-[#173229]">4 / 4</div>
                <div className="mt-1 text-[6.5px] font-bold uppercase tracking-[0.1em] text-[#7B735F]">точки маршрута</div>
              </div>
              <div className="rounded-lg border border-[#A9742A]/25 bg-white/35 px-2 py-2">
                <div className="font-display text-[24px] font-bold leading-none text-[#173229]">4</div>
                <div className="mt-1 text-[6.5px] font-bold uppercase tracking-[0.1em] text-[#7B735F]">AR-артефакта</div>
              </div>
            </div>

            <div className="mt-3 w-full">
              <div className="flex items-center gap-1.5 text-[7px] font-bold uppercase tracking-[0.17em] text-[#7B5A29]">
                <Sparkles size={9} />
                Собрано в дополненной реальности
              </div>
              <div className="mt-1.5 grid grid-cols-4 gap-1">
                {artifacts.map((artifact) => (
                  <div key={artifact.id} className="relative overflow-hidden rounded-md border border-[#A9742A]/25 bg-[#0B251E] p-0.5">
                    <ArtifactFigure type={artifact.type} className="aspect-square w-full" />
                    <span className="absolute right-0.5 top-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#2EC4B6] text-[#082119]">
                      <Check size={6.5} strokeWidth={3} />
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[6.5px] leading-snug text-[#5F665B]">
                {artifacts.map((artifact) => (
                  <div key={`${artifact.id}-name`} className="truncate">· {artifact.name}</div>
                ))}
              </div>
            </div>

            <div className="coupon relative mt-3.5 w-full overflow-hidden rounded-xl border border-[#9C6B2A]/45 bg-gradient-to-br from-[#F4E3BE] to-[#E7C98F] px-3 py-2.5 text-left">
              <div className="pointer-events-none absolute -right-7 -top-7 h-20 w-20 rounded-full border border-[#9C6B2A]/20" />
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1 text-[6.5px] font-extrabold uppercase tracking-[0.17em] text-[#7B5A29]">
                    <Ticket size={8} />
                    Партнёрский бонус
                  </div>
                  <div className="mt-0.5 font-display text-[16px] font-bold leading-tight text-[#173229]">{PARTNER_COUPON.title}</div>
                  <div className="text-[7px] text-[#6B654F]">{PARTNER_COUPON.place}</div>
                </div>
                <div className="shrink-0 rounded-md border border-dashed border-[#7B5A29]/60 bg-[#FBF2DE]/70 px-2 py-1 text-center">
                  <div className="text-[6px] font-bold uppercase tracking-[0.12em] text-[#7B5A29]">код</div>
                  <div className="font-mono text-[11px] font-extrabold tracking-[0.06em] text-[#173229]">{PARTNER_COUPON.code}</div>
                </div>
              </div>
            </div>

            <p className="mt-2 px-2 text-[6.5px] leading-relaxed text-[#7B735F]">{PARTNER_COUPON.terms}</p>

            <div className="mt-3 flex w-full items-center justify-between border-t border-[#A9742A]/25 pt-2">
              <div className="flex items-center gap-1 text-[6.5px] uppercase tracking-[0.1em] text-[#7B735F]">
                <CalendarDays size={8} />
                {date}
              </div>
              <div className="text-right">
                <div className="font-display text-[12px] italic text-[#173229]">Хранитель места</div>
                <div className="mt-0.5 h-px w-16 bg-[#A9742A]/50" />
              </div>
            </div>
          </div>
        </article>

        <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[7.5px] text-sage/35">
          <Sparkles size={9} className="text-gold/50" />
          Грамота сохраняется в этой демо-сессии
        </div>
      </div>

      <div className="shrink-0 space-y-2 border-t border-gold/15 bg-[#051510]/95 px-3.5 py-3">
        <button
          type="button"
          onClick={onClose}
          className="btn-gold flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[10.5px] font-extrabold uppercase tracking-[0.04em]"
        >
          <ArrowLeft size={14} />
          Вернуться к маршруту
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-gold/20 bg-white/[0.02] px-3 py-2 text-[9.5px] font-semibold text-sage/65"
        >
          <RotateCcw size={12} />
          Пройти маршрут заново
        </button>
      </div>
    </div>
  );
}
