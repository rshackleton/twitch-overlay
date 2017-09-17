/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

const root = path.join(__dirname, '../');

module.exports = merge.smart(require('./webpack.config'), {
  devtool: 'cheap-eval-source-map',
  entry: {
    main: [
      'webpack-hot-middleware/client?reload=true',
      'babel-polyfill',
      path.join(root, 'src'),
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
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
        'NODE_ENV': JSON.stringify('development')
      },
      API_HOST: JSON.stringify(process.env.API_HOST),
      API_PROTOCOL: JSON.stringify(process.env.API_PROTOCOL),
    }),
    new WorkboxPlugin({
      globDirectory: path.join(root, 'dist'),
      globPatterns: ['**/*.{html,js,css}'],
      swSrc: path.join(root, 'src/sw.js'),
      swDest: path.join(root, 'dist/sw.js'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
