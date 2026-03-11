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
  score: Number,
  summary: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Compatibility', compatibilitySchema);

