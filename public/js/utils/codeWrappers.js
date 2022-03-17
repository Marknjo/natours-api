/**
 * All related functions for wrapping code
 * - imports, trycatch, etc.
 */

/**
 * Helper function for importing and handlering errors
 *
 * Keeps internal logic cleaner
 * @param {Promise} cb Generic callback function returned after import of a module
 * @param {String} message Error message
 * @returns {void}
 */
export const asyncImportWrapper = function (cb = Promise, message = '') {
  //
  return async function (event = Event) {
    try {
      await cb(event);
    } catch (error) {
      // TODO Add support for handling notification -> Error type here
      console.log('Error submitting form');

      // FIXME Remove this console log
      console.log(error);
    }
  };
};

/**
 * Abstracts error handling from the calling function
 *
 * @param {Function} cb Internal details of the calling function
 * @param {String} message Error massage
 * @returns {void}
 */
export const errorHandlerWrapper = function (cb = () => {}, message = '') {
  return function (...args) {
    try {
      cb(...args);
    } catch (error) {
      // TODO Add support for handling notification -> Error type here
      console.log('Error submitting form');

      // FIXME Remove this console log
      console.log(error);
    }
  };
};
