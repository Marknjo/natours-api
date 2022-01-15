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
  // response with message page not found
  // res.status(404).json({
  //   status: 'fail',
  //   message: `404: ${req.originalUrl} cannot be found on this site.`,
  // });

  const err = new Error(
    `404: ${req.originalUrl} cannot be found on this site.`
  );
  req.status = 404;
  req.err = err;

  next(err);
});

// Handling global errors
app.use((err, req, res, next) => {
  console.log(req.err);
  // Prep Response
  // 1). Status Code
  const statusCode = req.status || 500;

  // 2). Status Message
  const statusMessage = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

  res.status(statusCode).json({
    status: statusMessage,
    message: req.err.message,
    stack: req.err.stack,
    err: req.err,
  });
});

// Listen to app
export default app;
