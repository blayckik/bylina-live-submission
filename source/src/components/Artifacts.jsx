import { memo, useId } from 'react';

function ArtifactBase({ uid, accent, children, label }) {
  return (
    <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" role="img" aria-label={label}>
      <defs>
        <radialGradient id={`${uid}-bg`} cx="0" cy="0" r="1" gradientTransform="translate(160 142) rotate(90) scale(150)">
          <stop stopColor={accent} stopOpacity="0.2" />
          <stop offset="0.55" stopColor="#0B2A22" stopOpacity="0.5" />
          <stop offset="1" stopColor="#05130F" stopOpacity="0.95" />
        </radialGradient>
        <linearGradient id={`${uid}-gold`} x1="72" y1="48" x2="250" y2="286" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF0C9" />
          <stop offset="0.34" stopColor="#E3BA76" />
          <stop offset="0.64" stopColor="#A66F27" />
          <stop offset="0.88" stopColor="#F1CA88" />
          <stop offset="1" stopColor="#9C6824" />
        </linearGradient>
        <linearGradient id={`${uid}-metal`} x1="92" y1="90" x2="226" y2="247" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EBD4A8" />
          <stop offset="0.25" stopColor="#B8894A" />
          <stop offset="0.52" stopColor="#6A4A2A" />
          <stop offset="0.75" stopColor="#C69A5A" />
          <stop offset="1" stopColor="#73512B" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="0" cy="0" r="1" gradientTransform="translate(160 164) rotate(90) scale(92)">
          <stop stopColor={accent} stopOpacity="0.5" />
          <stop offset="0.6" stopColor={accent} stopOpacity="0.1" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id={`${uid}-softGlow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id={`${uid}-grid`} width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M11 0v22M0 11h22" stroke="#DAA552" strokeOpacity="0.08" strokeWidth="0.6" />
          <circle cx="11" cy="11" r="0.8" fill="#DAA552" fillOpacity="0.18" />
        </pattern>
      </defs>

      <rect width="320" height="320" rx="24" fill={`url(#${uid}-bg)`} />
      <rect width="320" height="320" rx="24" fill={`url(#${uid}-grid)`} />
      <circle cx="160" cy="158" r="125" fill="none" stroke="#DAA552" strokeOpacity="0.16" strokeDasharray="1 6" />
      <circle cx="160" cy="158" r="110" fill="none" stroke="#DAA552" strokeOpacity="0.12" />
      <circle cx="160" cy="158" r="101" fill={`url(#${uid}-glow)`} />
      <path d="M160 19 181 43 213 35 221 67 253 76 245 108 269 129 245 150 253 182 221 191 213 223 181 215 160 239 139 215 107 223 99 191 67 182 75 150 51 129 75 108 67 76 99 67 107 35 139 43 160 19Z" fill="none" stroke="#DAA552" strokeOpacity="0.12" />
      <path d="M160 30 176 48 202 42 208 68 234 75 228 101 247 117 228 134 234 160 208 167 202 193 176 187 160 205 144 187 118 193 112 167 86 160 92 134 73 117 92 101 86 75 112 68 118 42 144 48 160 30Z" fill="none" stroke="#DAA552" strokeOpacity="0.18" strokeWidth="0.8" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => {
        const angle = (Math.PI * 2 * index) / 8 - Math.PI / 2;
        const x = 160 + Math.cos(angle) * 138;
        const y = 150 + Math.sin(angle) * 138;
        return <circle key={index} cx={x} cy={y} r={index % 2 ? 1.1 : 1.8} fill="#DAA552" opacity={index % 2 ? 0.3 : 0.55} />;
      })}
      <path d="M42 38V22H58M278 38V22H262M42 282V298H58M278 282V298H262" fill="none" stroke="#DAA552" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="160" cy="158" r="83" fill={accent} opacity="0.06" filter={`url(#${uid}-blur)`} />
      {children}
      <text x="160" y="296" textAnchor="middle" fill={accent} fillOpacity="0.58" fontFamily="Arial, sans-serif" fontSize="7" fontWeight="700" letterSpacing="2.4">
        {label}
      </text>
    </svg>
  );
}

