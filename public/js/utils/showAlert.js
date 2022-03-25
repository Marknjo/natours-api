/// Manages alerts

/**
 * Hide tiomeout on demand
 * @param {TimerHandler} timer Set timeout handler
 * @returns {TimerHandler} Clear timeout
 */
const hideAlert = timer => {
  const alert = document.querySelector('.alert');

  if (!alert) return;

  if (timer) clearTimeout(timer);

  alert.classList.add(`alert--hide`);

  return setTimeout(() => {
    alert.parentElement.removeChild(alert);
  }, 100 * 6);
};

/**
 * Handles closing of the button
 * @param {'left' | 'center' | 'right'} direction Where to position the close button relative to the alert box
 * @returns {TimerHandler} Clear timeout
 */
const closeAlert = direction => {
  const closeBtnEl = document.querySelector('.alert__close');

  if (!closeBtnEl) return;

  const alertBoxEl = closeBtnEl.parentElement;

  closeBtnEl.addEventListener('click', function (event) {
    this.parentElement.classList.add(`alert--hide-${direction}`);

    return setTimeout(() => {
      alertBoxEl.parentElement.removeChild(alertBoxEl);
    }, 100 * 6);
  });
};

/**
 * Shows alert for a given duration
 *  @param {{removeAfter: 'shown' | 'timeExpires', viewStatus: 'viewed' | 'pending', message: string, action: string, messageType: 'info' | 'warning' | 'success' | 'error', displayPosition: 'center' | 'right' | 'left', alertDisplayDuration: number}} alert Collection of flash messages from the client browser
 *
 */
const showAlert = function (
  alert = {
    message: '',
    action: '',
    viewStatus: '',
    removeAfter: '',
    messageType: 'success',
    displayPosition: 'center',
    alertDisplayDuration: 7,
  }
) {
  // Prep incoming alert
  const defaultAlert = {
    messageType: 'success',
    displayPosition: 'center',
    alertDisplayDuration: 7,
  };

  const {
    message,
    action,
    messageType,
    displayPosition,
    alertDisplayDuration,
    viewStatus,
    removeAfter,
  } = {
    ...defaultAlert,
    ...alert,
  };

  /// Server messages filter ->
  //Prevent showing alert more than once on the client side for server side messages marked as removerAfter timeExpires and have already been shown
  if (
    viewStatus &&
    removeAfter &&
    viewStatus === 'viewed' &&
    removeAfter === 'timeExpires' &&
    !location.pathname.startsWith('/sys-admin')
  )
    return;

  /// hide alert first
  // TODO: Currently the showAlert is not able to show multiple alerts. Should implement it to handle multiple alerts and notification of number of the notifications in teh queue
  const hideTimer = hideAlert();

  /// Get the alert housing element
  const headerEl = document.querySelector('.header');

  /// Generate icon mockup
  const iconMarkup = type => `<i class="alert__icon alert__icon--${type}"></i>`;

  const showPosition = `alert--${displayPosition}`;

  const showTitle = action
    ? `<h2 class="alert__title alert__title--${displayPosition}">${action}</h2>`
    : '';

  /// return a constructed alert depending with the type
  const alertMarkup = `<div class="alert ${
    messageType ? 'alert__' + messageType : ''
  } ${showPosition}"> 
        <button class="alert__close alert__close--${displayPosition}">&times;</button>
        ${showTitle}
        <p class="alert__content">
           ${iconMarkup(messageType)}
           ${message}
        </p>
    </div>
    `;

  /// Add markup to the DOM
  headerEl.insertAdjacentHTML('beforeend', alertMarkup);

  /// Auto remove alert
  const autoTimer = setTimeout(() => {
    hideAlert(hideTimer);
  }, 1000 * alertDisplayDuration);

  //   /// Close timeout before hidealert
  closeAlert(displayPosition, alertDisplayDuration, autoTimer);
};

export default showAlert;
