/// Manage scripts based on environements
const { env } = require('process');

// Set default to development environment if NODE_ENV is not set
const environment = env.NODE_ENV || 'development';

/// Test environement
if (environment === 'production') {
  /// Load production webpack config file
  module.exports = require('./webpack/webpack.prod.cjs');
}

// Environment is development
if (environment === 'development') {
  /// Load development script
  module.exports = require('./webpack/webpack.dev.cjs');
}