function KeyArtifact({ uid, accent, label }) {
  return (
    <ArtifactBase uid={uid} accent={accent} label={label}>
      <g transform="rotate(-26 160 158)">
        <circle cx="160" cy="88" r="31" fill="none" stroke={`url(#${uid}-metal)`} strokeWidth="11" />
        <circle cx="160" cy="88" r="22" fill="none" stroke="#3C2E20" strokeWidth="5" />
        <circle cx="160" cy="88" r="11" fill="#162D24" stroke={`url(#${uid}-gold)`} strokeWidth="1.4" />
        <path d="M160 77v11l7 5" stroke={accent} strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <rect x="153" y="111" width="14" height="112" rx="5" fill={`url(#${uid}-metal)`} />
        <path d="M158 118v101" stroke="#F7E4BD" strokeOpacity="0.28" strokeWidth="1.2" />
        <path d="M167 188h31v13h-25v14h30v13h-36Z" fill={`url(#${uid}-metal)`} stroke="#4C3824" strokeWidth="1" />
        <path d="M174 193h16M177 210h16" stroke="#E5C48E" strokeOpacity="0.45" strokeWidth="1" />
        <path d="M154 220c12 14 12 30 0 42" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.4" />
      </g>
      <g fill="#F4B860" opacity="0.7" filter={`url(#${uid}-softGlow)`}>
        <circle cx="213" cy="99" r="2" />
        <circle cx="97" cy="180" r="1.4" />
        <circle cx="218" cy="216" r="1.2" />
      </g>
      <path d="M96 235c17-9 31-11 43-7M220 104c-12 3-22 9-29 18" stroke="#DAA552" strokeOpacity="0.28" strokeDasharray="2 5" fill="none" />
    </ArtifactBase>
  );
}

function SealArtifact({ uid, accent, label }) {
  return (
    <ArtifactBase uid={uid} accent={accent} label={label}>
      <path d="M160 61v17M160 239v17" stroke="#DAA552" strokeOpacity="0.4" strokeWidth="1.2" />
      <g>
        <circle cx="160" cy="158" r="76" fill="#2A1C13" stroke={`url(#${uid}-metal)`} strokeWidth="7" />
        <circle cx="160" cy="158" r="66" fill="#B47A3A" />
        <circle cx="160" cy="158" r="61" fill="#8A532A" />
        <circle cx="160" cy="158" r="55" fill="none" stroke="#EBCB94" strokeOpacity="0.35" strokeDasharray="2 5" />
        <circle cx="160" cy="158" r="41" fill="#763F22" stroke="#D9AA67" strokeOpacity="0.4" />
        <path d="M160 115 179 157 160 201 141 157 160 115Z" fill="#D5A763" fillOpacity="0.2" stroke="#F0D29E" strokeOpacity="0.62" />
        <path d="M160 131 170 157 160 184 150 157 160 131Z" fill="#E5C186" />
        <circle cx="160" cy="157" r="6" fill="#623A20" />
        <path d="M160 143v-9M160 181v-9M146 157h-9M183 157h-9" stroke="#E7C28A" strokeWidth="1.2" strokeOpacity="0.7" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => {
          const angle = (Math.PI * 2 * index) / 12;
          return (
            <circle
              key={index}
              cx={160 + Math.cos(angle) * 58}
              cy={158 + Math.sin(angle) * 58}
              r="1.7"
              fill="#2A1C13"
              opacity="0.8"
            />
          );
        })}
        <path d="M93 210c-13 12-19 27-18 44M227 210c13 12 19 27 18 44" stroke="#7A3C2A" strokeWidth="10" strokeLinecap="round" />
        <path d="M80 250c15-3 27-1 37 7M240 250c-15-3-27-1-37 7" stroke="#A95A3C" strokeWidth="3" strokeLinecap="round" />
      </g>
      <path d="M98 101c13-18 30-27 51-30" stroke="#F4D9A9" strokeOpacity="0.32" strokeWidth="2" strokeLinecap="round" fill="none" />
    </ArtifactBase>
  );
}

