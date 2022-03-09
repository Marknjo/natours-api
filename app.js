// IMPORTS
// Global
import { env } from 'process';

// 3rd Party
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// Locals
import tourRoutes from './routers/tourRouter.js';
import userRoutes from './routers/userRouter.js';
import reviewRoutes from './routers/reviewRouter.js';
import AppError from './library/appErrors.js';
import globalErrorHandler from './helpers/globalErrorHandler.js';
import rootDir from './utils/rootDir.js';
import path from 'path';

// INIT APP
const app = express();

// SETTINGS

// Set public dir
app.use(express.static(path.join(rootDir, 'public')));

// MIDDLEWARES
// Add loger support
if (env.NODE_ENV_NR === 'development') {
  // DEV SETUP
  app.use(morgan('dev'));
} else {
  // PRODUCTION SETUP
  // @TODO: Implement production logging to file logger
}

// JSON Body Parsers
app.use(express.json({ limit: '10kb' }));

// URL encodeded data
app.use(express.urlencoded({ limit: '10kb', extended: false }));

// Cookie parser
app.use(cookieParser());

// @TODO: Implement csurf

// ROUTES
// API Routes
const version = env.API_VERSION || 1;

app.use(`/api/v${version}/tours`, tourRoutes);
app.use(`/api/v${version}/users`, userRoutes);
app.use(`/api/v${version}/reviews`, reviewRoutes);

// Client Routes

// Global Handlers
// 404 errors
app.use('*', (req, res, next) => {
  // Global error handler for 404 errors
  const message = `${req.originalUrl} cannot be found in this server.`;
  next(new AppError(message, 404));
});

// Global error handler
app.use(globalErrorHandler);

// EXPORT APP
export default app;
