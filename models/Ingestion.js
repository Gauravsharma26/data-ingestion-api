// models/Ingestion.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ingestionSchema = new mongoose.Schema({
  ingestion_id: { type: String, default: uuidv4 },
  priority: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ingestion', ingestionSchema);
