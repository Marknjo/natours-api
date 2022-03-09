/// IMPORT DEPENDENCIES
// GLOBAL IMPORTS
// 3RD PARTY IMPORTS
// LOCAL IMPORTS

import { createOne } from '../helpers/handlersFactory.js';
import AppError from '../library/appErrors.js';
import catchAsync from '../library/catchAsyc.js';
import Review from '../models/reviewModel.js';

/// LOCAL HELPERS

/// MIDDLEWARES HANDLERS
// @TODO: Implement -> filterGetReviews
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
// @TODO: Implement -> getAllReviews, getReview, createReview, deleteReview, updateReview
export const createReview = createOne(Review, { modelName: 'review' });

/// AGGREGATE HANDLERS (IF ANY)
