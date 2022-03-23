/**
 * Filter Dublicate messages returned from the cookie and produced during new calls
 * @param {[{showOnPage: string, message: string,action: string,showTill: 'hideAfterShow' | 'showTillExpires', messageType: 'info' | 'warning' | 'success' | 'error', expiresIn: Date,createdAt: Date, }]} newFlashMsgs Collecton of flash messages stored in the express request
 * @param {[{showOnPage: string,  message: string,action: string,showTill: 'hideAfterShow' | 'showTillExpires', messageType: 'info' | 'warning' | 'success' | 'error', expiresIn: Date,createdAt: Date, }]} cookieMsg Collection of flash messages from the client browser
 * @returns {[{showOnPage: string,  message: string,action: string,showTill: 'hideAfterShow' | 'showTillExpires', messageType: 'info' | 'warning' | 'success' | 'error', expiresIn: Date,createdAt: Date, }]} A vollection of messages
 */
const filterDublicateMsgs = (newFlashMsgs, cookieMsgs) => {
  const flashMsgLen = newFlashMsgs.length;
  const cookieMsgsLen = cookieMsgs.length;

  let msgsBag = [];

  /// Filter incoming message
  const filteredMsg = cookieMsgs.filter(cookieMsgs => {
    if (!newFlashMsgs.find(newMsg => newMsg.message === cookieMsgs.message)) {
      return cookieMsgs;
    }
  });

  msgsBag = [...newFlashMsgs, ...filteredMsg];

  /// incase of empty flashMsg and cookie is not empty
  if (msgsBag.length === 0 && cookieMsgsLen > 0 && flashMsgLen === 0) {
    msgsBag = cookieMsgs;
  }

  /// Incase of empty cookieMsgs and flasMsg has values
  if (msgsBag.length === 0 && flashMsgLen > 0 && cookieMsgsLen === 0) {
    msgsBag = flashMsgLen;
  }

  return msgsBag;
};

export default filterDublicateMsgs;
