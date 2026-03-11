const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
  {
    name: String,
    dob: Date,
    gender: String,
    zodiacSign: String,
  },
  { _id: false },
);

const compatibilitySchema = new mongoose.Schema({
  personA: personSchema,
  personB: personSchema,
  compatibilityScore: Number,
  summary: String,
  relationshipStyle: String,
  attractionEnergy: String,
  loveStrengths: String,
  possibleChallenges: String,
  communicationStyle: String,
  emotionalConnection: String,
  longTermPotential: String,
  romanticAdvice: String,
  bestRelationshipType: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Compatibility', compatibilitySchema);

