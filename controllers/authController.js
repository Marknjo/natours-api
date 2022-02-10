// IMPORTS
// Global imports
import { env } from 'process';
import { promisify } from 'util';
import crypto from 'crypto';

// 3rd Party imports
import jwt from 'jsonwebtoken';
import validator from 'validator';

// Locals imports
import User from '../models/usersModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import sendMail from '../utils/sendMail.js';

// HELPERS
const signJWTToken = id => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

/**
 * Signs the token and return a response for handlers with similar signature
 * @param {Instance} res
 * @param {Number} resStatus
 * @param {Object} userData
 */
const signTokenAndResponse = (res, resStatus, userData) => {
  // Sign token
  const token = signJWTToken(userData.id);

  // Create cookie and send to the user
  const cookieOptions = {
    expires: new Date(Date.now() + env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  // Set secure to true if the dev environment of production
  if (env.NODE_ENV === 'production') cookieOptions.secure = true;

  // Set Cookie
  res.cookie('jwt', token, cookieOptions);

  // Stop sending these fields
  userData.password = undefined;
  userData.updatedAt = undefined;
  userData.passwordChangedAt = undefined;

  res.status(resStatus).json({
    status: 'success',
    token,
    data: {
      user: userData,
    },
  });
};

// HANDLERS DEFINATION

// Implement signup functionality
export const signup = catchAsync(async (req, res, next) => {
  const { name, password, passwordConfirm, email, photo } = req.body;

  const registeredUser = await User.create({
    name,
    password,
    passwordConfirm,
    email,
    photo,
  });

  signTokenAndResponse(res, 201, registeredUser);
});

// Implement Login functionality
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(AppError('Provide email or password', 400));
  }

  const currentUser = await User.findOne({ email }).select('+password');

  if (
    !currentUser ||
    !(await currentUser.compareUserPassword(password, currentUser.password))
  ) {
    return next(new AppError('Invalid email or password', 401));
  }

  signTokenAndResponse(res, 200, currentUser);
});

// Implement Logout user
export const logout = catchAsync(async (req, res, next) => {
  // reset the cookie options
  res.cookie('jwt', 'loggedout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  // Send the response
  res.status(200).json({ status: 'success' });
});

// Implement protect route functionality
export const protect = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ').at(-1);
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError(
        'You are not logged in. Please login first to get the access.',
        401
      )
    );
  }

  const decodedToken = await promisify(jwt.verify)(token, env.JWT_SECRET);

  const currentUser = await User.findById(decodedToken.id);

  if (!currentUser) {
    return next(
      new AppError(
        'Cannot verify the user. Please login with correct credentials.',
        401
      )
    );
  }

  const passwordChangeStatus = await currentUser.checkPasswordChangedAt(
    decodedToken.iat
  );

  if (passwordChangeStatus) {
    return next(
      new AppError(
        'You do not have necessary credentials to access this rosource',
        403
      )
    );
  }

  currentUser.password = undefined;

  req.user = currentUser;
  res.locals.user = currentUser;

  next();
});

// Only for view templates -
export const isLoggedin = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      if (!token) return next();

      const decodedToken = await promisify(jwt.verify)(token, env.JWT_SECRET);

      const currentUser = await User.findById(decodedToken.id);

      if (!currentUser) return next();
      const passwordChangeStatus = await currentUser.checkPasswordChangedAt(
        decodedToken.iat
      );

      if (passwordChangeStatus) return next();

      currentUser.password = undefined;

      res.locals.user = currentUser;

      return next();
    } catch (error) {
      return next();
    }
  }

  next();
};

// Implement Restrict to functionality
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Check if the user role is applicable
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          'You do not have credentials to access the requested resource.',
          403
        )
      );
    }

    // If available
    next();
  };
};

// Implement Forget Password Handler
export const forgetPassword = catchAsync(async (req, res, next) => {
  // 1). Get email address -> Check if there is user with the email address
  const userEmail = req.body.email;

  if (!userEmail && !validator.isEmail)
    return next(new AppError('Please submit a valid email', 400));

  const foundUser = await User.findOne({ email: userEmail });

  if (!foundUser) {
    return next(
      new AppError('Cannot find user withe the submitted email address.', 401)
    );
  }

  // 2). Generate Reset token & save to the database
  const resetToken = await foundUser.generatePasswordResetToken();

  await foundUser.save({ validateBeforeSave: false });

  // 3). Email the token to user

  // Reset URL
  const resetUrl = `${req.protocol}//${req.hostname}/reset-password/${resetToken}`;
  // Reset Message
  const message = `You have requested to reset your password. Click the link below to start your process. \nReset Link: ${resetUrl} \nIf you did not request this reset, please ignore this email.`;

  // Handle send errors
  try {
    // Send Mail
    await sendMail({
      email: foundUser.email,
      subject: 'Your Password Reset (Expires in 10 minutes)',
      message,
    });

    // 4). Send the response
    res.status(200).json({
      status: 'success',
      message: 'Your password reset details was sent to your email address.',
    });
  } catch (error) {
    // Unset password rest toke & expires time
    foundUser.passwordResetToken = undefined;
    foundUser.passwordResetExpiresIn = undefined;

    await foundUser.save({ validateBeforeSave: false });

    // Send error
    return next(new AppError('Could not send the email. Try again.', 500));
  }
});

// Implement password resetting functionality
export const resetPassword = catchAsync(async (req, res, next) => {
  // 1). Get token from the url
  // 2). Encrypt the token and Serce it from the database. Also serch based on the password reset token. Validate data before proceeding
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const foundUser = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiresIn: { $gt: Date.now() },
  });

  if (!foundUser)
    return next(
      new AppError('Invalid user or Password reset token expired', 400)
    );

  // 3). Reset Password (password, confirmPassword) if we have a valid user
  foundUser.password = req.body.password;
  foundUser.passwordConfirm = req.body.passwordConfirm;
  foundUser.passwordResetToken = undefined;
  foundUser.passwordResetExpiresIn = undefined;

  await foundUser.save();

  // 4). Update the password reset at (Use save document middleware)
  // 5). Sign the token and return the response
  signTokenAndResponse(res, 200, foundUser);
});

// Implement update my password route
export const updateMyPassword = catchAsync(async (req, res, next) => {
  // Make sure user submit password fields are not empty or undefined
  const currentPassword = req.body.currentPassword;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  console.log(req.body);

  if (!currentPassword || !password || !passwordConfirm)
    return next(
      new AppError(
        'One of the password fields is empty. Fill and submit again',
        400
      )
    );

  // Get the current user and find user based on the id. Check if available (Done by Protect route)
  const user = await User.findById(req.user.id).select('+password');

  if (!user)
    return next(
      new AppError('Please login again. Cannot retrieve your credentials.', 400)
    );

  // Compare currentPassword/oldPassword
  if (!(await user.compareUserPassword(currentPassword, user.password)))
    return next(
      new AppError(
        'Yoour current password is invalid. Please try again or opt for password reset option.',
        401
      )
    );

  // If it matches save the new password
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  // Return the response
  res.status(200).json({
    status: 'success',
    message: 'Password update is successful',
  });
});
