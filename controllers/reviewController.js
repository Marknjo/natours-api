/// IMPORT DEPENDENCIES
// GLOBAL IMPORTS
// 3RD PARTY IMPORTS
// LOCAL IMPORTS

import {
  createOne,
  deleteOne,
  getAll,
  updateOne,
} from '../helpers/handlersFactory.js';
import AppError from '../library/appErrors.js';
import catchAsync from '../library/catchAsyc.js';
import Review from '../models/reviewModel.js';

/// LOCAL HELPERS

/// MIDDLEWARES HANDLERS

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
export const getReview = catchAsync(async (req, res, next) => {
  // get parameter
  const reviewId = req.params.reviewId;

  // Ensure a user only retrieves a review that belongs to them
  let query;

  if (req.user.role === 'user') {
    query = Review.find({ _id: reviewId, user: req.user.id });
  } else if (req.user.role === 'admin') {
    // Get review by id
    query = Review.findById(reviewId);
  } else {
    return next(
      new AppError('You do not have permissions to perform this action.', 403)
    );
  }

  // Return review
  const review = await query;

  // Show error to user trying to access a review not theirs
  if (req.user.role === 'user' && (!review || review.length === 0))
    return next(
      new AppError(
        'You do not have permissions to perform this action. You can only vew those review you have submitted.',
        403
      )
    );

  // Return response
  res.status(200).json({
    status: 'success',
    data: {
      ...(review
        ? { review }
        : {
            message: `Could not retrieve the review with the id of (${reviewId}) from the DB.`,
          }),
    },
  });
});

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
