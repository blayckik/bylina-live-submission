import { X, ShoppingBag, Compass, ScanLine, Gem } from 'lucide-react';
import ArtifactFigure from '../Artifacts.jsx';

const TYPE_LABELS = {
  key: 'Ключ',
  seal: 'Печать',
  amulet: 'Оберег',
  rune: 'Руна',
  coin: 'Монета',
  ledger: 'Документ',
  bird: 'Оберег',
  crystal: 'Кристалл',
};

export default function BagSheet({ artifacts, onClose, onOpenAr }) {
  return (
    <div className="absolute inset-0 z-[80] flex flex-col bg-[#020d0a]/94 backdrop-blur-md">
      <div className="flex shrink-0 items-center justify-between border-b border-gold/15 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.07] text-gold">
            <ShoppingBag size={14} />
          </span>
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-gold/75">Коллекция путешественника</p>
            <p className="text-[11px] font-semibold text-parchment">Сумка краеведа · {artifacts.length}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sage/70"
          aria-label="Закрыть сумку"
        >
          <X size={15} />
        </button>
      </div>

      <div className="scroll-fine min-h-0 flex-1 overflow-y-auto p-3.5">
        {artifacts.length ? (
          <>
            <div className="grid grid-cols-2 gap-2.5">
              {artifacts.map((artifact, index) => (
                <article
                  key={artifact.id}
                  className="fade-up overflow-hidden rounded-xl border border-gold/20 bg-[#081f18]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ArtifactFigure type={artifact.type} className="aspect-square w-full" />
                  <div className="border-t border-gold/10 p-2.5">
                    <div className="flex items-start justify-between gap-1">
                      <p className="text-[10px] font-semibold leading-tight text-parchment/90">{artifact.name}</p>
                      <Gem size={9} className="mt-0.5 shrink-0 text-gold/60" />
                    </div>
                    <p className="mt-0.5 text-[7.5px] uppercase tracking-[0.09em] text-sage/40">{TYPE_LABELS[artifact.type] || 'Артефакт'} · AR</p>
                    <details className="group mt-1.5">
                      <summary className="cursor-pointer list-none text-[8px] font-semibold text-jade/65 group-open:text-gold/70">
                        Историческая справка
                      </summary>
                      <p className="mt-1 text-[8px] leading-relaxed text-sage/55">{artifact.history}</p>
                    </details>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-jade/15 bg-jade/[0.04] p-3">
              <div className="flex items-center gap-1.5 text-[9px] font-semibold text-jade/80">
                <ScanLine size={11} />
                Все артефакты имеют AR-копию
              </div>
              <p className="mt-1 text-[8.5px] leading-relaxed text-sage/50">
                Наведите камеру на объект у точки маршрута — карточка раскроется в 3D и дополнится исторической справкой.
              </p>
              <button
                type="button"
                onClick={onOpenAr}
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-jade/25 bg-jade/[0.06] px-2.5 py-1.5 text-[8.5px] font-semibold text-jade/80"
              >
                <ScanLine size={10} />
                Открыть AR-сканер
              </button>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-8 text-center">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-dashed border-gold/20" />
              <div className="absolute inset-3 rounded-full border border-gold/10" />
              <Compass size={36} className="text-gold/45" strokeWidth={1.2} />
            </div>
            <p className="mt-4 font-display text-[24px] font-semibold text-parchment/85">Сумка пока пуста</p>
            <p className="mt-2 text-[10px] leading-relaxed text-sage/50">
              Пройдите сцену и наведите камеру на AR-объект, чтобы забрать его историю с собой.
            </p>
            <button
              type="button"
              onClick={onOpenAr}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-jade/25 bg-jade/[0.06] px-4 py-2 text-[10px] font-semibold text-jade/85"
            >
              <ScanLine size={13} />
              Навести камеру (AR)
            </button>
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-gold/15 bg-[#051510]/95 px-3.5 py-3">
        <button
          type="button"
          onClick={onClose}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold/25 bg-white/[0.025] px-4 py-2.5 text-[10px] font-semibold text-parchment/80"
        >
          Вернуться к маршруту
        </button>
      </div>
    </div>
  );
}
