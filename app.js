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
import adminRoutes from './routers/adminRouter.js';
import publicRoutes from './routers/publicRouter.js';
import AppError from './library/appErrors.js';
import globalErrorHandler from './helpers/globalErrorHandler.js';
import rootDir from './utils/rootDir.js';
import path from 'path';
import cookieFlashMessages from './library/cookieFlashMessages/cookieFlashMessages.js';

// INIT APP
const app = express();

// SETTINGS

/// Set view engines
/// Set Pug as the default view template engine
app.set('view engine', 'pug');

/// Set view path
app.set('views', path.resolve(rootDir, 'views'));

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

// Set public dir
app.use(express.static(path.resolve(rootDir, 'public')));

// ROUTES
// API Routes
const version = env.API_VERSION || 1;

/// create a global messaging bug
// Handle flash messages
app.use(cookieFlashMessages());

/// API ROUTES
app.use(`/api/v${version}/tours`, tourRoutes);
app.use(`/api/v${version}/users`, userRoutes);
app.use(`/api/v${version}/reviews`, reviewRoutes);

/// CLIENT ROUTES
// /dashboad and other admin routes
app.use('/sys-admin', adminRoutes);

// Public routes -> Front end routes
app.use('/', publicRoutes);

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
