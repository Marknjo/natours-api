// Global Modules
import { env } from 'process';
import path from 'path';

// 3rd Party Import
import express from 'express';
import morgan from 'morgan';

// Local modules
import tourRoutes from './routes/toursRouter.js';
import userRoutes from './routes/usersRouter.js';
import rootDir from './configs/rootDir.js';
import AppError from './utils/appError.js';

const app = express();

// Middlewares
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Other Middlewares
app.use(express.json());

// Static files config
app.use(express.static(path.resolve(rootDir, 'public')));

// Routes
const apiVer = env.API_VERSION || 1;
const apiUrl = `/api/v${apiVer}`;

app.use(`${apiUrl}/tours`, tourRoutes);
app.use(`${apiUrl}/users`, userRoutes);

// Handling 404
app.all('*', (req, res, next) => {
  const message = `404: ${req.originalUrl} cannot be found on this site.`;

  next(new AppError(message, 404));
});

// Handling global errors
app.use((err, req, res, next) => {
  // Prep Response
  // 1). Status Code
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err: err,
  });
});

// Listen to app
export default app;
