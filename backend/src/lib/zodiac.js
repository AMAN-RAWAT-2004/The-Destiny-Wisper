const ZODIAC_META = {
  Aries: {
    traits: ['Bold', 'Energetic', 'Adventurous'],
    colors: ['Red', 'Scarlet'],
    days: ['Tuesday'],
    gemstones: ['Diamond'],
  },
  Taurus: {
    traits: ['Patient', 'Reliable', 'Grounded'],
    colors: ['Green', 'Pink'],
    days: ['Friday'],
    gemstones: ['Emerald'],
  },
  Gemini: {
    traits: ['Curious', 'Social', 'Witty'],
    colors: ['Yellow', 'Light Green'],
    days: ['Wednesday'],
    gemstones: ['Agate'],
  },
  Cancer: {
    traits: ['Nurturing', 'Intuitive', 'Protective'],
    colors: ['Silver', 'White'],
    days: ['Monday'],
    gemstones: ['Pearl'],
  },
  Leo: {
    traits: ['Confident', 'Dramatic', 'Warm-hearted'],
    colors: ['Gold', 'Orange'],
    days: ['Sunday'],
    gemstones: ['Ruby'],
  },
  Virgo: {
    traits: ['Analytical', 'Practical', 'Helpful'],
    colors: ['Navy', 'Beige'],
    days: ['Wednesday'],
    gemstones: ['Peridot'],
  },
  Libra: {
    traits: ['Diplomatic', 'Charming', 'Fair-minded'],
    colors: ['Pink', 'Blue'],
    days: ['Friday'],
    gemstones: ['Opal'],
  },
  Scorpio: {
    traits: ['Intense', 'Passionate', 'Mysterious'],
    colors: ['Maroon', 'Black'],
    days: ['Tuesday'],
    gemstones: ['Topaz'],
  },
  Sagittarius: {
    traits: ['Optimistic', 'Honest', 'Adventurous'],
    colors: ['Purple', 'Blue'],
    days: ['Thursday'],
    gemstones: ['Turquoise'],
  },
  Capricorn: {
    traits: ['Disciplined', 'Ambitious', 'Patient'],
    colors: ['Brown', 'Dark Green'],
    days: ['Saturday'],
    gemstones: ['Garnet'],
  },
  Aquarius: {
    traits: ['Innovative', 'Independent', 'Humanitarian'],
    colors: ['Electric Blue', 'Turquoise'],
    days: ['Saturday'],
    gemstones: ['Amethyst'],
  },
  Pisces: {
    traits: ['Empathetic', 'Dreamy', 'Artistic'],
    colors: ['Sea Green', 'Lavender'],
    days: ['Thursday'],
    gemstones: ['Aquamarine'],
  },
};

