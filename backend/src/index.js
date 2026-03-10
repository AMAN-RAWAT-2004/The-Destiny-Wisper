const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const fortuneRoutes = require('./routes/fortune');
const compatibilityRoutes = require('./routes/compatibility');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', fortuneRoutes);
app.use('/api', compatibilityRoutes);

const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/fortune-guesser';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Fortune Guesser backend listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

