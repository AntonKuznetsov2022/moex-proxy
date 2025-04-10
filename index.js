const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/marketdata', async (req, res) => {
  try {
    const response = await axios.get('https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.xml?iss.meta=off&iss.only=marketdata', {
      headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
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
