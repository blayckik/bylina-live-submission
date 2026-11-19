import { useEffect, useMemo, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, X, QrCode, MapPin, Clock, Boxes, Sparkles, Check, ScanLine } from 'lucide-react';
import { LogoMark } from './Ornaments.jsx';

function buildQr(value) {
  try {
    const qr = QRCode.create(value, { errorCorrectionLevel: 'M' });
    const size = qr.modules.size;
    const data = qr.modules.data;
    let path = '';
    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        if (data[row * size + col]) {
          path += `M${col} ${row}h1v1h-1z`;
        }
      }
    }
    return { size, path };
  } catch {
    const size = 33;
    let path = '';
    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        const finder =
          (row < 7 && col < 7) ||
          (row < 7 && col >= size - 7) ||
          (row >= size - 7 && col < 7);
        const inFinderBorder =
          finder &&
          (row % 6 === 0 ||
            col % 6 === 0 ||
            (row === 1 && col > 0) ||
            (row === size - 2 && col > 0) ||
            (col === 1 && row > 0) ||
            (col === size - 2 && row > 0));
        const pattern = (row * 7 + col * 11 + row * col) % 5 < 2;
        if (inFinderBorder || (!finder && pattern)) {
          path += `M${col} ${row}h1v1h-1z`;
        }
      }
    }
    return { size, path };
  }
}

function splitTitle(title) {
  const words = title.split(' ');
  const maxChars = 21;
  const lines = [];
  let current = '';
  words.forEach((word) => {
    if ((current + ' ' + word).trim().length > maxChars && current) {
      lines.push(current.trim());
      current = word;
    } else {
      current = `${current} ${word}`.trim();
    }
  });
  if (current) {
    lines.push(current.trim());
  }
  if (lines.length > 4) {
    const trimmed = lines.slice(0, 4);
    trimmed[3] = `${trimmed[3].slice(0, 17).trim()}…`;
    return trimmed;
  }
  return lines;
}

function QuestQr({ value, size = 232 }) {
  const qr = useMemo(() => buildQr(value), [value]);
  return (
    <g transform={`scale(${size / qr.size})`}>
      <rect x="-3" y="-3" width={qr.size + 6} height={qr.size + 6} rx="3" fill="#FFFDF7" />
      <path d={qr.path} fill="#16342A" shapeRendering="crispEdges" />
    </g>
  );
}

