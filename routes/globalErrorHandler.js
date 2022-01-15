import { env } from 'process';
import AppError from '../utils/appError.js';

// Helper functions
// MARK ERRORS
const handlerDublicateError = err => {
  const entryName = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Database has a tour with the same entry as ${entryName}.`;

  return new AppError(message, 400);
};

const handlerCastError = err => {
  const message = `Invalid ${err.path} ${err.value}`;

  return new AppError(message, 400);
};

const handlerValidationError = err => {
  const errMsgs = Object.values(err.errors)
    .map(error => error.message)
    .join('. ');
  const message = `Invalid input data: ${errMsgs}.`;

  return new AppError(message, 400);
};

// SEND ERRORS HELPERS
// Send Development Errors handling
const sendDevErrors = (err, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err: err,
  });
};

// Send Production Errors handling

const sentProdErrors = (err, res) => {
  // Handle operational errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    return;
  }

  // Handle Non operational errors
  // Log error to the consoer
  console.error(`Error 💥: ${err.message}`);

  // Generic errors
  res.status(statusCode).json({
    status: 500,
    message:
      'Some error happened to the the server. If it persist, contact the webmaster of this site/api.',
  });
};

/// Global Handler
const globalErrorHandler = (err, req, res, next) => {
  // handler developer and production errors differentely
  if (env.NODE_ENV === 'development') {
    // Send develeoment errors
    sendDevErrors(err, res);
  } else if (env.NODE_ENV === 'production') {
    // Handle special case errors

    // Handle mongoose validations error
    if (err.name === 'ValidationError') err = handlerValidationError(err);

    // Handle wrong MongoDB id err
    if (err.name === 'CastError') err = handlerCastError(err);

    // Dublicate Key Error
    if (err.code === 11000) err = handlerDublicateError(err);

    // Send Production Errors
    sentProdErrors(err, res);
  }
};

export default globalErrorHandler;
