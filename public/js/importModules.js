/// Handles import of modules

import { errorWrapper } from './utils/handleErrors.js';

/**
 * Import Modules
 */
const getLoginModule = () =>
  import(/*webpackChunkName: "loginModule"*/ './modules/login.js');

const getLocationsMapModule = () =>
  import(
    /* webpackChunkName: "locationMapModule" */
    './modules/locationsMap.js'
  );

/// Import logout on demand
const getLogoutModule = () =>
  import(/* wepackChunkName: "logoutModule" */ './modules/logout.js');

/**
 * Handle user login login with dynamic import. Import feature on demand
 * @param {Event} event from event listener
 */
export const loginFormSubmitHandler = async function (event = Event) {
  return errorWrapper(
    async () => {
      // Prevent form submit
      event.preventDefault();

      // try getting the login form
      const { default: handleLogin } = await getLoginModule();

      // Login user
      handleLogin(event.target);
    },
    {
      message: 'Error submitting form',
    }
  );
};

/**
 * Handles Map import
 */
export const loadMapHandler = function (mapEl) {
  // Error wrapper
  return errorWrapper(
    async () => {
      const { default: showLocationMap } = await getLocationsMapModule();

      //Render Map
      showLocationMap(mapEl.dataset.locations, mapEl.dataset.mapboxKey);
    },
    { message: 'Could not load the MAP' }
  );
};

/**
 * Handles logout user
 */
export const logoutHandler = async function () {
  // Error wrapper
  return errorWrapper(
    async () => {
      const { default: handleLogout } = await getLogoutModule();
      handleLogout();
    },
    { allowErrorThrow: true }
  );
};
