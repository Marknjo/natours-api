'use strict';
// IMPORTS
//import showLocationMap from './modules/locationsMap.js';
import showAlert from './utils/showAlert.js';
import httpRequestsHelper, {
  handleHttpErrors,
} from './utils/httpRequestsHelper.js';
import * as module from './importModules.js';
import handleFlashMessages from './modules/handleFlashMessages.js';

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
  userDataFormEl.addEventListener('submit', async function (event) {
    try {
      event.preventDefault();

      // get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');

      // Validata user inputs
      if (!name || !email) {
        throw new Error('Name and Email requred in the field.');
      }

      const url = '/api/v1/users/update-me';

      // send form data
      const response = await httpRequestsHelper(url, {
        sendPlainResponse: true,
        submitData: formData,
        requestMethod: 'PATCH',
        dataType: 'attachment',
      });

      //if (!response.ok) throw new Error(response.message);

      /// susccess response
      await handleHttpErrors(response, 'Could not update form data!');
    } catch (error) {
      showAlert({
        message: error.message,
        messageType: 'error',
        displayPosition: 'center',
        action: 'Invalid Inputs',
      });
    }
  });
}
