const express = require('express');
const queryString = require('querystring');
const axios = require('axios');
const API_KEY = require('./secret');
const PORT = process.env.PORT || 3001;
const API_URL = 'https://pro-api.coinmarketcap.com/v1';
const app = express();

axios.interceptors.request.use(req => {
  req.headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    withCredentials: true,
    mode: 'no-cors',
    'X-CMC_PRO_API_KEY': API_KEY
  };

  return req;
});

app.get('/api/listings', async (req, res, next) => {
  try {
    const result = await axios
      .get(`${API_URL}/cryptocurrency/listings/latest?${queryString.stringify(req.query)}`);
    res.json(result.data);
  } catch (err) {
    next(err);
  }
});

app.get('/api/info/:id', async (req, res, next) => {
  try {
    const result = await axios
      .get(`${API_URL}/cryptocurrency/info?id=${req.params.id}`);
    res.json(result.data);
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

