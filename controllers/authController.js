// IMPORT MODULES
// Global
import { env } from 'process';
import { promisify } from 'util';

// 3rd party
import jwt from 'jsonwebtoken';

// Local imports
import catchAsync from '../library/catchAsyc.js';
import { filterRequiredFields } from '../utils/helpers.js';
import User from '../models/userModel.js';
import AppError from '../library/appErrors.js';
import Email from '../library/email.js';

// HELPERS
// @TODO: signAndUpdate, signToken,
/**
 * Signs a JWT token
 * @param {String} id user id
 * @param {Boolean} remember sets user to remeber user for 1 week
 */
const signJWTtoken = async (id, remember) => {
  return await promisify(jwt.sign)({ id }, env.JWT_SECRET, {
    expiresIn: remember ? env.JWT_EXPIRES_IN_WEEK : env.JWT_EXPIRES_IN_DAY,
  });
};

/**
 * Sign Token and Send response
 *
 * Does four functions
 *
 * -> Sign JWT Token
 *
 * -> Assign jwt cookie to response
 *
 * -> Remove unwanted fields from the response
 *
 * -> Send the response with user attached
 *
 * @param {Instance} req Request instance
 * @param {Instance} res Response instance
 * @param {Object:{user: {Object}, message: {String}}, remember: {Boolean}} options
 */
const signTokenAndSendResponse = async (
  req,
  res,
  options = { user: {}, message: '', remember: false }
) => {
  try {
    // set user
    const { user, remember } = options;

    // Sign Token
    const jwtToken = await signJWTtoken(user.id, remember);

    // Add token to cookie response
    // Cookie options
    const cookieOptions = {
      expires: remember
        ? new Date(Date.now() + 7 * 24 * 60 * 1000)
        : new Date(Date.now() + 24 * 60 * 1000),
      httpOnly: true,
      sameSite: true,
    };

    // Secure cookie check
    if (req.protocol === 'https' && env.NODE_ENV_NR === 'production')
      cookieOptions.secure = true;

    // Set cookie
    res.cookie('jwt', jwtToken, cookieOptions);

    // Prep fields to respond
    // Remove password field from response, passwordUpdatedAt
    user.password = undefined;
    user.passwordUpdatedAt = undefined;
    //user.email = undefined;

    // Send response
    res.status(200).json({
      status: 'success',
      token: jwtToken,
      data: {
        user,
      },
    });
  } catch (error) {
    throw error;
  }
};

// MIDDLEWARES

// HANDLERS
// @TODO: login, signup, resetPassword, forgetPassword, protect, restrictTo,

/**
 * Sigup user
 */
export const signup = catchAsync(async (req, res, next) => {
  // Get user data

  const requiredFields = [
    'name',
    'remember',
    'email',
    'password',
    'passwordConfirm',
  ];

  // filter unwanted fields
  const filteredFields = filterRequiredFields(requiredFields, req.body);

  // Add user photo @TODO: Implement adding user photo method;
  if (req.file) filteredFields.photo = req.filename;

  // Create user fields
  const user = await User.create(filteredFields);

  // if successful in sending welcome email & account confirmation
  try {
    // account Confirmation Url
    const accountConfirmationUrl = `${req.protocol}//${req.hostname}/dashboard/me`;

    // @TODO: Remove after implementing Pug email templates
    const welcomeMessage = `Welcome to the natours fratenity, ${user.name}.\n\nWe are glad you have decided to join us.\n\nMeanwhile, we have several tours we are recommending to you.\n\nPlease visit the tours page to book a tour you are interested about.\n\n\nCheer!\nYours trully CEO Natours,\nMark Njoroge`;

    const accountConfirmationMessage = `Hi, ${user.name} once again thank you for registering with our company.\n\nHowever, to prevent fraud and other cyber crime incidents, please confirm your account before proceeding.\n\nClick the link below for account confirmation: (${accountConfirmationUrl}).\n\n\nPS: You have 24 hour before your accound is temporarily suspended.\n\n\nYours trully CEO Natours,\n Mark Njoroge`;

    // Try to send email
    await new Email({
      user: {
        email: user.email,
        name: user.name,
      },
      message: welcomeMessage,
    }).sendWelcomeMessage();

    // Account Confirmation email @TODO: Implement account confirmation route/handler /accont-confirmation

    await new Email({
      user: {
        email: user.email,
        name: user.name,
      },
      url: accountConfirmationUrl,
      message: accountConfirmationMessage,
    }).sendConfirmAccount();

    // Send a successful response -> signTokenAndSendResponse
    const remeberUser = filterRequiredFields.remember
      ? filterRequiredFields.remember
      : false;

    await signTokenAndSendResponse(req, res, {
      user,
      remember: remeberUser,
    });
    return;
  } catch (error) {
    // If fails sending the email do not create user -> remove them by the id
    await User.deleteOne({ _id: user.id });

    // Send error
    return next(
      new AppError(
        'Error sending welcome email. Please try again later to create your account.',
        500
      )
    );
  }
});

// @TODO: Create email liblary -> Email
