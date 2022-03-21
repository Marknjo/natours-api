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
  /// Set cookies & flashBugMessages
  let cookieFlashMessages = req.cookies.flashMessages;
  cookieFlashMessages = cookieFlashMessages
    ? JSON.parse(cookieFlashMessages)
    : [];
  const flashBugMessages = req.flashBug; // any incoming message

  /// Filter messages
  const filteredMessageCollection = filterFactory(
    flashBugMessages,
    cookieFlashMessages,
    maxFlashMessages,
    maxShowDuration
  );

  /// If no flash messages go to the next page
  if (!filteredMessageCollection) return [];

  /// Assign filtered message to the locals and update request for client end display
  res.locals.flashMessages = filteredMessageCollection;

  res.flashBug = filteredMessageCollection;

  /// Push messages to cookie and the rest to the message bug
  const sendMessageToCookies = JSON.stringify(filteredMessageCollection);

  /// Cookie settings
  const cookieConfigs = setCookieOptions(req, {
    customExpiresAt: cookieExpiresIn,
  });

  res.cookie('flashMessages', sendMessageToCookies, cookieConfigs);
};

export default filterMsgAndSendCookieMsg;
