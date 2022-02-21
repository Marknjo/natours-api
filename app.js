// IMPORTS
// Global
import { env } from 'process';

// 3rd Party
import express from 'express';

// Locals

// INIT APP
const app = express();

// SETTINGS

// MIDDLEWARES

// ROUTES
app.get('/', (req, res) => {
  res.status(200).send('Express app running... 🌷🌷🌷');
});

// EXPORT APP
export default app;
