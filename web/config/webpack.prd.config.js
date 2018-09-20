const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');

const root = path.join(__dirname, '../');

module.exports = merge.smart(require('./webpack.config'), {
  devtool: 'source-map',
  entry: {
    main: ['babel-polyfill', path.join(root, 'src')],
  },
  mode: 'production',
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(root, 'dist'),
    publicPath: '/',
  },
  performance: {
    assetFilter: assetFileName => !/(\.json|\.map)$/.test(assetFileName),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      API_HOST: JSON.stringify(process.env.API_HOST),
      API_PROTOCOL: JSON.stringify(process.env.API_PROTOCOL),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ManifestPlugin({ fileName: 'webpack-manifest.json' }),
    new StatsWriterPlugin({
      transform(data, opts) {
        const stats = opts.compiler.getStats().toJson({ chunkModules: true });
        return JSON.stringify(stats, null, 2);
      },
    }),
  ],
});