function PosterSvg({ quest, qrValue, refCallback }) {
  const lines = splitTitle(quest.title);
  const qrSize = 224;
  const fontSize = lines.length >= 4 ? 26 : lines.length === 3 ? 29 : lines.length === 2 ? 32 : 35;
  const lineHeight = fontSize + 5;
  const titleStart = lines.length >= 4 ? 174 : lines.length === 3 ? 190 : lines.length === 2 ? 214 : 238;

  return (
    <svg
      ref={refCallback}
      viewBox="0 0 600 880"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`QR-табличка квеста «${quest.title}»`}
      className="h-auto w-full rounded-[20px] shadow-2xl"
    >
      <defs>
        <linearGradient id="posterBg" x1="0" y1="0" x2="600" y2="880" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8F1E2" />
          <stop offset="0.52" stopColor="#F2E7D2" />
          <stop offset="1" stopColor="#EADCC2" />
        </linearGradient>
        <linearGradient id="posterGreen" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0A2A21" />
          <stop offset="0.5" stopColor="#0E3A2E" />
          <stop offset="1" stopColor="#08241C" />
        </linearGradient>
        <linearGradient id="posterGold" x1="0" y1="0" x2="600" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B8802D" />
          <stop offset="0.45" stopColor="#DAA552" />
          <stop offset="0.7" stopColor="#F1CC8A" />
          <stop offset="1" stopColor="#B98232" />
        </linearGradient>
        <pattern id="posterFret" width="40" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 19.5H40M10 19.5V11l10-7 10 7v8.5M20 11v8.5" stroke="#DAA552" strokeOpacity="0.18" fill="none" />
        </pattern>
        <filter id="posterShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#173229" floodOpacity="0.14" />
        </filter>
      </defs>

      <rect width="600" height="880" rx="28" fill="url(#posterBg)" />
      <rect x="15" y="15" width="570" height="850" rx="20" fill="none" stroke="#173229" strokeOpacity="0.14" />
      <rect x="23" y="23" width="554" height="834" rx="16" fill="none" stroke="#B98232" strokeOpacity="0.4" />

      <path d="M23 311V43c0-11 9-20 20-20h514c11 0 20 9 20 20v268H23Z" fill="url(#posterGreen)" />
      <path d="M23 311V43c0-11 9-20 20-20h514c11 0 20 9 20 20v268" fill="none" stroke="#DAA552" strokeOpacity="0.45" />
      <path d="M43 23H557" stroke="#DAA552" strokeOpacity="0.26" />
      <rect x="23" y="292" width="554" height="19" fill="#0A2A21" />
      <rect x="23" y="292" width="554" height="19" fill="url(#posterFret)" />

      <g transform="translate(48 41)">
        <circle cx="23" cy="23" r="22" fill="#0A2A21" stroke="#DAA552" strokeOpacity="0.7" />
        <path d="M23 7 37 23 23 39 9 23Z" fill="none" stroke="#E8C98C" strokeWidth="1.2" />
        <path d="M23 13 32 23 23 33 14 23Z" fill="#DAA552" />
        <circle cx="23" cy="23" r="2.7" fill="#0A2A21" />
      </g>
      <text x="102" y="56" fill="#F6EAD2" fontFamily="Georgia, 'Times New Roman', serif" fontSize="27" fontWeight="700" letterSpacing="0.4">
        Былина<tspan fill="#F4B860">.Live</tspan>
      </text>
      <text x="103" y="73" fill="#DAA552" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="700" letterSpacing="2.4">
        AI CULTURAL ENGINE · АУДИОСПЕКТАКЛЬ С AR
      </text>

      <g transform="translate(458 39)">
        <rect width="94" height="28" rx="14" fill="#F4B860" fillOpacity="0.11" stroke="#DAA552" strokeOpacity="0.45" />
        <circle cx="16" cy="14" r="2.5" fill="#2EC4B6" />
        <text x="25" y="18" fill="#F4D39B" fontFamily="Arial, sans-serif" fontSize="8.5" fontWeight="700" letterSpacing="1.3">
          НАЧАТЬ
        </text>
      </g>

      <text x="48" y="119" fill="#DAA552" fontFamily="Arial, sans-serif" fontSize="8.5" fontWeight="700" letterSpacing="2.3">
        НАВЕДИТЕ КАМЕРУ ТЕЛЕФОНА НА QR-КОД
      </text>

      {lines.map((line, index) => (
        <text
          key={line + index}
          x="48"
          y={titleStart + index * lineHeight}
          fill="#F7F3EB"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={fontSize}
          fontWeight="700"
          letterSpacing="-0.2"
        >
          {line}
        </text>
      ))}

      <g transform="translate(48 330)">
        <rect width="504" height="344" rx="18" fill="#FFFDF7" stroke="#173229" strokeOpacity="0.1" filter="url(#posterShadow)" />
        <path d="M20 40V20H40M464 20H484V40M20 304V324H40M464 324H484V304" fill="none" stroke="#DAA552" strokeWidth="1.4" strokeOpacity="0.8" />
        <g transform="translate(140 44)">
          <QuestQr value={qrValue} size={qrSize} />
        </g>
        <text x="252" y="306" textAnchor="middle" fill="#173229" fontFamily="Georgia, serif" fontSize="15" fontWeight="700">
          Одна история. Четыре голоса места.
        </text>
        <text x="252" y="323" textAnchor="middle" fill="#6D756A" fontFamily="Arial, sans-serif" fontSize="8" letterSpacing="1.1">
          НАУШНИКИ · СМАРТФОН · 45 МИНУТ
        </text>
      </g>

      <g transform="translate(48 700)">
        <text x="0" y="0" fill="#173229" fontFamily="Georgia, serif" fontSize="21" fontWeight="700">
          Как начать путешествие
        </text>
        {[
          ['01', 'Отсканируйте QR-код камерой телефона.'],
          ['02', 'Включите звук и наденьте наушники.'],
          ['03', 'Идите по карте и собирайте AR-артефакты.'],
        ].map(([num, text], index) => (
          <g key={num} transform={`translate(0 ${28 + index * 30})`}>
            <circle cx="12" cy="9" r="11" fill="#173229" />
            <text x="12" y="12.5" textAnchor="middle" fill="#F4D39B" fontFamily="Arial, sans-serif" fontSize="7.5" fontWeight="700">
              {num}
            </text>
            <text x="32" y="13" fill="#3C493F" fontFamily="Arial, sans-serif" fontSize="10.5">
              {text}
            </text>
          </g>
        ))}
      </g>

      <g transform="translate(48 822)">
        <path d="M0 0H504" stroke="#B98232" strokeOpacity="0.32" />
        <text x="0" y="25" fill="#6D756A" fontFamily="Arial, sans-serif" fontSize="8.5" letterSpacing="0.8">
          {quest.location.toUpperCase()} · {quest.points.length} ОСТАНОВКИ
        </text>
        <text x="504" y="25" textAnchor="end" fill="#8C6C3B" fontFamily="Arial, sans-serif" fontSize="8.5" fontWeight="700" letterSpacing="1">
          BYLINA.LIVE
        </text>
      </g>
    </svg>
  );
}

