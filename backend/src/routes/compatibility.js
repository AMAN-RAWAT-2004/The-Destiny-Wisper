const express = require('express');
const { getZodiacSign, getRandomInt } = require('../lib/zodiac');

const router = express.Router();

router.post('/compatibility', async (req, res) => {
  try {
    const { personA, personB } = req.body || {};
    if (!personA?.dob || !personB?.dob) {
      return res
        .status(400)
        .json({ error: 'personA.dob and personB.dob are required.' });
    }

    const signA = getZodiacSign(personA.dob);
    const signB = getZodiacSign(personB.dob);

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

    const elA = elementMap[signA];
    const elB = elementMap[signB];

    let score = getRandomInt(55, 92);
    if (signA === signB) score += 6;
    if (elA && elB && elA === elB) score += 8;
    score = Math.max(1, Math.min(99, score));

    const bestAreas = [
      'communication',
      'trust',
      'shared goals',
      'humor',
      'emotional support',
      'adventure',
    ];
    const challenges = ['patience', 'jealousy', 'timing', 'work-life balance', 'overthinking'];

    const summary =
      `${score}% – ` +
      `Strong in ${bestAreas[getRandomInt(0, bestAreas.length - 1)]}, ` +
      `watch ${challenges[getRandomInt(0, challenges.length - 1)]}. ` +
      `(${signA} + ${signB})`;

    return res.json({
      score,
      summary,
      personA: { ...personA, zodiacSign: signA },
      personB: { ...personB, zodiacSign: signB },
    });
  } catch (err) {
    console.error('Error calculating compatibility', err);
    return res.status(500).json({ error: 'Failed to calculate compatibility.' });
  }
});

module.exports = router;

