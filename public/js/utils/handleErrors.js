/**
 * All related functions for wrapping code
 * - imports, trycatch, etc.
 */

import showAlert from './showAlert.js';

/**
 * Helper method to abstract error handling
 * @param {Error} error Error object
 * @param {String} message Custom message passed on implementing the wrapper
 * @param {{messageType: 'error' | 'warning' | 'info' | 'success', action: string, displayPosition: 'left' | 'right' | 'center'}} showAlertConfigs alert configuration object
 */
const handleErrors = (error, message, showAlertConfigs) => {
  const getMessage = message ? message : error.message;

  // configure alert
  const alertConfigDefaults = {
    messageType: 'error',
    action: 'Error message',
    displayPosition: 'right',
  };

  const { action, messageType, displayPosition } = {
    ...alertConfigDefaults,
    ...showAlertConfigs,
  };

  // Handle notification

  showAlert({
    message: getMessage,
    action,
    messageType,
    displayPosition,
  });
};

/**
 * Abstracts error handler that abstract try catch and creates a central location for error handling in the application
 *
 * @param {Function} cb Internal details of the calling function
 * @param {{ message: string, hasEvent: boolean, allowErrorThrow: boolean, }} configOptions Configure -> Error message; allowErrorThrow Pass error handling to the requesting function.
 * @param {{messageType: 'error' | 'warning' | 'info' | 'success', action: string, displayPosition: 'left' | 'right' | 'center'}} showAlertConfigs alert configuration object
 * @returns {Error | string | void}
 **/
export const errorWrapper = function (
  cb = () => {},
  confingOptions = {
    message: '',
    allowErrorThrow: false,
  },
  showAlertConfigs
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
    handleErrors(error, message, showAlertConfigs);
  }
};

/**
 * Abstracts async error handler that abstract try catch and creates a central location for error handling in the application
 *
 * @param {Function} cb Internal details of the calling function
 * @param {{ message: string, hasEvent: boolean, allowErrorThrow: boolean, }} configOptions Configure -> Error message; allowErrorThrow Pass error handling to the requesting function.
 * @param {{messageType: 'error' | 'warning' | 'info' | 'success', action: string, displayPosition: 'left' | 'right' | 'center'}} showAlertConfigs alert configuration object
 * @returns {Error | string | void}
 **/
export const asyncErrorWrapper = async function (
  cb = () => {},
  confingOptions = {
    message: '',
    allowErrorThrow: false,
  },
  showAlertConfigs
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
      throw error;
    }

    // Show message is throw error is not configure to true
    handleErrors(error, message, showAlertConfigs);
  }
};
