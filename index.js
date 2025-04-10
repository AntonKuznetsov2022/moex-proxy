const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/marketdata', async (req, res) => {
  try {
    const response = await axios.get('https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.xml?iss.meta=off&iss.only=marketdata', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': '*/*',
      }
    });
    res.set('Content-Type', 'application/xml');
    res.send(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка получения данных с MOEX');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
