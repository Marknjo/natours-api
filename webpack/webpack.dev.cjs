// IMPORTS
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');

// MERGE COMMON WITH DEV CONFIGS
module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',

  // Output
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../', 'public', 'dist'),
    publicPath: path.resolve(__dirname, '../', 'public', 'dist'),
  },
});
