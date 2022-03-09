/// IMPORT DEPENDENCIES
// GLOBAL IMPORTS
// 3RD PARTY IMPORTS
// LOCAL IMPORTS

import { createOne, deleteOne, updateOne } from '../helpers/handlersFactory.js';
import AppError from '../library/appErrors.js';
import catchAsync from '../library/catchAsyc.js';
import Review from '../models/reviewModel.js';

/// LOCAL HELPERS

/// MIDDLEWARES HANDLERS
// @TODO: Implement -> filterGetReviews
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
// @TODO: Implement -> getAllTourReviews,

/// CRUD HANDLERS - FACTORY
// @TODO: Implement -> getAllReviews, getReview, deleteReview, updateReview

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
