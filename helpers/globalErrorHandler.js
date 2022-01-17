// IMPORTS
import { env } from 'process';
import AppError from '../utils/appError.js';

// MARK PRODUCTION ERRORS NOT HANDLED ON HANDLERS
// Handle Dublicate error
const handleDublicateError = err => {
  const keyName = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `A field with ${keyName} already exists`;

  return new AppError(message, 400);
};

// Handle Validation Errors
const handleValidationError = err => {
  const errMessages = Object.values(err.errors)
    .map(el => el.message)
    .join('. ');
  const message = `Validation Errors: ${errMessages}.`;
  return new AppError(message, 400);
};

// Handle Cast Errors
const handleCastError = err => {
  const message = `Invalid ${err.path}: ${err.value} format supplied`;
  return new AppError(message, 400);
};

// JWT Modified Token Submission
const handleJsonWebTokenError = () => {
  const message = 'Could not authenticate user. Please login again.';
  return new AppError(message, 403);
};

// JWT Expired token error handler
const handlerTokenExpiredError = () => {
  const message = 'Your session has expired. Please login again.';
  return new AppError(message, 403);
};

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

    // Cast Error : ID supplied to mongo is not in the right format
    if (err.name === 'CastError') err = handleCastError(err);

    // Validation Errors: Mongoose Validations
    if (err.name === 'ValidationError') err = handleValidationError(err);

    // Dublicate key error (error code 11000)
    if (err.code === 11000) err = handleDublicateError(err);

    // JWT ERRORS
    // Json Web Token Invalid token (Modified token error)
    if (err.name === 'JsonWebTokenError') err = handleJsonWebTokenError();

    // Handle expired JWT token error
    if (err.name === 'TokenExpiredError') err = handlerTokenExpiredError();
    // ... others

    // Send error messages
    sentProdErrors(err, res);

    return;
  }
};

export default globalErrorHandler;
