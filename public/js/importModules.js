/// Handles import of modules

import { asyncImportWrapper } from './utils/codeWrappers.js';

/**
 * Import Modules
 */
const getLoginModule = () =>
  import(/*webpackChunkName: "loginModule"*/ './modules/login.js');

/**
 * Handle user login login with dynamic import. Import feature on demand
 * @param {Event} event from event listener
 */
export const loginFormSubmitHandler = asyncImportWrapper(async function (
  event = Event
) {
  // Prevent form submit
  event.preventDefault();

  // try getting the login form
  const { default: handleLogin } = await getLoginModule();

  // Login user
  handleLogin(this);
});
