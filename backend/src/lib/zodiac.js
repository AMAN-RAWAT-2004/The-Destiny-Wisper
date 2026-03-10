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

module.exports = {
  ZODIAC_META,
  getZodiacSign,
  getRandomInt,
  generateLuckyNumbers,
  buildMockHoroscope,
  buildLoveCompatibility,
  buildMarriagePrediction,
  buildCareerWealth,
};

