/* eslint-disable */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = path.join(__dirname, '../');

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
        use: [{ loader: 'url-loader', options: { limit: 10000 } }],
      },
      {
        test: /\.(eot|svg|woff|woff2)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(root, 'src/index.html') }),
    new CopyWebpackPlugin([
      {
        context: path.join(root, 'src/icons/'),
        from: '**/*',
      },
    ]),
  ],
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