function AmuletArtifact({ uid, accent, label }) {
  return (
    <ArtifactBase uid={uid} accent={accent} label={label}>
      <path d="M160 43c-44 38-56 77-47 111 8 31 28 54 47 67 19-13 39-36 47-67 9-34-3-73-47-111Z" fill="none" stroke={`url(#${uid}-gold)`} strokeWidth="1.2" strokeOpacity="0.7" />
      <path d="M160 23v24M131 31l13 19M189 31l-13 19" stroke="#DAA552" strokeOpacity="0.5" strokeWidth="1.2" />
      <g>
        <circle cx="160" cy="160" r="64" fill="#123B31" stroke={`url(#${uid}-gold)`} strokeWidth="4" />
        <circle cx="160" cy="160" r="55" fill="#0C2D25" stroke="#DAA552" strokeOpacity="0.3" />
        <circle cx="160" cy="160" r="44" fill="#174C3E" stroke="#2EC4B6" strokeOpacity="0.42" />
        <path d="M160 117c19 16 27 29 24 45-2 12-11 22-24 27-13-5-22-15-24-27-3-16 5-29 24-45Z" fill="#2EC4B6" fillOpacity="0.18" stroke="#7DE2D6" strokeOpacity="0.6" />
        <path d="M160 128c12 12 17 22 14 34-2 8-7 14-14 17-7-3-12-9-14-17-3-12 2-22 14-34Z" fill="#2EC4B6" fillOpacity="0.4" />
        <path d="M142 171c6 6 12 9 18 10 6-1 12-4 18-10" fill="none" stroke="#BFF6EF" strokeOpacity="0.6" strokeWidth="1.2" />
        <path d="M160 143v24M152 155h16" stroke="#C8F8F1" strokeWidth="1.2" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => {
          const angle = (Math.PI * 2 * index) / 12 - Math.PI / 2;
          return (
            <circle
              key={index}
              cx={160 + Math.cos(angle) * 50}
              cy={160 + Math.sin(angle) * 50}
              r="2.2"
              fill={index % 3 === 0 ? '#E4D1A9' : '#2EC4B6'}
              opacity={index % 3 === 0 ? 0.8 : 0.45}
            />
          );
        })}
        <path d="M160 96V73" stroke="#DAA552" strokeWidth="2" />
        <circle cx="160" cy="68" r="5" fill="none" stroke="#DAA552" strokeWidth="1.4" />
        <path d="M112 205c-7 14-6 29 2 43M208 205c7 14 6 29-2 43" stroke="#2EC4B6" strokeWidth="1.2" strokeOpacity="0.4" />
      </g>
      <g fill="#BFF6EF" opacity="0.75" filter={`url(#${uid}-softGlow)`}>
        <circle cx="235" cy="133" r="1.4" />
        <circle cx="84" cy="194" r="1.2" />
        <circle cx="225" cy="237" r="1" />
      </g>
    </ArtifactBase>
  );
}

function RuneArtifact({ uid, accent, label }) {
  return (
    <ArtifactBase uid={uid} accent={accent} label={label}>
      <path d="M128 72 213 53 246 176 191 260 103 247 75 146Z" fill="#1E3128" stroke={`url(#${uid}-metal)`} strokeWidth="5" />
      <path d="M133 82 205 65 234 172 185 247 112 236 85 150Z" fill="#2D4538" />
      <path d="M128 72 159 145 103 247M159 145 246 176M159 145 213 53M159 145 191 260M159 145 75 146" stroke="#18281F" strokeWidth="2.3" fill="none" opacity="0.8" />
      <path d="M138 111c22 4 34 19 41 39 6 19 13 30 30 37 9 4 16 13 17 25" stroke="#2EC4B6" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.38" />
      <g fill="none" stroke="#6FE3D5" strokeWidth="2.2" strokeLinecap="round" filter={`url(#${uid}-softGlow)`}>
        <path d="M125 159c16-28 52-34 76-12 25 23 17 63-13 75-27 11-56-8-55-35 1-21 24-34 43-25 17 8 20 31 5 40-12 7-26-1-24-13" />
      </g>
      <g fill="#D3FBF5" filter={`url(#${uid}-softGlow)`}>
        <circle cx="157" cy="159" r="3.2" fill="#8FF2E5" />
        <circle cx="206" cy="202" r="2.1" fill="#8FF2E5" opacity="0.7" />
        <circle cx="124" cy="197" r="1.5" fill="#8FF2E5" opacity="0.6" />
      </g>
      <path d="M94 94c12-13 24-19 38-22" stroke="#F4D9A9" strokeOpacity="0.22" strokeWidth="2" strokeLinecap="round" fill="none" />
      <g stroke="#2EC4B6" strokeOpacity="0.28" fill="none">
        <path d="M67 190c18 13 35 18 51 15M232 99c-9 14-15 28-18 43" />
      </g>
    </ArtifactBase>
  );
}

