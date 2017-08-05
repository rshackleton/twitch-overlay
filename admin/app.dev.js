/* eslint-disable */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const logger = require('./services/logger');
const config = require('./config/webpack.dev.config');

const compiler = webpack(config);

const app = express();

const devMiddleware = webpackDevMiddleware(compiler, {
  historyApiFallback: true,
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  },
  watchOptions: {
    poll: true,
  },
});

const hotMiddleware = webpackHotMiddleware(compiler);

app.use(devMiddleware);
app.use(hotMiddleware);
app.use(morgan('combined', { 'stream': logger.stream }));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res, next) => {
  var filename = path.join(compiler.outputPath, 'index.html');
  devMiddleware.waitUntilValid(() => {
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type','text/html');
      res.send(result);
      res.end();
    });
  });
});

module.exports = app;
