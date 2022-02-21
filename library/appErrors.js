/**
 * Extending Errors
 */

class AppError extends Error {
  /**
   * Pre AppError Class Error handling
   * @param {String} message Error message
   * @param {Number} statusCode Status Code
   * @param {Object{}} options status messages @TODO: {options} Implement it later
   */
  constructor(message, statusCode, options = {}) {
    // Define defaults
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    // To be used on demand
    this.options = options;

    // Any error passing this class let it be operational (We anticiate it to happen)
    this.isOperational = true;

    // Prevent error trace to this class
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
