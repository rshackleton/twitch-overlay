/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const OfflinePlugin = require("offline-plugin");

const root = path.join(__dirname, '../');

module.exports = merge.smart(require('./webpack.config'), {
  devtool: 'source-map',
  entry: {
    main: [
      'babel-polyfill',
      path.join(root, 'src'),
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(root, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      API_HOST: JSON.stringify(process.env.API_HOST),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new ExtractTextPlugin('[name].[chunkhash].css', { disable: false }),
    new ManifestPlugin(),
    new OfflinePlugin(),
  ],
});
