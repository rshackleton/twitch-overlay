/* eslint-disable */
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import logger from './services/logger';
import config from './config/webpack.dev.config';

const compiler = webpack(config);

const app = express();

const devMiddleware = webpackDevMiddleware(compiler, {
  historyApiFallback: true,
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
  watchOptions: {
    poll: true,
  },
});

const hotMiddleware = webpackHotMiddleware(compiler);

app.use(devMiddleware);
app.use(hotMiddleware);
app.use(
  morgan('combined', {
    stream: {
      write: function(message) {
        logger.info(message);
      },
    },
  }),
);
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  var filename = path.join(compiler.outputPath, 'index.html');
  devMiddleware.waitUntilValid(() => {
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
});

module.exports = app;
