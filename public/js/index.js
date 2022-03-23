'use strict';
// IMPORTS
//import showLocationMap from './modules/locationsMap.js';

import * as module from './importModules.js';
import showAlert from './utils/showAlert.js';

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

  /// Handle flash messages
  if (flashMessagesObj) {
    const flashMessages = JSON.parse(flashMessagesObj);

    //console.log(flashMessages);

    const message = flashMessages[0];

    console.log(location.pathname);

    const handleFlashMessages = flashMessages => {
      // Flash message is set but has zero items in it, stop processing
      if (flashMessages.length === 0) return;

      //console.table(flashMessages);

      console.table({
        lenTest: flashMessages.length === 1,
        locationTest: flashMessages[0].showOnPage === location.pathname,
        flashMessageLocation: flashMessages[0].showOnPage,
        currentLocation: location.pathname,
        flashMessage: flashMessages[0],
      });

      /// Flash messages bag has only one item
      if (flashMessages.length === 1) {
        // Process single item
        const flashMessage = flashMessages[0];

        // check which page it should be shown
        if (flashMessage.showOnPage === location.pathname) {
          // Only show those notifications here
          // Filter time it was shown
          showAlert({
            ...message,
            displayPosition: 'right',
          });
        }
      }
    };

    handleFlashMessages(flashMessages);

    /// TODO: FIlter server notifications
    // showAlert({
    //   ...message,
    //   displayPosition: 'right',
    //   messageType: 'success',
    // });
  }
}
