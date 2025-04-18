const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ✅ Serve all files in your current directory (HTML, CSS, JS)
app.use(express.static(__dirname));

// 🚀 Default route now sends your homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage.html'));
});

// 🔑 API Key endpoint
app.get('/api-key', (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not found in .env file' });
  }

  res.json({ apiKey });
});

// 🛠 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
