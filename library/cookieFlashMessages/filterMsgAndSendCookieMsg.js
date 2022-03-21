// MODULE IMPORTS
import setCookieOptions from '../cookieOptions.js';
import filterMessages from './filterMessages.js';

/**
 * Filter Messages (newFlashMessages & messages Stored in a cookie) and set cookie messages
 * @param {Request} req Express request object
 * @param {Response} res Express Request Object
 * @returns {void | false}
 */
const filterMsgAndSendCookieMsg = (req, res) => {
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
  const filteredMessageCollection = filterMessages(
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

  // const cookieConfigs = {
  //   expires: new Date(cookieExpiresIn),
  //   httpOnly: true,
  //   sameSite: "strict",
  // };

  res.cookie('flashMessages', sendMessageToCookies, cookieConfigs);
};

export default filterMsgAndSendCookieMsg;
