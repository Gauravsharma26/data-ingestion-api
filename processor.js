// processor.js
const Batch = require('./models/Batch');
const Ingestion = require('./models/Ingestion');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const priorityMap = { HIGH: 1, MEDIUM: 2, LOW: 3 };

async function processBatches() {
  setInterval(async () => {
    const batch = await Batch.findOne({ status: 'yet_to_start' })
      .populate('ingestion_id')
      .sort({ 'ingestion.priority': 1, created_at: 1 });

    if (!batch) return;

    await Batch.updateOne({ batch_id: batch.batch_id }, { status: 'triggered' });
    console.log(`Processing batch ${batch.batch_id} with IDs: ${batch.ids}`);

    await sleep(3000); // simulate processing

    await Batch.updateOne({ batch_id: batch.batch_id }, { status: 'completed' });
    console.log(`Completed batch ${batch.batch_id}`);
  }, 5000); // process one batch every 5 seconds
}

module.exports = { processBatches };
