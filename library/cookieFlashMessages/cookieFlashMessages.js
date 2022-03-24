/// Import dependencies
import pkg from 'express';
import removeShownFlashMessage from './removeShownFlashMessage.js';
const { Request, Response } = pkg;

/// Local imports
import setFlashMessage from './setFlashMessages.js';

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

    /// Handle deleting
    const isFlashMessageRemoved = removeShownFlashMessage(req, res);

    if (!isFlashMessageRemoved)
      // Next
      next();
  };

/// Export configaration
export default cookieFlashMessages;
