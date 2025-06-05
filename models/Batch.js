// models/Batch.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const batchSchema = new mongoose.Schema({
  batch_id: { type: String, default: uuidv4 },
  ingestion_id: String,
  ids: [Number],
  status: { type: String, enum: ['yet_to_start', 'triggered', 'completed'], default: 'yet_to_start' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Batch', batchSchema);
