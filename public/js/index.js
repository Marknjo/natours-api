'use strict';
// IMPORTS
//import showLocationMap from './modules/locationsMap.js';

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
  //
  /**
   *  A universal functions that adds a template to the DOM
   * @param {string} rootId Host ID, where to position the templates
   * @param {string} templateId the template Id in the html waiting for position
   * @param {'beforebegin' | 'beforeend' | 'afterbegin' | 'afterend'} displayPosition HTML insert position in the root element
   * @returns {HTMLElement} HTML DOM elment inserted in the DOM
   */
  const addTemplateUIElement = (rootId, templateId, displayPosition) => {
    // get the
    const overlayRoot = document.getElementById(rootId);
    const modalTemplate = document.getElementById(templateId);
    let domEl = '';

    /// Show modal
    const getModalTMP = document.importNode(modalTemplate.content, true);
    domEl = getModalTMP.firstElementChild;

    /// Handle display
    overlayRoot.insertAdjacentElement(displayPosition, domEl);

    return domEl;
  };

  /**
   * Handle showing overlay
   */
  const showBackdrop = () => {
    // Render UI element to the DOM
    let domEl = addTemplateUIElement('overlay', 'backdrop', 'beforeend');
  };

  /**
   * Handle showing modal
   */
  const showModal = () => {
    // Render UI element to the DOM
    let domEl = addTemplateUIElement('overlay', 'modal', 'afterbegin');
  };

  /// Show UI templates
  showModal();
  showBackdrop();
}
