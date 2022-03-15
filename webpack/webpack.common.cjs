/// IMPOERTS DEPENDENCIES
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/// EXPORT MODULE
module.exports = {
  // Entry
  entry: { index: path.resolve(__dirname, '../', 'public', 'js', 'index.js') },

  //output -> Specific dev/prod

  // Set experiments
  experiments: {
    topLevelAwait: true,
  },

  // Code sample dynamic import
  // const getUserModule = () => import(/* webpackChunkName: "usersAPI" */ "./common/usersAPI");
  optimization: {
    splitChunks: { chunks: 'all' },
  },

  // Modules
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  // Plugins
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin.CleanWebpackPlugin(),
  ],
};
