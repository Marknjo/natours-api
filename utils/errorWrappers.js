import AppError from '../library/appErrors.js';

/**
 * Wraps client side handlers, not wrapped with catchAsync, so as to push 500 errors to the global error handlers. Ensures, app never crashes.
 * @param {() => never | Error} next Express middleware next function
 * @param {() => never} callback The callback passed to the react
 * @returns {() => never | never} Handler function rendered inside express handler
 */
const errorsWrapperHandler = (next, callback) => {
  try {
    return callback();
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

/**
 * Wraps client side handlers, not wrapped with catchAsync, so as to push 500 errors to the global error handlers. Ensures, app never crashes.
 * @param {() => never | Error} next Express middleware next function
 * @param {() => never} callback The callback passed to the react
 * @param {boolean} allowThrow returns the error object
 * @returns Handler function rendered inside express handler
 */
const asyncErrorsWrapperHandler = async (
  next,
  callback,
  allowThrow = false
) => {
  try {
    return await callback();
  } catch (error) {
    if (!allowThrow) return next(new AppError(error.message, 500));
    throw error;
  }
};

export { asyncErrorsWrapperHandler, errorsWrapperHandler };
