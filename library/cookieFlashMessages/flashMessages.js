/// Import dependencies
import configFlashMessage from "./configFlashMessage.js";
import filterMsgAndSendCookieMsg from "./filterMsgAndSendCookieMsg.js";

/**
 * Initialize cookie flash messages and set flash messages
 * @param {{ maxFlashMessages: Number, maxShowDuration: Number, cookieExpiresIn: Number }} optionConfigs Cookie flashMessages configuration options
 * @param {Request} req Express Request object
 * @param {Response} res Express Response object
 * @param {Function} next Express function
 * @returns Express next function
 */
const cookieFlashMessage =
  (
    optionConfigs = {
      maxFlashMessages: 10,
      maxShowDuration: 1,
      cookieExpiresIn: 24 * 60 * 60 * 1000,
    }
  ) =>
  (req = Request, res = Response, next = () => {}) => {
    /// Initialize configs
    const defaultConfigs = {
      maxFlashMessages: 10,
      maxShowDuration: 1,
      cookieExpiresIn: 24 * 60 * 60 * 1000,
    };

    const { maxFlashMessages, maxShowDuration, cookieExpiresIn } = optionConfigs
      ? {
          ...defaultConfigs,
          ...optionConfigs,
        }
      : optionConfigs;

    // set cookie configs
    req.flashMessagesConfigs = {
      maxFlashMessages,
      maxShowDuration,
      cookieExpiresIn,
    };

    /// Initialize a messageBug
    req.flashBug = [];

    // Add configureFlashMessage to the request
    req.setFlashMessage = configFlashMessage(req, res);

    /// Filter message and send cookie
    filterMsgAndSendCookieMsg(req, res);

    // Next
    next();
  };

/// Export configaration
export default cookieFlashMessage;
