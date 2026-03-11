const express = require('express');
const { getZodiacSign, getRandomInt } = require('../lib/zodiac');
const Compatibility = require('../models/Compatibility');

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

    const bestAreas = ['communication', 'trust', 'shared goals', 'humor', 'emotional support', 'adventure'];
    const challenges = ['patience', 'jealousy', 'timing', 'work-life balance', 'overthinking'];

    const summary =
      `${score}% – ` +
      `Strong in ${bestAreas[getRandomInt(0, bestAreas.length - 1)]}, ` +
      `watch ${challenges[getRandomInt(0, challenges.length - 1)]}. ` +
      `(${signA} + ${signB})`;

    // Richer compatibility text pools
    const relStyles = [
      'passionate and energetic',
      'balanced and emotionally supportive',
      'playful and adventurous',
      'deeply intuitive and romantic',
      'light-hearted yet quietly loyal',
    ];
    const attractionEnergyPool = [
      'Strong physical chemistry that sparks quickly',
      'A gentle pull that grows stronger over time',
      'Magnetic mental and emotional attraction',
      'Chemistry that flares when you share honest truth',
    ];
    const communicationStyles = [
      'You communicate best when both of you slow down and truly listen.',
      'Conversations between you can easily spark creativity and excitement.',
      'Honest emotional expression will strengthen your bond.',
      'Short daily check-ins keep you aligned and feeling seen.',
      'You thrive when difficult topics are approached with softness, not pressure.',
    ];
    const loveStrengths = [
      'You both bring out each other’s confidence.',
      'There is strong emotional curiosity between you.',
      'You inspire each other to grow beyond old limits.',
      'Your connection can feel like friendship and romance at the same time.',
      'You naturally find small rituals that make the bond feel special.',
    ];
    const possibleChallenges = [
      'Both partners may need to practice patience when stressed.',
      'Misunderstandings could arise if emotions are hidden.',
      'Balancing independence and closeness will be important.',
      'You may need to remember that you are on the same team during conflict.',
      'Overthinking could cloud what is actually simple and kind between you.',
    ];
    const emotionalConnections = [
      'You are capable of a deep, healing emotional connection if trust is nurtured.',
      'Your emotional bond may start softly but can become very strong over time.',
      'You sense each other’s moods more than you realise—use that awareness gently.',
      'When you feel safe, it becomes easy to share fears and dreams with each other.',
    ];
    const longTermPotentials = [
      'Long-term potential is strong if you keep choosing honest communication.',
      'This connection can last if both of you grow without trying to control each other.',
      'With shared goals and mutual respect, this bond can feel like home.',
      'Long-term, this pairing can teach both of you what loyal partnership truly means.',
    ];
    const romanticAdvicePool = [
      'Slow down your reactions and speed up your reassurance.',
      'Say the kind thing you are thinking instead of waiting for the perfect moment.',
      'Celebrate small moments together; they become the foundation of bigger love.',
      'Choose curiosity over assumptions when something feels off.',
    ];
    const bestRelationshipTypes = [
      'Supportive best friends with romantic spark',
      'Partners in growth and shared adventures',
      'Gentle healers for each other’s hearts',
      'Creative collaborators building a life together',
    ];

    const relationshipStyle = relStyles[getRandomInt(0, relStyles.length - 1)];
    const attractionEnergy = attractionEnergyPool[getRandomInt(0, attractionEnergyPool.length - 1)];
    const loveStrengthsText = loveStrengths[getRandomInt(0, loveStrengths.length - 1)];
    const possibleChallengesText = possibleChallenges[getRandomInt(0, possibleChallenges.length - 1)];
    const communicationStyle = communicationStyles[getRandomInt(0, communicationStyles.length - 1)];
    const emotionalConnection = emotionalConnections[getRandomInt(0, emotionalConnections.length - 1)];
    const longTermPotential = longTermPotentials[getRandomInt(0, longTermPotentials.length - 1)];
    const romanticAdvice = romanticAdvicePool[getRandomInt(0, romanticAdvicePool.length - 1)];
    const bestRelationshipType = bestRelationshipTypes[getRandomInt(0, bestRelationshipTypes.length - 1)];

    const doc = new Compatibility({
      personA: {
        name: personA.name || null,
        dob: personA.dob || null,
        gender: personA.gender || null,
        zodiacSign: signA,
      },
      personB: {
        name: personB.name || null,
        dob: personB.dob || null,
        gender: personB.gender || null,
        zodiacSign: signB,
      },
      compatibilityScore: score,
      summary,
      relationshipStyle,
      attractionEnergy,
      loveStrengths: loveStrengthsText,
      possibleChallenges: possibleChallengesText,
      communicationStyle,
      emotionalConnection,
      longTermPotential,
      romanticAdvice,
      bestRelationshipType,
    });

    await doc.save();

    return res.json({
      compatibilityScore: score,
      score,
      summary,
      relationshipStyle,
      attractionEnergy,
      loveStrengths: loveStrengthsText,
      possibleChallenges: possibleChallengesText,
      communicationStyle,
      emotionalConnection,
      longTermPotential,
      romanticAdvice,
      bestRelationshipType,
      personA: { ...personA, zodiacSign: signA },
      personB: { ...personB, zodiacSign: signB },
    });
  } catch (err) {
    console.error('Error calculating compatibility', err);
    return res.status(500).json({ error: 'Failed to calculate compatibility.' });
  }
});

module.exports = router;

