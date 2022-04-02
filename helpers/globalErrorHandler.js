// IMPORT DEPENDENCIES
import { env } from 'process';
import AppError from '../library/appErrors.js';

// ERROR HANDLERS

/// JWT ERRORS

const handlerJsonWebTokenError = msg => {
  // @TODO: A good place to implement serious loggin messages, and throtting and burning of the IP trying to access the resource.
  const message = 'Please login with valid credentials to access the resource';
  return new AppError(message, 401);
};

/**
 * Handle expired JWT token Error
 * @returns {any:{}} Object of error message
 */
const handlerTokenExpiredError = () => {
  const message = `Your login session has expired. Please login again to access the route.`;
  return new AppError(message, 401);
};

/// MONGOOSE ERRORS

/**
 * Handle Cast Error
 * @param {Object} err
 * @returns
 */
const handleCastError = err => {
  const message = `Received an invalid id format: ${err.value}`;
  return new AppError(message, 400);
};

/**
 * Handle Dublicate Key error message
 * @param {Object} err
 * @returns {Object}
 */
const handleDublicateKeyError = err => {
  const dublicateKey = err.keyValue.name;
  const message = `Dublicate entry field ditected (${dublicateKey}). Please use a unique name.`;
  return new AppError(message, 400);
};

/**
 * Handle handle validation errors
 * @param {Object} err
 * @returns {Object}
 */
const handleValidationErrors = err => {
  const errMessages = Object.values(err.errors)
    .map(er => er.message)
    .join(': ');

  const message = `Input field error(s): ${errMessages}`;
  return new AppError(message, 400);
};

/**
 * Puts error data to locals, mainly for admin and when on development
 * @param {Error} err Express error object
 * @param {Response} res Express Response Object
 */
const showModalData = (err, res) => {
  res.locals.pageError = {
    stack: err.stack,
    message: err.message,
    statusCode: err.statusCode,
  };
};

/**
 * Universal configurable error helper function
 * @param {Error} err Express error object
 * @param {Request} req Express Request Object
 * @param {Response} res Express Response Object
 * @param {{title: 'string', pugTemplate: 'string', assetsUrl: 'string'}} configOptions Configurations of page title, which pug template to render, and for multi-nexted pages, which url to render assets
 */
const handleErrorPage = (
  err,
  req,
  res,
  configOptions = { title: '', pugTemplate: '', assetsUrl: './../' }
) => {
  // Define configs
  const defaults = {
    title: '404 Page',
    pugTemplate: 'errors/page404',
    assetsUrl: './',
  };

  const { title, pugTemplate, assetsUrl } = {
    ...defaults,
    ...configOptions,
  };

  /// Render page
  res.status(err.statusCode).render(pugTemplate, {
    title,
    pageUrl: req.originalUrl,
    assetsUrl,
    errorStatus: err.statusCode,
  });
};

// SEND DEV/PROD ERRORS HELPER HANDLERS

// Production API ERRORS RESPONSE
const productionApiErrorsResponse = (err, res) => {
  // Handle production errors
  // Handle operational errors differently
  if (err.isOperational) {
    // Handling operational errors
    res.status(err.statusCode).json({
      status: err.status,
      data: {
        message: err.message,
        statusCode: err.statusCode,
      },
    });

    // Stop further processing
    return;
  }

  // Handling non-operational errors
  console.error(`💥💥💥 ${err.name} \n ${err.stack}`);

  // Handle production
  res.status(500).json({
    status: 'error',
    message:
      'An error occured in our servers. Please come back later or try to contact the administrator of this site with this error message.',
  });
};

/**
 * Send Development errors for client and public side, more friendlier
 * @param {Error} err thrown error object
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @returns {never} Only sends responses
 */
const sendDevelopmentErrors = (err, req, res) => {
  /**
   * HANDLE API ERRORS
   */
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      isOperational: err.isOperational,
      message: err.message,
      trace: err.stack,
      err,
    });
  }

  /**
   *  CLIENT ERRORS HANDLING
   */

  /// Attach error to the locals
  showModalData(err, res);

  /**
   * Handle 404 error for sys-admin pages or path starting with /sys-admin
   */
  if (req.originalUrl.startsWith('/sys-admin') && err.statusCode === 404) {
    /// Show errors for non-admin only
    return handleErrorPage(err, req, res, {
      title: 'Dashboard 404 Error',
      pugTemplate: 'errors/dashboard404',
      assetsUrl: './../',
    });
  }

  /**
   * Handle 404 error for public pages with path starting with /
   */
  if (!req.originalUrl.startsWith('/sys-admin') && err.statusCode === 404) {
    /// Show errors for non-admin only
    return handleErrorPage(err, req, res, {
      title: '404 Page Error',
      pugTemplate: 'errors/public404',
      assetsUrl: './../',
    });
  }

  /**
   * Handle 4xx and 5xx ish errors other than 404 happening on the admin pages or /sys-admin path
   */
  if (req.originalUrl.startsWith('/sys-admin')) {
    return handleErrorPage(err, req, res, {
      title: 'Error',
      pugTemplate: 'errors/errorPage',
      assetsUrl: './../',
    });
  }

  /**
   *  Handle 4xx and 5xx ish errors, other than 404, happening on the public pages or / path
   */
  return handleErrorPage(err, req, res, {
    title: 'Error',
    pugTemplate: 'errors/errorPage',
    assetsUrl: './',
  });
};

