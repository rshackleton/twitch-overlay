/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

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
        test: /\.(jpg|jpeg|png|svg)$/,
        use: [
          { loader: 'url-loader', options: { limit: 10000 } },
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(root, 'src/index.html') }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new StatsWriterPlugin({
      transform: function(data, opts) {
        let stats = opts.compiler.getStats().toJson({chunkModules: true});
        return JSON.stringify(stats, null, 2);
      },
    }),
  ],
  resolve: {
    alias: {
      img: path.join(root, 'src/img'),
    },
    extensions: ['.js', '.json', '.jsx'],
  },
};
