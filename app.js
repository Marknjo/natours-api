// IMPORTS
// Global
import { env } from 'process';

// 3rd Party
import express from 'express';
import morgan from 'morgan';

// Locals

// INIT APP
const app = express();

// SETTINGS

// MIDDLEWARES
// Add loger support
if (env.NODE_ENV_NR === 'development') {
  // DEV SETUP
  app.use(morgan('dev'));
} else {
  // PRODUCTION SETUP
  // @TODO: Implement production logging to file logger
}

// ROUTES
app.get('/', (req, res) => {
  res.status(200).send('Express app running... 🌷🌷🌷');
});

// EXPORT APP
export default app;
