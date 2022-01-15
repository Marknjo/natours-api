import { env } from 'process';

// Helper functions
// MARK ERRORS

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
    res.status(statusCode).json({
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
  if (env.NODE_ENV === 'develepment') {
    // Send develeoment errors
    sendDevErrors(err, res);
  } else if (env.NODE_ENV === 'production') {
    // Handle special case errors

    // Send Production Errors
    sentProdErrors(err, res);
  }
};

export default globalErrorHandler;
