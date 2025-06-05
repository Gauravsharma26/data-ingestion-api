const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ingestRoute = require('./routes/ingest');
const statusRoute = require('./routes/status');
const { processBatches } = require('./processor');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  processBatches(); // Start batch processor
});

app.use('/ingest', ingestRoute);
app.use('/status', statusRoute);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
