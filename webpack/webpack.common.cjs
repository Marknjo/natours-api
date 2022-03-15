/// IMPOERTS DEPENDENCIES
const path = require('path');

/// EXPORT MODULE
module.exports = {
  // Entry
  entry: { index: path.resolve(__dirname, '../', 'public', 'js', 'index.js') },

  //output -> Specific dev/prod

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
};
