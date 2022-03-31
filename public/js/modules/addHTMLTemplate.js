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
  const templateEl = document.getElementById(templateId);
  let domEl = '';

  /// Clone
  domEl = document.importNode(templateEl.content, true).firstElementChild;

  /// Handle display
  overlayRoot.insertAdjacentElement(displayPosition, domEl);

  return domEl;
};

///
export default addTemplateUIElement;
