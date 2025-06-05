// routes/status.js
const express = require('express');
const router = express.Router();
const Batch = require('../models/Batch');

router.get('/:id', async (req, res) => {
  const ingestion_id = req.params.id;
  const batches = await Batch.find({ ingestion_id });

  const batchStatuses = batches.map(b => b.status);
  let status = 'yet_to_start';
  if (batchStatuses.includes('triggered')) status = 'triggered';
  if (batchStatuses.every(s => s === 'completed')) status = 'completed';

  res.json({
    ingestion_id,
    status,
    batches: batches.map(b => ({
      batch_id: b.batch_id,
      ids: b.ids,
      status: b.status
    }))
  });
});

module.exports = router;
