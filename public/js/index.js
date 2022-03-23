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

    const handleFlashMessages = async flashMessages => {
      // Flash message is set but has zero items in it, stop processing
      if (flashMessages.length === 0) return;

      //console.table(flashMessages);

      // console.table({
      //   lenTest: flashMessages.length === 1,
      //   locationTest: flashMessages[0].showOnPage === location.pathname,
      //   flashMessageLocation: flashMessages[0].showOnPage,
      //   currentLocation: location.pathname,
      //   flashMessage: flashMessages[0],
      // });

      /// Flash messages bag has only one item
      if (flashMessages.length === 1) {
        // Process single item
        const flashMessage = flashMessages[0];

        // Handle admin messages differently
        if (flashMessage.showOnPage.startsWith('/sys-admin')) {
          /// Handle this message differently
        }

        // check which page it should be shown
        if (flashMessage.showOnPage === location.pathname) {
          // Only show those notifications here

          // Filter time it was shown
          showAlert({
            ...message,
            displayPosition: 'right',
          });

          console.log('running...');

          const res = await fetch('/flash-shown', {
            method: 'POST',
            body: JSON.stringify(flashMessage),
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          });

          // TODO: Implement it only for admins otherwise fail silently
          // Slow removal of the notification until the period set to remove is done.
          if (!res.ok && res.status === 404) {
            console.log('Could not update messages.');
            showAlert({
              message: 'Could not update messages.',
              displayPosition: 'right',
              messageType: 'info',
            });
          }

          console.log(res);
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