function CoinArtifact({ uid, accent, label }) {
  return (
    <ArtifactBase uid={uid} accent={accent} label={label}>
      <g>
        <circle cx="160" cy="160" r="78" fill="#3B2A13" stroke="#6E4C20" strokeWidth="4" />
        <circle cx="160" cy="160" r="72" fill="none" stroke="#E7C487" strokeOpacity="0.42" strokeWidth="2" strokeDasharray="2 4" />
        <circle cx="160" cy="160" r="64" fill="#A77434" />
        <circle cx="160" cy="160" r="59" fill="#8E5D29" />
        <path d="M160 100c22 2 38 18 38 43 0 20-9 34-23 43v11h-30v-11c-14-9-23-23-23-43 0-25 16-41 38-43Z" fill="#B07C3A" stroke="#E3BB78" strokeOpacity="0.5" />
        <path d="M126 145c4-22 17-35 34-39 19-4 35 7 41 25-10-3-18-2-25 2-4-8-12-12-21-10-10 2-16 9-17 19-5 0-9 1-12 3Z" fill="#D4A25E" opacity="0.55" />
        <path d="M144 136c5-5 12-5 18-1M166 136c5-4 12-3 16 2" stroke="#5E3C13" strokeWidth="3" strokeLinecap="round" />
        <path d="M155 147c-1 8-3 13-6 17l11 4 11-4c-4-4-6-9-7-17Z" fill="#6C441A" opacity="0.7" />
        <path d="M147 171c9-5 18-5 26 0" stroke="#D8A862" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M160 108v-8M160 213v8M111 160h-8M217 160h8" stroke="#DAA552" strokeOpacity="0.55" strokeWidth="1.2" />
        <path d="M126 126 116 116M194 126 204 116M126 194 116 204M194 194 204 204" stroke="#DAA552" strokeOpacity="0.35" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((index) => {
          const angle = (Math.PI * 2 * index) / 16;
          return (
            <circle
              key={index}
              cx={160 + Math.cos(angle) * 66}
              cy={160 + Math.sin(angle) * 66}
              r="1.1"
              fill="#E7C487"
              opacity="0.55"
            />
          );
        })}
      </g>
      <path d="M232 82c-13-2-24 3-33 15" stroke="#F4B860" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <g fill="#F4B860" opacity="0.55" filter={`url(#${uid}-softGlow)`}>
        <circle cx="244" cy="103" r="1.4" />
        <circle cx="83" cy="226" r="1.1" />
      </g>
    </ArtifactBase>
  );
}

function LedgerArtifact({ uid, accent, label }) {
  return (
    <ArtifactBase uid={uid} accent={accent} label={label}>
      <g transform="rotate(-4 160 160)">
        <rect x="79" y="67" width="162" height="187" rx="4" fill="#D6C39C" stroke="#644B2A" strokeWidth="2" />
        <rect x="86" y="74" width="148" height="173" rx="2" fill="#E9D9B8" />
        <rect x="86" y="74" width="19" height="173" fill="#CDB78F" />
        <path d="M105 74v173" stroke="#B49A6E" />
        <path d="M116 96h96M116 111h85M116 126h98M116 141h67M116 156h92M116 171h78M116 186h96M116 201h59M116 216h83" stroke="#957B54" strokeOpacity="0.45" strokeWidth="1.4" />
        <path d="M116 96h50M116 126h43M116 156h50M116 186h44M116 216h38" stroke="#705A38" strokeOpacity="0.4" strokeWidth="1.4" />
        <path d="M208 74v14M201 81h14" stroke="#8C6A3D" strokeOpacity="0.6" />
        <g transform="translate(207 217)">
          <circle cx="0" cy="0" r="19" fill="#8A4D2E" />
          <circle cx="0" cy="0" r="14" fill="none" stroke="#D8AA71" strokeOpacity="0.55" strokeDasharray="2 3" />
          <path d="M-6-5 0 8 6-5Z" fill="#D8AA71" opacity="0.64" />
          <path d="M-12 11c8 5 16 5 24 0" stroke="#E7C99A" strokeOpacity="0.55" fill="none" />
        </g>
        <path d="M79 67c22 5 36 5 54 1" stroke="#F0E0C3" strokeOpacity="0.35" />
      </g>
      <path d="M244 181c5 12 2 25-9 35" stroke="#DAA552" strokeOpacity="0.35" fill="none" strokeWidth="1.2" />
      <path d="M259 167c7 18 3 36-11 51" stroke="#DAA552" strokeOpacity="0.18" fill="none" />
    </ArtifactBase>
  );
}

