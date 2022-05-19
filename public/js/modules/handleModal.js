import addTemplateUIElement from './addHTMLTemplate.js';

/**
 * Handles close of the modal/popup with a backdrop and close button on click
 * @param {HTMLElement} triggerElement The selector element
 */
const handleClosePopup = triggerElement => {
  /**
   * Use button to close the modal. Animates the modal them removes it from the flow
   * @param {HTMLDivElement} modalEl The modal div element
   */
  const closeModalByButton = function (modalEl) {
    modalEl.classList.add(`popup--hide`);

    /// Remove element from the flow
    setTimeout(() => {
      modalEl.classList.add('popup--remove');
    }, 400);
  };

  /**
   * Use Backdrop to close the modal
   * @param {HTMLDivElement} backdropEl The backdrop element
   */
  const closeModalByBackdrop = function (backdropEl) {
    // Add delay
    setTimeout(() => {
      backdropEl.classList.add('popup--remove');
    }, 250);
  };

  /// Listen to the click event to close both the modal via clicking the button or clicking the backdrop
  triggerElement.addEventListener('click', function (event) {
    /// Handle close of the popup/modal if the close button is clicked
    if (this.classList.contains('modal__btn-close')) {
      // Close modal via button
      closeModalByButton(this.parentElement);

      // Close the the backdrop
      closeModalByBackdrop(this.parentElement.nextElementSibling);
    }

    /// Handle close of the popup/modal if the overlay is clicked
    if (this.classList.contains('backdrop')) {
      // Start closing the modal
      closeModalByButton(this.previousElementSibling);

      // close the backdrop
      closeModalByBackdrop(this);
    }
  });
};

/**
 *  Configures modal internal content and exposes them for specific modal implementation
 * @param {string} rootId Host ID, where to position the templates
 * @param {string} templateId the template Id in the html waiting for position
 * @param {'beforebegin' | 'beforeend' | 'afterbegin' | 'afterend'} displayPosition HTML insert position in the root element
 * @returns {HTMLElement} HTML DOM elment inserted in the DOM
 */
const configureModal = (rootId, templateId, displayPosition) => {
  // Render UI element to the DOM
  let domEl = addTemplateUIElement(rootId, templateId, displayPosition);

  //let textNode = addTemplateUIElement;

  /// Add content to the modal
  const modalHeaderEl = domEl.querySelector('.modal__header');
  const modalCloseBtnEl = domEl.querySelector('.modal__btn-close');
  const modalTitleEl = domEl.querySelector('.modal__title');
  const modalStatusEl = domEl.querySelector('.modal__status-code');
  const modalContentEl = domEl.querySelector('.modal__content');
  const modalFooterEl = domEl.querySelector('.modal__footer');
  const modalFooterTextEl = domEl.querySelector('.modal__footer .modal__text');

  /// Expose modal internals HTML elements
  return {
    domEl,
    modalCloseBtnEl,
    modalHeaderEl,
    modalTitleEl,
    modalStatusEl,
    modalContentEl,
    modalFooterEl,
    modalFooterTextEl,
  };
};

/**
 *  Configures backdrop internal content and exposes them for specific modal implementation
 * @param {string} rootId Host ID, where to position the templates
 * @param {string} templateId the template Id in the html waiting for position
 * @param {'beforebegin' | 'beforeend' | 'afterbegin' | 'afterend'} displayPosition HTML insert position in the root element
 * @returns {HTMLElement} HTML DOM elment inserted in the DOM
 */
const configureBackdrop = (rootId, templateId, displayPosition) => {
  // Render Backdrop to the UI
  let domEl = addTemplateUIElement(rootId, templateId, displayPosition);

  /// Hide backdrop
  handleClosePopup(domEl);

  // return backdrop
  return domEl;
};

/// Export backdrop and popup
export { configureBackdrop, configureModal, handleClosePopup };
