import { AUDIENCES, GENRES, PRESETS, TITLES, TONE_TAGLINES } from '../data/presets.js';

const GEO_SUFFIXES = new Set([
  'погост',
  'парк',
  'усадьба',
  'усадьбы',
  'грот',
  'каньон',
  'штольня',
  'штольни',
  'озеро',
  'озера',
  'река',
  'реки',
  'гора',
  'горы',
  'роща',
  'рощи',
  'мельница',
  'мельницы',
  'часовня',
  'часовни',
  'лавка',
  'контора',
  'галерея',
  'тропа',
  'тропы',
  'пруд',
  'бора',
  'бор',
  'пристань',
  'жила',
  'жилы',
  'долина',
  'слобода',
  'село',
  'деревня',
  'город',
  'монастырь',
  'кремль',
  'берег',
  'остров',
  'мыс',
  'холм',
  'овраг',
  'ущелье',
  'пещера',
  'аллея',
  'липовая',
  'сень',
  'гряда',
]);

const STOP_WORDS = new Set([
  'в',
  'во',
  'на',
  'по',
  'из',
  'от',
  'до',
  'у',
  'к',
  'ко',
  'с',
  'со',
  'о',
  'об',
  'и',
  'а',
  'но',
  'или',
  'не',
  'ни',
  'же',
  'ли',
  'бы',
  'это',
  'этот',
  'эта',
  'эти',
  'тот',
  'та',
  'те',
  'там',
  'тут',
  'где',
  'когда',
  'как',
  'что',
  'чтобы',
  'кто',
  'чем',
  'при',
  'для',
  'без',
  'под',
  'над',
  'за',
  'через',
  'после',
  'перед',
  'между',
  'также',
  'только',
  'даже',
  'уже',
  'ещё',
  'еще',
  'очень',
  'самый',
  'самая',
  'самые',
  'весь',
  'вся',
  'все',
  'один',
  'одна',
  'два',
  'три',
  'старый',
  'старая',
  'старое',
  'старые',
  'старинный',
  'старинная',
  'старинное',
  'древний',
  'древняя',
  'большой',
  'большая',
  'малый',
  'малая',
  'первый',
  'первая',
  'последний',
  'новая',
  'новый',
  'главный',
  'главная',
  'каменный',
  'каменная',
  'каменные',
  'северный',
  'северная',
  'южный',
  'южная',
  'здешний',
  'местный',
  'местная',
  'говорят',
  'предание',
  'легенда',
  'история',
  'место',
  'люди',
  'годы',
  'год',
  'век',
  'века',
  'раз',
  'сегодня',
  'потом',
  'теперь',
  'здесь',
  'его',
  'её',
  'их',
  'мы',
  'вы',
  'я',
  'они',
  'он',
  'она',
  'оно',
  'который',
  'которая',
  'которые',
  'которого',
  'которой',
  'этого',
  'этой',
  'этих',
  'всех',
  'всё',
  'все',
  'свой',
  'своя',
  'свои',
  'своего',
  'своей',
  'нашли',
  'найден',
  'найдена',
  'стоит',
  'стоят',
  'был',
  'была',
  'были',
  'есть',
  'нет',
]);

const NAME_HINTS = new Set([
  'еремей',
  'еремея',
  'марфа',
  'марфы',
  'афанасий',
  'афанасия',
  'никифор',
  'никифора',
  'влас',
  'власа',
  'савва',
  'саввы',
  'фома',
  'фомы',
  'семён',
  'семена',
  'семёна',
  'иван',
  'ивана',
  'пётр',
  'петра',
  'петр',
  'петра',
  'мария',
  'марии',
  'анна',
  'анны',
  'ольга',
  'ольги',
  'василий',
  'василия',
  'григорий',
  'григория',
]);

