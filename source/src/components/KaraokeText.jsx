import { useMemo } from 'react';

export default function KaraokeText({ text, progress = 0, playing = false, className = '' }) {
  const tokens = useMemo(() => String(text || '').split(/(\s+)/).filter(Boolean), [text]);
  const wordCount = useMemo(() => tokens.filter((token) => !/^\s+$/.test(token)).length, [tokens]);
  const spoken = progress >= 1 ? wordCount : Math.floor(progress * wordCount);
  const current = playing && progress > 0 && progress < 1 ? spoken : -1;
  let wordIndex = -1;

  return (
    <div className={`story-text ${className}`} aria-label={text}>
      {tokens.map((token, index) => {
        if (/^\s+$/.test(token)) {
          return <span key={`space-${index}`} aria-hidden="true">{token}</span>;
        }
        wordIndex += 1;
        const indexForWord = wordIndex;
        return (
          <span
            key={`word-${index}`}
            className="karaoke-word"
            data-spoken={indexForWord < spoken || progress >= 1}
            data-current={indexForWord === current}
          >
            {token}
          </span>
        );
      })}
    </div>
  );
}
