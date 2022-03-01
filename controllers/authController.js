// IMPORT MODULES
// Global
import { env } from 'process';
import { promisify } from 'util';

// 3rd party
import jwt from 'jsonwebtoken';

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
// @TODO: Create email liblary -> Email
