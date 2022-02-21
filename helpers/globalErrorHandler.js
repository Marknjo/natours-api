// IMPORT DEPENDENCIES
import { env } from 'process';

// ERROR HANDLERS

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
  console.error(`💥💥💥 ${err.name} \n ${err.trace}`);

  // Handle production
  res.status(500).json({
    status: 'error',
    message:
      'An error occured in our servers. Please come back later or try to contact the administrator of this site with this error message.',
  });
};

// Development API ERRORS RESPONSE
const developmentApiErrorsResponse = (err, res) => {
  // Handle production errors
  res.status(err.statusCode).json({
    status: err.status,
    isOperational: err.isOperational,
    message: err.message,
    trace: err.stack,
  });
};

// Development error handler
const sendDevelopmentErrors = (err, req, res) => {
  // Handling API errors vs production Errors
  // API ERRORS
  if (req.originalUrl.startsWith('/api')) {
    return developmentApiErrorsResponse(err, res);
  }

  // Client side errors
  // @TODO:Implement rendering of client side errors
};

// Production error handler
const sendProductionErrors = (err, req, res) => {
  // Handling API errors vs production Errors
  // API ERRORS
  if (req.originalUrl.startsWith('/api')) {
    return productionApiErrorsResponse(err, res);
  }

  // Client side errors
  // @TODO:Implement rendering of client side errors
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
  // Development
  if (env.NODE_ENV_NR === 'development') {
    return sendDevelopmentErrors(err, req, res);
  }

  // Production error handler
  if (env.NODE_ENV_NR === 'production') {
    // Assign error top prevent overwrite
    const error = { ...err }; //shallow copying
    error.message = err.message;

    // Handle different errors differently
    // @TODO: implement mongoDb validation errors handling, mongoDB dublicate key, MongoDB invalid ids, JWT expired token, JWT bad token error
    //if(error)

    // Return error for response
    return sendProductionErrors(err, req, res);
  }
};

export default globalErrorHandler;