function normalizeText(value) {
  return value
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[«»"'“”]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function canonical(value) {
  const key = normalizeText(value)
    .replace(/[^a-zа-я0-9]+/gi, '')
    .replace(/ё/g, 'е');
  return key.slice(0, 8);
}

function matchesLoose(text, phrase) {
  const haystack = normalizeText(text);
  const parts = normalizeText(phrase)
    .split(/\s+/)
    .filter((part) => part.length > 3 && !STOP_WORDS.has(part));
  if (!parts.length) {
    return false;
  }
  return parts.every((part) => {
    const stem = part.slice(0, Math.max(4, Math.min(part.length - 1, 6)));
    return haystack.includes(stem);
  });
}

function extractCapitalized(text) {
  const found = [];
  const sentences = text.split(/[.!?;\n]+/);
  const wordPattern = /[А-ЯЁ][а-яё-]{2,}/g;

  sentences.forEach((rawSentence) => {
    const sentence = rawSentence.trim();
    if (!sentence) {
      return;
    }
    const matches = Array.from(sentence.matchAll(wordPattern));
    matches.forEach((match, index) => {
      const word = match[0];
      const lower = word.toLowerCase();
      const isSentenceStart = index === 0 && match.index === 0;
      const tail = sentence.slice(match.index + word.length).trimStart();
      const nextLowerMatch = tail.match(/^([а-яё-]{3,})/);
      const nextLower = nextLowerMatch ? nextLowerMatch[1].toLowerCase() : '';
      const knownName = NAME_HINTS.has(lower);
      const geoPair = nextLower && GEO_SUFFIXES.has(nextLower);
      const isGeoWord = GEO_SUFFIXES.has(lower);

      if (isSentenceStart && !knownName && !geoPair && !isGeoWord) {
        return;
      }
      if (STOP_WORDS.has(lower)) {
        return;
      }
      if (geoPair) {
        found.push(`${word} ${nextLower}`);
        return;
      }
      found.push(word);
    });
  });

  return found;
}

export function extractKeywords(text, preset = null) {
  const source = String(text || '').trim();
  if (!source) {
    return [];
  }

  const results = [];
  const seen = new Set();

  const addKeyword = (value) => {
    const clean = String(value || '').replace(/\s+/g, ' ').trim();
    if (clean.length < 3) {
      return;
    }
    const key = canonical(clean);
    if (!key || seen.has(key)) {
      return;
    }
    seen.add(key);
    results.push(clean);
  };

  if (preset?.curatedKeywords) {
    preset.curatedKeywords.forEach((keyword) => {
      if (matchesLoose(source, keyword)) {
        addKeyword(keyword);
      }
    });
  }

  extractCapitalized(source).forEach((keyword) => {
    addKeyword(keyword);
  });

  return results.slice(0, 8);
}

function keywordPresentInText(keyword, text) {
  const key = canonical(keyword);
  if (!key) {
    return true;
  }
  return canonical(text).includes(key);
}

const NAME_FORMS = {
  ивана: 'Иван',
  ивану: 'Иван',
  иваном: 'Иван',
  иване: 'Иван',
  петра: 'Пётр',
  петру: 'Пётр',
  петром: 'Пётр',
  петре: 'Пётр',
  семёна: 'Семён',
  семёну: 'Семён',
  семёном: 'Семён',
  семёне: 'Семён',
  еремея: 'Еремей',
  еремею: 'Еремей',
  еремеем: 'Еремей',
  марфы: 'Марфа',
  марфе: 'Марфа',
  марфу: 'Марфа',
  афанасия: 'Афанасий',
  афанасию: 'Афанасий',
  никифора: 'Никифор',
  никифору: 'Никифор',
  власа: 'Влас',
  власу: 'Влас',
  саввы: 'Савва',
  савве: 'Савва',
  фомы: 'Фома',
  фоме: 'Фома',
};

function isKnownName(keyword) {
  const normalized = normalizeText(keyword);
  if (normalized.includes(' ')) {
    return false;
  }
  return Boolean(NAME_FORMS[normalized]) || NAME_HINTS.has(normalized);
}

function normalizeKnownName(keyword) {
  const normalized = normalizeText(keyword);
  return NAME_FORMS[normalized] || null;
}

function isSuffixFriendly(keyword) {
  const clean = String(keyword || '').trim();
  if (!clean) {
    return false;
  }
  if (isKnownName(clean)) {
    return true;
  }
  const normalized = normalizeText(clean);
  if (normalized.split(/\s+/).length > 1) {
    return true;
  }
  return !/(ой|ого|ому|ым|ая|ые|ых|ую|ей|ами|ах|ом|ем)$/.test(normalized);
}

const ROLE_WORDS = new Set(['мастер', 'купец', 'берегиня', 'плотник', 'рудознатец', 'приказчик', 'хозяйка', 'хозяин', 'дух']);

function keywordOverlapsText(keyword, text) {
  const source = normalizeText(text);
  const words = normalizeText(keyword)
    .split(/\s+/)
    .filter((word) => word.length > 3 && word !== 'xviii');
  if (!words.length) {
    return false;
  }
  return words.some((word) => {
    const stem = word.slice(0, Math.max(4, Math.min(word.length - 1, 6)));
    return source.includes(stem);
  });
}

function displayKeyword(keyword) {
  const clean = String(keyword || '').trim();
  if (!clean) {
    return '';
  }
  const normalizedName = normalizeKnownName(clean);
  if (normalizedName) {
    return normalizedName;
  }
  const words = clean.split(/\s+/);
  const firstLower = words[0].toLowerCase();
  if (ROLE_WORDS.has(firstLower)) {
    const properWord = words.find((word) => /^[А-ЯЁ]/.test(word) && !ROLE_WORDS.has(word.toLowerCase()));
    if (properWord) {
      return normalizeKnownName(properWord) || properWord;
    }
  }
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

function orderedKeywordStart(keywords, index) {
  if (!keywords.length) {
    return [];
  }
  const offset = index % keywords.length;
  return [...keywords.slice(offset), ...keywords.slice(0, offset)];
}

function choosePointKeyword(keywords, point, scene, index) {
  if (!keywords.length) {
    return '';
  }
  const context = normalizeText(`${point.title} ${point.place} ${point.character?.name || ''} ${scene}`);
  const scored = keywords.map((keyword, keywordIndex) => {
    const words = normalizeText(keyword)
      .split(/\s+/)
      .filter((word) => word.length > 3 && word !== 'xviii');
    const score = words.reduce((total, word) => {
      const stem = word.slice(0, Math.max(4, Math.min(word.length - 1, 6)));
      return total + (context.includes(stem) ? 1 : 0);
    }, 0);
    return { keyword, score, keywordIndex };
  });
  const matched = scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.keywordIndex - b.keywordIndex);
  if (matched.length) {
    return matched[0].keyword;
  }
  const fallback = orderedKeywordStart(keywords, index);
  return fallback.find((keyword) => !keywordOverlapsText(keyword, point.title)) || fallback[0];
}

export function buildQuest({ preset, archiveText, audience, genre }) {
  const safePreset = preset || PRESETS[0];
  const safeAudience = AUDIENCES.find((item) => item.id === audience) || AUDIENCES[0];
  const safeGenre = GENRES.find((item) => item.id === genre) || GENRES[0];
  const sourceText = archiveText?.trim() || safePreset.archiveText;
  const isCustomArchive = normalizeText(sourceText) !== normalizeText(safePreset.archiveText);
  const keywords = extractKeywords(sourceText, safePreset);
  const baseTitle = TITLES[safePreset.id]?.[safeGenre.id] || 'Тропа памяти';
  const customCandidates = keywords.filter((keyword) => !keywordOverlapsText(keyword, baseTitle));
  const friendlyCandidates = customCandidates.filter(isSuffixFriendly);
  const titleName = friendlyCandidates.find((keyword) => isKnownName(keyword));
  const titleKeyword = isCustomArchive
    ? titleName || friendlyCandidates[0] || customCandidates[0] || keywords[0] || ''
    : '';
  const title = titleKeyword ? `${baseTitle} · ${displayKeyword(titleKeyword)}` : baseTitle;
  const usedSuffixes = new Set();

  const points = safePreset.points.map((point, index) => {
    const scene = point.scenes[safeAudience.id];
    const pointKeyword = choosePointKeyword(keywords, point, scene, index);
    let suffixKeyword =
      isSuffixFriendly(pointKeyword) && !keywordOverlapsText(pointKeyword, point.title) ? pointKeyword : '';
    if (isCustomArchive && (!suffixKeyword || usedSuffixes.has(suffixKeyword))) {
      const ordered = orderedKeywordStart(keywords, index);
      suffixKeyword =
        ordered.find(
          (keyword) =>
            isSuffixFriendly(keyword) &&
            !usedSuffixes.has(keyword) &&
            !keywordOverlapsText(keyword, point.title) &&
            !keywordOverlapsText(keyword, baseTitle),
        ) || '';
    }
    const suffixAllowed =
      isCustomArchive &&
      suffixKeyword &&
      !usedSuffixes.has(suffixKeyword) &&
      !keywordOverlapsText(suffixKeyword, point.title);
    if (suffixAllowed) {
      usedSuffixes.add(suffixKeyword);
    }
    const suffix = suffixAllowed ? ` · ${displayKeyword(suffixKeyword)}` : '';
    const sceneHasKeyword = pointKeyword ? keywordPresentInText(pointKeyword, scene) : true;
    const archiveSentence =
      pointKeyword && !sceneHasKeyword
        ? `\n\nВ старой описи рядом с этим местом отмечено: «${pointKeyword}».`
        : '';
    const archiveNoteKeywords = keywords.length
      ? [pointKeyword, ...keywords.filter((keyword) => keyword !== pointKeyword)].slice(0, 3)
      : safePreset.curatedKeywords.slice(0, 3);

    return {
      ...point,
      index,
      number: ['I', 'II', 'III', 'IV'][index],
      displayTitle: `${point.title}${suffix}`,
      pointKeyword,
      scene: `${scene}${archiveSentence}`,
      archiveNote: `В архивной справке рядом: ${archiveNoteKeywords.join(' · ')}.`,
      description: pointKeyword
        ? `${point.place}. ${pointKeyword} — один из смысловых следов, который ИИ связал с этой сценой.`
        : `${point.place}. Сцена собрана по мотивам архивной справки.`,
    };
  });

  return {
    id: `${safePreset.id}-${safeAudience.id}-${safeGenre.id}-${Date.now()}`,
    title,
    baseTitle,
    presetId: safePreset.id,
    presetLabel: safePreset.label,
    location: safePreset.location,
    accent: safePreset.accent,
    duration: 45,
    distance: '1,8 км',
    archiveText: sourceText,
    keywords,
    isCustomArchive,
    points,
    audience: safeAudience,
    genre: safeGenre,
    tagline: TONE_TAGLINES[safeAudience.id],
    generatedAt: new Date(),
    stats: {
      scenes: points.length,
      branches: points.length * 2,
      artifacts: points.length,
      characters: points.length,
    },
  };
}

export function createInitialQuest() {
  const preset = PRESETS[0];
  return buildQuest({
    preset,
    archiveText: preset.archiveText,
    audience: 'family',
    genre: 'slavic',
  });
}

export const ROMAN = ['I', 'II', 'III', 'IV'];

export function formatPoints(value) {
  return new Intl.NumberFormat('ru-RU').format(value);
}

export function formatRub(value) {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
}
