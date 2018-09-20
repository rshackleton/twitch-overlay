/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

const root = path.join(__dirname, '../');

module.exports = merge.smart(require('./webpack.config'), {
  devServer: {
    compress: true,
    hot: true,
    overlay: true,
    port: 8080,
    stats: 'errors-only',
  },
  devtool: 'source-map',
  entry: {
    main: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      'babel-polyfill',
      path.join(root, 'src'),
    ],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(root, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: require.resolve('workbox-sw'), to: 'workbox-sw.js' },
      { from: require.resolve('firebase/firebase-app'), to: 'firebase-app.js' },
      { from: require.resolve('firebase/firebase-messaging'), to: 'firebase-messaging.js' },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      API_HOST: JSON.stringify(process.env.API_HOST),
      API_PROTOCOL: JSON.stringify(process.env.API_PROTOCOL),
      SL_ACCESS_TOKEN: JSON.stringify(process.env.SL_ACCESS_TOKEN),
    }),
    new InjectManifest({
      swSrc: path.join(root, 'src/sw.js'),
      swDest: 'sw.js',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
