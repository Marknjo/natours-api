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

// LOCAL IMPORT
import rootDir from './utils/rootDir.js';
import globalErrorHandler from './helpers/globalErrorHandler.js';
import page404Handlers from './helpers/page404Handler.js';
import toursRouter from './routes/toursRoutes.js';
import usersRouter from './routes/usersRoutes.js';
import reviewsRouter from './routes/reviewsRoutes.js';

// INIT EXPRESS APP
const app = express();

// Express Settings
app.set('view engines', 'pug');
app.set('view', path.resolve(rootDir, 'views'));

// Setup Helmet
app.use(helmet());

// LOGGER
if (env.NODE_ENV === 'development') app.use(morgan('dev'));

// MIDDLEWARES
// Security Middlewares
// Rate Limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,
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

// Setup json body for body parser
app.use(express.json());

// ROUTES
const apiV = env.API_VERSION || 0;

// Tours Routes
app.use(`/api/v${apiV}/tours`, toursRouter);
app.use(`/api/v${apiV}/users`, usersRouter);
app.use(`/api/v${apiV}/reviews`, reviewsRouter);

// Users Routes

// Review Routes

// 404
app.all('*', page404Handlers);

// GLOBAL ERROR HANDLING
app.use(globalErrorHandler);

// EXPORT EXPRESS APP
export default app;
