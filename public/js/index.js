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
     * Adds a styling context to the current selected dom element
     * @param {HTMLElement} domEl The html element that will get the current context style depending with the status code i.e. modal or overlay
     * @param {number} statusCode  status code of the error from the server
     * @param {string} type The element, i.e. modal or overlay
     */
    const selectElementContext = (domEl, statusCode, type) => {
      // Set default to none
      let selectedStyle = '';

      /// Warning messages
      selectedStyle = `${statusCode}`.startsWith(4) && `${type}--warning`;

      // info messages
      if (!selectedStyle)
        selectedStyle = `${statusCode}`.startsWith(3) && `${type}--info`;

      // error messages
      if (!selectedStyle)
        selectedStyle = `${statusCode}`.startsWith(5) && `${type}--error`;

      // Add element context
      domEl.classList.add(selectedStyle);
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

      /// Add backdrop context
      selectElementContext(domEl, statusCode, 'backdrop');
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

      //Add modal context
      selectElementContext(domEl, statusCode, 'modal');
    };

    /// Show UI templates
    showModal(pageError);
    showBackdrop(pageError);
  }
}
