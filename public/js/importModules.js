/// Handles import of modules

import { asyncImportWrapper } from './utils/codeWrappers.js';

/**
 * Import Modules
 */
const getLoginModule = () =>
  import(/*webpackChunkName: "loginModule"*/ './modules/login.js');

const getLocationsMapModule = () =>
  import(
    /* webpackChunkName: "locationMap" */
    './modules/locationsMap.js'
  );

/**
 * Handle user login login with dynamic import. Import feature on demand
 * @param {Event} event from event listener
 */
export const loginFormSubmitHandler = asyncImportWrapper(
  async function (event = Event) {
    // Prevent form submit
    event.preventDefault();

    // try getting the login form
    const { default: handleLogin } = await getLoginModule();

    // Login user
    handleLogin(this);
  },
  'Error submitting form',
  true
);

/**
 * Handles Map import
 */
export const loadMapHandler = asyncImportWrapper(async function (mapEl) {
  const { default: showLocationMap } = await getLocationsMapModule();

  //Render Map
  showLocationMap(mapEl.dataset.locations, mapEl.dataset.mapboxKey);
}, 'Could not load the MAP');
