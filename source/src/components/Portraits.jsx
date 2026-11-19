import { memo, useId } from 'react';

function PortraitFrame({ uid, children, accent, background, archFill, label, name }) {
  return (
    <svg
      viewBox="0 0 280 228"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Портрет: ${name}`}
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="18" y1="10" x2="260" y2="226" gradientUnits="userSpaceOnUse">
          {background}
        </linearGradient>
        <linearGradient id={`${uid}-arch`} x1="140" y1="20" x2="140" y2="220" gradientUnits="userSpaceOnUse">
          {archFill}
        </linearGradient>
        <radialGradient id={`${uid}-halo`} cx="0" cy="0" r="1" gradientTransform="translate(140 96) rotate(90) scale(83)">
          <stop stopColor={accent} stopOpacity="0.36" />
          <stop offset="0.65" stopColor={accent} stopOpacity="0.08" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-gold`} x1="50" y1="25" x2="234" y2="210" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF0C8" />
          <stop offset="0.42" stopColor="#DAA552" />
          <stop offset="0.75" stopColor="#9D6A26" />
          <stop offset="1" stopColor="#F0CC8C" />
        </linearGradient>
        <pattern id={`${uid}-fret`} width="22" height="11" patternUnits="userSpaceOnUse">
          <path d="M0 10.5H22M5.5 10.5V5l5.5-4 5.5 4v5.5M11 5v5.5" stroke={accent} strokeOpacity="0.2" strokeWidth="0.7" fill="none" />
        </pattern>
        <clipPath id={`${uid}-clip`}>
          <path d="M22 218V92c0-47 53-76 118-76s118 29 118 76v126H22Z" />
        </clipPath>
        <filter id={`${uid}-soft`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id={`${uid}-glow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="280" height="228" fill={`url(#${uid}-bg)`} />
      <g clipPath={`url(#${uid}-clip)`}>
        <rect width="280" height="228" fill={`url(#${uid}-arch)`} />
        <rect x="22" y="16" width="236" height="204" fill={`url(#${uid}-fret)`} />
        <ellipse cx="140" cy="100" rx="92" ry="88" fill={`url(#${uid}-halo)`} />
        {children}
      </g>

      <path
        d="M22 218V92c0-47 53-76 118-76s118 29 118 76v126"
        fill="none"
        stroke={`url(#${uid}-gold)`}
        strokeWidth="1.4"
        strokeOpacity="0.84"
      />
      <path
        d="M28 218V93c0-42 49-70 112-70s112 28 112 70v125"
        fill="none"
        stroke={accent}
        strokeWidth="0.6"
        strokeOpacity="0.36"
      />
      <path d="M103 16h74M96 10h88" stroke="#DAA552" strokeOpacity="0.34" strokeWidth="0.8" />
      <path d="M140 3 151 16 140 29 129 16 140 3Z" fill="#DAA552" fillOpacity="0.12" stroke="#DAA552" strokeOpacity="0.5" strokeWidth="0.8" />
      <path d="M140 9 146 16 140 23 134 16 140 9Z" fill={accent} fillOpacity="0.6" />
      <circle cx="140" cy="16" r="2" fill="#061612" />
      <path d="M22 194H40M240 194H258M22 104H33M247 104H258" stroke="#DAA552" strokeOpacity="0.3" strokeWidth="0.8" />
      <circle cx="22" cy="92" r="2" fill="#DAA552" fillOpacity="0.6" />
      <circle cx="258" cy="92" r="2" fill="#DAA552" fillOpacity="0.6" />
      <text
        x="140"
        y="218"
        textAnchor="middle"
        fill={accent}
        fillOpacity="0.7"
        fontFamily="Arial, sans-serif"
        fontSize="6.8"
        fontWeight="700"
        letterSpacing="2.2"
      >
        {label}
      </text>
    </svg>
  );
}

function Blacksmith({ uid, name }) {
  return (
    <PortraitFrame
      uid={uid}
      accent="#F4B860"
      name={name}
      label="КУЗНЕЦ · ОГОНЬ"
      background={<>
        <stop stopColor="#2B1A11" />
        <stop offset="0.55" stopColor="#18271E" />
        <stop offset="1" stopColor="#0B1C16" />
      </>}
      archFill={<>
        <stop stopColor="#3B2818" stopOpacity="0.7" />
        <stop offset="0.55" stopColor="#162C22" stopOpacity="0.32" />
        <stop offset="1" stopColor="#071812" />
      </>}
    >
      <circle cx="66" cy="168" r="42" fill="#F4B860" opacity="0.16" filter={`url(#${uid}-soft)`} />
      <circle cx="70" cy="170" r="15" fill="#F4B860" opacity="0.2" />
      <g stroke="#F4B860" strokeOpacity="0.55" strokeWidth="1" strokeLinecap="round">
        <path d="M56 190 40 182M72 196 64 208M87 190 101 199" />
      </g>
      {[34, 51, 68, 83, 101, 118, 137, 157, 176, 195, 214, 232].map((x, index) => (
        <circle
          key={x}
          cx={x}
          cy={40 + ((index * 23) % 74)}
          r={index % 3 === 0 ? 1.4 : 0.8}
          fill={index % 2 ? '#F4B860' : '#E5CC9B'}
          opacity={0.35 + (index % 3) * 0.14}
        />
      ))}
      <path d="M192 218c-12-49 9-72 23-72 14 0 29 24 17 72Z" fill="#4A3420" />
      <path d="M178 218 189 150l21 4 5 64Z" fill="#7A5B37" />
      <path d="M204 143c8 2 16 12 19 26l-24-12Z" fill="#BFC6B7" opacity="0.8" />
      <path d="M183 153c10-6 23-5 32 4" stroke="#C9A56A" strokeOpacity="0.5" strokeWidth="2" />
      <path d="M66 228c4-52 30-78 74-78s72 27 78 78Z" fill="#231C15" />
      <path d="M83 228c2-40 24-62 57-62 34 0 57 23 60 62Z" fill="#6B4A2C" />
      <path d="M114 172h52l-4 56h-44Z" fill="#39291D" />
      <path d="M103 228c5-29 21-44 37-44 17 0 32 14 37 44Z" fill="#5A402B" />
      <path d="M111 191c13 10 43 10 59 0l-6 18c-14 7-33 7-46 0Z" fill="#2B211A" />
      <path d="M121 147h39v30c-6 9-31 9-39 0Z" fill="#B98158" />
      <path d="M121 161c8 7 30 7 39 0v15c-9 7-30 8-39 0Z" fill="#8E5C3E" opacity="0.65" />
      <ellipse cx="140" cy="113" rx="39" ry="45" fill="#C08A62" />
      <path d="M102 109c0-30 17-47 39-47 25 0 40 19 38 49-2 14-8 22-12 25 1-24-8-37-27-37-16 0-26 13-27 35-5-3-10-11-11-25Z" fill="#2A1D16" />
      <path d="M101 102c3-30 19-48 42-48 15 0 27 7 34 19l-22 2c-9-5-18-4-25 1l-19 27Z" fill="#3B2A20" />
      <path d="M104 93c8-8 17-11 28-11" stroke="#5D4432" strokeWidth="3" strokeLinecap="round" />
      <path d="M147 53c20 3 33 20 34 43" stroke="#5D4432" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M104 78c22-10 49-12 75-2" stroke="#8F3F22" strokeWidth="9" strokeLinecap="round" />
      <path d="M104 78c22-10 49-12 75-2" stroke="#C46A38" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M117 104c5-4 12-4 17 0M148 103c5-3 12-2 16 2" stroke="#3D2A1E" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="126" cy="112" rx="3.1" ry="2.2" fill="#1C1712" />
      <ellipse cx="156" cy="111" rx="3.1" ry="2.2" fill="#1C1712" />
      <circle cx="127" cy="111" r="0.9" fill="#F6E7C8" />
      <circle cx="157" cy="111" r="0.9" fill="#F6E7C8" />
      <path d="M139 111c-1 9-3 15-6 18l7 2 6-2c-3-3-5-9-7-18Z" fill="#A96C4A" opacity="0.65" />
      <path d="M118 139c9-9 21-12 31-3 8 7 14 0 21-3-4 18-13 27-26 27-15 0-24-10-26-21Z" fill="#3A281D" />
      <path d="M125 133c5 4 8 6 15 8M159 133c-5 4-9 6-15 8" stroke="#694A33" strokeWidth="1.2" opacity="0.6" />
      <path d="M130 149c7 5 14 5 21 0" stroke="#C08A62" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
      <path d="M108 180c-11 6-19 18-22 34" stroke="#2A2D23" strokeWidth="10" strokeLinecap="round" opacity="0.8" />
      <g transform="rotate(20 210 134)">
        <rect x="205" y="66" width="7" height="96" rx="3" fill="#7F613A" />
        <rect x="183" y="49" width="50" height="25" rx="3" fill="#9EA59A" />
        <path d="M185 54h44M188 63h40" stroke="#5D665D" strokeWidth="1.2" opacity="0.7" />
      </g>
    </PortraitFrame>
  );
}

function Guardian({ uid, name }) {
  return (
    <PortraitFrame
      uid={uid}
      accent="#2EC4B6"
      name={name}
      label="БЕРЕГИНЯ · ВОДА"
      background={<>
        <stop stopColor="#0D3027" />
        <stop offset="0.52" stopColor="#0A241D" />
        <stop offset="1" stopColor="#071A15" />
      </>}
      archFill={<>
        <stop stopColor="#155448" stopOpacity="0.62" />
        <stop offset="0.48" stopColor="#0B2E26" stopOpacity="0.5" />
        <stop offset="1" stopColor="#06160F" />
      </>}
    >
      <g opacity="0.32" stroke="#2EC4B6" fill="none">
        <ellipse cx="62" cy="172" rx="52" ry="11" />
        <ellipse cx="62" cy="172" rx="34" ry="7" />
        <ellipse cx="227" cy="196" rx="48" ry="10" />
        <ellipse cx="227" cy="196" rx="30" ry="6" />
      </g>
      <path d="M40 218c0-37 16-68 42-82M240 218c0-45-17-72-45-88" stroke="#2EC4B6" strokeOpacity="0.12" strokeWidth="1" fill="none" />
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <circle key={index} cx={37 + index * 42} cy={48 + (index % 2) * 36} r="1.3" fill="#8DE8DE" opacity={0.28 + index * 0.07} />
      ))}
      <path d="M40 228c2-50 23-75 59-82l22-3 31 7c35 12 53 34 55 78Z" fill="#103B31" />
      <path d="M83 228c1-30 12-51 30-63l27-2 32 9c19 14 27 32 28 56Z" fill="#184F43" />
      <path d="M108 164c9 12 22 19 33 19 12 0 25-7 33-20l-3 54-61 1Z" fill="#0B2A22" />
      <path d="M101 228c3-39 18-59 40-60 23 1 38 21 41 60Z" fill="#236858" opacity="0.8" />
      <path d="M118 148h45v34c-9 11-35 11-45 0Z" fill="#C99270" />
      <path d="M118 163c11 8 33 8 45 0v13c-10 8-35 8-45 0Z" fill="#A96F52" opacity="0.55" />
      <ellipse cx="140" cy="111" rx="37" ry="43" fill="#D3A17F" />
      <path d="M104 109c-1-31 16-49 37-49 24 0 40 19 38 51-1 12-4 21-9 25 1-24-8-37-29-37-16 0-26 13-28 36-5-5-9-14-9-26Z" fill="#6B3E2D" />
      <path d="M104 101c-2-27 14-44 37-44 21 0 36 14 38 38-8-7-16-10-27-10-15 0-27 4-35 12Z" fill="#84503A" />
      <path d="M100 72c8-22 27-34 47-31 23 3 36 18 39 39-23 2-43-5-56-20-7 11-17 16-30 12Z" fill="#114C40" />
      <path d="M106 67c10-17 24-26 41-25 18 1 32 10 39 27-29-8-54-8-80-2Z" fill="#1C6A5A" />
      <path d="M107 58c7-24 24-38 42-38 20 0 35 12 44 34-30 7-58 8-86 4Z" fill="#2B7B69" />
      <path d="M115 50c6-19 19-29 36-29 16 0 28 9 35 27-25 6-47 6-71 2Z" fill="#0C3C33" stroke="#DAA552" strokeOpacity="0.4" strokeWidth="0.8" />
      <path d="M115 38c4 12 13 19 26 19 14 0 23-7 27-21M128 43c4-10 11-16 21-16" fill="none" stroke="#DAA552" strokeWidth="0.9" strokeOpacity="0.6" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => {
        const angle = -Math.PI + (Math.PI / 7) * index;
        const x = 140 + Math.cos(angle) * 43;
        const y = 58 + Math.sin(angle) * 22;
        return <circle key={index} cx={x} cy={y} r="2.3" fill="#E7D6B3" stroke="#DAA552" strokeOpacity="0.4" strokeWidth="0.4" />;
      })}
      <path d="M140 18 150 35 140 52 130 35 140 18Z" fill="#DAA552" fillOpacity="0.22" stroke="#E8C98C" strokeOpacity="0.72" />
      <path d="M140 25 145 35 140 45 135 35 140 25Z" fill="#2EC4B6" />
      <path d="M116 104c6-4 13-4 18 0M148 104c5-4 12-4 17 0" stroke="#5B3A2A" strokeWidth="2.1" strokeLinecap="round" />
      <ellipse cx="126" cy="111" rx="3.2" ry="2.4" fill="#18372E" />
      <ellipse cx="155" cy="111" rx="3.2" ry="2.4" fill="#18372E" />
      <circle cx="127" cy="110" r="0.9" fill="#EAF7ED" />
      <circle cx="156" cy="110" r="0.9" fill="#EAF7ED" />
      <path d="M139 111c-1 9-2 14-5 17l6 2 6-2c-2-3-4-8-7-17Z" fill="#BE8666" opacity="0.7" />
      <path d="M126 139c8 6 20 7 28 0 1 10-5 18-14 18-10 0-15-7-14-18Z" fill="#9C574B" opacity="0.58" />
      <path d="M128 140c7 3 17 3 24 0" stroke="#D3A17F" strokeWidth="1" opacity="0.7" />
      <path d="M104 120c-3 29-3 50 1 66M176 120c3 29 3 50-1 66" stroke="#6B3E2D" strokeWidth="10" strokeLinecap="round" opacity="0.5" />
      <path d="M100 167c-8 16-9 36-4 56M181 168c8 16 9 34 4 54" stroke="#0D352B" strokeWidth="12" strokeLinecap="round" />
      <path d="M92 190c9 4 17 14 20 28M189 194c-9 5-16 13-20 25" stroke="#C99270" strokeWidth="7" strokeLinecap="round" />
      <g transform="translate(196 160)" filter={`url(#${uid}-glow)`}>
        <circle cx="0" cy="0" r="20" fill="#2EC4B6" opacity="0.14" />
        <path d="M-9 4h18l-4 20h-10Z" fill="#123A30" stroke="#DAA552" strokeOpacity="0.7" />
        <path d="M-6 -2h12l2 7h-16Z" fill="#1E5B4D" />
        <path d="M0 -3v-7" stroke="#DAA552" strokeOpacity="0.8" />
        <circle cx="0" cy="12" r="5" fill="#F4B860" opacity="0.82" />
        <circle cx="0" cy="12" r="8" fill="#F4B860" opacity="0.14" />
      </g>
    </PortraitFrame>
  );
}