function getZodiacSign(dateString) {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';

  return 'Unknown';
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateLuckyNumbers() {
  const count = getRandomInt(3, 7);
  const nums = new Set();
  while (nums.size < count) {
    nums.add(getRandomInt(1, 99));
  }
  return Array.from(nums);
}

function buildMockHoroscope(zodiacSign, name) {
  return `${name}, the stars around ${zodiacSign} suggest a day of subtle opportunities. Stay open to small signs, and you could stumble into a lucky twist of fate.`;
}

function buildLoveCompatibility(zodiacSign) {
  const score = getRandomInt(60, 98);
  const hints = [
    'Your love life improves after age 24.',
    'You attract partners who mirror your hidden strengths.',
    'Patience and honest communication unlock your best relationships.',
    'Romance blooms when you trust your intuition.',
  ];
  const bestMatches = {
    Fire: ['Aries', 'Leo', 'Sagittarius'],
    Earth: ['Taurus', 'Virgo', 'Capricorn'],
    Air: ['Gemini', 'Libra', 'Aquarius'],
    Water: ['Cancer', 'Scorpio', 'Pisces'],
  };

  const elementMap = {
    Aries: 'Fire',
    Leo: 'Fire',
    Sagittarius: 'Fire',
    Taurus: 'Earth',
    Virgo: 'Earth',
    Capricorn: 'Earth',
    Gemini: 'Air',
    Libra: 'Air',
    Aquarius: 'Air',
    Cancer: 'Water',
    Scorpio: 'Water',
    Pisces: 'Water',
  };

  const element = elementMap[zodiacSign] || 'Fire';
  const matches = bestMatches[element] || [];
  const hint = hints[getRandomInt(0, hints.length - 1)];

  return {
    score,
    summary: `${score}% – ${hint} Best matches: ${matches.join(', ')}.`,
  };
}

function buildMarriagePrediction() {
  const from = getRandomInt(24, 28);
  const to = from + getRandomInt(1, 3);
  return `Likely between ages ${from}–${to} with a supportive, growth-oriented partner.`;
}

function buildCareerWealth(zodiacSign) {
  const messagesByGroup = {
    Fire: 'Strong potential in leadership, entrepreneurship, and bold creative ventures.',
    Earth: 'Steady growth in finance, real estate, and long-term wealth building.',
    Air: 'Opportunities in technology, communication, and ideas-driven careers.',
    Water: 'Success in healing, counseling, art, and emotionally resonant work.',
  };

  const elementMap = {
    Aries: 'Fire',
    Leo: 'Fire',
    Sagittarius: 'Fire',
    Taurus: 'Earth',
    Virgo: 'Earth',
    Capricorn: 'Earth',
    Gemini: 'Air',
    Libra: 'Air',
    Aquarius: 'Air',
    Cancer: 'Water',
    Scorpio: 'Water',
    Pisces: 'Water',
  };

  const element = elementMap[zodiacSign] || 'Air';
  const base = messagesByGroup[element];
  const bonus = [
    ' A financial surprise may appear when you least expect it.',
    ' Consistency beats speed for you this year.',
    ' Collaboration with the right person multiplies your success.',
  ];

  return base + bonus[getRandomInt(0, bonus.length - 1)];
}

function pickTarotCard(zodiacSign) {
  const majorArcana = [
    'The Fool',
    'The Magician',
    'The High Priestess',
    'The Empress',
    'The Emperor',
    'The Hierophant',
    'The Lovers',
    'The Chariot',
    'Strength',
    'The Hermit',
    'Wheel of Fortune',
    'Justice',
    'The Hanged Man',
    'Death',
    'Temperance',
    'The Devil',
    'The Tower',
    'The Star',
    'The Moon',
    'The Sun',
    'Judgement',
    'The World',
  ];

  // Give fire signs slightly more dynamic cards etc., but keep random.
  const dynamicCards = ['The Magician', 'The Chariot', 'Wheel of Fortune', 'The Star'];
  const deepCards = ['The Hermit', 'The High Priestess', 'Death', 'The Moon'];

  if (['Aries', 'Leo', 'Sagittarius'].includes(zodiacSign)) {
    return dynamicCards[getRandomInt(0, dynamicCards.length - 1)];
  }
  if (['Cancer', 'Scorpio', 'Pisces'].includes(zodiacSign)) {
    return deepCards[getRandomInt(0, deepCards.length - 1)];
  }
  return majorArcana[getRandomInt(0, majorArcana.length - 1)];
}

function buildLuckyTime() {
  const slots = [
    '06:00–08:00 AM',
    '08:00–10:00 AM',
    '10:00 AM–12:00 PM',
    '12:00–02:00 PM',
    '02:00–04:00 PM',
    '04:00–06:00 PM',
    '06:00–08:00 PM',
    'Late night reflection hour',
  ];
  return slots[getRandomInt(0, slots.length - 1)];
}

function buildLuckyDirection() {
  const dirs = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];
  return dirs[getRandomInt(0, dirs.length - 1)];
}

