const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const app = express();
const port = 3000;

const API_KEY = '7JPsmDFlhQbw3e6IbP';
const API_SECRET = '4U9GzMI36XbJ9BATqGjc7d1nqzGTXcy1DgQU';
const BASE_URL = 'https://api-testnet.bybit.com';

function getSignature(queryString) {
  return crypto.createHmac('sha256', API_SECRET).update(queryString).digest('hex');
}

app.get('/api/fills', async (req, res) => {
  const timestamp = Date.now();
  const query = `api_key=${API_KEY}&timestamp=${timestamp}`;
  const sign = getSignature(query);
  const url = `${BASE_URL}/v5/execution/list?${query}&sign=${sign}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching trade data:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.use(express.static('.')); // serve your HTML/CSS/JS files from the same folder

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