function Merchant({ uid, name }) {
  return (
    <PortraitFrame
      uid={uid}
      accent="#DAA552"
      name={name}
      label="КУПЕЦ · ДОРОГА"
      background={<>
        <stop stopColor="#2B2518" />
        <stop offset="0.55" stopColor="#17271F" />
        <stop offset="1" stopColor="#0B1B15" />
      </>}
      archFill={<>
        <stop stopColor="#3A3321" stopOpacity="0.7" />
        <stop offset="0.5" stopColor="#1B3026" stopOpacity="0.45" />
        <stop offset="1" stopColor="#071A14" />
      </>}
    >
      <g opacity="0.22" stroke="#DAA552" fill="none">
        <path d="M35 72H75V132H35ZM206 62H246V124H206Z" />
        <path d="M43 84H67V120H43ZM214 74H238V112H214Z" />
        <path d="M35 72 55 54 75 72M206 62 226 44 246 62" />
      </g>
      <g opacity="0.3" stroke="#DAA552" strokeWidth="0.8">
        <circle cx="57" cy="173" r="22" fill="none" />
        <circle cx="57" cy="173" r="14" fill="none" />
        <path d="M35 173H79M57 151V195" />
        <path d="M43 159 71 187M71 159 43 187" />
      </g>
      <path d="M45 228c3-51 29-77 71-79l18 1 18-1c41 4 65 30 69 79Z" fill="#1B1D16" />
      <path d="M69 228c4-38 30-59 63-61l11 1 10-1c32 3 55 24 58 61Z" fill="#3E3522" />
      <path d="M97 172c9-8 22-13 37-14l9 1 9-1c15 1 28 6 37 14l-9 56H106Z" fill="#5C4A2C" />
      <path d="M92 181c11-17 27-25 50-25 24 0 40 8 51 25l-12-28c-11-8-25-12-38-12-15 0-30 4-41 13Z" fill="#725B36" />
      <path d="M101 174c9 18 22 27 40 27s31-9 39-27" stroke="#C2A56A" strokeWidth="1.4" fill="none" opacity="0.5" />
      <path d="M111 163c8-8 18-11 31-11 14 0 25 4 33 12l-4 12c-8-8-18-12-30-12-12 0-22 4-30 11Z" fill="#8B6D3F" opacity="0.8" />
      <path d="M121 145h39v29c-8 9-31 9-39 0Z" fill="#C38C68" />
      <path d="M121 159c9 7 30 7 39 0v14c-9 8-30 8-39 0Z" fill="#A56F50" opacity="0.55" />
      <ellipse cx="140" cy="112" rx="41" ry="45" fill="#C9936F" />
      <path d="M100 112c-2-34 16-52 40-52 27 0 43 21 41 53-1 13-4 23-9 28 1-29-10-44-32-44-20 0-31 15-33 43-4-6-7-15-7-28Z" fill="#3A2A19" />
      <path d="M101 101c-1-31 16-48 41-48 23 0 39 16 40 43-15-5-29-11-40-22-9 13-23 22-41 27Z" fill="#4A3722" />
      <path d="M105 70c11-17 26-25 43-23 18 2 31 12 39 30-29 2-52-3-70-14-3 5-7 8-12 10Z" fill="#2D3B28" />
      <path d="M117 56c8-17 22-25 38-23 15 1 27 10 33 25-24 2-45-1-63-10Z" fill="#3A4A32" />
      <path d="M121 50c16-5 34-4 49 3" stroke="#6C7A57" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" />
      <path d="M117 18h48l7 31c-22 7-41 7-62 0Z" fill="#1B3126" stroke="#DAA552" strokeOpacity="0.4" />
      <path d="M115 27c22 8 44 8 68 0" stroke="#DAA552" strokeOpacity="0.4" strokeWidth="0.8" fill="none" />
      <path d="M116 34c5-5 11-7 18-8M164 28c6 1 11 4 15 8" stroke="#2E5645" strokeWidth="2" />
      <path d="M113 108c6-4 13-4 18 1M149 109c5-5 12-5 17-1" stroke="#4A3120" strokeWidth="2.2" strokeLinecap="round" />
      <ellipse cx="125" cy="114" rx="3.2" ry="2.2" fill="#231B13" />
      <ellipse cx="155" cy="114" rx="3.2" ry="2.2" fill="#231B13" />
      <circle cx="126" cy="113" r="0.85" fill="#F8ECD2" />
      <circle cx="156" cy="113" r="0.85" fill="#F8ECD2" />
      <path d="M138 114c-1 8-2 13-5 16l7 2 7-2c-3-3-4-8-6-16Z" fill="#B07958" opacity="0.7" />
      <path d="M115 141c5-6 11-8 18-4 5 3 10 5 16 3 6 4 11 4 17 2-4 16-13 25-27 25-14 0-23-9-24-26Z" fill="#5A4129" />
      <path d="M122 139c6 1 11 4 16 8M146 146c5 1 10 0 15-3" stroke="#83623C" strokeWidth="1.3" opacity="0.65" />
      <path d="M128 151c7 5 15 5 22 0" stroke="#C9936F" strokeWidth="1.2" opacity="0.5" />
      <path d="M98 172c-10 7-16 21-17 40M183 171c10 9 16 22 17 41" stroke="#1B1D16" strokeWidth="11" strokeLinecap="round" opacity="0.75" />
      <g transform="translate(162 192)">
        <path d="M-34 0h68" stroke="#DAA552" strokeWidth="1.1" strokeOpacity="0.7" />
        <path d="M-35 0v9M35 0v9" stroke="#DAA552" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="-21" cy="1" r="2" fill="#DAA552" />
        <circle cx="0" cy="3" r="2" fill="#DAA552" />
        <circle cx="20" cy="1" r="2" fill="#DAA552" />
        <circle cx="0" cy="22" r="17" fill="#C9A052" stroke="#F1D499" strokeWidth="1" />
        <circle cx="0" cy="22" r="13" fill="#1B2B22" stroke="#8C682F" />
        <path d="M0 14v9l6 4" stroke="#E8C98C" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <circle cx="0" cy="22" r="1.4" fill="#E8C98C" />
        <path d="M0 5V0" stroke="#DAA552" strokeWidth="1.6" />
      </g>
    </PortraitFrame>
  );
}

