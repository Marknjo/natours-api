import httpRequestHelper from '../utils/httpRequestsHelper.js';
import showAlert from '../utils/showAlert.js';

/**
 * Reusable function using Fetch API, responsible for sending viwed flash messages to the server
 *  - Viwed flash messages can be either, those marked as showAfter shown or viewStatus: viewed
 *
 * @param {{viewStatus: 'viewed' | 'pending', showOnPage: string, message: string,action: string,removeAfter: 'shown' | 'timeExpires', messageType: 'info' | 'warning' | 'success' | 'error', expiresIn: Date,createdAt: Date, }} flashMessage Flash message object
 * @param {string} userRole current logged in user role. For only showing admins if there is error
 * @returns {Promise<{status: number, ok: boolean, body: ReadableStream, url: string}>} Response object from server
 */
const sendViewedFlashMessage = async flashMessage => {
  // Configure request
  const requestUrl = '/viewed-flash-message';
  const configOptions = {
    submitData: flashMessage,
    requestMethod: 'POST',
    dataType: 'normal',
    allowRedirect: false,
    sendPlainResponse: true,
  };

  const res = httpRequestHelper(requestUrl, configOptions);
  return res;
};

/**
 * Responsible showing notifications from the server and removing shown notification
 * @param {{viewStatus: 'viewed' | 'pending', showOnPage: string, message: string,action: string,removeAfter: 'shown' | 'timeExpires', messageType: 'info' | 'warning' | 'success' | 'error', expiresIn: Date,createdAt: Date, }} flashMessage - Flash message object
 * @param {string} userRole current logged in user role. For only showing admins if there is error
 * @returns {never} Never returns anything
 */
const showFlashMessageAndRemoveShown = async (flashMessage, userRole) => {
  // Only show notifications for the current page if removeAfte is timeExpires
  if (flashMessage.showOnPage !== location.pathname) return;

  // TODO: Handle admin messages differently
  if (flashMessage.showOnPage.startsWith('/sys-admin')) {
    /// Handle this message differently
  }

  // Show incoming notification before removing it
  showAlert({
    ...flashMessage,
    displayPosition: 'right',
  });

  /// Only remove flash messages of they are identified as removeAfter shown
  if (flashMessage.removeAfter === 'timeExpires') return;

  const res = await sendViewedFlashMessage(flashMessage);

  console.log(res);

  // Show notification if admin and response is not okay
  if (userRole !== 'admin' || (res.ok && res.status === 200)) return;

  showAlert({
    message: `Error showing the notification: ${flashMessage.message}`,
    displayPosition: 'right',
    messageType: 'info',
  });
};

/**
 * Handle showing and reseting of flash messages.
 *
 * Allows flash messages to remain for a while in the client if removeAfte timeExpires is set while those with removeAfter shown are removed immediately from the flash messages stored in the cookie
 * @param {[{viewStatus: 'viewed' | 'pending', showOnPage: string, message: string,action: string,removeAfter: 'shown' | 'timeExpires', messageType: 'info' | 'warning' | 'success' | 'error', expiresIn: Date,createdAt: Date, }]} flashMessagesObj Collecton of flash messages stored in the express request
 * @param {string} userRole current logged in user role. For only showing admins if there is error
 * @returns {void | }
 */
const handleFlashMessages = async (flashMessagesObj, userRole) => {
  // Do not proceed is we do not have a flash message objec with messages
  if (!flashMessagesObj) return;

  const flashMessages = JSON.parse(flashMessagesObj);

  // Flash message is set but has zero items in it, stop processing
  if (flashMessages.length === 0) return;

  /// Cycle flash message
  if (flashMessages.length > 1) {
    flashMessages.forEach(flashMessage => {
      showFlashMessageAndRemoveShown(flashMessage, userRole);
    });

    return;
  }

  /// Just a single flashMessage in the array
  showFlashMessageAndRemoveShown(flashMessages[0], userRole);
};

export default handleFlashMessages;
