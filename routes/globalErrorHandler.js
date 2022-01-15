const globalErrorHandler = (err, req, res, next) => {
  // Prep Response
  // 1). Status Code
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err: err,
  });
};

export default globalErrorHandler;