function buildLuckyObject(zodiacSign) {
  const generic = [
    'a small key',
    'a handwritten note',
    'a favorite mug',
    'a simple ring',
    'a worn book',
    'a cozy hoodie',
  ];
  const fire = ['a candle', 'a lighter', 'a red accessory'];
  const earth = ['a plant', 'a coin', 'a stone from outside'];
  const air = ['a pen', 'a notebook', 'a pair of headphones'];
  const water = ['a seashell', 'a glass of water', 'a favorite perfume'];

  if (['Aries', 'Leo', 'Sagittarius'].includes(zodiacSign)) return fire[getRandomInt(0, fire.length - 1)];
  if (['Taurus', 'Virgo', 'Capricorn'].includes(zodiacSign)) return earth[getRandomInt(0, earth.length - 1)];
  if (['Gemini', 'Libra', 'Aquarius'].includes(zodiacSign)) return air[getRandomInt(0, air.length - 1)];
  if (['Cancer', 'Scorpio', 'Pisces'].includes(zodiacSign)) return water[getRandomInt(0, water.length - 1)];
  return generic[getRandomInt(0, generic.length - 1)];
}

function buildLuckySymbol() {
  const symbols = ['★ Star', '∞ Infinity', '♈ Aries glyph', '♎ Balance scales', '☯ Yin–Yang', '♥ Heart', '♣ Clover', '☀ Sun'];
  return symbols[getRandomInt(0, symbols.length - 1)];
}

function buildWealthScore(zodiacSign) {
  const baseByElement = {
    Fire: [65, 95],
    Earth: [60, 98],
    Air: [55, 92],
    Water: [50, 90],
  };

  const elementMap = {
    Aries: 'Fire',
    Leo: 'Fire',
    Sagittarius: 'Fire',
    Taurus: 'Earth',
    Virgo: 'Earth',
    Capricorn: 'Earth',
    Gemini: 'Air',
    Libra: 'Air',
    Aquarius: 'Air',
    Cancer: 'Water',
    Scorpio: 'Water',
    Pisces: 'Water',
  };

  const el = elementMap[zodiacSign] || 'Air';
  const [min, max] = baseByElement[el];
  return getRandomInt(min, max);
}

function buildPersonalityInsight(zodiacSign) {
  const generic = [
    'You are entering a phase where your quiet strengths start speaking louder than your doubts.',
    'Your ability to adapt is about to open a door you assumed was closed.',
    'You underestimate how inspiring you are to people who never say it out loud.',
  ];

  const bySign = {
    Aries: 'Your courage is your superpower, but your patience will unlock the next level of your story.',
    Taurus: 'Your steady nature calms others; just remember to move when life clearly invites you forward.',
    Gemini: 'Your questions are your magic—ask the right one this week and everything shifts.',
    Cancer: 'Your intuition already knows the answer; your mind is just taking time to catch up.',
    Leo: 'Spotlights are natural for you, but your quiet, generous moments are what truly shape your fate.',
    Virgo: 'Your attention to detail is sacred; don’t let perfection steal the joy of small progress.',
    Libra: 'You are learning that balance is not 50/50, but giving your energy to what actually loves you back.',
    Scorpio: 'Your depth can feel intense, but it is also why transformation finds you first.',
    Sagittarius: 'Your optimism is a compass—trust it, but let small routines turn your visions into reality.',
    Capricorn: 'Your discipline is building a future your past self never knew was possible.',
    Aquarius: 'Your ideas arrive early to the party; the world will catch up sooner than you think.',
    Pisces: 'Your dreams are not random; they are soft previews of paths you could choose.',
  };

  return bySign[zodiacSign] || generic[getRandomInt(0, generic.length - 1)];
}

function buildFateMessage(zodiacSign) {
  const lines = [
    'A small decision made with courage bends your path in a big way.',
    'Someone you almost gave up on may surprise you with quiet support.',
    'The next “no” you hear is actually clearing space for a louder “yes.”',
    'Your future self is proud of a boundary you are about to keep.',
    'The universe is not late—you are being paced, not punished.',
  ];

  return `${zodiacSign} energy surrounds you. ${lines[getRandomInt(0, lines.length - 1)]}`;
}
module.exports = {
  ZODIAC_META,
  getZodiacSign,
  getRandomInt,
  generateLuckyNumbers,
  buildMockHoroscope,
  buildLoveCompatibility,
  buildMarriagePrediction,
  buildCareerWealth,
  pickTarotCard,
  buildLuckyTime,
  buildLuckyDirection,
  buildLuckyObject,
  buildLuckySymbol,
  buildWealthScore,
  buildPersonalityInsight,
  buildFateMessage,
};

