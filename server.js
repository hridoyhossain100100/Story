const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

app.post('/api/submit', async (req, res) => {
  try {
    const data = req.body;
    await client.connect();
    const db = client.db('eventdb');
    const collection = db.collection('submissions');
    await collection.insertOne(data);
    res.json({ success: true, message: 'Form submitted!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('API is running!');
});

module.exports = app;