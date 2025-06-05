This is a simple backend API built with Node.js, Express, and MongoDB that allows you to:

Submit data ingestion jobs (/ingest)

Check job status (/status/:ingestion_id)

Process data asynchronously in batches (3 IDs at a time)

Follow rate limit (1 batch every 5 seconds)

Prioritize processing by job priority (HIGH > MEDIUM > LOW)

🚀 Features

Built with MERN (MongoDB, Express, Node.js)

Async background processing

Job batching & priority queue

REST API with clean JSON responses

📦 Tech Stack

Node.js

Express.js

MongoDB with Mongoose

uuid for unique IDs

dotenv for environment config

nodemon for dev reloads

Jest + Supertest for testing

🛠️ Installation

Clone the repository

git clone https://github.com/your-username/ingestion-api.git
cd ingestion-api

Install dependencies

npm install

Setup MongoDB

Make sure MongoDB is running on your system. Update the MongoDB connection string in the .env file:

.env

MONGO_URI=mongodb://localhost:27017/ingestion-api

Start the server

npm run dev # for development with auto-reload
npm start # for production

🧪 Run Tests

npm test

📬 API Endpoints

POST /ingest

Request:

curl -X POST http://localhost:5000/ingest
-H "Content-Type: application/json"
-d '{"ids": [1, 2, 3, 4, 5], "priority": "HIGH"}'

Response:

{
"ingestion_id": "abc123"
}

GET /status/:ingestion_id

Request:

curl http://localhost:5000/status/abc123

Response:

{
"ingestion_id": "abc123",
"status": "triggered",
"batches": [
{
"batch_id": "xyz789",
"ids": [1, 2, 3],
"status": "completed"
},
{
"batch_id": "xyz999",
"ids": [4, 5],
"status": "triggered"
}
]
}

🧠 How It Works

Each /ingest request creates an ingestion job and splits IDs into batches of 3.

A background processor picks one batch every 5 seconds (rate limit).

HIGH priority jobs are picked before MEDIUM and LOW.

The /status API returns real-time status of your ingestion job.

📸 Example Timeline

T0: Ingest [1,2,3,4,5] (MEDIUM)

T4: Ingest [6,7,8,9] (HIGH)

Result: At T5 → [1,2,3]; at T10 → [6,7,8]; at T15 → [9,4,5]

🧹 Status Values

Batch: yet_to_start, triggered, completed

Ingestion:

yet_to_start → all batches are yet_to_start

triggered → at least one batch is triggered

completed → all batches completed



