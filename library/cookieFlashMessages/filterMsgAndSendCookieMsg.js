// MODULE IMPORTS
import pkg from 'express';
const { Request, Response } = pkg;

/// 3rd Party
import setCookieOptions from '../cookieOptions.js';
import filterFactory from './filterFactory.js';

/**
 * Filter Messages (newFlashMessages & messages Stored in a cookie) and set cookie messages
 * @param {Request} req Express request object
 * @param {Response} res Express Request Object
 * @returns {void | false}
 */
const filterMsgAndSendCookieMsg = (req = Request, res = Response) => {
  /// Set configs
  const { maxFlashMessages, maxShowDuration, cookieExpiresIn } =
    req.flashMessagesConfigs;

  /// DEALING WITH COOKIES
  /// Set cookies & flashBagMessages
  let cookieFlashMessages = req.cookies.flashMessages;
  cookieFlashMessages = cookieFlashMessages
    ? JSON.parse(cookieFlashMessages)
    : [];
  const flashBagMessages = req.flashBag; // any incoming message

  /// Get cookie marked for removal
  const flashMessageToRemove = req.flashMessageToRemove;

  //Filter cookie marked for removal with the identifier removeAfter shown
  if (
    flashMessageToRemove &&
    flashMessageToRemove.removeAfter === 'shown' &&
    flashMessageToRemove.viewStatus === 'viewed'
  ) {
    cookieFlashMessages = cookieFlashMessages.filter(
      cookieMsg =>
        cookieMsg.message !== flashMessageToRemove.message &&
        (cookieMsg.removeAfter !== 'shown' || cookieMsg.viewStatus === 'viewed')
    );
  }

  /// Updating cookie flash messages marked as viewStatus is pending
  /// Allows the client other than dashboard to know the message has already been shown not to show again.
  if (
    flashMessageToRemove &&
    flashMessageToRemove.removeAfter === 'timeExpires' &&
    flashMessageToRemove.viewStatus === 'pending'
  ) {
    cookieFlashMessages = cookieFlashMessages.map(cookieMsg => {
      if (cookieMsg.message === flashMessageToRemove.message) {
        return {
          ...cookieMsg,
          viewStatus: 'viewed',
        };
      }
      return cookieMsg;
    });
  }

  /// Filter messages
  const filteredMessageCollection = filterFactory(
    flashBagMessages,
    cookieFlashMessages,
    maxFlashMessages,
    maxShowDuration
  );

  /// If no flash messages in the collection, do not set cookie message
  if (!filteredMessageCollection) return [];

  /// Assign filtered message to the locals and update request for client end display
  res.locals.flashMessages = filteredMessageCollection;

  res.flashBag = filteredMessageCollection;

  /// Push messages to cookie and the rest to the message bag
  const sendMessageToCookies = JSON.stringify(filteredMessageCollection);

  /// Cookie settings
  const cookieConfigs = setCookieOptions(req, {
    customExpiresAt: cookieExpiresIn,
  });

  res.cookie('flashMessages', sendMessageToCookies, cookieConfigs);
};

export default filterMsgAndSendCookieMsg;
