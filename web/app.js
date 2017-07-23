/* eslint-disable */
const path = require('path');
const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-loggly-bulk');

winston.add(winston.transports.Loggly, {
  subdomain: process.env.LOGGLY_SUBDOMAIN,
  token: process.env.LOGGLY_TOKEN,
  json: true,
  tags: ['twitch-overlay', 'web'],
});

const app = express();

const NODE_ENV = process.env.NODE_ENV || 'production';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.VIRTUAL_PORT || 5000;

const isProduction = (NODE_ENV === 'production');

if (!isProduction) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./config/webpack.dev.config');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    historyApiFallback: true,
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    },
    watchOptions: {
      poll: true,
    },
  }));

  app.use(webpackHotMiddleware(compiler));
}

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Loggly({
      subdomain: process.env.LOGGLY_SUBDOMAIN,
      token: process.env.LOGGLY_TOKEN,
      json: true,
      tags: ['twitch-overlay', 'web'],
    }),
  ],
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + 'dist/index.html'));
});

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Loggly({
      subdomain: process.env.LOGGLY_SUBDOMAIN,
      token: process.env.LOGGLY_TOKEN,
      json: true,
      tags: ['twitch-overlay', 'web'],
    }),
  ],
}));

app.listen(PORT, HOST, function () {
  winston.info(`Twitch overlay web listening on http://${HOST}:${PORT}`);
});
