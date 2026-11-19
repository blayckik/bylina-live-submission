export function LogoMark({ size = 46, animated = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={animated ? 'shrink-0' : 'shrink-0'}
    >
      <defs>
        <linearGradient id="logoGold" x1="12" y1="8" x2="53" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF1CC" />
          <stop offset="0.32" stopColor="#EAC281" />
          <stop offset="0.66" stopColor="#C58E3E" />
          <stop offset="1" stopColor="#F4D39B" />
        </linearGradient>
        <radialGradient id="logoGlow" cx="0" cy="0" r="1" gradientTransform="translate(32 30) rotate(90) scale(28)">
          <stop stopColor="#2EC4B6" stopOpacity="0.24" />
          <stop offset="1" stopColor="#2EC4B6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#071C16" stroke="url(#logoGold)" strokeOpacity="0.72" />
      <circle cx="32" cy="32" r="26" fill="url(#logoGlow)" stroke="#DAA552" strokeOpacity="0.22" strokeDasharray="1 4" />
      <path d="M32 10 50 32 32 54 14 32 32 10Z" stroke="url(#logoGold)" strokeWidth="1.2" strokeOpacity="0.9" />
      <path d="M32 17.5 43 32 32 46.5 21 32 32 17.5Z" fill="url(#logoGold)" fillOpacity="0.16" stroke="url(#logoGold)" strokeWidth="1" />
      <path d="M32 23.5 38.2 32 32 40.5 25.8 32 32 23.5Z" fill="url(#logoGold)" />
      <circle cx="32" cy="32" r="3.1" fill="#061612" />
      <circle cx="32" cy="32" r="1.4" fill="#F7E3B8" />
      <path d="M32 3.5V9M32 55V60.5M3.5 32H9M55 32H60.5" stroke="#DAA552" strokeOpacity="0.48" strokeLinecap="round" />
      <path d="M14.5 14.5 18 18M49.5 14.5 46 18M14.5 49.5 18 46M49.5 49.5 46 46" stroke="#F4B860" strokeOpacity="0.55" strokeLinecap="round" />
      <circle cx="32" cy="9.5" r="1.15" fill="#F4B860" />
      <circle cx="32" cy="54.5" r="1.15" fill="#F4B860" />
      <circle cx="9.5" cy="32" r="1.15" fill="#F4B860" />
      <circle cx="54.5" cy="32" r="1.15" fill="#F4B860" />
    </svg>
  );
}

export function OrnamentDivider({ className = '', width = 560, opacity = 1 }) {
  return (
    <svg
      width={width}
      height="26"
      viewBox="0 0 560 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{ maxWidth: '100%', opacity }}
    >
      <defs>
        <linearGradient id="ornLine" x1="0" y1="13" x2="560" y2="13" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DAA552" stopOpacity="0" />
          <stop offset="0.18" stopColor="#DAA552" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#F4B860" stopOpacity="0.32" />
          <stop offset="0.82" stopColor="#DAA552" stopOpacity="0.55" />
          <stop offset="1" stopColor="#DAA552" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 13H209" stroke="url(#ornLine)" />
      <path d="M351 13H560" stroke="url(#ornLine)" />
      <path d="M209 13 219 6 229 13 219 20 209 13Z" fill="#DAA552" fillOpacity="0.13" stroke="#DAA552" strokeOpacity="0.48" />
      <path d="M351 13 341 6 331 13 341 20 351 13Z" fill="#DAA552" fillOpacity="0.13" stroke="#DAA552" strokeOpacity="0.48" />
      <path d="M235 13 243 8 251 13 243 18 235 13Z" stroke="#DAA552" strokeOpacity="0.3" />
      <path d="M325 13 317 8 309 13 317 18 325 13Z" stroke="#DAA552" strokeOpacity="0.3" />
      <path d="M268 5 280 13 268 21 256 13 268 5Z" fill="#DAA552" fillOpacity="0.18" stroke="#E8C98C" strokeOpacity="0.72" />
      <path d="M292 5 280 13 292 21 304 13 292 5Z" stroke="#DAA552" strokeOpacity="0.36" />
      <path d="M280 9 284 13 280 17 276 13 280 9Z" fill="#F4B860" />
      <circle cx="280" cy="13" r="8.5" stroke="#DAA552" strokeOpacity="0.24" />
      <circle cx="223" cy="13" r="2" fill="#DAA552" fillOpacity="0.55" />
      <circle cx="337" cy="13" r="2" fill="#DAA552" fillOpacity="0.55" />
      <path d="M252 8V18M308 8V18M246 13H258M302 13H314" stroke="#DAA552" strokeOpacity="0.22" />
    </svg>
  );
}

export function SectionEyebrow({ children, icon: Icon, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-7 bg-gradient-to-r from-transparent to-gold/60" />
      {Icon ? <Icon size={13} strokeWidth={1.6} className="text-amber" /> : null}
      <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-soft/80 sm:text-[11px]">
        {children}
      </span>
      <span className="h-px w-7 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

export function SlavicCorner({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 90 90"
      width="90"
      height="90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <path d="M1 34V1H34" stroke="#DAA552" strokeOpacity="0.32" />
      <path d="M8 27V8H27" stroke="#DAA552" strokeOpacity="0.2" />
      <path d="M1 48H13M48 1V13" stroke="#DAA552" strokeOpacity="0.16" />
      <path d="M20 20 28 28 20 36 12 28 20 20Z" fill="#DAA552" fillOpacity="0.14" stroke="#DAA552" strokeOpacity="0.36" />
      <circle cx="20" cy="28" r="2" fill="#F4B860" fillOpacity="0.6" />
      <path d="M1 61H21M61 1V21" stroke="#DAA552" strokeOpacity="0.1" />
    </svg>
  );
}

export function AiBadge({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/[0.07] px-2.5 py-1 text-[8.5px] font-bold uppercase tracking-[0.18em] text-gold-soft/90 ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-jade shadow-[0_0_6px_#2EC4B6]" />
      AI Cultural Engine
    </span>
  );
}

export function StatPill({ icon: Icon, children, tone = 'gold', className = '' }) {
  const toneClass =
    tone === 'jade'
      ? 'border-jade/25 bg-jade/[0.07] text-[#8de8de]'
      : tone === 'sage'
        ? 'border-white/10 bg-white/[0.03] text-sage'
        : 'border-gold/25 bg-gold/[0.06] text-gold-soft';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium ${toneClass} ${className}`}>
      {Icon ? <Icon size={11} strokeWidth={1.8} /> : null}
      {children}
    </span>
  );
}

export function DottedPattern({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 200 120" fill="none" aria-hidden="true">
      <defs>
        <pattern id="dotGrid" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#DAA552" fillOpacity="0.24" />
        </pattern>
      </defs>
      <rect width="200" height="120" fill="url(#dotGrid)" />
    </svg>
  );
}
