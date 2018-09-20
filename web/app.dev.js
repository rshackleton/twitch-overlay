import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './config/webpack.dev.config';

const compiler = webpack(webpackConfig);

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 5000;

const devMiddleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
  },
});

const hotMiddleware = webpackHotMiddleware(compiler);

const app = express();

app.use(devMiddleware);
app.use(hotMiddleware);
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html');
  devMiddleware.waitUntilValid(() => {
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
      return next();
    });
  });
});

app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Twitch overlay admin listening on http://${HOST}:${PORT}`);
});
