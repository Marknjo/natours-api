// IMPORTS
// Global
import { env } from 'process';
import path from 'path';

// 3rd Party
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import { default as xss } from 'xss-clean';
import compression from 'compression';
//import * as helmet from 'helmet';
import helmet from 'helmet';

// Locals
import tourRoutes from './routers/tourRouter.js';
import userRoutes from './routers/userRouter.js';
import reviewRoutes from './routers/reviewRouter.js';
import bookingRoutes from './routers/bookingRouter.js';
import adminRoutes from './routers/adminRouter.js';
import publicRoutes from './routers/publicRouter.js';
import AppError from './library/appErrors.js';
import globalErrorHandler from './helpers/globalErrorHandler.js';
import rootDir from './utils/rootDir.js';
import cookieFlashMessages from './library/cookieFlashMessages/cookieFlashMessages.js';
import { stripeWebhookCheckoutHandler } from './controllers/bookingController.js';

// INIT APP
const app = express();

// SETTINGS
// disable x-powered-by
app.disable('x-powered-by');

/* Set cors */
app.use(cors());

//Advanced -> delete, put, patch, and delete
app.options('*', cors());

/* Trust proxy (Heroku and other cloud platforms) */
app.enable('trust proxy');

/// Set view engines
/// Set Pug as the default view template engine
app.set('view engine', 'pug');

/// Set view path
app.set('views', path.resolve(rootDir, 'views'));

// MIDDLEWARES SETUPS
// Add loger support
if (env.NODE_ENV === 'development') {
  // DEV SETUP
  app.use(morgan('dev'));
} else {
  // PRODUCTION SETUP
  // @TODO: Implement production logging to file logger
}

/* Setup Helmet */
// @TODO: Undestand how to navigate around content security policy
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// app.use(helmet.crossOriginEmbedderPolicy({ policy: 'credentialless' }));

/* Setup Rate Limitter options */
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3000,
  message: 'Too many requests from this IP, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

/* Enable Mongo Sanitizer */
app.use(mongoSanitize());

/* Enable XSS cleanup */
app.use(xss());

/* Prevent query parameters polutions - set allowed fields */
const whitelist = [
  'duration',
  'price',
  'ratingsAverage',
  'ratingsQuantity',
  'difficulty',
  'maxGroupSize',
  'createdAt',
];
app.use(hpp({ whitelist }));

/// Stripe Webhook session handler
app.use(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  stripeWebhookCheckoutHandler
);

// Cookie parser
app.use(cookieParser());

// JSON Body Parsers
app.use(express.json({ limit: '10kb' }));

// URL encodeded data
app.use(express.urlencoded({ limit: '10kb', extended: false }));

// @TODO: Implement csurf

// Set public dir
app.use(express.static(path.resolve(rootDir, 'public')));

/* Compress requests */
app.use(compression());

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
app.use(`/api/v${version}/bookings`, bookingRoutes);

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
