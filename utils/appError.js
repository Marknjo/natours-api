class AppError extends Error {
  /**
   * App Error constructor, extending Error class
   * @param {String} message Error message
   * @param {Number} statusCode Error code
   */
  constructor(message, statusCode) {
    // initialize super
    super(message);

    // handle status code
    this.statusCode = statusCode;

    // handle operational errors
    this.isOperational = true;

    // auto set status message
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    // Prevent error tracing to this class
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
