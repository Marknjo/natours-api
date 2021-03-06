// GLOBAL IMPORTS
import { env } from 'process';
import path from 'path';

// 3RD PARTY IMPORTS
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { default as xss } from 'xss-clean';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';

// LOCAL IMPORT
import rootDir from './utils/rootDir.js';
import globalErrorHandler from './helpers/globalErrorHandler.js';
import page404Handlers from './helpers/page404Handler.js';
import toursRouter from './routes/toursRoutes.js';
import usersRouter from './routes/usersRoutes.js';
import reviewsRouter from './routes/reviewsRoutes.js';
import viewRouter from './routes/viewRoutes.js';
import bookingsRouter from './routes/bookingsRoutes.js';
import { webhookSession } from './controllers/bookingsController.js';

// INIT EXPRESS APP
const app = express();

// Set cors
app.use(cors());

// Setting cors Adavanced (delete, put, patch, delete)
app.options('*', cors());

// Express Settings
app.set('view engine', 'pug');
app.set('views', path.join(rootDir, 'views'));

app.enable('trust proxy');

// Setup Helmet
//Add custom headers for /tour/:slug to allow fetching the map
// app.use(helmet());

// // // Whitelist scripts/others headers
// app.use(
//   '/tours/:slug',
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       'script-src': ["'self'", '*.mapbox.com', 'js.stripe.com', 'blob:'],
//       'script-src-elem': ["'self'", '*.mapbox.com', 'js.stripe.com', 'blob:'],
//       'connect-src': ["'self'", '*.mapbox.com', 'blob:'],
//       'style-src': ["'self'", '*.mapbox.com', "https: 'unsafe-inline'"],
//       'frame-src': ["'self'", 'js.stripe.com', 'blob:'],
//     },
//   })
// );

// LOGGER
if (env.NODE_ENV === 'development') app.use(morgan('dev'));

// MIDDLEWARES
// Security Middlewares
// Rate Limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3000,
  message: 'Too many requests from this IP, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

// Clean Mongo queries
app.use(mongoSanitize());

// Sanitize json body
app.use(xss());

// hpp
app.use(
  hpp({
    whitelist: [
      'duration',
      'price',
      'ratingsAverage',
      'ratingsQuantity',
      'difficulty',
      'maxGroupSize',
      'createdAt',
    ],
  })
);

// Setup public dir
app.use(express.static(path.resolve(rootDir, 'public')));

// Handle Webhook Stripe Session
app.use(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  webhookSession
);

// Setup json body for body parser
app.use(express.json({ limit: '10kb' }));
//app.use(express.urlencoded({ limit: '2mb', extended: true }));
app.use(cookieParser());

// Add Compression middleware
app.use(compression());

// ROUTES
const apiV = env.API_VERSION || 0;

// API ROUTES
app.use(`/api/v${apiV}/tours`, toursRouter);
app.use(`/api/v${apiV}/users`, usersRouter);
app.use(`/api/v${apiV}/reviews`, reviewsRouter);
app.use(`/api/v${apiV}/bookings`, bookingsRouter);

// CLIENT ROUTES
app.use('/', viewRouter);

// 404
app.all('*', page404Handlers);

// GLOBAL ERROR HANDLING
app.use(globalErrorHandler);

// EXPORT EXPRESS APP
export default app;
