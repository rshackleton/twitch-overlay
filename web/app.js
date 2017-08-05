/* eslint-disable */
const path = require('path');
const express = require('express');
const morgan = require('morgan');

const logger = require('./services/logger');

const NODE_ENV = process.env.NODE_ENV || 'production';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.VIRTUAL_PORT || 5000;

const isProduction = (NODE_ENV === 'production');

let app;

if (isProduction) {
  app = require('./app.prd');
} else {
  app = require('./app.dev');
}

app.listen(PORT, HOST, function () {
  logger.info(`Twitch overlay web listening on http://${HOST}:${PORT}`);
});
