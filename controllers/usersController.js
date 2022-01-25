// IMPORTS

import User from '../models/usersModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import * as factory from '../helpers/handlersFactory.js';

// TODO: Implement updateMe, deleteMe
// Helpers
const filterAllowedFields = (objFields, ...allowedFields) => {
  // use reduce
  return Object.keys(objFields).reduce((cur, el) => {
    if (allowedFields.includes(el)) cur[el] = objFields[el];
    return cur;
  }, {});
};

// MIDDLEWARES
export const aliasDefaultFields = (req, res, next) => {
  req.query.fields = '-updatedAt,-__v,-passwordChangedAt';

  next();
};

// CRUD HANDLERS
// Get all users
// export const getAllUsers = catchAsync(async (req, res, next) => {
//   const users = await User.find().select('-updatedAt -__v -passwordChangedAt');

//   res.status(500).json({
//     status: 'error',
//     results: users.length,
//     data: {
//       users,
//     },
//   });
// });

export const getAllUsers = factory.getAll(User, { modelName: 'users' });

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
// Update users data
export const updateMe = catchAsync(async (req, res, next) => {
  // Stop from sending in password field
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'Please use password update field to update your password.',
        400
      )
    );

  // Filter wanted fields
  const allowedFields = filterAllowedFields(req.body, 'name', 'email');

  // Update users
  const updatedUser = await User.findByIdAndUpdate(req.user.id, allowedFields, {
    new: true,
    runValidators: true,
  });

  // Send the response
  res.status(200).json({
    status: 'success',
    message: 'Your details update is successful',
    data: {
      user: updatedUser,
    },
  });
});

// Deactivate my account
export const deleteMe = catchAsync(async (req, res, next) => {
  // Get current user
  await User.findByIdAndUpdate(
    req.user.id,
    { active: false },
    {
      new: true,
      runValidators: true,
    }
  );
  // Update user active to false
  // Return respose TODO: log out user

  // Update users

  // Send the response
  res.status(202).json({
    status: 'success',
    message: 'Your account deletion is successful',
  });
});
