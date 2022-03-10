/// IMPORT DEPENDENCIES
// GLOBAL IMPORTS
// 3RD PARTY IMPORTS
// LOCAL IMPORTS

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from '../helpers/handlersFactory.js';
import AppError from '../library/appErrors.js';
import catchAsync from '../library/catchAsyc.js';
import Review from '../models/reviewModel.js';

/// LOCAL HELPERS

/// MIDDLEWARES HANDLERS

/**
 * Check if there is a review belonging to the current user is trying to find
 *
 * Check is the current user has the requested review
 */
export const checkIfUserHasTheReview = catchAsync(async (req, res, next) => {
  // Return review
  const review = await Review.find({
    _id: req.params.reviewId,
    user: req.user.id,
  });

  // Show error to user trying to access a review not theirs
  if (req.user.role === 'user' && review.length === 0)
    return next(
      new AppError(
        'You do not have permissions to perform this action. You can only vew those review you have submitted.',
        403
      )
    );

  next();
});

/**
 *  Filter get reviews
 */
export const filterGetReviews = catchAsync(async (req, res, next) => {
  // Filter what comes from the body
  let filterBy = '';

  // Restrict those with users roles from accessing users
  if ((!req.params.tourId || req.params.userId) && req.user.role === 'user') {
    return next(
      new AppError(
        'You do not have necessary creditials to request this resource',
        403
      )
    );
  }

  if (req.params.tourId) filterBy = { tour: req.params.tourId };
  if (req.params.userId) filterBy = { user: req.params.userId };

  // Set optional filter
  req.optionalFilters = filterBy;

  // Next
  next();
});

/**
 * Prepare body with tour and user computed automatically during tour review creation/adding
 *
 */
export const prepCreateReviewFields = (req, res, next) => {
  // body should have the tour and the user Id
  req.body.tour = req.params.tourId;
  req.body.user = req.user.id;

  // next
  next();
};

/// SINGLE FEATURE HANDLERS
/**
 * Get a tour reviews
 */

export const getAllReviews = getAll(Review, { modelName: 'reviews' });

/// CRUD HANDLERS - FACTORY

/**
 *  Get a review
 */
export const getReview = getOne(Review, { modelName: 'review' });

/**
 *  Create a review
 */
export const createReview = createOne(Review, { modelName: 'review' });

/**
 *  Update a review
 */
export const updateReview = updateOne(Review, { modelName: 'review' });

/**
 *  Delete a review
 */
export const deleteReview = deleteOne(Review, { modelName: 'review' });

/// AGGREGATE HANDLERS (IF ANY)
