/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

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
    new CopyWebpackPlugin([
      { from: require.resolve('workbox-sw'), to: 'workbox-sw.js' },
      { from: require.resolve('firebase/firebase-app'), to: 'firebase-app.js' },
      { from: require.resolve('firebase/firebase-messaging'), to: 'firebase-messaging.js' },
    ]),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      API_HOST: JSON.stringify(process.env.API_HOST),
      API_PROTOCOL: JSON.stringify(process.env.API_PROTOCOL),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      comments: false,
    }),
    new ExtractTextPlugin('[name].[chunkhash].css', { disable: false }),
    new ManifestPlugin({ fileName: 'webpack-manifest.json' }),
    new WorkboxPlugin({
      globDirectory: path.join(root, 'dist'),
      globPatterns: ['**/*.{html,js,css}'],
      swSrc: path.join(root, 'src/sw.js'),
      swDest: path.join(root, 'dist/sw.js'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return bundleByName(module, [
          'bower_components',
          'node_modules',
          'vendor\/',
        ]);
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
  ],
});

/** Check if module name contains the specified names. */
function bundleByName(module, names) {
  const userRequest = module.userRequest;

  if (typeof userRequest !== 'string') {
    return false;
  }

  return names.some(name => userRequest.indexOf(name) >= 0);
}
