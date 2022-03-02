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

// MIDDLEWARES

// HANDLERS
// @TODO: login, signup, resetPassword, forgetPassword, protect, restrictTo,

/**
 * Sigup user
 */
export const signup = catchAsync(async (req, res, next) => {
  // Get user data

  const requiredFields = ['name', 'email', 'password', 'passwordConfirm'];

  // filter unwanted fields
  const filteredFields = filterRequiredFields(requiredFields, req.body);

  // Add user photo @TODO: Implement adding user photo method;
  if (req.file) filteredFields.photo = req.filename;

  // Create user fields
  const user = await User.create(filteredFields);

  // if successful in sending welcome email & account confirmation
  // Send a successful response -> signTokenAndSendResponse
  // If fails sending the email do not create user -> remove them by the id
  // Respond
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// @TODO: Create email liblary -> Email
