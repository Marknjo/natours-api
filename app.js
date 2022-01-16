// GLOBAL IMPORTS
import { env } from 'process';
import path from 'path';

// 3RD PARTY IMPORTS
import express from 'express';
import morgan from 'morgan';

// LOCAL IMPORT
import rootDir from './utils/rootDir.js';

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

// ROUTES
// 404
// GLOBAL ERROR HANDLING

// EXPORT EXPRESS APP
export default app;
