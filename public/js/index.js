'use strict';
// IMPORTS
//import showLocationMap from './modules/locationsMap.js';
import showAlert from './utils/showAlert.js';
import httpRequestsHelper, {
  handleHttpErrors,
} from './utils/httpRequestsHelper.js';
import * as module from './importModules.js';
import handleFlashMessages from './modules/handleFlashMessages.js';
import redirectTo from './utils/redirectsHelper.js';

/// GET DOM ELEMENTS
/**
 * Map Element
 */
const mapEl = document.getElementById('map');

/**
 * Login Form
 */
const loginFormEl = document.querySelector('.form__login');

/**
 * Logout button
 */
const logoutEl = document.getElementById('logout');

/**
 * User data form
 */
const userDataFormEl = document.querySelector('.form-user-data');

/**
 * Get base body
 */
const bodyEl = document.body;

/// COFIGURE DIFFERENT SCRIPTS
/**
 * Get Map If it is set
 */
if (mapEl) module.loadMapHandler(mapEl);

/**
 * handle login form
 */
if (loginFormEl) {
  // Listen to teh submit event
  loginFormEl.addEventListener('submit', module.loginFormSubmitHandler);
}

/**
 * Handle user logout
 */
if (logoutEl) logoutEl.addEventListener('click', module.logoutHandler);

/**
 * Handle server messages
 */
if (bodyEl) {
  const flashMessagesObj = bodyEl.dataset.flashMessages;
  const userRole = bodyEl.dataset.userRole ? bodyEl.dataset.userRole : '';

  handleFlashMessages(flashMessagesObj, userRole);
}

/**
 * Handle admin errors
 */
if (bodyEl) {
  let errorObj = bodyEl.dataset.pageError;

  if (errorObj) {
    module.showErrorModalHandler(errorObj);
  }
}

/**
 * Handle updating user data
 */
if (userDataFormEl) {
  // update user data
  userDataFormEl.addEventListener('submit', module.updateUserHandler);
}
