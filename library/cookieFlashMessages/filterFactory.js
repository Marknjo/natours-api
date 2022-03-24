/// Import dependencies
import filterDublicateMsgs from './filterDublicateMsgs.js';

/**
 * Removes old messages stored in the cookie based on expiresIn, maxShowDuration, and the removeAfter filter
 *
 * Put messages in a new message bag based on FIFO
 *
 * Slices the max number of flashMessage by the maxFlashMessages
 *
 *
 * @param {[{ showOnPage: string, message: string,action: string,removeAfter: 'shown' | 'timeExpires', messageType: 'info' | 'warning' | 'success' | 'error', expiresIn: Date,createdAt: Date, }]} flashBagMessages Collecton of flash messages stored in the express request
 * @param {[{ showOnPage: string, message: string,action: string,removeAfter: 'shown' | 'timeExpires', messageType: 'info' | 'warning' | 'success' | 'error', expiresIn: Date,createdAt: Date, }]} cookieFlashMessages Collection of flash messages from the client browser
 * @param {number} maxFlashMessages The maximum number of flash messages a stored in the cookie. Defaults to 10 messages
 * @param {number} maxShowDuration The maximum age of a message in a cookieMessageBag before beng removed based on shown
 * @returns {[{ showOnPage: string, message: string,action: string,removeAfter: 'shown' | 'timeExpires', messageType: 'info' | 'warning' | 'success' | 'error', expiresIn: Date,createdAt: Date, }] | undefined} Filtered flash messages
 */
function filterFactory(
  flashBagMessages,
  cookieFlashMessages,
  maxFlashMessages = 10,
  maxShowDuration = 1
) {
  ///
  if (!cookieFlashMessages || !flashBagMessages) return [];

  /// Test for cookies Return next -> Nothing to show
  if (cookieFlashMessages.length === 0 && flashBagMessages.length === 0)
    return [];

  // Get cookies
  // Merge flash messages from request set somewhere within the app
  // Run this method only when we have cookie messages and flash messages
  const mergedFlashMessages = filterDublicateMsgs(
    flashBagMessages,
    cookieFlashMessages
  );

  /// Remove expired messages based on show Till Filter
  const filteredCollection = mergedFlashMessages.filter(flashMessage => {
    // expiresIn, removeAfter = ('shown' | 'timeExpires')
    console.log('Running... 🚩🚩🚩🚩🚩🚩');

    /// Compare dates
    const maxPeriod = maxShowDuration * 60 * 1000;

    const now = Date.now();

    /// Expires In
    const expiresIn = new Date(flashMessage.expiresIn).getTime();

    /// handle incidents for hideAfter 5 minutes -> Stale messages
    const diffenceBtnNowAndExpiresIn = expiresIn - now; /// in milliseconds

    /// Logic to remove showed messages
    const removeHideAfterShowMessagesTest =
      diffenceBtnNowAndExpiresIn > maxPeriod &&
      flashMessage.removeAfter === 'shown';

    /// Remove messages which are marked timeExpires and now is greater
    const removedShowTillExpiresMessagesTest =
      expiresIn >= now && flashMessage.removeAfter === 'timeExpires';

    //Testing Data
    // console.log({
    //   flashMessage,
    //   maxShowDuration,
    //   testType: 'expiresIn >= now',
    //   expiresIn,
    //   now,
    //   differenceExpiresAndNow: expiresIn - now,
    //   expiresInLen: `${expiresIn}`.length,
    //   nowLen: `${now}`.length,
    //   testResults: expiresIn >= now,
    //   removeAfterTestResults: flashMessage.removeAfter === 'timeExpires',
    //   generalTest:
    //     "expiresIn >= now && flashMessage.removeAfter === 'timeExpires'",
    //   generalTestResults: removedShowTillExpiresMessagesTest,
    // });

    if (removeHideAfterShowMessagesTest || removedShowTillExpiresMessagesTest)
      return flashMessage;
  });

  /// Remove excess flash messages
  if (filteredCollection.length > maxFlashMessages)
    return filteredCollection.slice(0, maxFlashMessages);

  // just return filtered messages if less than  maxFlashMessages
  return filteredCollection;
}

export default filterFactory;
