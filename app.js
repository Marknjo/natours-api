// GLOBAL IMPORTS
import { env } from 'process';

// 3RD PARTY IMPORTS
import express from 'express';
import morgan from 'morgan';

// LOCAL IMPORT

// INIT EXPRESS APP
const app = express();

// LOGGER
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// MIDDLEWARES
// ROUTES
// 404
// GLOBAL ERROR HANDLING

// EXPORT EXPRESS APP
export default app;
