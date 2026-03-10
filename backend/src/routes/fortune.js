const express = require('express');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const Fortune = require('../models/Fortune');
const {
  ZODIAC_META,
  getZodiacSign,
  generateLuckyNumbers,
  buildMockHoroscope,
  buildLoveCompatibility,
  buildMarriagePrediction,
  buildCareerWealth,
} = require('../lib/zodiac');

const router = express.Router();

router.post('/fortune', async (req, res) => {
  try {
    const { name, dob, gender } = req.body || {};

    if (!name || !dob) {
      return res.status(400).json({ error: 'Name and dob are required.' });
    }

    const zodiacSign = getZodiacSign(dob);
    const meta = ZODIAC_META[zodiacSign] || {
      traits: ['Mysterious', 'Unconventional'],
      colors: ['Indigo'],
      days: ['Sunday'],
      gemstones: ['Quartz'],
    };

    const luckyNumbers = generateLuckyNumbers();
    const love = buildLoveCompatibility(zodiacSign);
    const marriagePrediction = buildMarriagePrediction();
    const careerWealth = buildCareerWealth(zodiacSign);
    const dailyHoroscope = buildMockHoroscope(zodiacSign, name);

    const qrId = uuidv4();
    const baseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:5173';
    const qrTargetUrl = `${baseUrl}/fortune/${qrId}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrTargetUrl);

    const fortune = new Fortune({
      userName: name,
      dob,
      gender: gender || null,
      zodiacSign,
      dailyHoroscope,
      loveCompatibilitySummary: love.summary,
      loveScore: love.score,
      marriagePrediction,
      careerWealth,
      luckyNumbers,
      luckyColors: meta.colors,
      luckyDays: meta.days,
      luckyGemstones: meta.gemstones,
      personalityTraits: meta.traits,
      qrId,
    });

    await fortune.save();

    return res.status(201).json({
      fortune,
      qrCodeDataUrl,
    });
  } catch (err) {
    console.error('Error generating fortune', err);
    return res.status(500).json({ error: 'Failed to generate fortune.' });
  }
});

router.get('/fortune/:qrId', async (req, res) => {
  try {
    const { qrId } = req.params;
    const fortune = await Fortune.findOne({ qrId }).lean();
    if (!fortune) {
      return res.status(404).json({ error: 'Fortune not found.' });
    }
    return res.json({ fortune });
  } catch (err) {
    console.error('Error fetching fortune', err);
    return res.status(500).json({ error: 'Failed to fetch fortune.' });
  }
});

module.exports = router;

