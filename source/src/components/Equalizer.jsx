import { memo } from 'react';

const BARS = [
  { height: 13, duration: 760, delay: -120 },
  { height: 19, duration: 620, delay: -390 },
  { height: 25, duration: 860, delay: -220 },
  { height: 15, duration: 530, delay: -80 },
  { height: 22, duration: 700, delay: -460 },
  { height: 27, duration: 900, delay: -310 },
  { height: 17, duration: 570, delay: -150 },
  { height: 24, duration: 790, delay: -520 },
  { height: 14, duration: 650, delay: -30 },
  { height: 21, duration: 840, delay: -370 },
  { height: 18, duration: 600, delay: -250 },
  { height: 12, duration: 720, delay: -440 },
];

function Equalizer({ active = false, tone = 'gold', className = '' }) {
  return (
    <div
      className={`flex h-7 items-end gap-[2.5px] ${className}`}
      role="img"
      aria-label={active ? 'Живой эквалайзер: голос звучит' : 'Эквалайзер остановлен'}
    >
      {BARS.map((bar, index) => (
        <span
          key={index}
          className="eq-bar"
          style={{
            height: `${bar.height}px`,
            animationDuration: `${bar.duration}ms`,
            animationDelay: `${bar.delay}ms`,
            animationPlayState: active ? 'running' : 'paused',
            opacity: active ? 0.88 : 0.22,
            background:
              tone === 'jade'
                ? 'linear-gradient(180deg, #8DE8DE, #2EC4B6)'
                : 'linear-gradient(180deg, #F4B860, #2EC4B6)',
            transform: active ? undefined : 'scaleY(0.22)',
          }}
        />
      ))}
    </div>
  );
}

export default memo(Equalizer);
