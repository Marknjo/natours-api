/**
 * All related functions for wrapping code
 * - imports, trycatch, etc.
 */

/**
 * Helper function for importing and handlering errors
 *
 * Keeps internal logic cleaner
 * @param {Promise} cb Generic callback function returned after import of a module
 * @returns {void}
 */
export const asyncImportWrapper = function (cb = Promise) {
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
