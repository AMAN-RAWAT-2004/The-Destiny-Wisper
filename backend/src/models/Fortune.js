const mongoose = require('mongoose');

const fortuneSchema = new mongoose.Schema({
  userName: String,
  dob: Date,
  gender: String,
  zodiacSign: String,
  dailyHoroscope: String,
  loveCompatibilitySummary: String,
  loveScore: Number,
  marriagePrediction: String,
  careerWealth: String,
  luckyNumbers: [Number],
  luckyColors: [String],
  luckyDays: [String],
  luckyGemstones: [String],
  personalityTraits: [String],
  tarotCard: String,
  luckyTime: String,
  luckyDirection: String,
  luckyObject: String,
  luckySymbol: String,
  luckyPlace: String,
  luckyFood: String,
  luckyDrink: String,
  luckyActivity: String,
  wealthScore: Number,
  destinyScore: Number,
  auraColor: String,
  energyLevel: String,
  upcomingOpportunity: String,
  personalityInsight: String,
  fateMessage: String,
  qrId: { type: String, index: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Fortune', fortuneSchema);

