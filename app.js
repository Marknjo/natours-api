// GLOBAL IMPORTS
import { env } from 'process';
import path from 'path';

// 3RD PARTY IMPORTS
import express from 'express';
import morgan from 'morgan';

// LOCAL IMPORT
import rootDir from './utils/rootDir.js';
import AppError from './utils/appError.js';

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
app.all('*', (req, res, next) => {
  const message = `404: Page ${req.originalUrl} is not found in this site.`;

  next(new AppError(message, 404));
});
// GLOBAL ERROR HANDLING

// EXPORT EXPRESS APP
export default app;
