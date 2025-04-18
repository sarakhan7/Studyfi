const express = require('express');
const cors = require('cors');
require('dotenv').config(); // ✅ Load .env

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🚀 Home route
app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

// 🔑 API Key route
app.get('/api-key', (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not found in .env file' });
  }

  res.json({ apiKey });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
