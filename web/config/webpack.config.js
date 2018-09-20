const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = path.join(__dirname, '../');

const spriteDir = path.join(root, 'src/img/sprites');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        use: [{ loader: 'file-loader' }],
        exclude: spriteDir,
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        use: [{ loader: 'url-loader', options: { limit: 100000 } }],
        include: spriteDir,
      },
      {
        test: /\.(eot|svg|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(mp3)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: path.join(root, 'src/index.html') })],
  resolve: {
    alias: {
      components: path.join(root, 'src/components'),
      routes: path.join(root, 'src/routes'),
      styles: path.join(root, 'src/styles'),
      actions: path.join(root, 'src/core/actions'),
      epics: path.join(root, 'src/core/epics'),
      middleware: path.join(root, 'src/core/middleware'),
      reducers: path.join(root, 'src/core/reducers'),
    },
    extensions: ['.js', '.json', '.jsx'],
  },
};
