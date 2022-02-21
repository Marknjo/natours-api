// IMPORTS
// Global
import { env } from 'process';

// 3rd Party
import express from 'express';
import morgan from 'morgan';

// Locals
import tourRoutes from './routers/tourRouter.js';

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
// API Routes
const version = env.API_VERSION || 1;

console.log(`/api/${version}/tours`);

app.use(`/api/v${version}/tours`, tourRoutes);

// Client Routes

// Global Handlers
// 404 errors
app.use('*', (req, res, next) => {
  // Global error handler for 404 errors
});

// Global error handler
app.use(globalErrorHandler);

// EXPORT APP
export default app;
