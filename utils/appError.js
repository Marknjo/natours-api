// Extend Error class
// Mark message, statusCode, status, isOPerational, and prevent errors from tracing to the class.

class AppError extends Error {
  /**
   * Extends the Native Error class
   * @param {String} message Description of the error message
   * @param {Number} statusCode Http status codes
   */
  constructor(message, statusCode) {
    // Set message
    super(message);

    // Set status Code
    this.statusCode = statusCode;

    // Set Status Message
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    // Set is Operational
    this.isOperational = true;

    // Prevent errors from tracing to the this class
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
