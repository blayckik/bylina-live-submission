import { useState } from 'react';
import { X, Gem, Boxes, Check, ScanLine, Sparkles, ArrowLeft } from 'lucide-react';
import ArtifactFigure from '../Artifacts.jsx';
import { SlavicCorner } from '../Ornaments.jsx';

export default function ArtifactReveal({ artifact, point, isNew, onClose, onBackToAr }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 30, active: false });

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 12,
      ry: (px - 0.5) * 14,
      mx: px * 100,
      my: py * 100,
      active: true,
    });
  };

  return (
    <div className="absolute inset-0 z-[82] flex flex-col bg-[#020d0a]/92 backdrop-blur-md">
      <div className="flex shrink-0 items-center justify-between border-b border-gold/15 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-jade/30 bg-jade/[0.08] text-jade">
            <ScanLine size={13} />
          </span>
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-gold/80">AR-артефакт распознан</p>
            <p className="text-[10px] font-semibold text-parchment/90">{artifact.name}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sage/70"
          aria-label="Закрыть карточку артефакта"
        >
          <X size={15} />
        </button>
      </div>

      <div className="scroll-fine min-h-0 flex-1 overflow-y-auto px-3.5 py-4">
        <div
          className="artifact-card relative overflow-hidden rounded-[22px] border border-gold/35 bg-[#082119] p-3 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setTilt({ rx: 0, ry: 0, mx: 50, my: 30, active: false })}
          style={{
            transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.active ? 1.012 : 1})`,
          }}
        >
          <div
            className="holo-sheen pointer-events-none absolute inset-0 z-20 rounded-[22px]"
            style={{ '--mx': `${tilt.mx}%`, '--my': `${tilt.my}%` }}
          />
          <SlavicCorner className="pointer-events-none absolute left-1 top-1 z-10 opacity-45" />
          <div className="relative z-10 overflow-hidden rounded-[16px] border border-gold/15">
            <ArtifactFigure type={artifact.type} className="aspect-square w-full" />
            <div className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full border border-jade/35 bg-[#03120d]/80 px-2 py-1 text-[7.5px] font-bold uppercase tracking-[0.13em] text-jade backdrop-blur">
              <span className="h-1 w-1 rounded-full bg-jade" />
              3D · AR
            </div>
            <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-gold/30 bg-[#03120d]/70 text-gold">
              <Gem size={12} />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071b15]/70 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 px-1.5 pb-1 pt-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[7.5px] font-bold uppercase tracking-[0.18em] text-gold/70">Коллекционный предмет</p>
                <h2 className="mt-1 font-display text-[25px] font-semibold leading-[1.03] text-parchment">{artifact.name}</h2>
              </div>
              <span className="mt-1 shrink-0 rounded-full border border-jade/25 bg-jade/[0.07] px-2 py-1 text-[7px] font-bold uppercase tracking-[0.1em] text-jade/85">
                {isNew ? 'Новый' : 'В сумке'}
              </span>
            </div>
            <p className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.1em] text-sage/50">{artifact.material}</p>

            <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-gold/15 bg-gold/[0.04] px-2.5 py-1.5 font-mono text-[8px] tracking-[0.18em] text-gold-soft/70">
              <Sparkles size={9} />
              {artifact.inscription}
            </div>

            <div className="mt-3 border-t border-gold/10 pt-3">
              <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.15em] text-sage/55">
                <Boxes size={10} className="text-gold/65" />
                Историческая справка
              </div>
              <p className="mt-1.5 text-[10.5px] leading-[1.7] text-sage/80">{artifact.history}</p>
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-lg border border-jade/18 bg-jade/[0.04] px-2.5 py-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-jade/12 text-jade">
                <Check size={11} />
              </span>
              <p className="text-[9px] leading-snug text-jade/75">
                {isNew ? 'Артефакт добавлен в «Сумку краеведа».' : 'Этот артефакт уже хранится в «Сумке краеведа».'}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-[8px] text-sage/35">
          <ScanLine size={9} className="text-jade/50" />
          Наклоните карточку движением курсора — AR-слой живой
        </p>
      </div>

      <div className="shrink-0 space-y-2 border-t border-gold/15 bg-[#051510]/95 px-3.5 py-3">
        <button
          type="button"
          onClick={onClose}
          className="btn-gold flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[10.5px] font-extrabold uppercase tracking-[0.04em]"
        >
          <Check size={14} />
          Оставить в сумке
        </button>
        <button
          type="button"
          onClick={onBackToAr}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-gold/20 bg-white/[0.02] px-3 py-2 text-[9.5px] font-semibold text-sage/70"
        >
          <ArrowLeft size={12} />
          Вернуться к AR-видоискателю
        </button>
      </div>
    </div>
  );
}
