import AppError from './appErrors.js';

/**
 * Wraps client side handlers, not wrapped with catchAsync, so as to push 500 errors to the global error handlers. Ensures, app never crashes.
 * @param {() => never | Error} next Express middleware next function
 * @param {() => never} callback The callback passed to the react
 * @returns {() => never | never} Handler function rendered inside express handler
 */
const catchHandlerErrors = (next, callback) => {
  try {
    return callback();
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

export default catchHandlerErrors;
