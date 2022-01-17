// IMPORTS

import catchAsync from '../utils/catchAsync.js';

// MIDDLEWARES

// CRUD HANDLERS
// Create a user
export const creatUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Create user route has not been implemented. Check out later.',
  });
});

// Get all users
export const getAllUsers = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Get all users route has not been implemented. Check out later.',
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
