const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS for all origins
app.use(cors());

app.get('/weather/*', async (req, res) => {
  const apiUrl = `https://dataservice.accuweather.com${req.url.substring(7)}`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'apikey': 'YOUR_API_KEY',
    },
  });
  const data = await response.json();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});