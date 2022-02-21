// IMPORT DEPENDENCIES
import { env } from 'process';

// ERROR HANDLERS

// DEV/PROD HANDLERS
// Development error handler
const developmentHandler = (err, req, res) => {
  // Handle production errors
  res.status(err.statusCode).json({
    status: err.status,
    isOperational: err.isOperational,
    message: err.message,
    trace: err.stack,
  });
};

// Production error handler
const productionHandler = (err, req, res) => {
  // Handle production errors
};

// Implement Global Error Handler
const globalErrorHandler = (err, req, res, next) => {
  // Development
  if (env.NODE_ENV_NR === 'development') {
    return developmentHandler(err, req, res);
  }

  // Production error handler
  if (env.NODE_ENV_NR === 'production') {
    return productionHandler(err, req, res);
  }
};

export default globalErrorHandler;
