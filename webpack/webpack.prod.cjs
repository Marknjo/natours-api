// IMPORTS
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');

// MERGE COMMON WITH DEV CONFIGS
module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname, '../', 'public', 'js'),
  },
});
