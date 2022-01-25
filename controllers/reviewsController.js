// IMPORT

// Local Imports
import Review from '../models/reviewsModel.js';
import catchAsync from '../utils/catchAsync.js';
import * as factory from '../helpers/handlersFactory.js';

// DEFINE REVIEW HANDLERS
// MIDDLEWARES
export const filterGetAll = (req, res, next) => {
  // filtering reviews for a spcific tours -> /tours/tourId/reviews
  let filterObj;
  // Get all reviews of a given tour
  if (req.params.tourId) filterObj = { tour: req.params.tourId };

  // Get all reviews for a given user
  if (req.params.userId) filterObj = { user: req.params.userId };

  // Get a single review belonging to a user for a specific tour
  if (req.params.userId && req.params.tourId)
    filterObj = { tour: req.params.tourId, user: params.userId };

  // Get all reviews
  req.filterObj = filterObj;

  // next
  next();
};

// Add to the body user and tour
export const addUserAndTourToBody = (req, res, next) => {
  // Get user id & tour id and set it to the body
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.tour) req.body.tour = req.params.tourId;

  next();
};

// BASIC CRUD METHODS
// Create
export const createTourReview = factory.createOne(Review, {
  modelName: 'review',
});

// Get All reviews for a given tour id
export const getAllReviews = factory.getAll(Review, { modelName: 'reviews' });

// Get one review
export const getReview = factory.getOne(Review, {
  modelName: 'review',
  populate: {
    path: 'tour',
    select: 'name price ratingsAverage ratingsQuantity duration summary',
  },
});

// Update one review
export const updateReview = factory.updateOne(Review, { modelName: 'review' });

// Delete one review
