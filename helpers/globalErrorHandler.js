// GLOBAL HELPER HANDLER
const globalErrorHandler = (err, req, res, next) => {
  // respond to errors
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

export default globalErrorHandler;
