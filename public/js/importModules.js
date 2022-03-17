/**
 * Import Modules
 */

/**
 * Dynamically imports login login on demand
 * @param {Event} event from event listener
 */
export const getLoginModule = async function (event) {
  // Prevent form submit
  event.preventDefault();

  try {
    // try getting the login form
    const { default: handleLogin } = await import(
      /* webpackChunkName: "loginModule" */ './modules/login.js'
    );

    handleLogin(this);
  } catch (error) {
    // TODO Add support for handling notification -> Error type here
    console.log('Error submitting form');

    // FIXME Remove this console log
    console.log(error);
  }
};
