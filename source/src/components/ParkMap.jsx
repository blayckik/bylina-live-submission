import { memo } from 'react';
import { Map, Navigation, Lock, Check } from 'lucide-react';

const MAP_LABELS = {
  forge: 'Кузница',
  grotto: 'Грот',
  merchant: 'Конторка',
  stone: 'Галерея',
  mill: 'Мельница',
  chapel: 'Часовня',
  shop: 'Лавка',
  grove: 'Роща',
  adit: 'Штольня',
  lake: 'Озеро',
  office: 'Контора',
  canyon: 'Каньон',
};

const TREES = [
  [30, 54, 0.8],
  [52, 42, 0.55],
  [318, 78, 0.7],
  [333, 60, 0.5],
  [190, 48, 0.5],
  [205, 60, 0.38],
  [35, 145, 0.55],
  [322, 166, 0.65],
  [300, 192, 0.44],
  [178, 204, 0.45],
  [59, 96, 0.36],
  [250, 45, 0.38],
];

function Tree({ x, y, scale = 1, opacity = 0.65 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <path d="M0 0 -9 17H9Z" fill="#173F32" stroke="#2E6756" strokeOpacity="0.34" strokeWidth="0.7" />
      <path d="M0 9 -11 27H11Z" fill="#14382C" stroke="#2E6756" strokeOpacity="0.28" strokeWidth="0.7" />
      <path d="M0 20v8" stroke="#6D5B39" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

function ParkMap({ points, completed, activeIndex, viewIndex, onSelect }) {
  const trailPath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  return (
    <section className="overflow-hidden rounded-[20px] border border-gold/20 bg-[#071d17]">
      <div className="flex items-center justify-between px-3.5 py-2.5">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-parchment/80">
          <Map size={12} className="text-gold" />
          Карта легенды
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-jade/20 bg-jade/[0.05] px-2 py-0.5 text-[8.5px] font-medium text-jade/80">
          <Navigation size={9} />
          GPS · 1,8 км
        </div>
      </div>

      <svg
        viewBox="0 0 360 232"
        className="block h-auto w-full select-none"
        role="group"
        aria-label="Интерактивная карта маршрута. Доступные точки отмечены на карте."
      >
        <defs>
          <linearGradient id="mapBg" x1="0" y1="0" x2="360" y2="232" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0B2B22" />
            <stop offset="0.55" stopColor="#08251D" />
            <stop offset="1" stopColor="#061A14" />
          </linearGradient>
          <linearGradient id="mapWater" x1="20" y1="0" x2="335" y2="210" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1D7468" />
            <stop offset="0.55" stopColor="#165A50" />
            <stop offset="1" stopColor="#134C44" />
          </linearGradient>
          <radialGradient id="mapGlow" cx="0" cy="0" r="1" gradientTransform="translate(140 104) rotate(90) scale(95)">
            <stop stopColor="#2EC4B6" stopOpacity="0.13" />
            <stop offset="1" stopColor="#2EC4B6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mapGlow2" cx="0" cy="0" r="1" gradientTransform="translate(292 54) rotate(90) scale(68)">
            <stop stopColor="#DAA552" stopOpacity="0.12" />
            <stop offset="1" stopColor="#DAA552" stopOpacity="0" />
          </radialGradient>
          <pattern id="mapGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="#DAA552" strokeOpacity="0.045" strokeWidth="0.6" />
          </pattern>
          <filter id="mapPointShadow" x="-80%" y="-80%" width="260%" height="260%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.45" />
          </filter>
          <filter id="mapGlowFilter" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="mapClip">
            <rect width="360" height="232" />
          </clipPath>
        </defs>

        <rect width="360" height="232" fill="url(#mapBg)" />
        <rect width="360" height="232" fill="url(#mapGrid)" />
        <ellipse cx="140" cy="104" rx="120" ry="100" fill="url(#mapGlow)" />
        <ellipse cx="292" cy="54" rx="76" ry="68" fill="url(#mapGlow2)" />

        <g clipPath="url(#mapClip)" opacity="0.7">
          <path d="M-18 42C24 20 49 45 60 70c10 23 33 24 52 12 23-15 45-7 57 8 13 17 33 13 53 0 22-15 44-8 56 9 12 16 37 15 62 8 22-7 43-2 61 12" fill="none" stroke="#9DB5AC" strokeOpacity="0.14" strokeWidth="0.8" />
          <path d="M-12 63C28 41 54 63 66 85c12 22 32 22 52 11 21-11 39-4 50 10 12 15 33 12 51 2 24-13 41-8 54 8 15 18 42 18 68 10 22-7 39-2 57 10" fill="none" stroke="#9DB5AC" strokeOpacity="0.1" strokeWidth="0.7" />
          <path d="M-8 86c31-18 59-3 72 18 11 17 29 15 44 4 20-15 40-7 52 8 13 17 31 14 49 4 25-14 44-8 59 10 12 15 34 17 57 16 21-1 38 3 53 13" fill="none" stroke="#9DB5AC" strokeOpacity="0.08" strokeWidth="0.7" />
          <path d="M4 113c22-6 43 2 53 17 9 13 26 12 41 2 18-12 35-8 48 4 15 14 35 12 53 3 25-12 43-6 59 8 14 12 36 14 60 16 18 2 31 8 44 17" fill="none" stroke="#9DB5AC" strokeOpacity="0.07" strokeWidth="0.7" />
          <path d="M-22 156c29-2 49 7 59 23 9 15 27 14 43 5 19-11 38-5 53 7 16 13 39 10 58 0 24-13 43-6 61 6 18 13 43 15 68 18 19 2 35 7 50 16" fill="none" stroke="#9DB5AC" strokeOpacity="0.06" strokeWidth="0.7" />
          <path d="M-10 180c25 0 45 7 59 18 14 12 33 12 51 6 24-8 42-2 59 8 20 11 42 10 64 5 25-6 46-2 65 8 15 8 31 11 49 12" fill="none" stroke="#9DB5AC" strokeOpacity="0.055" strokeWidth="0.7" />
          <path d="M-16 200c34-2 57 6 75 12 17 5 34 2 53-2 21-5 44 0 62 8 22 9 48 8 73 3 21-4 39-2 58 5 17 6 33 8 51 7" fill="none" stroke="#9DB5AC" strokeOpacity="0.045" strokeWidth="0.7" />
          <path d="M-14 133c35-11 63-2 80 16 14 15 32 10 50 4 20-7 35-3 51 7 18 11 37 8 55 2 24-8 46-4 64 6 17 10 36 12 59 12" fill="none" stroke="#9DB5AC" strokeOpacity="0.05" strokeWidth="0.6" />
        </g>

        <path
          d="M-10 15C48 28 87 19 121 36c23 12 25 35 14 51-12 18 4 34 25 35 23 1 27 22 18 38-8 14 4 24 22 29 30 8 52 20 74 24 27 5 54-7 80 2"
          fill="none"
          stroke="#0F3F35"
          strokeWidth="21"
          strokeLinecap="round"
        />
        <path
          d="M-10 15C48 28 87 19 121 36c23 12 25 35 14 51-12 18 4 34 25 35 23 1 27 22 18 38-8 14 4 24 22 29 30 8 52 20 74 24 27 5 54-7 80 2"
          fill="none"
          stroke="url(#mapWater)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M-10 15C48 28 87 19 121 36c23 12 25 35 14 51-12 18 4 34 25 35 23 1 27 22 18 38-8 14 4 24 22 29 30 8 52 20 74 24 27 5 54-7 80 2"
          fill="none"
          stroke="#78CFC1"
          strokeWidth="1"
          strokeOpacity="0.32"
          strokeLinecap="round"
        />
        <path
          d="M66 208c8-12 24-17 38-12 13 4 17 17 11 25-7 9-22 9-32 3-8-5-13-10-11-18"
          fill="#0C3B32"
          stroke="#2E8D7B"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <path d="M74 209c7-8 18-10 25-6 7 4 6 12-2 15-9 4-18 3-23-2-3-3-3-4 0-7Z" fill="#1B6C5D" fillOpacity="0.5" />

        {TREES.map(([x, y, scale], index) => (
          <Tree key={index} x={x} y={y} scale={scale} opacity={index % 3 === 0 ? 0.75 : 0.48} />
        ))}

        <path
          d={trailPath}
          fill="none"
          stroke="#06140F"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
        <path
          d={trailPath}
          fill="none"
          stroke="#DAA552"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.7"
          className="map-dash"
        />

        <g opacity="0.65">
          <circle cx="323" cy="199" r="15" fill="#071A14" stroke="#DAA552" strokeOpacity="0.28" />
          <path d="M323 189 328 204 323 201 318 204Z" fill="#E8C98C" />
          <path d="M323 193v8" stroke="#0A2019" strokeWidth="1" />
          <text x="323" y="188" textAnchor="middle" fill="#DAA552" fontSize="5.5" fontFamily="Arial, sans-serif" fontWeight="700">
            С
          </text>
        </g>

        <g opacity="0.6">
          <path d="M23 209h31" stroke="#DAA552" strokeOpacity="0.45" />
          <path d="M23 206v6M54 206v6" stroke="#DAA552" strokeOpacity="0.45" />
          <text x="23" y="203" fill="#9DB5AC" fontSize="5.5" fontFamily="Arial, sans-serif">
            200 м
          </text>
        </g>

        {points.map((point, index) => {
          const isCompleted = completed.has(point.id);
          const isActive = index === activeIndex && !isCompleted;
          const isUnlocked = isCompleted || index <= activeIndex;
          const isViewing = index === viewIndex;
          const label = MAP_LABELS[point.id] || `Точка ${index + 1}`;
          const x = point.x;
          const y = point.y;
          return (
            <g
              key={point.id}
              transform={`translate(${x} ${y})`}
              className="map-point"
              data-locked={!isUnlocked}
              role="button"
              tabIndex={isUnlocked ? 0 : -1}
              aria-label={`${isCompleted ? 'Пройдена' : isActive ? 'Активная точка' : isUnlocked ? 'Доступная точка' : 'Закрытая точка'}: ${point.title}`}
              aria-disabled={!isUnlocked}
              onClick={() => {
                if (isUnlocked) {
                  onSelect(index);
                }
              }}
              onKeyDown={(event) => {
                if (isUnlocked && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault();
                  onSelect(index);
                }
              }}
            >
              {isActive ? (
                <>
                  <circle r="25" fill="none" stroke="#2EC4B6" strokeOpacity="0.35" className="map-active-ring" />
                  <circle r="18" fill="#2EC4B6" fillOpacity="0.08" stroke="#2EC4B6" strokeOpacity="0.28" />
                  <circle r="11" fill="#123C32" stroke="#2EC4B6" strokeWidth="1.4" />
                  <circle r="4" fill="#63EADD" filter="url(#mapGlowFilter)" />
                  <path d="M0 -30v-6" stroke="#2EC4B6" strokeOpacity="0.45" />
                  <g transform="translate(0 -45)">
                    <rect x="-25" y="-7" width="50" height="13" rx="6.5" fill="#0A2921" stroke="#2EC4B6" strokeOpacity="0.4" />
                    <text textAnchor="middle" y="2.4" fill="#8DE8DE" fontSize="5.4" fontFamily="Arial, sans-serif" fontWeight="700" letterSpacing="0.7">
                      ВЫ ЗДЕСЬ
                    </text>
                  </g>
                </>
              ) : isCompleted ? (
                <>
                  <circle r="14" fill="#DAA552" fillOpacity="0.13" stroke="#DAA552" strokeOpacity="0.3" />
                  <circle r="10" fill="#DAA552" stroke="#F5D9A0" strokeWidth="1.2" filter="url(#mapPointShadow)" />
                  <path d="M-4.2 0.2 -1.2 3.2 4.5 -3" fill="none" stroke="#173229" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  {isViewing ? <circle r="15.5" fill="none" stroke="#FFF0C8" strokeOpacity="0.55" strokeDasharray="1 3" /> : null}
                </>
              ) : isUnlocked ? (
                <>
                  <circle r="13" fill="#0D3A2F" stroke="#2EC4B6" strokeOpacity="0.55" strokeWidth="1.2" />
                  <circle r="4" fill="#2EC4B6" />
                  {isViewing ? <circle r="16.5" fill="none" stroke="#F4B860" strokeOpacity="0.7" strokeDasharray="1 3" /> : null}
                </>
              ) : (
                <>
                  <circle r="12" fill="#10251E" stroke="#9DB5AC" strokeOpacity="0.26" />
                  <Lock x="-4.5" y="-4.5" width="9" height="9" color="#7A948A" strokeWidth={1.7} />
                </>
              )}
              <g transform={`translate(0 ${isActive ? 25 : 22})`}>
                <rect
                  x={-label.length * 2.7 - 5}
                  y="-7"
                  width={label.length * 5.4 + 10}
                  height="13"
                  rx="6.5"
                  fill="#061A14"
                  fillOpacity="0.86"
                  stroke={isViewing ? '#F4B860' : '#DAA552'}
                  strokeOpacity={isViewing ? 0.52 : 0.17}
                />
                <text
                  textAnchor="middle"
                  y="2.3"
                  fill={isViewing ? '#F4D39B' : isCompleted ? '#E8C98C' : isUnlocked ? '#C7DCD3' : '#7A948A'}
                  fontSize="5.6"
                  fontFamily="Arial, sans-serif"
                  fontWeight="600"
                  letterSpacing="0.2"
                >
                  {label}
                </text>
              </g>
            </g>
          );
        })}

        <g opacity="0.32">
          <text x="18" y="28" fill="#DAA552" fontSize="5.6" fontFamily="Arial, sans-serif" fontWeight="700" letterSpacing="1.4">
            ЛЕСНОЙ МАССИВ · ЛИПОВАЯ СЕНЬ
          </text>
          <path d="M18 34h54" stroke="#DAA552" strokeOpacity="0.5" />
        </g>
      </svg>

      <div className="flex items-center justify-between border-t border-gold/10 px-3.5 py-2">
        <div className="flex items-center gap-3 text-[8px] text-sage/55">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Пройдено
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-jade" /> Вы здесь
          </span>
          <span className="flex items-center gap-1">
            <Lock size={8} /> Закрыто
          </span>
        </div>
        <div className="flex items-center gap-1 text-[8px] font-medium text-sage/45">
          <Check size={9} className="text-jade/60" />
          {completed.size} / {points.length}
        </div>
      </div>
    </section>
  );
}

export default memo(ParkMap);
