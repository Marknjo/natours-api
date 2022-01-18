// IMPORTS
// Global imports
import { env } from 'process';
import { promisify } from 'util';

// 3rd Party imports
import jwt from 'jsonwebtoken';

// Locals imports
import User from '../models/usersModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

// HELPERS
const signJWTToken = id => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES,
  });
};

const generateUserData = userObj => {
  return {
    id: userObj.id,
    name: userObj.name,
    email: userObj.email,
    photo: userObj.photo,
    role: userObj.role,
  };
};

// HANDLERS DEFINATION
// TODO: RESTRICTTO

// Implement signup functionality
export const signup = catchAsync(async (req, res, next) => {
  const { name, password, passwordConfirm, email, photo } = req.body;

  const createdUser = await User.create({
    name,
    password,
    passwordConfirm,
    email,
    photo,
  });

  const token = signJWTToken(createdUser.id);

  const userData = generateUserData(createdUser);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: userData,
    },
  });
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
    !(await currentUser.compareLoginPass(password, currentUser.password))
  ) {
    return next(new AppError('Invalid email or password', 401));
  }

  const token = signJWTToken(currentUser.id);

  const userData = generateUserData(currentUser);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: userData,
    },
  });
});

// Implement protect route functionality
export const protect = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ').at(-1);
  } else {
    return next(
      new AppError(
        'You are trying to access protect route. Please login first.',
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

  const userData = generateUserData(currentUser);

  req.user = userData;

  next();
});

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
