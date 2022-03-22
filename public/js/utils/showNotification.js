/// Manages notifications

/**
 * Hide tiomeout on demand
 * @param {TimerHandler} timer Set timeout handler
 * @returns {TimerHandler} Clear timeout
 */
const hideNotification = timer => {
  const notification = document.querySelector('.notification-box');

  if (!notification) return;

  if (timer) clearTimeout(timer);

  notification.classList.add(`notification-box--hide`);

  return setTimeout(() => {
    notification.parentElement.removeChild(notification);
  }, 100 * 6);
};

/**
 * Handles closing of the button
 * @param {'left' | 'center' | 'right'} direction Where to position the close button relative to the notification box
 * @returns {TimerHandler} Clear timeout
 */
const closeNotification = direction => {
  const closeBtnEl = document.querySelector('.notification-box__close');

  if (!closeBtnEl) return;

  const notificationBoxEl = closeBtnEl.parentElement;

  closeBtnEl.addEventListener('click', function (event) {
    this.parentElement.classList.add(`notification-box--hide-${direction}`);

    return setTimeout(() => {
      notificationBoxEl.parentElement.removeChild(notificationBoxEl);
    }, 100 * 6);
  });
};

/**
 * Shows notification for a given duration
 *  @param {[{ message: string,action: string, messageType: 'info' | 'warning' | 'success' | 'error', displayPosition: 'center' | 'right' | 'left', notificationDisplayDuration: number}]} cookieFlashMessages Collection of flash messages from the client browser
 *
 */
const showNotification = function (
  notification = {
    message: '',
    action: '',
    messageType: 'success',
    displayPosition: 'center',
    notificationDisplayDuration: 7,
  }
) {
  // Prep incoming notification
  const defaultNotification = {
    messageType: 'success',
    displayPosition: 'center',
    notificationDisplayDuration: 7,
  };

  const {
    message,
    action,
    messageType,
    displayPosition,
    notificationDisplayDuration,
  } = {
    ...defaultNotification,
    ...notification,
  };

  /// hide notification first
  //const closeTimer = closeNotification();
  const hideTimer = hideNotification();

  /// Get the notification housing element
  const headerEl = document.querySelector('.header');

  /// Generate icon mockup
  const iconMarkup = type =>
    `<i class="notification-box__icon notification-box__icon--${type}"></i>`;

  const showPosition = `notification-box--${displayPosition}`;

  const showTitle = action
    ? `<h2 class="notification-box__title">${action}</h2>`
    : '';

  /// return a constructed notification depending with the type
  const notificationMarkup = `<div class="notification-box ${
    messageType ? 'notification-box__' + messageType : ''
  } ${showPosition}"> 
        <button class="notification-box__close notification-box__close--${displayPosition}">&times;</button>
        ${showTitle}
        <p class="notification-box__content">
           ${iconMarkup(messageType)}
           ${message}
        </p>
    </div>
    `;

  /// Add markup to the DOM
  headerEl.insertAdjacentHTML('beforeend', notificationMarkup);

  /// Auto remove notification
  const autoTimer = setTimeout(() => {
    hideNotification(hideTimer);
  }, 1000 * notificationDisplayDuration);

  //   /// Close timeout before hidenotification
  closeNotification(displayPosition, notificationDisplayDuration, autoTimer);
};

export default showNotification;
