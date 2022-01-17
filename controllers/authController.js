// IMPORTS
// Global imports
import { env } from 'process';

// 3rd Party imports
import jwt from 'jsonwebtoken';

// Locals imports
import User from '../models/usersModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

// HANDLERS DEFINATION
// TODO: LOGIN, RESTRICTTO, PROTECT

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

  const token = jwt.sign({ id: createdUser.id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        photo: createdUser.photo,
      },
    },
  });
});

// Implement Login functionality
export const login = catchAsync(async (req, res, next) => {
  // 1). Get user infomation (password|email)
  const { email, password } = req.body;

  if (!email || !password) {
    return next(AppError('Provide email or password', 400));
  }

  // 2). Search user by email
  const currentUser = await User.findOne({ email }).select('+password');

  // 3). Compare submitted password
  // 4). Verify user and submitted password

  if (
    !currentUser ||
    !(await currentUser.compareLoginPass(password, currentUser.password))
  ) {
    return next(new AppError('Invalid email or password', 401));
  }

  // 5). If okay, sign a new json webtoken and send the response to the browser
  const token = jwt.sign({ id: currentUser.id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES,
  });

  // 6). Send the successful response
  res.status(200).json({
    status: 'success',
    token,
    data: {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      photo: currentUser.photo,
    },
  });
});

// Implement Restrict to functionality
// Implement protect route functionality
