/// Import dependencies
import pkg from 'express';
const { Request, Response } = pkg;

/// Local imports
import setFlashMessage from './setFlashMessages.js';
import filterMsgAndSendCookieMsg from './filterMsgAndSendCookieMsg.js';

/**
 * Validate Incoming body
 * @param {{ showOnPage: string, message: string,action: string,removeAfter: 'shown' | 'timeExpires', messageType: 'info' | 'warning' | 'success' | 'error', expiresIn: Date,createdAt: Date, }} body Body from client request (Notifying to delete flash message because is now shown)
 * @returns
 */
const validateIncomingFlashBody = body => {
  /// Check if Body is set
  if (!body) return false;

  /// Type check the incoming body type
  if (
    typeof body === 'string' ||
    Array.isArray(body) ||
    typeof body === 'number' ||
    typeof body === 'boolean'
  )
    return false;

  /// Check if body has the right fields
  const expectingObjProperties = [
    'message',
    'messageType',
    'action',
    'removeAfter',
    'expiresIn',
    'showOnPage',
    'createdAt',
  ];

  const bodyProperties = Object.keys(body);

  const foundDifferentProperties = bodyProperties.filter(bodypro => {
    if (!expectingObjProperties.find(el => bodypro === el)) return true;
  });

  if (foundDifferentProperties.length > 0) return false;

  // No errors
  return true;
};

/**
 *
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @returns {Boolean} Report whether we have a flash message shown
 */
const removeShownFlashMessage = (req = Request, res = Response) => {
  if (req.originalUrl === '/flash-shown' && req.method === 'POST') {
    const body = req.body;

    /// Validate body structure
    const validationStatus = validateIncomingFlashBody(body);
    if (!validationStatus) return false; // Request failed

    /// Mark incoming cookie to be removed from the cookie messages

    /// Send a successful response
    res.status(200).json({ status: 'success' });

    return true;
  }

  return false;
};

/**
 * Initialize cookie flash messages and set flash messages
 * @param {{ maxFlashMessages: Number, maxShowDuration: Number, cookieExpiresIn: Number }} optionConfigs Cookie flashMessages configuration options
 * @param {Request} req Express Request object
 * @param {Response} res Express Response object
 * @param {Function} next Express function
 * @returns Express next function
 */
const cookieFlashMessages =
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

    /// Initialize a messageBag
    req.flashBag = [];

    // Add configureFlashMessage to the request
    req.setFlashMessage = setFlashMessage(req, res);

    /// Filter message and send cookie
    filterMsgAndSendCookieMsg(req, res);

    /// Handle deleting
    const isFlashMessageRemoved = removeShownFlashMessage(req, res);

    if (!isFlashMessageRemoved)
      // Next
      next();
  };

/// Export configaration
export default cookieFlashMessages;
