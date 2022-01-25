// IMPORTS

import User from '../models/usersModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import * as factory from '../helpers/handlersFactory.js';

// Helpers
const filterAllowedFields = (objFields, ...allowedFields) => {
  // use reduce
  return Object.keys(objFields).reduce((cur, el) => {
    if (allowedFields.includes(el)) cur[el] = objFields[el];
    return cur;
  }, {});
};

// MIDDLEWARES
// Set the default fields that would be returned for get querries
export const aliasDefaultFields = (req, res, next) => {
  req.query.fields = '-updatedAt,-__v,-passwordChangedAt';

  next();
};

// Add a meddleware that gets my data
export const getMe = (req, res, next) => {
  // Add current logged in user id to the params
  req.params.id = req.user.id;

  // next
  next();
};

// CRUD HANDLERS
// Get all users
export const getAllUsers = factory.getAll(User, { modelName: 'users' });

// Create a user
export const creatUser = factory.createOne(User, { modelName: 'user' });
// ADMIN ONLY HANDLERS
// Get a user
export const getUser = factory.getOne(User, {
  modelName: 'user',
});

// Update a user
export const updateUser = factory.updateOne(User, {
  modelName: 'user',
});

// Delete a user
export const deleteUser = factory.deleteOne(User, {
  modelName: 'user',
});

// OTHER HANDLERS
// LOGGED IN USER ACTIONS
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
// TODO: Prevent orphan reviews - Implement Delete all reviews for the user before deleting the user from the DB.
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