function BirdArtifact({ uid, accent, label }) {
  return (
    <ArtifactBase uid={uid} accent={accent} label={label}>
      <path d="M160 62v45" stroke="#DAA552" strokeWidth="1.2" strokeOpacity="0.6" />
      <circle cx="160" cy="54" r="7" fill="none" stroke="#DAA552" strokeWidth="1.4" />
      <path d="M160 49v10M155 54h10" stroke="#DAA552" strokeOpacity="0.55" />
      <g>
        <path d="M94 166c19-30 42-46 67-47 23 1 38 11 49 27l19 2-13 17c-15 25-38 38-66 37-31-1-49-13-56-36Z" fill="#6D4A28" stroke={`url(#${uid}-metal)`} strokeWidth="3" />
        <path d="M101 159c21-21 43-30 65-28 17 2 29 11 37 24-21-5-37-3-50 4-16 9-32 10-52 0Z" fill="#A77B45" />
        <path d="M138 148c15-15 33-22 53-19 12 2 22 8 29 18-16 17-35 26-57 26-11 0-19-7-25-25Z" fill="#88602F" />
        <path d="M163 142c-7-16-3-29 12-37 8 11 8 23 1 36Z" fill="#5E3F22" />
        <path d="M174 135c12-4 23-2 32 6-8 10-18 15-30 17-4-7-5-15-2-23Z" fill="#C29658" />
        <path d="M204 140 226 136 210 149Z" fill="#D8B778" />
        <circle cx="187" cy="126" r="3.2" fill="#1A241C" />
        <circle cx="188" cy="125" r="1" fill="#F9EACB" />
        <path d="M121 173c17 6 28 18 33 35-16 11-31 11-46 0-2-15 3-26 13-35Z" fill="#7F592F" />
        <path d="M115 182c13 0 22 5 28 14M222 171c-10 8-15 18-15 30" stroke="#D7B477" strokeOpacity="0.35" fill="none" />
        <path d="M97 181c20-3 37-1 52 5M99 189c16-2 30 0 42 5" stroke="#D0A76B" strokeOpacity="0.35" fill="none" />
        <path d="M145 204c-8 12-20 17-35 15 5-11 14-17 27-18Z" fill="#4A321D" />
        <path d="M149 201c-2 16 2 29 12 40M169 201c2 16-3 29-13 40" stroke="#3E2917" strokeWidth="2.2" fill="none" />
        <path d="M150 238h20" stroke="#A47A43" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g fill="#F4B860" opacity="0.5" filter={`url(#${uid}-softGlow)`}>
        <circle cx="77" cy="116" r="1.4" />
        <circle cx="245" cy="216" r="1.2" />
        <circle cx="233" cy="88" r="1" />
      </g>
      <path d="M94 114c15-16 31-25 48-28M234 231c-12 9-24 14-36 16" stroke="#DAA552" strokeOpacity="0.24" strokeDasharray="2 5" fill="none" />
    </ArtifactBase>
  );
}

