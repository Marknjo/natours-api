// GLOBAL IMPORTS
import { env } from 'process';
import path from 'path';

// 3RD PARTY IMPORTS
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

// LOCAL IMPORT
import rootDir from './utils/rootDir.js';
import globalErrorHandler from './helpers/globalErrorHandler.js';
import page404Handlers from './helpers/page404Handler.js';
import toursRouter from './routes/toursRoutes.js';
import usersRouter from './routes/usersRoutes.js';
import mongoSanitize from 'express-mongo-sanitize';

// INIT EXPRESS APP
const app = express();

// Setup Helmet
app.use(helmet());

// LOGGER
if (env.NODE_ENV === 'development') app.use(morgan('dev'));

// MIDDLEWARES
// Security Middlewares
// Clean Mongo queries
app.use(mongoSanitize());

// Sanitize json body

// rate limiter
// hpp

// Setup public dir
app.use(express.static(path.resolve(rootDir, 'public')));

// Setup json body for body parser
app.use(express.json());

// ROUTES
const apiV = env.API_VERSION || 0;

// Tours Routes
app.use(`/api/v${apiV}/tours`, toursRouter);
app.use(`/api/v${apiV}/users`, usersRouter);

// Users Routes

// Review Routes

// 404
app.all('*', page404Handlers);

// GLOBAL ERROR HANDLING
app.use(globalErrorHandler);

// EXPORT EXPRESS APP
export default app;
