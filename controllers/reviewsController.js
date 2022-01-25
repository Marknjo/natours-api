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

// BASIC CRUD METHODS
// Create
export const createTourReview = catchAsync(async (req, res, next) => {
  // Get user id & tour id and set it to the body
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.tour) req.body.tour = req.params.tourId;

  // Send the data to the database
  const createdReview = await Review.create(req.body);

  // Return response
  res.status(201).json({
    status: 'success',
    data: {
      review: createdReview,
    },
  });
});

// Get All reviews for a given tour id
// export const getAllReviews = catchAsync(async (req, res, next) => {
//   // filtering reviews for a spcific tours -> /tours/tourId/reviews
//   let filterObj;
//   // Get all reviews of a given tour
//   if (req.tourId) filterObj = { tour: req.tourId };

//   // Get all reviews for a given user
//   if (req.userId) filterObj = { user: req.userId };

//   // Get a single review belonging to a user for a specific tour
//   if (req.userId && req.tourId)
//     filterObj = { tour: req.tourId, user: req.userId };

//   // Get all reviews
//   const reviews = await Review.find(filterObj);

//   // return response
//   res.status(200).json({
//     status: 'success',
//     results: reviews.length,
//     data: {
//       reviews,
//     },
//   });
// });

export const getAllReviews = factory.getAll(Review, { modelName: 'reviews' });

// Get one review
// Update one review
// Delete one review
