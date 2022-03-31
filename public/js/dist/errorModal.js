const addTemplateUIElement = (rootId, templateId, displayPosition) => {
  const overlayRoot = document.getElementById(rootId);
  const templateEl = document.getElementById(templateId);
  let domEl = "";
  domEl = document.importNode(templateEl.content, true).firstElementChild;
  overlayRoot.insertAdjacentElement(displayPosition, domEl);
  return domEl;
};
const handleClosePopup = (triggerElement) => {
  const closeModalByButton = function(modalEl) {
    modalEl.classList.add(`popup--hide`);
    setTimeout(() => {
      modalEl.classList.add("popup--remove");
    }, 400);
  };
  const closeModalByBackdrop = function(backdropEl) {
    setTimeout(() => {
      backdropEl.classList.add("popup--remove");
    }, 250);
  };
  triggerElement.addEventListener("click", function(event) {
    if (this.classList.contains("modal__btn-close")) {
      closeModalByButton(this.parentElement);
      closeModalByBackdrop(this.parentElement.nextElementSibling);
    }
    if (this.classList.contains("backdrop")) {
      closeModalByButton(this.previousElementSibling);
      closeModalByBackdrop(this);
    }
  });
};
const configureModal = (rootId, templateId, displayPosition) => {
  let domEl = addTemplateUIElement(rootId, templateId, displayPosition);
  const modalHeaderEl = domEl.querySelector(".modal__header");
  const modalCloseBtnEl = domEl.querySelector(".modal__btn-close");
  const modalTitleEl = domEl.querySelector(".modal__title");
  const modalStatusEl = domEl.querySelector(".modal__status-code");
  const modalContentEl = domEl.querySelector(".modal__content");
  const modalFooterEl = domEl.querySelector(".modal__footer");
  const modalFooterTextEl = domEl.querySelector(".modal__footer .modal__text");
  return {
    domEl,
    modalCloseBtnEl,
    modalHeaderEl,
    modalTitleEl,
    modalStatusEl,
    modalContentEl,
    modalFooterEl,
    modalFooterTextEl
  };
};
const configureBackdrop = (rootId, templateId, displayPosition) => {
  let domEl = addTemplateUIElement(rootId, templateId, displayPosition);
  handleClosePopup(domEl);
  return domEl;
};
const selectElementContext = (domEl, statusCode, type) => {
  let selectedStyle = "";
  selectedStyle = `${statusCode}`.startsWith(4) && `${type}--warning`;
  if (!selectedStyle)
    selectedStyle = `${statusCode}`.startsWith(3) && `${type}--info`;
  if (!selectedStyle)
    selectedStyle = `${statusCode}`.startsWith(5) && `${type}--error`;
  domEl.classList.add(selectedStyle);
};
const parseErrorObject = (errorObj) => {
  if (!errorObj)
    return;
  const pageError = JSON.parse(errorObj);
  if (!pageError.message || !pageError.statusCode || !pageError.message)
    return;
  return pageError;
};
const showErrorBackdrop = (errorObj) => {
  const pageError = parseErrorObject(errorObj);
  if (!pageError)
    return;
  const { statusCode } = pageError;
  let domEl = configureBackdrop("overlay", "backdrop", "beforeend");
  selectElementContext(domEl, statusCode, "backdrop");
};
const showErrorModal = (errorObj) => {
  const pageError = parseErrorObject(errorObj);
  if (!pageError)
    return;
  const { statusCode, stack, message } = pageError;
  const {
    domEl,
    modalCloseBtnEl,
    modalTitleEl,
    modalStatusEl,
    modalContentEl,
    modalFooterTextEl
  } = configureModal("overlay", "modal", "afterbegin");
  const wrapLineNumberWithColor = stack.split("\n").map((str) => {
    return str.replace(/\d+:\d+/g, (match) => `<span class="modal__error-line-number">${match}</span>`);
  });
  const errorStackMsgs = wrapLineNumberWithColor.map((msg) => `<p class="modal__text">${msg.trim()}</p>`).slice(1).join(" ");
  modalContentEl.innerHTML = errorStackMsgs;
  modalTitleEl.innerHTML = wrapLineNumberWithColor.at(0);
  modalStatusEl.innerHTML = statusCode;
  modalFooterTextEl.innerHTML = message;
  selectElementContext(domEl, statusCode, "modal");
  handleClosePopup(modalCloseBtnEl);
};
export { showErrorBackdrop, showErrorModal };
