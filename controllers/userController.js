// IMPORT MODULES
import sharp from 'sharp';
import multer from 'multer';

// LOCAL PACKAGES
import AppError from '../library/appErrors.js';
import catchAsync from '../library/catchAsyc.js';
import User from '../models/userModel.js';
import { filterRequiredFields } from '../utils/helpers.js';
import { signTokenAndSendResponse } from './authController.js';

// HELPERS
// @TODO: createStore, filterPhotoUpload, filterFields,

// Create Multer memory storage
const storage = multer.memoryStorage();

// Filter file type
const filterFileType = (req, file, cb) => {
  // Should only accept images
  if (!file.mimetype.startsWith('image'))
    return cb(new AppError('File format not supported!', 400), false);

  // File acceptable
  cb(null, true);
};

// Create upload
const upload = multer({
  storage: storage,
  fileFilter: filterFileType,
});

// MIDDLEWARES
// @TODO: resizePhoto

/**
 * Upload single image
 */
export const uploadProfilePhoto = upload.single('photo');

/**
 * Resize user profile image (500 by 500) middleware
 *
 * Must come immediately after the file upload
 */
export const resizeProfilePhoto = catchAsync(async (req, res, next) => {
  // get the file
  const bufferPhoto = req.file.buffer;

  // Create the file naming convection
  const filename = `${req.user.id}-${Date.now()}.jpg`;

  await sharp(bufferPhoto)
    .resize(500, 500)
    .jpeg({ quality: 90 })
    .toFormat('jpg')
    .toFile(`public/img/users/${filename}`);

  // Success
  // Attach filename to the request
  req.filename = filename;

  // Next
  return next();
});

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
// @TODO: getMe

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

/**
 * Update user password
 */
export const updateMyPassword = catchAsync(async (req, res, next) => {
  // Check if user has supplied password
  const { password, passwordConfirm, passwordCurrent } = req.body;

  if (!password && !passwordConfirm && !passwordCurrent)
    return next(
      new AppError(
        'Please provide your current password and your new password',
        400
      )
    );

  // Find user by the ID
  const foundUser = await User.findById(req.user.id).select('+password');

  // compared password
  const passwordCompare = await foundUser.comparePassword(
    passwordCurrent,
    foundUser.password
  );

  if (!passwordCompare)
    return next(new AppError('Your current password field is wrong', 400));

  // Save user info
  foundUser.password = password;
  foundUser.passwordConfirm = passwordConfirm;

  await foundUser.save();

  // Update user password -> signTokenAndReturn response;
  signTokenAndSendResponse(req, res, { user: foundUser });
});

// CRUD METHODS -> Admin Management
// @TODO: getAllUsers, createUser, updateUser, deleteUser,
