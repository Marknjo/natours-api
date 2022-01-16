// IMPORTS
import { env } from 'process';

// MARK PRODUCTION ERRORS NOT HANDLED ON HANDLERS

// SEND ERROR MESSAGES
// Handle Development Error Messages
const sendDevErrors = (err, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

// Handle Production Error Messages
const sentProdErrors = (err, res) => {
  // Check if error is operational
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    return;
  }

  // if not operational log the error and send generic message
  console.error(`ERROR 💥💥💥: ${err.message}`);

  res.status(err.status).json({
    status: 500,
    message:
      'Some error happened. Please contact the webmaster with this error.',
  });
};

// GLOBAL HELPER HANDLER
const globalErrorHandler = (err, req, res, next) => {
  // respond to errors
  if (env.NODE_ENV === 'development') {
    sendDevErrors(err, res);
    return;
  }

  // Send Production Errors
  if (env.NODE_ENV === 'production') {
    // Handle other types of errors

    // TODO:
    // Cast Error (error code 11000): ID supplied to mongo does not match
    // Validation Errors: Mongoose Validations
    // Dublicate key error
    // ... others

    // Send error messages
    sentProdErrors(err, res);

    return;
  }
};

export default globalErrorHandler;
