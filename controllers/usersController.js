// IMPORTS

import User from '../models/usersModel.js';
import catchAsync from '../utils/catchAsync.js';

// TODO: Implement updateMe, deleteMe
// MIDDLEWARES

// CRUD HANDLERS
// Get all users
export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select('-updatedAt -__v -passwordChangedAt');

  res.status(500).json({
    status: 'error',
    data: {
      users,
    },
  });
});

// Create a user
export const creatUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Create user route has not been implemented. Check out later.',
  });
});

// Get a user
export const getUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Get one user route has not been implemented. Check out later.',
  });
});

// Update a user
export const updateUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Update user route has not been implemented. Check out later.',
  });
});

// Delete a user
export const deleteUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Delete user route has not been implemented. Check out later.',
  });
});

// OTHER HANDLERS
