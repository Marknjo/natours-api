// GLOBAL IMPORTS
import { env } from 'process';
import path from 'path';

// 3RD PARTY IMPORTS
import express from 'express';
import morgan from 'morgan';

// LOCAL IMPORT
import rootDir from './utils/rootDir.js';
import globalErrorHandler from './helpers/globalErrorHandler.js';
import page404Handlers from './helpers/page404Handler.js';

// INIT EXPRESS APP
const app = express();

// LOGGER
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// MIDDLEWARES
// Setup public dir
app.use(express.static(path.resolve(rootDir, 'public')));

// Setup json body for body parser
app.use(express.json());

// ROUTES
// 404
app.all('*', page404Handlers);

// GLOBAL ERROR HANDLING
app.use(globalErrorHandler);

// EXPORT EXPRESS APP
export default app;
