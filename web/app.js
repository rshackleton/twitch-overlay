const path = require('path');
const express = require('express');

const app = express();

const nodeEnv = process.env.NODE_ENV || 'production';
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

const isProduction = (nodeEnv === 'production');

if (!isProduction) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./config/webpack.dev.config');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    },
    historyApiFallback: true
  }));

  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + 'build/index.html'));
});

app.listen(port, host, function () {
  console.log(`Twitch overlay web listening on ${port}`);
});