function StoneSpirit({ uid, name }) {
  return (
    <PortraitFrame
      uid={uid}
      accent="#2EC4B6"
      name={name}
      label="ДУХ КАМНЯ · РУНЫ"
      background={<>
        <stop stopColor="#10241F" />
        <stop offset="0.5" stopColor="#0A1B18" />
        <stop offset="1" stopColor="#050F0D" />
      </>}
      archFill={<>
        <stop stopColor="#22483E" stopOpacity="0.62" />
        <stop offset="0.55" stopColor="#102C25" stopOpacity="0.6" />
        <stop offset="1" stopColor="#06130F" />
      </>}
    >
      <g fill="none" stroke="#2EC4B6" strokeOpacity="0.18">
        <path d="M-8 200c40-45 62-67 78-102 18 42 40 65 88 86 35 16 82 14 130-8" />
        <path d="M3 220c36-42 57-62 70-93 18 35 42 60 80 78 38 18 81 18 132 4" />
        <path d="M45 228c23-32 40-57 44-86 14 31 34 52 61 66" />
      </g>
      <path d="M41 70 72 41l34 10 17-26 27 27 31-14 28 38-12 26 18 35-30 31-25-8-24 17-36-9-26 13-29-25 5-38-17-25Z" fill="#20352E" opacity="0.45" />
      <g opacity="0.4" filter={`url(#${uid}-glow)`}>
        <circle cx="53" cy="74" r="1.7" fill="#2EC4B6" />
        <circle cx="230" cy="99" r="1.3" fill="#F4B860" />
        <circle cx="208" cy="43" r="1.1" fill="#2EC4B6" />
        <circle cx="76" cy="174" r="1.4" fill="#F4B860" />
        <circle cx="246" cy="177" r="1.2" fill="#2EC4B6" />
      </g>
      <path d="M42 228c4-59 31-91 75-96l23 3 22-3c44 6 70 38 75 96Z" fill="#17251F" />
      <path d="M70 228c5-44 30-68 59-72l11 2 12-2c30 4 54 28 59 72Z" fill="#293A31" />
      <path d="M95 164 78 200l22 28h80l22-28-17-36-45-8Z" fill="#33473C" />
      <path d="M97 158h86l12 37-26 33h-58l-26-33Z" fill="#40574A" />
      <path d="M98 170 83 201l18 7 21-13 18 7 18-7 21 13 18-7-15-31Z" fill="#24362D" opacity="0.75" />
      <path d="M109 142h62v34c-11 10-50 10-62 0Z" fill="#53675A" />
      <path d="M101 110c2-33 20-52 39-52 23 0 40 22 40 54 0 22-9 42-20 50l-20 11-21-11c-12-9-19-29-18-52Z" fill="#627466" />
      <path d="M105 102c5-30 22-45 36-45 20 0 35 18 37 47l-11-17-8 15-12-22-13 24-11-17-8 20Z" fill="#4A5D50" />
      <path d="M101 87c-12 13-16 32-10 48l17-35 2 37 9-43 10 38 8-40 14 39 8-38 5 30 4-31 14 25c4-19-2-37-14-48Z" fill="#2F4539" />
      <path d="M108 120c6-7 13-9 20-6M152 114c7-2 14 1 19 7" stroke="#263B31" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M117 120c4-2 8-1 10 2M151 121c3-2 7-3 10-1" stroke="#13241D" strokeWidth="2" strokeLinecap="round" />
      <path d="M121 132h13l-6 6 5 4h-12Z" fill="#1B3027" />
      <path d="M138 137c5 13 13 21 22 25" stroke="#B7C7B6" strokeOpacity="0.3" strokeWidth="1.2" fill="none" />
      <path d="M112 149c10-4 19-3 27 2 8 5 16 6 24 3-5 12-13 18-26 18-15 0-23-7-25-23Z" fill="#374D40" />
      <path d="M125 157c9 3 18 2 27-2" stroke="#6F8272" strokeWidth="1.2" opacity="0.5" />
      <g filter={`url(#${uid}-glow)`}>
        <ellipse cx="124" cy="119" rx="4" ry="2.3" fill="#61E3D5" opacity="0.9" />
        <ellipse cx="155" cy="119" rx="4" ry="2.3" fill="#61E3D5" opacity="0.9" />
        <circle cx="124" cy="119" r="1.3" fill="#E3FFFA" />
        <circle cx="155" cy="119" r="1.3" fill="#E3FFFA" />
      </g>
      <g fill="none" stroke="#2EC4B6" strokeOpacity="0.7" filter={`url(#${uid}-glow)`}>
        <path d="M140 26v29M129 35l11 8 11-8M134 64h12" strokeWidth="1.3" />
        <path d="M109 185l7-9 6 9-6 9Z" strokeWidth="0.9" />
        <path d="M155 181h8l-4 12h-8Z" strokeWidth="0.9" />
        <path d="M131 190l8-6 8 6M131 190v8h16v-8" strokeWidth="0.8" opacity="0.7" />
      </g>
      <g fill="#2EC4B6" opacity="0.85" filter={`url(#${uid}-glow)`}>
        <path d="M140 15l8 12-8 10-8-10Z" opacity="0.45" />
        <path d="M111 42l7 11-7 10-7-10Z" opacity="0.35" />
        <path d="M169 41l7 11-7 10-7-10Z" opacity="0.35" />
      </g>
      <path d="M83 181c-28 0-49 15-57 47M197 181c29 0 49 15 57 47" stroke="#3D5245" strokeWidth="13" strokeLinecap="round" />
      <path d="M96 190c-13 9-21 22-23 38M184 190c13 9 21 22 23 38" stroke="#5B6E5D" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
    </PortraitFrame>
  );
}

function CharacterPortrait({ archetype, name, className = '' }) {
  const id = useId();
  const uid = `p${id.replace(/[^a-zA-Z0-9]/g, '')}`;
  const portrait =
    archetype === 'guardian' ? (
      <Guardian uid={uid} name={name} />
    ) : archetype === 'merchant' ? (
      <Merchant uid={uid} name={name} />
    ) : archetype === 'spirit' ? (
      <StoneSpirit uid={uid} name={name} />
    ) : (
      <Blacksmith uid={uid} name={name} />
    );
  return <div className={`overflow-hidden ${className}`}>{portrait}</div>;
}

export default memo(CharacterPortrait);

export const PortraitThumb = memo(function PortraitThumb({ archetype, name, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-gold/25 bg-ink-3 ${className}`}>
      <CharacterPortrait archetype={archetype} name={name} className="h-full w-full" />
    </div>
  );
});
