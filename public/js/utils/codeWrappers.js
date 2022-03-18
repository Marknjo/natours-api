/**
 * All related functions for wrapping code
 * - imports, trycatch, etc.
 */

/**
 * Helper method to abstract error handling
 * @param {Error} error Error object
 * @param {String} message Custom message passed on implementing the wrapper
 */
const handleErrors = (error, message) => {
  // TODO Add support for handling notification -> Error type here
  console.log(message ? message : 'Error occured!');
  alert(message ? message : 'Error occured!');

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
 * @param {String} message Error message
 * @param {Boolean} hasEvent Wraps code for event listeners
 * @param {Boolean} allowErrorThrow Pass error handling to the requesting function
 */
export const asyncImportWrapper = function (
  cb = Promise,
  message = '',
  hasEvent = false,
  allowErrorThrow = false
) {
  // Check that there is requirement for handling events
  if (hasEvent) {
    return async function (event = Event) {
      try {
        await cb(event);
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

        await cb(args);
        return;
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
 * Abstracts error handling from the calling function
 *
 * @param {Function} cb Internal details of the calling function
 * @param {String} message Error massage
 * @param {Boolean} allowErrorThrow Pass error handling to the requesting function
 * @returns {void}
 */
export const errorHandlerWrapper = function (
  cb = () => {},
  message = '',
  allowErrorThrow
) {
  /**
   * @param {T extends any[]} args Arguments passed to the calleback function
   */
  return function (...args) {
    try {
      cb(...args);
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
