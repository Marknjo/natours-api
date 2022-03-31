import {
  configureModal,
  configureBackdrop,
  handleClosePopup,
} from './handleModal.js';

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
 * Ensures there is an error object with valid format. Expects a json object, which it parses to an object, page error
 * @param {JSON} errorObj A json object with the error string
 * @returns {{message: string, statusCode: number, stack: string} | undefined} parsed error object
 */
const parseErrorObject = errorObj => {
  // Don not proceed if error object is not available
  if (!errorObj) return;

  // Get data
  const pageError = JSON.parse(errorObj);

  // Do not show modal if error object lackx
  if (!pageError.message || !pageError.statusCode || !pageError.message) return;

  // Get err object message content
  return pageError;
};

/**
 * Handle showing overlay
 * @param {{statusCode: number, stack: string, message: string}} errorObj An error object from the server
 */
const showErrorBackdrop = errorObj => {
  // Get parsed error object
  const pageError = parseErrorObject(errorObj);

  // Do not show backdrop
  if (!pageError) return;

  // Get err status code
  const { statusCode } = pageError;

  // Add backdrop configurations
  let domEl = configureBackdrop('overlay', 'backdrop', 'beforeend');

  /// Add backdrop context
  selectElementContext(domEl, statusCode, 'backdrop');
};

/**
 * Handle showing modal
 * @param {{statusCode: number, stack: string, message: string}} errorObj An error object from the server
 */
const showErrorModal = errorObj => {
  // Get parsed error object
  const pageError = parseErrorObject(errorObj);

  // Do not show modal
  if (!pageError) return;

  // Get err status code
  const { statusCode, stack, message } = pageError;

  // Configure modal internals elements
  const {
    domEl,
    modalCloseBtnEl,
    modalTitleEl,
    modalStatusEl,
    modalContentEl,
    modalFooterTextEl,
  } = configureModal('overlay', 'modal', 'afterbegin');

  /// Wrap error line number with a unique color value
  const wrapLineNumberWithColor = stack.split('\n').map(str => {
    return str.replace(
      /\d+:\d+/g,
      match => `<span class="modal__error-line-number">${match}</span>`
    );
  });

  /// Wrap errors in a paragrapm
  const errorStackMsgs = wrapLineNumberWithColor
    .map(msg => `<p class="modal__text">${msg.trim()}</p>`)
    .slice(1)
    .join(' ');

  /// Add error stack text
  modalContentEl.innerHTML = errorStackMsgs;

  /// Add header title message
  modalTitleEl.innerHTML = wrapLineNumberWithColor.at(0);

  /// Add status code
  modalStatusEl.innerHTML = statusCode;

  /// Show message to the footer
  modalFooterTextEl.innerHTML = message;

  //Add modal context
  selectElementContext(domEl, statusCode, 'modal');

  /// Handling modal close
  handleClosePopup(modalCloseBtnEl);
};

/// Show UI templates
export { showErrorModal, showErrorBackdrop };