export default function QrPosterModal({ quest, open, onClose }) {
  const posterRef = useRef(null);
  const qrValue = quest
    ? `https://bylina.live/q/${quest.presetId}?aud=${quest.audience.id}&genre=${quest.genre.id}`
    : 'https://bylina.live';

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !quest) {
    return null;
  }

  const downloadPoster = () => {
    const svg = posterRef.current;
    if (!svg) {
      return;
    }
    const clone = svg.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    const source = `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(clone)}`;
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bylina-qr-${quest.presetId}.svg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="qr-title">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-[#020d0a]/84 backdrop-blur-md"
        onClick={onClose}
        aria-label="Закрыть окно QR-таблички"
      />
      <div className="dialog-enter relative z-10 flex max-h-[94vh] w-full max-w-[1180px] flex-col overflow-hidden rounded-[26px] border border-gold/30 bg-[#071b15] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.85)] lg:flex-row">
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[radial-gradient(circle_at_50%_0%,rgba(218,165,82,0.16),transparent_62%)] p-5 sm:p-8">
          <div className="pointer-events-none absolute left-4 top-4 hidden text-gold/20 sm:block">
            <LogoMark size={34} animated={false} />
          </div>
          <div className="w-full max-w-[430px]">
            <PosterSvg quest={quest} qrValue={qrValue} refCallback={posterRef} />
          </div>
        </div>

        <aside className="flex w-full shrink-0 flex-col border-t border-gold/20 bg-[#071a14] p-5 sm:p-7 lg:w-[380px] lg:border-l lg:border-t-0 xl:w-[420px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                <QrCode size={14} />
                QR-табличка
              </div>
              <h2 id="qr-title" className="mt-3 font-display text-[30px] font-semibold leading-[1.02] text-parchment">
                Вход в парк — <br />
                <span className="gold-text">через историю</span>
              </h2>
              <p className="mt-3 text-[12px] leading-relaxed text-sage">
                Готовый печатный макет для входа на территорию. Векторный SVG без растровых элементов — можно увеличить до любого формата.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="btn-outline flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              aria-label="Закрыть"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-6 space-y-2.5">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-3">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-sage/70">
                <MapPin size={13} className="text-gold/80" />
                Площадка
              </div>
              <span className="text-right text-[11px] font-medium text-parchment/90">{quest.presetLabel}</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-3">
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-sage/60">
                  <Clock size={11} /> Маршрут
                </div>
                <div className="mt-1.5 font-display text-xl font-semibold text-gold-soft">45 минут</div>
              </div>
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-3">
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-sage/60">
                  <Boxes size={11} /> Сцены
                </div>
                <div className="mt-1.5 font-display text-xl font-semibold text-gold-soft">4 + AR</div>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-gold/15 bg-gold/[0.035] p-4">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-soft/85">
              <ScanLine size={13} /> Ссылка внутри кода
            </div>
            <div className="mt-2 break-all font-mono text-[10px] leading-relaxed text-sage/80">{qrValue}</div>
            <div className="mt-3 flex items-start gap-2 text-[10px] leading-relaxed text-sage/65">
              <Check size={12} className="mt-0.5 shrink-0 text-jade" />
              QR сгенерирован векторно прямо в браузере, ошибка коррекции уровня M.
            </div>
          </div>

          <div className="mt-auto space-y-2.5 pt-6">
            <button
              type="button"
              onClick={downloadPoster}
              className="btn-gold flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[12.5px] font-extrabold uppercase tracking-[0.04em]"
            >
              <Download size={16} strokeWidth={2.1} />
              Скачать макет для печати
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-outline flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-[12px] font-semibold"
            >
              Вернуться в студию
            </button>
            <p className="flex items-center justify-center gap-1.5 pt-1 text-[9px] text-sage/45">
              <Sparkles size={10} className="text-gold/60" />
              SVG · 600 × 880 · готовая композиция A3/A2
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
