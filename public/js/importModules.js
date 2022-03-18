/// Handles import of modules

import { asyncImportWrapper } from './utils/codeWrappers.js';
// import httpRequestHelper from './utils/httpRequestsHelper.js';
// import redirectTo from './utils/redirectsHelper.js';

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
export const loginFormSubmitHandler = asyncImportWrapper(
  async function (event = Event) {
    // Prevent form submit
    event.preventDefault();

    // try getting the login form
    const { default: handleLogin } = await getLoginModule();

    // Login user
    handleLogin(event.target);
  },
  {
    hasEvent: true,
    message: 'Error submitting form',
  }
);

/**
 * Handles Map import
 */
export const loadMapHandler = asyncImportWrapper(
  async function (mapEl) {
    const { default: showLocationMap } = await getLocationsMapModule();

    //Render Map
    showLocationMap(mapEl.dataset.locations, mapEl.dataset.mapboxKey);
  },
  {
    hasEvent: true,
    message: 'Could not load the MAP',
  }
);

/**
 * Handles logout user
 */
export const logoutHandler = asyncImportWrapper(
  async function () {
    // // Send request to the server to logout user
    // const url = '/api/v1/users/logout';
    // const response = await httpRequestHelper(url, {
    //   requestMethod: 'GET',
    // });
    // console.log(response);
    // // Check for errors
    // if (response.status === 'fail' || response.status === 'error') {
    //   throw new Error('Could not log out user');
    // }
    // // TODO: Handle successful messaging
    // console.log(response.data.message);
    // /// Handle redirects
    // const logoutFromUrl = location.pathname;
    // /// Redirect to
    // // Loggin out from admin dashboard
    // if (logoutFromUrl.includes('sys-admin')) {
    //   redirectTo('/', {
    //     redirectOption: 'disallowGoBack',
    //   });
    // }
    // // Loggin out from other client pages
    // redirectTo(logoutFromUrl, {
    //   redirectOption: 'allowsGoBack',
    // });
    // Logout user
    const { default: handleLogout } = await getLogoutModule();
    handleLogout();
  },
  {
    hasEvent: true,
    allowErrorThrow: true,
  }
);
