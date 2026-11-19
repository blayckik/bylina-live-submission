import { useEffect, useRef, useState } from 'react';
import { X, Camera, CameraOff, ScanLine, Crosshair, Sparkles, Gem, Loader2, Info } from 'lucide-react';
import ArtifactReveal from './ArtifactReveal.jsx';

const FIREFLIES = [
  { left: '13%', top: '31%', delay: '0s', duration: '7.4s' },
  { left: '27%', top: '60%', delay: '-2.1s', duration: '8.8s' },
  { left: '38%', top: '22%', delay: '-4.4s', duration: '6.7s' },
  { left: '58%', top: '48%', delay: '-1.2s', duration: '9.2s' },
  { left: '72%', top: '28%', delay: '-5.6s', duration: '7.9s' },
  { left: '84%', top: '64%', delay: '-3.2s', duration: '8.3s' },
  { left: '47%', top: '74%', delay: '-6.4s', duration: '7.1s' },
  { left: '19%', top: '83%', delay: '-2.8s', duration: '9.7s' },
  { left: '91%', top: '44%', delay: '-0.8s', duration: '6.9s' },
  { left: '65%', top: '86%', delay: '-4.9s', duration: '8.1s' },
];

function DuskParkScene({ point }) {
  return (
    <div className="absolute inset-0 overflow-hidden ar-scene">
      <svg viewBox="0 0 380 640" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id="arMoonGlow" cx="0" cy="0" r="1" gradientTransform="translate(284 110) rotate(90) scale(110)">
            <stop stopColor="#A8DADC" stopOpacity="0.28" />
            <stop offset="1" stopColor="#A8DADC" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="arGround" x1="0" y1="360" x2="380" y2="640" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0C2B22" />
            <stop offset="1" stopColor="#04110D" />
          </linearGradient>
          <linearGradient id="arMist" x1="0" y1="350" x2="380" y2="560" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2EC4B6" stopOpacity="0.13" />
            <stop offset="1" stopColor="#2EC4B6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="284" cy="110" r="110" fill="url(#arMoonGlow)" />
        <circle cx="284" cy="110" r="31" fill="#D8F3E7" fillOpacity="0.1" stroke="#B9E7DA" strokeOpacity="0.35" />
        <circle cx="273" cy="102" r="7" fill="#7CA99B" fillOpacity="0.12" />
        <circle cx="294" cy="120" r="4" fill="#7CA99B" fillOpacity="0.1" />
        <path d="M0 337c63-42 112-48 165-22 38 19 76 18 117-7 43-27 78-29 98-21v353H0Z" fill="#0A231B" />
        <path d="M0 395c73-18 130-10 181 17 53 28 111 26 199-0v228H0Z" fill="url(#arGround)" />
        <path d="M0 430c87-17 155-6 213 20 60 27 113 22 167 5v185H0Z" fill="url(#arMist)" />
        <path d="M171 640c4-80 14-135 31-165 18 31 29 86 33 165Z" fill="#0B2D24" />
        <path d="M184 640c4-63 11-103 20-124 9 22 16 62 19 124Z" fill="#143E32" opacity="0.65" />
        <g fill="#0A1E18" stroke="#2C5A4B" strokeOpacity="0.16">
          <g transform="translate(52 342) scale(1.2)">
            <path d="M0 0 -17 35H17Z M0 -34 -24 10H24Z M0 -74 -18 -30H18Z" />
            <path d="M0 35v44" stroke="#071812" strokeWidth="6" />
          </g>
          <g transform="translate(324 365) scale(0.98)">
            <path d="M0 0 -16 32H16Z M0 -28 -22 8H22Z M0 -64 -17 -28H17Z" />
            <path d="M0 32v38" stroke="#071812" strokeWidth="5" />
          </g>
          <g transform="translate(94 445) scale(0.7)">
            <path d="M0 0 -15 30H15Z M0 -30 -20 4H20Z" />
            <path d="M0 30v28" stroke="#071812" strokeWidth="4" />
          </g>
          <g transform="translate(285 476) scale(0.6)">
            <path d="M0 0 -15 30H15Z M0 -30 -20 4H20Z" />
            <path d="M0 30v28" stroke="#071812" strokeWidth="4" />
          </g>
        </g>
        <g transform="translate(190 395)">
          <path d="M-52 115V37C-52 4-29-19 0-19s52 23 52 56v78Z" fill="#071A14" stroke="#6E9F8D" strokeOpacity="0.2" />
          <path d="M-37 115V42c0-24 16-40 37-40s37 16 37 40v73Z" fill="#0A251C" />
          <path d="M-25 115V54c0-17 11-27 25-27s25 10 25 27v61Z" fill="#12382C" opacity="0.8" />
          <path d="M0 79v36M-9 92h18" stroke="#DAA552" strokeOpacity="0.25" />
          <path d="M-64 116H64" stroke="#DAA552" strokeOpacity="0.25" />
          <path d="M-37 30c10-12 20-18 37-18 16 0 27 6 36 18" stroke="#2EC4B6" strokeOpacity="0.16" fill="none" />
        </g>
        <path d="M0 471c75-17 134-13 188 1 64 17 127 12 192-4" stroke="#2A6555" strokeOpacity="0.22" fill="none" />
        <path d="M0 522c80-7 141 1 195 13 62 14 123 10 185 1" stroke="#2A6555" strokeOpacity="0.14" fill="none" />
        <g fill="#F4B860" opacity="0.5">
          <circle cx="77" cy="236" r="1.1" />
          <circle cx="205" cy="173" r="1.3" />
          <circle cx="332" cy="212" r="0.9" />
          <circle cx="131" cy="287" r="1" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-[#03110d]/60 via-transparent to-[#03110d]/80" />
      {FIREFLIES.map((firefly, index) => (
        <span
          key={index}
          className="firefly"
          style={{
            left: firefly.left,
            top: firefly.top,
            animationDelay: firefly.delay,
            animationDuration: firefly.duration,
          }}
        />
      ))}
      <div className="absolute inset-x-0 top-[42%] flex flex-col items-center text-center">
        <span className="rounded-full border border-gold/20 bg-[#051510]/50 px-3 py-1 text-[8px] uppercase tracking-[0.18em] text-gold/60 backdrop-blur">
          {point.place}
        </span>
        <span className="mt-2 text-[8.5px] text-sage/35">Наведите камеру на силуэт</span>
      </div>
    </div>
  );
}

export default function ArMode({ point, onClose, onCollect }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanTimerRef = useRef(null);
  const [cameraState, setCameraState] = useState('requesting');
  const [scanning, setScanning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let stream = null;
    const permissionTimeout = window.setTimeout(() => {
      if (!cancelled) {
        setCameraState((previous) => (previous === 'requesting' ? 'fallback' : previous));
      }
    }, 3600);

    async function startCamera() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraState('fallback');
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          try {
            await videoRef.current.play();
          } catch {
            // Autoplay may be blocked; the frame still shows the fallback layer.
          }
        }
        setCameraState('active');
      } catch {
        if (!cancelled) {
          setCameraState('fallback');
        }
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      window.clearTimeout(permissionTimeout);
      if (scanTimerRef.current) {
        window.clearTimeout(scanTimerRef.current);
        scanTimerRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const startScan = () => {
    if (scanning || revealed) {
      return;
    }
    setScanning(true);
    scanTimerRef.current = window.setTimeout(() => {
      setScanning(false);
      const added = onCollect(point.artifact);
      setIsNew(added);
      setRevealed(true);
      scanTimerRef.current = null;
    }, 1550);
  };

  return (
    <div className="absolute inset-0 z-[78] flex flex-col bg-[#020c09]">
      <div className="relative z-20 flex shrink-0 items-center justify-between border-b border-white/10 bg-[#04130f]/95 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-jade/35 bg-jade/[0.08] text-jade">
            <ScanLine size={13} />
          </span>
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-gold/80">Дополненная реальность</p>
            <p className="text-[10px] font-semibold text-parchment/90">AR-видоискатель · {point.character.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`flex items-center gap-1 rounded-full border px-2 py-1 text-[7px] font-bold uppercase tracking-[0.1em] ${cameraState === 'active' ? 'border-jade/30 bg-jade/[0.07] text-jade/85' : 'border-gold/20 bg-gold/[0.05] text-gold-soft/65'}`}>
            {cameraState === 'active' ? <Camera size={8} /> : <CameraOff size={8} />}
            {cameraState === 'active' ? 'Live' : 'AR-сцена'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-parchment/70"
            aria-label="Закрыть AR-режим"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <DuskParkScene point={point} />
        {cameraState === 'active' ? (
          <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <video ref={videoRef} autoPlay playsInline muted className="hidden" />
        )}

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_32%,rgba(2,12,9,0.5)_100%)]" />

        <div className="pointer-events-none absolute inset-x-6 top-24 bottom-36">
          <span className="absolute left-0 top-0 h-7 w-7 border-l border-t border-jade/70" />
          <span className="absolute right-0 top-0 h-7 w-7 border-r border-t border-jade/70" />
          <span className="absolute bottom-0 left-0 h-7 w-7 border-b border-l border-jade/70" />
          <span className="absolute bottom-0 right-0 h-7 w-7 border-b border-r border-jade/70" />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-jade/25" />
              <span className="absolute inset-4 rounded-full border border-jade/18" />
              <span className="absolute inset-[42%] rounded-full border border-gold/50" />
              <Crosshair size={24} className="text-jade/60" strokeWidth={1} />
              <span className="absolute -left-5 top-1/2 h-px w-4 bg-jade/60" />
              <span className="absolute -right-5 top-1/2 h-px w-4 bg-jade/60" />
              <span className="absolute -top-5 left-1/2 h-4 w-px bg-jade/60" />
              <span className="absolute -bottom-5 left-1/2 h-4 w-px bg-jade/60" />
            </div>
          </div>

          <div className="absolute left-0 top-5 flex items-center gap-1.5 text-[7.5px] uppercase tracking-[0.15em] text-jade/65">
            <span className="pulse-dot h-1 w-1 rounded-full bg-jade" />
            Сканирование пространства
          </div>
          <div className="absolute right-0 top-5 text-[7.5px] font-mono text-sage/40">54.51° N · 36.26° E</div>

          {scanning ? <div className="scan-line top-1/3" /> : null}

          <div className="absolute inset-x-0 bottom-5 flex flex-col items-center">
            <span className="flex items-center gap-1.5 rounded-full border border-jade/20 bg-[#04130f]/60 px-3 py-1 text-[8px] text-sage/60 backdrop-blur">
              <Info size={9} className="text-jade/70" />
              {scanning ? 'Распознаём исторический объект...' : 'Держите телефон неподвижно'}
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-gold/15 bg-gradient-to-t from-[#03110d] via-[#03110d]/95 to-[#03110d]/20 px-4 pb-4 pt-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[7.5px] font-bold uppercase tracking-[0.17em] text-gold/70">
                <Sparkles size={9} />
                AR-объект точки {point.number}
              </div>
              <h3 className="mt-1 font-display text-[22px] font-semibold leading-none text-parchment">{point.artifact.name}</h3>
              <p className="mt-1.5 flex items-center gap-1.5 text-[8.5px] text-sage/50">
                <Gem size={9} className="text-gold/60" />
                {point.artifact.material}
              </p>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.06] text-gold">
              <Crosshair size={15} />
            </span>
          </div>

          <button
            type="button"
            onClick={startScan}
            disabled={scanning}
            className="btn-gold mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-[10.5px] font-extrabold uppercase tracking-[0.04em] disabled:cursor-wait"
          >
            {scanning ? <Loader2 size={16} className="animate-spin" /> : <ScanLine size={16} />}
            {scanning ? 'Сканируем объект...' : 'Сканировать объект'}
          </button>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-[7.5px] text-sage/30">
            <Camera size={9} />
            {cameraState === 'active' ? 'Камера активна · наведите на объект' : 'Камера недоступна · включён атмосферный AR-слой'}
          </p>
        </div>

        {scanning ? (
          <div className="pointer-events-none absolute inset-x-6 top-1/2 z-10">
            <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-jade/30 bg-[#03110d]/85 px-3 py-1.5 text-[8px] font-semibold text-jade backdrop-blur">
              <Loader2 size={10} className="animate-spin" />
              Сопоставляем с архивом Kandinsky 3.1
            </div>
          </div>
        ) : null}
      </div>

      {revealed ? (
        <ArtifactReveal
          artifact={point.artifact}
          point={point}
          isNew={isNew}
          onClose={onClose}
          onBackToAr={() => setRevealed(false)}
        />
      ) : null}
    </div>
  );
}
