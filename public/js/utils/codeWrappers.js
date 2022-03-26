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
 * Helper function for importing and handlering errors
 *
 * Keeps internal logic cleaner
 *
 * Wraps code with add event listener and that without, either with arguments or not
 * @param {Promise} cb Generic callback function returned after import of a module
 * @param {{ message: string, hasEvent: boolean, allowErrorThrow: boolean, }} configOptions Configure -> Error message; hasEvent Wraps code for event listeners; allowErrorThrow Pass error handling to the requesting function.
 * @returns {Error | string | void}
 */
export const asyncImportWrapper = function (
  cb = Promise,
  confingOptions = {
    message: '',
    hasEvent: false,
    allowErrorThrow: false,
  }
) {
  // Initialize configs with defaults
  const { message, hasEvent, allowErrorThrow } = confingOptions
    ? {
        message: '',
        hasEvent: false,
        allowErrorThrow: false,
        ...confingOptions,
      }
    : { message: '', hasEvent: false, allowErrorThrow: false };

  // Check that there is requirement for handling events
  if (hasEvent) {
    return async function (event = Event) {
      try {
        return await cb(event);
      } catch (error) {
        // Throw error if it is allowed
        if (allowErrorThrow) {
          throw error;
        }

        // Show message is throw error is not configure to true
        handleErrors(error, message);
      }
    };
  }

  /// Handling non event import options
  return async function (...argsOptions) {
    try {
      // Does not have any event
      if (argsOptions.length > 0 || argsOptions) {
        const args = argsOptions.length === 1 ? argsOptions[0] : argsOptions;

        return await cb(args);
      }

      return await cb();
    } catch (error) {
      // Throw error if it is allowed
      if (allowErrorThrow) {
        throw error;
      }

      // Show message is throw error is not configure to true
      handleErrors(error, message);
    }
  };
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
      throw error;
    }

    // Show message is throw error is not configure to true
    handleErrors(error, message);
  }
};
