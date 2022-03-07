// IMPORT MODULES

import AppError from '../library/appErrors.js';
import catchAsync from '../library/catchAsyc.js';
import User from '../models/userModel.js';
import { filterRequiredFields } from '../utils/helpers.js';

// HELPERS
// @TODO: createStore, filterPhotoUpload, filterFields,

// MIDDLEWARES
// @TODO: uploadUserPhoto, resizePhoto

/**
 * Delete user account
 */
export const deleteMe = (req, res, next) => {
  // Set active to false in the body
  req.body.active = false;

  // Return next
  next();
};

// HANDLERS
// @TODO: getMe, deleteMe, updateMe

/**
 * Update user profile infomation
 */
export const updateMe = catchAsync(async (req, res, next) => {
  // Prevent updating user passwords using this method
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError('Please use update my password section instead.', 400)
    );

  // Get user data from the body
  const userUdpateData = req.body;
  const userRequiredFields = ['name', 'email', 'active'];

  // Filter unwanted fields
  const filteredUserData = filterRequiredFields(
    userRequiredFields,
    userUdpateData
  );

  // Check if user has submitted their photo -> then upload
  // @TODO: Implement uploading user photo
  if (req.file) filteredUserData.photo = req.filename;

  // update user details
  const user = await User.findByIdAndUpdate(req.user.id, filteredUserData, {
    new: true,
    runValidators: true,
  });

  if (!user)
    return next(
      new AppError(
        'Updating your details failed. If this problem persists, please contant the administrator of this site.',
        500
      )
    );

  // Return success message
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// CRUD METHODS -> Admin Management
// @TODO: getAllUsers, createUser, updateUser, deleteUser,
