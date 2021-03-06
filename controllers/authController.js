// IMPORT MODULES
// Global
import { env } from 'process';
import { promisify } from 'util';
import crypto from 'crypto';

// 3rd party
import jwt from 'jsonwebtoken';

// Local imports
import catchAsync from '../library/catchAsyc.js';
import { filterRequiredFields } from '../utils/helpers.js';
import User from '../models/userModel.js';
import AppError from '../library/appErrors.js';
import Email from '../library/email.js';
import setCookieOptions from '../library/cookieOptions.js';

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
 * @param {{user: object, remember: boolean}} options configurations
 */
export const signTokenAndSendResponse = async (
  req,
  res,
  options = { user: {}, remember: false }
) => {
  try {
    // set user
    let { user, remember } = options;

    // Sign Token
    const jwtToken = await signJWTtoken(user.id, remember);

    // Add token to cookie response
    //setJwtCookie(req, res, jwtToken, { allowRemember: true, remember });
    const cookieOptions = setCookieOptions(req, {
      allowRemember: true,
      remember,
    });

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
// @TODO: resetPassword, restrictTo,

/**
 * Mail function is to add logged user to the locals
 * for static pages to access the user object
 * @param {any} req Request object
 * @param {any} res Response object
 * @param {Function} next Express next callback
 * @returns {Function} returns next function
 */
export const isLoggedIn = async (req, res, next) => {
  const jwtToken = req.cookies.jwt;

  if (!jwtToken || jwtToken === 'logout') {
    // there is no token in the request
    return next();
  }

  /// THERE IS A JWT token
  try {
    const { id, iat } = await promisify(jwt.verify)(jwtToken, env.JWT_SECRET);
    // Find user by user id and verify
    // @TODO: implement prevent access of routes if user account is not activated after 24 hours of registering the account.
    const foundUser = await User.findById(id);

    if (!foundUser || !foundUser.active) return next();

    // Compare time token was created and now
    const isSessionExpired =
      await foundUser.checkPasswordWasChangedAfterTokenIssue(iat);

    if (!isSessionExpired) return next();

    // If all is well, allow use to access the route
    // Remove email address from the found user
    foundUser.email = undefined;

    res.locals.user = foundUser;

    res.locals.isLoggedIn = true;

    req.user = foundUser;

    // User allowed to access the next route
    return next();
  } catch (error) {
    // JWT ERRORS
    return next();
  }
};

/**
 * Protect routes (Login users access) middleware
 */
export const protect = catchAsync(async (req, res, next) => {
  // Get authorization token from the header or cookie
  const authToken = req.headers.authorization;

  let jwtToken;
  // Assign token from header or cookie
  if (authToken && authToken.startsWith('Bearer')) {
    // Asing header token
    jwtToken = authToken.split(' ').at(-1);
  } else if (req.cookies.jwt) {
    // Asing cookie from the cookie request (client side)
    jwtToken = req.cookies.jwt;
  }

  // If no token, send error message
  if (!jwtToken)
    return next(
      new AppError(
        'You are trying to access a protected resouce. Please login or find necessary credentials to continue.',
        403
      )
    );

  // Verify token (get iat and user id) (@TODO: handle JWT error messages via global error)
  const { id, iat } = await promisify(jwt.verify)(jwtToken, env.JWT_SECRET);

  // Find user by user id and verify
  // @TODO: implement prevent access of routes if user account is not activated after 24 hours of registering the account.
  const foundUser = await User.findById(id);

  if (!foundUser || !foundUser.active)
    return next(
      new AppError(
        'We could not verify your identity. Please login with valid credentials to access requested resource.',
        403
      )
    );

  // Compare time token was created and now
  const isSessionExpired =
    await foundUser.checkPasswordWasChangedAfterTokenIssue(iat);

  if (!isSessionExpired)
    return next(
      new AppError('Your session has expired. Please login again.', 403)
    );

  // If all is well, allow use to access the route
  // Remove email address from the found user

  res.locals.user = foundUser;
  res.locals.isLoggedIn = true;
  req.user = foundUser;

  // User allowed to access the next route
  next();
});

/**
 * Restricts route access to specific user roles
 *
 * The middleware must immediately follow a protect route, as it access user attached to the request.
 * @param  {...String} roles Array of user roles i.e. admin, user, lead-guide, guide
 * @returns {Function} Next function with error or to pass to the next handler
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    /// Check if the current user has one of the roles defined in the roles
    if (roles.includes(req.user.role)) {
      // user is allowed to access the route
      return next();
    }

    // User does nto have necessary credentials
    return next(
      new AppError(
        'You do not have the necessary credentials to access this resource.',
        403
      )
    );
  };
};

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

  // Create user fields
  const user = await User.create(filteredFields);

  // if successful in sending welcome email & account confirmation
  try {
    // account Confirmation Url
    //const accountConfirmationUrl = `${req.protocol}//${req.hostname}/dashboard/me`;

    // @TODO: Remove after implementing Pug email templates
    //const welcomeMessage = `Welcome to the natours fratenity, ${user.name}.\n\nWe are glad you have decided to join us.\n\nMeanwhile, we have several tours we are recommending to you.\n\nPlease visit the tours page to book a tour you are interested about.\n\n\nCheer!\nYours trully CEO Natours,\nMark Njoroge`;

    //const accountConfirmationMessage = `Hi, ${user.name} once again thank you for registering with our company.\n\nHowever, to prevent fraud and other cyber crime incidents, please confirm your account before proceeding.\n\nClick the link below for account confirmation: (${accountConfirmationUrl}).\n\n\nPS: You have 24 hour before your accound is temporarily suspended.\n\n\nYours trully CEO Natours,\n Mark Njoroge`;

    // Try to send email
    await new Email({
      user: {
        email: user.email,
        name: user.name,
      },
    }).sendWelcomeMessage();

    // Account Confirmation email @TODO: Implement account confirmation route/handler /accont-confirmation

    await new Email({
      user: {
        email: user.email,
        name: user.name,
      },
    }).sendConfirmAccount();

    // Send a successful response -> signTokenAndSendResponse
    const remeberUser = filterRequiredFields.remember
      ? filterRequiredFields.remember
      : false;

    /// Set message flash message
    if (req.setFlashMessage) {
      req.setFlashMessage({
        message:
          "Welcome to the natours family. We've sent a welcome email to your official email address. Ensure you confirm your email to access all Natours have to offer.",
        action: 'User registration successful message',
        messageType: 'success',
        removeAfter: 'shown',
        showOnPage: '/sys-admin',
      });
    }

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

/**
 * User Login
 */
export const login = catchAsync(async (req, res, next) => {
  // Get their password and email address
  const { password, email, remember } = req.body;

  // check if remember is set
  const rememberUser = remember ? remember : false;

  // Check if they are send by user
  if (!password && email)
    return next(new AppError('Email and Password not supplied', 400));

  // Find user by the email address
  const foundUser = await User.findOne({ email }).select('+password');

  // Validate existence and compare user password
  //comparePassword
  if (
    !foundUser ||
    !(await foundUser.comparePassword(password, foundUser.password))
  )
    return next(new AppError('Email or password invalid', 401));

  // Remove stale fields (password reset) from database if found
  if (foundUser.passwordResetToken) {
    // Remove these fields from the DB
    foundUser.passwordResetToken = undefined;
    foundUser.passwordResetTokenExpiresIn = undefined;
    await foundUser.save({ validateBeforeSave: false });

    // Notify user they triend to set a message

    if (req.setFlashMessage) {
      req.setFlashMessage({
        message:
          'We noticed you tried to reset your password recently. If this was not you, your accoung integrity may be compromised. Kindly update your password.',
        action: 'Unfulfilled password reset request message',
        messageType: 'warning',
        removeAfter: 'timeExpires',
        expiresIn: '2-hr',
        showOnPage: '/sys-admin',
      });
    }
  }

  /// Set flash message
  if (req.setFlashMessage) {
    req.setFlashMessage({
      message: 'You have successfully logged in. Welcome to Natours.',
      action: 'Login message',
      messageType: 'success',
      removeAfter: 'shown',
      showOnPage: '/sys-admin',
    });
  }

  // If available signTokenAndSendResponse
  await signTokenAndSendResponse(req, res, {
    user: foundUser,
    remember: rememberUser,
  });
});

/**
 * Logout user
 */
export const logout = (req, res) => {
  // set log out cookie
  /// Logout user using clearCookie instead of setting value to jwt, old implementation -> res.cookie('jwt', 'logout', cookieOptions);
  res.clearCookie('jwt');

  // Success lougout message
  const originPage = req.cookies.originPageUrl ? req.cookies.originPageUrl : '';

  /// Set flash message
  if (req.setFlashMessage) {
    req.setFlashMessage({
      message: 'You have successfully signed out',
      action: 'Logout success message',
      messageType: 'success',
      removeAfter: 'shown',
      showOnPage: originPage
        ? originPage.startsWith('/sys-admin')
          ? '/'
          : originPage
        : '/',
    });
  }

  /// Remove orginPageUrl from list of cookies
  res.clearCookie('originPageUrl');

  // send success
  res.status(200).json({ status: 'success' });
};

/**
 * Forget user password handler
 */
export const forgetPassword = catchAsync(async (req, res, next) => {
  // Get user email from the body
  const { email } = req.body;

  if (!email)
    return next(
      new AppError('Please add you valid email to your request', 400)
    );

  // Find user based on the email address
  const foundUser = await User.findOne({ email });

  // Verify user before trying to create the token
  if (!foundUser)
    return next(
      new AppError(
        'Sorry, we could not find user with that email in this server. Please use the email you logged in with to send this request again.',
        401
      )
    );

  // Valid user, generage the password reset token and update database entries
  const resetToken = await foundUser.createPasswordResetToken();
  await foundUser.save({ validateBeforeSave: false });

  // Try sending the reset token to user via email address
  try {
    // rest url
    const resetUrl = `${req.protocol}//${req.hostname}/reset-password/${resetToken}`;

    // Message @FIXME: Remove after implementing pug template
    const message = `Hi ${foundUser.name
      .split(' ')
      .at(
        0
      )},\n\nYou are receiving this email because you requested to reset your account password. If this was not you, please ignore this email.\n\nFind your reset url below.\n\nYour reset link/url: ${resetUrl}\n\nPS:Your passward reset session expires within the next 10 minutes.\n\n\nYours,\nNatours Help Desk.`;

    await new Email({
      user: {
        email: foundUser.email,
        name: foundUser.name,
      },
      url: resetUrl,
      message,
    }).sendPasswordReset();

    /// Set message flash message
    if (req.setFlashMessage) {
      req.setFlashMessage({
        message:
          "Hi, we've send your password reset token to your email. PS: Your session Expires in 10 minutes.",
        action: 'Password reset token',
        messageType: 'info',
        removeAfter: 'shown',
        showOnPage: req.originalUrl,
      });
    }

    // If sending email == success, send a success message
    res.status(200).json({
      status: 'success',
      data: {
        message:
          'Password reset token was sent to your email address. Please ensure to reset the password within the next 10 minutes.',
      },
    });

    return;
  } catch (error) {
    // If fail, remove the password reset token, and expiresIn from the DB
    foundUser.passwordResetToken = undefined;
    foundUser.passwordResetTokenExpiresIn = undefined;
    await foundUser.save({ validateBeforeSave: false });

    // Send a 500 error
    return next(
      new AppError('Error sending the email, please try again later.', 500)
    );
  }
});

/**
 * Reset user password handler
 */
export const resetPassword = catchAsync(async (req, res, next) => {
  // Ensure user has submitted password and passwordConfirm and Token
  const { password, passwordConfirm, email } = req.body;

  // Get user reset token
  const { token } = req.params;

  if (!password || !passwordConfirm || !token)
    return next(
      new AppError('Password or reset token missing from your request.', 400)
    );

  // hash token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // Get user by token and whose password expires is greater than now
  // Ensure the reset token has not espired first
  const foundUser = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpiresIn: { $gte: new Date(Date.now()) },
  });

  // Find user by email and hashed token
  if (!foundUser)
    return next(
      new AppError(
        'You are receiving this error because we could not find user beloging to the supplied password reset token or your password reset session has expired. Try reseting your password again and respond within first 10 minutes.',
        401
      )
    );

  // Save new password
  foundUser.password = password;
  foundUser.passwordConfirm = passwordConfirm;
  foundUser.passwordResetToken = undefined;
  foundUser.passwordResetTokenExpiresIn = undefined;
  await foundUser.save();

  // Update user password updated At done from the model on save middleware()

  // If everything is fine, sign token and send response -> send user to dashboard
  signTokenAndSendResponse(req, res, { user: foundUser });
});
