/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');

const root = path.join(__dirname, '../');

module.exports = merge.smart(require('./webpack.config'), {
  devtool: 'source-map',
  entry: {
    main: ['babel-polyfill', path.join(root, 'src')],
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    assetFilter: assetFileName => !/(\.json|\.map)$/.test(assetFileName),
  },
  output: {
    filename: '[name].[chunkhash].js',
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
        NODE_ENV: JSON.stringify('production'),
      },
      API_HOST: JSON.stringify(process.env.API_HOST),
      API_PROTOCOL: JSON.stringify(process.env.API_PROTOCOL),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css',
    }),
    new ManifestPlugin({ fileName: 'webpack-manifest.json' }),
    new InjectManifest({
      swSrc: path.join(root, 'src/sw.js'),
      swDest: 'sw.js',
    }),
    new StatsWriterPlugin({
      transform: function(data, opts) {
        let stats = opts.compiler.getStats().toJson({ chunkModules: true });
        return JSON.stringify(stats, null, 2);
      },
    }),
  ],
});
