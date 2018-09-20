const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

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
  output: {
    filename: '[name].[hash].js',
    path: path.join(root, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      API_HOST: JSON.stringify(process.env.API_HOST),
      API_PROTOCOL: JSON.stringify(process.env.API_PROTOCOL),
      SL_ACCESS_TOKEN: JSON.stringify(process.env.SL_ACCESS_TOKEN),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