// Production error handler
const sendProductionErrors = (err, req, res, next) => {
  // Handling API errors vs production Errors
  // API ERRORS
  if (req.originalUrl.startsWith('/api')) {
    return productionApiErrorsResponse(err, res);
  }

  /// CLIENT SIDE ERRORS HANDLING

  // 1). 404 ERRORS -> Sys-admin Errors & Public Errors & Technician/Admin

  /// IF current logged in user is admin/technician/root-admin
  if (
    req.user &&
    (req.user.role === 'admin' || req.user.role === 'technician')
  ) {
    /// Send development errors
    //sendDevelopmentErrors(err, req, res, next);
  }

  /// OTHER USERS -> Friedly errors

  /// System Admin Errors
  if (req.originalUrl.startsWith('/sys-admin')) {
    /// Handle 404 errors
    if (err.statusCode === 404) {
      /// Set flash messages
      if (req.setFlashMessage) {
        req.setFlashMessage({
          message: `Could not find (${req.originalUrl}) in this dashboard`,
          action: '404 page error',
          messageType: 'warning',
          removeAfter: 'shown',
          showOnPage: '/sys-admin/page404',
        });
      }

      // redirect page to admin page404
      return res.redirect('/sys-admin/page404');
    }

    /// Send user to the login page -> handle 4** ish errors
    if (`${err.statusCode}`.startsWith('4')) {
      req.setFlashMessage({
        message: `${err.message}`,
        action: `Error ${err.statusCode}`,
        messageType: 'error',
        removeAfter: 'shown',
        showOnPage: '/login',
      });

      return res.redirect('/login');
    }

    /// Any other error handling while on admin/Just show the flash message
    req.setFlashMessage({
      message:
        'Error while accessing this page! If this error persists, please contact the administrator of this site.',
      action: `Error ${err.statusCode}`,
      messageType: 'error',
      removeAfter: 'shown',
      showOnPage: '/sys-admin',
    });

    return res.redirect('/sys-admin');
  }

  /// PUBLIC URL ERRORS
  if (!req.originalUrl.startsWith('/sys-admin')) {
    /**
     * Handle 404 error cases
     */
    if (err.statusCode === 404) return res.redirect('/page404');

    /**
     * Handle 4** ish errors in the front end
     * @TEST: Test this functionality
     */
    if (`${err.statusCode}`.startsWith('4')) {
      req.setFlashMessage({
        message: `${err.message}`,
        action: `Error ${err.statusCode}`,
        messageType: 'error',
        removeAfter: 'shown',
        showOnPage: req.originalUrl,
      });

      return res.redirect(req.originalUrl);
    }

    /**
     * Handle 5** ish errors on the client side
     */
    req.errorStatusCode = 501; //err.statusCode;
    return res.redirect('/page5xx');
  }
};

/**
 * Global Error Handler
 * @TODO: Implement API errors and Client Error handling
 * @param {Object{}} err Express Error object
 * @param {Object{}} req Express Request Object
 * @param {Object{}} res  Express Response Object
 * @param {Function} next Express next function
 * @returns Response (Production|Development)
 */
const globalErrorHandler = (err, req, res, next) => {
  // Check status code
  err.statusCode = err.statusCode ? err.statusCode : 500;

  // Development
  if (env.NODE_ENV_NR === 'development') {
    return sendDevelopmentErrors(err, req, res, next);
  }

  // Production error handler
  if (env.NODE_ENV_NR === 'production') {
    // Assign error top prevent overwrite

    // Handle different errors differently
    // handle CastError Messages thrown by mongoDB
    if (err.name === 'CastError') err = handleCastError(err);

    // handle Dublicate error error 11000 thrown by mongoDB
    if (err.code === 11000) err = handleDublicateKeyError(err);

    // Handle Validation Errors
    if (err.name === 'ValidationError') err = handleValidationErrors(err);

    // JWT TOKEN EXPIRED
    if (err.name === 'TokenExpiredError') err = handlerTokenExpiredError();

    // JWT TOKEN TOKEN ERROR
    if (err.name === 'JsonWebTokenError')
      err = handlerJsonWebTokenError(err.message);

    // Return error for response
    return sendProductionErrors(err, req, res, next);
  }
};

export default globalErrorHandler;
