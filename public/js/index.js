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
  let pageError = bodyEl.dataset.pageError;

  if (pageError) {
    pageError = JSON.parse(pageError);

    console.table(pageError);

    /**
     *  A universal functions that adds a template to the DOM
     * @param {string} rootId Host ID, where to position the templates
     * @param {string} templateId the template Id in the html waiting for position
     * @param {'beforebegin' | 'beforeend' | 'afterbegin' | 'afterend'} displayPosition HTML insert position in the root element
     * @param {boolean} adoptEl Copy or move element. Default is to clone using insertNode, while alternative is to adopt/move element using adoptNode
     * @returns {HTMLElement} HTML DOM elment inserted in the DOM
     */
    const addTemplateUIElement = (
      rootId,
      templateId,
      displayPosition,
      adoptEl = false
    ) => {
      // get the
      const overlayRoot = document.getElementById(rootId);
      const templateEl = document.getElementById(templateId);
      let domEl = '';

      /// Clone template
      if (adoptEl) domEl = document.adoptNode(templateEl);

      /// Clone
      if (!adoptEl)
        domEl = document.importNode(templateEl.content, true).firstElementChild;

      /// Handle display
      overlayRoot.insertAdjacentElement(displayPosition, domEl);

      return domEl;
    };

    /**
     * Handle showing overlay
     * @param {{statusCode: number, stack: string, message: string}} errorObj An error object from the server
     */
    const showBackdrop = errorObj => {
      // Do not show backdrop if no error object
      if (!errorObj) return;

      // Get err message content
      const { statusCode } = errorObj;

      // Render UI element to the DOM
      let domEl = addTemplateUIElement('overlay', 'backdrop', 'beforeend');

      /// Add modal class
      let backdropStyle;

      /// Warning messages
      backdropStyle = `${statusCode}`.startsWith(4) && 'backdrop--warning';

      // info messages
      if (!backdropStyle)
        backdropStyle = `${statusCode}`.startsWith(3) && 'backdrop--info';

      // error messages
      if (!backdropStyle)
        backdropStyle = `${statusCode}`.startsWith(5) && 'backdrop--error';

      domEl.classList.add(backdropStyle);
    };

    /**
     * Handle showing modal
     * @param {{statusCode: number, stack: string, message: string}} errorObj An error object from the server
     */
    const showModal = errorObj => {
      // Do not show modal if no error object
      if (!errorObj) return;

      // Get err object message content
      const { stack, statusCode, message } = errorObj;

      // Render UI element to the DOM
      let domEl = addTemplateUIElement('overlay', 'modal', 'afterbegin');

      //let textNode = addTemplateUIElement;

      /// Add content to the modal
      const modalTitleEl = domEl.querySelector('.modal__title');
      const modalStatusEl = domEl.querySelector('.modal__status-code');
      const modalContentEl = domEl.querySelector('.modal__content');
      const modalFooterEl = domEl.querySelector('.modal__footer');

      /// Get the paragraph

      /// Split stact trace string by new line
      const colorStackLineNumbers = stack.split('\n').map(str => {
        return str.replace(
          /\d+:\d+/g,
          match => `<span class="modal__error-line-number">${match}</span>`
        );
      });

      const errorStackMsgs = colorStackLineNumbers
        .map(msg => `<p class="modal__text">${msg.trim()}</p>`)
        .slice(1)
        .join(' ');

      /// Add error stack text
      modalContentEl.innerHTML = errorStackMsgs;

      /// Add header title message
      modalTitleEl.innerHTML = colorStackLineNumbers.at(0);

      /// Add status code
      modalStatusEl.innerHTML = statusCode;

      /// Hide footer
      modalFooterEl.classList.add('modal__footer--hide');

      /// Add modal class
      let modalStyle;

      /// Warning messages
      modalStyle = `${statusCode}`.startsWith(4) && 'modal--warning';

      // info messages
      if (!modalStyle)
        modalStyle = `${statusCode}`.startsWith(3) && 'modal--info';

      // error messages
      if (!modalStyle)
        modalStyle = `${statusCode}`.startsWith(5) && 'modal--error';

      domEl.classList.add(modalStyle);

      /// Listening to
    };

    /// Show UI templates
    showModal(pageError);
    showBackdrop(pageError);
  }
}
