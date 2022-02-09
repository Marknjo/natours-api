/**
 * Responsible of hiding the alert messages
 */
const hideAlert = function () {
  const alert = document.querySelector('.alert');

  if (!alert) return;

  // Remove alerts before adding another
  alert.parentElement.removeChild(alert);
};

/**
 * Close the alert Message
 */
const closeAlert = function (timer) {
  const alertMessageEl = document.querySelector('.alert');
  alertMessageEl.addEventListener('click', () => {
    clearTimeout(timer);
    hideAlert();
  });
};

/**
 * Responsible of showing popup alerts for messages
 * @param {String} message Alert message
 * @param {String} alertType Alert type - currently supoorts(error|success)
 */
const showAlert = function (message, alertType) {
  hideAlert();

  const alertMarkup = `<div class="alert alert--${alertType}" >${message}</div>`;

  // attach message to the DOM
  document.body.insertAdjacentHTML('afterbegin', alertMarkup);

  const timer = setTimeout(() => {
    hideAlert();
  }, 5000);

  // Attach a click close event
  closeAlert(timer);
};

export default showAlert;
