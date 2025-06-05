// routes/ingest.js
const express = require('express');
const router = express.Router();
const Ingestion = require('../models/Ingestion');
const Batch = require('../models/Batch');

router.post('/', async (req, res) => {
  const { ids, priority } = req.body;
  if (!ids || !priority) return res.status(400).json({ error: 'ids and priority required' });

  const ingestion = await Ingestion.create({ priority });

  // Split into batches of 3
  for (let i = 0; i < ids.length; i += 3) {
    const chunk = ids.slice(i, i + 3);
    await Batch.create({
      ingestion_id: ingestion.ingestion_id,
      ids: chunk,
      status: 'yet_to_start'
    });
  }

  res.json({ ingestion_id: ingestion.ingestion_id });
});

module.exports = router;
