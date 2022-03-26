/**
 * All related functions for wrapping code
 * - imports, trycatch, etc.
 */

import showAlert from './showAlert.js';

/**
 * Helper method to abstract error handling
 * @param {Error} error Error object
 * @param {String} message Custom message passed on implementing the wrapper
 */
const handleErrors = (error, message) => {
  // Handle notification
  const getMessage = message ? message : 'Error occured!';
  showAlert({
    message: getMessage,
    messageType: 'error',
    action: 'Error message',
    displayPosition: 'right',
  });

  // FIXME Remove this console log
  console.log(error);
};

/**
 * Abstracts error handler that abstract try catch and creates a central location for error handling in the application
 *
 * @param {Function} cb Internal details of the calling function
 * @param {{ message: string, hasEvent: boolean, allowErrorThrow: boolean, }} configOptions Configure -> Error message; allowErrorThrow Pass error handling to the requesting function.
 * @returns {Error | string | void}
 **/
export const errorWrapper = function (
  cb = () => {},
  confingOptions = {
    message: '',
    allowErrorThrow: false,
  }
) {
  // Initialize configs with defaults
  const { message, allowErrorThrow } = {
    message: '',
    allowErrorThrow: false,
    ...(confingOptions ? confingOptions : {}),
  };
  /// Abastract try catch wrapping
  try {
    return cb();
  } catch (error) {
    // Throw error if it is allowed
    if (allowErrorThrow) {
      console.log('Error thrown 🚩🚩🚩🚩\n');
      throw error;
    }

    console.log(`Error received from: ${location.pathname}\n`);

    // Show message is throw error is not configure to true
    handleErrors(error, message);
  }
};

/**
 * Abstracts async error handler that abstract try catch and creates a central location for error handling in the application
 *
 * @param {Function} cb Internal details of the calling function
 * @param {{ message: string, hasEvent: boolean, allowErrorThrow: boolean, }} configOptions Configure -> Error message; allowErrorThrow Pass error handling to the requesting function.
 * @returns {Error | string | void}
 **/
export const asyncErrorWrapper = async function (
  cb = () => {},
  confingOptions = {
    message: '',
    allowErrorThrow: false,
  }
) {
  // Initialize configs with defaults
  const { message, allowErrorThrow } = {
    message: '',
    allowErrorThrow: false,
    ...(confingOptions ? confingOptions : {}),
  };
  /// Abastract try catch wrapping
  try {
    return await cb();
  } catch (error) {
    // Throw error if it is allowed
    if (allowErrorThrow) {
      console.log('Error thrown 🚩🚩🚩🚩\n');
      throw error;
    }

    console.log(`Error received from: ${location.pathname}\n`);

    // Show message is throw error is not configure to true
    handleErrors(error, message);
  }
};
