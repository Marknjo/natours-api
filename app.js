// IMPORT MODULES
import process from 'process';
import express from 'express';

// 3rd party scripts
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';

// Local scripts
import appGlobalErrorHandling from './errors/appGlobalErrorHandling.js';
import AppError from './errors/appError.js';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

// INIT EXPRESS APP
const app = express();

// MIDDLEWARES
// Log
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Setups,
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Security middlewares
// Add secure headers
app.use(helmet());

// Cross site Scripting prevention
app.use(xss());

// Express rate limiter
const rateLimitOptions = {
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    'Too many request from this ip, Please come back later after one hour for more requests.',
};
app.use(rateLimit(rateLimitOptions));

// MongoDB clenser
app.use(mongoSanitize());

// Hpp HTTP Parameter Pulution
app.use(
  hpp({
    whitelist: [
      'name',
      'duration',
      'maxGroupSize',
      'difficulty',
      'ratingsAverage',
      'ratingsQuantity',
      'price',
    ],
  })
);

// Other middlewares

// ROUTES
const apiVersion = process.env.API_VERSION || '/api/v1';

app.use(`${apiVersion}/tours`, tourRouter);
app.use(`${apiVersion}/users`, userRouter);

// EXPRESS ERROR HANDLING
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `⛔ 404: Could not find (${req.originalUrl}) in this sever.`,
      404
    )
  );
});

app.use(appGlobalErrorHandling);

// EXPORT APP
export default app;
