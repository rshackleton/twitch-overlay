/* eslint-disable */
const path = require('path');
const express = require('express');
const morgan = require('morgan');

const logger = require('./services/logger');

const app = express();

app.use(morgan('combined', { 'stream': logger.stream }));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

module.exports = app;
