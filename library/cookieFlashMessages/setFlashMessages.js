/// IMPORT MODULES
import pkg from 'express';
const { Request, Response } = pkg;

// Local
import filterMsgAndSendCookieMsg from './filterMsgAndSendCookieMsg.js';

/**
 * Validations for expires in values - Internally Required by configFlashMessages
 * @param {string|number} expiresIn Expires in - number 1,2,3 -> in munites of mumber with a deliminiter -s: seconds, -min:minutes, -hr:minutes, or -d:days
 * @returns void
 */
const validateExpiresIn = expiresIn => {
  const expiresInErrMsg =
    'Invalid expiresIn value, Expires in must be a number | string i.e. 1-s, 2-min, 3-hr, or 4-d';

  /// expiresIn must be a string and number and not equal to 0
  if (
    (typeof expiresIn !== 'string' && typeof expiresIn !== 'number') ||
    expiresIn === 0
  )
    return next(new AppError(expiresInErrMsg, 400));

  /// String tests
  if (typeof expiresIn === 'string') {
    const rightSideOfExpiresIn = expiresIn.split('-').at(1);

    const allowedDelimeters = ['s', 'min', 'hr', 'd'];

    /// Does not have a dash
    if (!expiresIn.includes('-'))
      return next(new AppError(expiresInErrMsg, 400));

    /// Check for s, min, hr, d
    if (!allowedDelimeters.includes(rightSideOfExpiresIn))
      return next(new AppError(expiresInErrMsg, 400));
  }
};

/**
 * Add Messages to the flash message bug -> new messages first
 * @param {[{message: string, action: string, showTill: string, messageType: string, expiresIn: Date, createdAt}]} flashBug A collection of flash messages made somewhere in the code
 * @param {{message: string, action: string, showTill: string, messageType: string, expiresIn: Date, createdAt}} incomingMessage A new message to be pushed to the express request global collection
 * @returns
 */
const addFlashMessagesToBug = (flashBug, incomingMessage) => {
  // config incomingMessage
  const configIncominMessage = incomingMessage ? incomingMessage : '';
  flashBug = Array.isArray(flashBug) ? flashBug : [];

  const updatedFlashBug =
    configIncominMessage === ''
      ? flashBug
      : [configIncominMessage, ...flashBug];

  return updatedFlashBug;
};

/**
 * Calculates expires in based on the expires in values -> after validation have passed
 *  - Internally Required by configFlashMessages
 * @param {string|number} expiresIn Expires in - number 1,2,3 -> in munites of mumber with a deliminiter -s: seconds, -min:minutes, -hr:minutes, or -d:days
 * @returns {number}
 */
const calculateExpiresIn = expiresIn => {
  let expires;

  // Handle cases for string-min and default behavior
  if (
    typeof expiresIn === 'number' ||
    (typeof expiresIn === 'string' && expiresIn.includes('min'))
  ) {
    expires =
      typeof expiresIn === 'string' && expiresIn.includes('min')
        ? +expiresIn.split('-')[0]
        : expiresIn;

    expires = expires * 60 * 1000;
  }

  /// s - seconds calculation
  if (typeof expiresIn === 'string' && expiresIn.includes('s')) {
    expires = expiresIn * 1000;
  }

  /// hr - hours calculation
  if (typeof expiresIn === 'string' && expiresIn.includes('hr')) {
    expires = expiresIn * 60 * 60 * 1000;
  }

  /// d - days calculation
  /// seconds calculation
  if (typeof expiresIn === 'string' && expiresIn.includes('d')) {
    expires = expiresIn * 24 * 60 * 60 * 1000;
  }

  return expires;
};

/**
 * Configures flash messages -> No external dependencies (Regular js function) -> Global method
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {{message: string, messageType: 'info' | 'warning' | 'success' | 'error', action: string, hideTill: 'hideAfterShow' | 'showTillExpires', expiresIn: String | Number }} configOptions Flash Message configuration options
 * @property {string} message The message to put in a cookie
 * @property {string} action Represents why we are setting the flash message (verbs describing action) -> i.e. login success|logout success|login errors|server error|confirm account etc.
 * @property {'hideAfterShow' | 'showTillExpires'} showTill Flags the flash message to be allowed to stick arround till expireIn or after five minutes, or it will be deleted from the flash messages -> Generally flashMessage cookie lasts for 24 hours
 * @property {'info' | 'warning' | 'success' | 'error'} messageType Represents the type of message in the identifier
 * @property { string | number } expiresIn shows when the message expires i.e. in strings 5-min | 5-s | 1-hr | 1-d | or numbers 5 | 20. Numbered are assumed to be in minutes. Accepts s for seconds, min for minutes, hr for hours, and d for days. String dates must be deliminated with a - dash, i.e. 5-hr
 * @returns {void | [] } Send cookie or an empty array, which is unsuccessful message
 */
const setFlashMessages =
  (req = Request, res = Response) =>
  (
    configOptions = {
      message: 'Test message',
      messageType: 'success',
      action: 'Normal message',
      showTill: 'showTillExpires',
      expiresIn: '5-min',
    }
  ) => {
    const defaultConfigs = {
      message: 'Test message',
      messageType: 'success',
      action: 'Normal message', // TODO Add a global method with common message type configurations
      showTill: 'showTillExpires',
      expiresIn: '5-min',
    };

    /// Set configurations
    const { message, messageType, action, showTill, expiresIn } = {
      ...defaultConfigs,
      ...(configOptions ? configOptions : {}),
    };

    /// Validate expires in
    validateExpiresIn(expiresIn);

    /// Handle expirs in calculations
    const expires = calculateExpiresIn(expiresIn);

    // Add messages to the bug
    const upArr = addFlashMessagesToBug(req.flashBug, {
      message,
      action,
      showTill,
      messageType,
      expiresIn: new Date(Date.now() + expires),
      createdAt: new Date(Date.now()), // For sorting dates from the latest
    });

    /// Set cookie and filter
    req.flashBug = upArr;

    //// Filter Messages and send cookie messages
    return filterMsgAndSendCookieMsg(req, res);
  };

export default setFlashMessages;