function CrystalArtifact({ uid, accent, label }) {
  return (
    <ArtifactBase uid={uid} accent={accent} label={label}>
      <g>
        <path d="M160 51 210 123 196 226 160 259 124 226 110 123Z" fill="#2A5E55" fillOpacity="0.4" stroke="#8DE8DE" strokeOpacity="0.38" strokeWidth="1.4" />
        <path d="M160 51 179 119 196 226 160 259 141 224 141 120Z" fill="#66CFC3" fillOpacity="0.22" stroke="#B5F7EF" strokeOpacity="0.48" strokeWidth="1.1" />
        <path d="M160 51 141 120 124 226 160 259Z" fill="#2EC4B6" fillOpacity="0.3" />
        <path d="M160 51 179 119 196 226 160 259Z" fill="#9DF4EA" fillOpacity="0.12" />
        <path d="M110 123 73 176 99 235 124 226Z" fill="#2A5147" fillOpacity="0.55" stroke="#8DE8DE" strokeOpacity="0.25" />
        <path d="M210 123 247 176 221 235 196 226Z" fill="#23473F" fillOpacity="0.6" stroke="#8DE8DE" strokeOpacity="0.25" />
        <path d="M73 176 58 206 86 238 99 235Z" fill="#1E3E36" stroke="#8DE8DE" strokeOpacity="0.18" />
        <path d="M247 176 262 206 234 238 221 235Z" fill="#1B3831" stroke="#8DE8DE" strokeOpacity="0.18" />
        <path d="M160 51 141 120 160 259 179 119Z" fill="none" stroke="#E3FFFB" strokeOpacity="0.14" />
        <path d="M127 100c15 5 28 14 36 31 9 19 10 41 3 65" stroke="#F4B860" strokeOpacity="0.55" strokeWidth="2" fill="none" filter={`url(#${uid}-softGlow)`} />
        <path d="M183 147c9 19 8 40-2 60" stroke="#F4B860" strokeOpacity="0.35" strokeWidth="1.2" fill="none" />
        <path d="M147 124c7 11 9 22 6 32" stroke="#F8E7C7" strokeOpacity="0.35" strokeWidth="1" fill="none" />
        <path d="M98 243c29 13 61 19 96 17 17-1 32-5 45-11" stroke="#DAA552" strokeOpacity="0.3" fill="none" />
        <ellipse cx="160" cy="249" rx="66" ry="12" fill="#2EC4B6" opacity="0.11" filter={`url(#${uid}-blur)`} />
      </g>
      <g fill="#B8FBF3" opacity="0.7" filter={`url(#${uid}-softGlow)`}>
        <circle cx="234" cy="93" r="1.4" />
        <circle cx="83" cy="139" r="1.2" />
        <circle cx="239" cy="217" r="1" />
        <circle cx="75" cy="244" r="0.9" />
      </g>
    </ArtifactBase>
  );
}

const ACCENTS = {
  key: '#F4B860',
  seal: '#DAA552',
  amulet: '#2EC4B6',
  rune: '#2EC4B6',
  coin: '#F4B860',
  ledger: '#DAA552',
  bird: '#F4B860',
  crystal: '#2EC4B6',
};

const LABELS = {
  key: 'АРТЕФАКТ · КЛЮЧ',
  seal: 'АРТЕФАКТ · ПЕЧАТЬ',
  amulet: 'АРТЕФАКТ · ОБЕРЕГ',
  rune: 'АРТЕФАКТ · РУНА',
  coin: 'АРТЕФАКТ · МОНЕТА',
  ledger: 'АРТЕФАКТ · ВЕДОМОСТЬ',
  bird: 'АРТЕФАКТ · БЕРЕГИНЯ',
  crystal: 'АРТЕФАКТ · КРИСТАЛЛ',
};

function ArtifactFigure({ type = 'key', className = '' }) {
  const id = useId();
  const uid = `a${id.replace(/[^a-zA-Z0-9]/g, '')}`;
  const accent = ACCENTS[type] || ACCENTS.key;
  const label = LABELS[type] || LABELS.key;
  const props = { uid, accent, label };

  return (
    <div className={`overflow-hidden ${className}`}>
      {type === 'seal' ? (
        <SealArtifact {...props} />
      ) : type === 'amulet' ? (
        <AmuletArtifact {...props} />
      ) : type === 'rune' ? (
        <RuneArtifact {...props} />
      ) : type === 'coin' ? (
        <CoinArtifact {...props} />
      ) : type === 'ledger' ? (
        <LedgerArtifact {...props} />
      ) : type === 'bird' ? (
        <BirdArtifact {...props} />
      ) : type === 'crystal' ? (
        <CrystalArtifact {...props} />
      ) : (
        <KeyArtifact {...props} />
      )}
    </div>
  );
}

export default memo(ArtifactFigure);
