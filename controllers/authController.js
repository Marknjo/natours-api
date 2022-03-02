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
  // Send a successful response -> signTokenAndSendResponse
  const remeberUser = filterRequiredFields.remember
    ? filterRequiredFields.remember
    : false;

  await signTokenAndSendResponse(req, res, {
    user,
    remember: remeberUser,
  });

  // If fails sending the email do not create user -> remove them by the id
  // Respond
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     user,
  //   },
  // });
});

// @TODO: Create email liblary -> Email
