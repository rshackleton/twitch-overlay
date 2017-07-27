const path = require('path');
const express = require('express');
const morgan = require('morgan');

const donations = require('./services/donations');
const logger = require('./services/logger');

const app = express();

const NODE_ENV = process.env.NODE_ENV || 'production';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.VIRTUAL_PORT || 5000;

app.use(morgan('combined', { 'stream': logger.stream }));

app.get('/donations', (req, res) => {
  donations.all().then(models => res.json(models));
});

app.listen(PORT, HOST, function () {
  logger.debug(`Twitch overlay api listening on http://${HOST}:${PORT}`);
});
