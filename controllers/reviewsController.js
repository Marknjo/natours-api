// IMPORT

// Local Imports
import Review from '../models/reviewsModel.js';
import catchAsync from '../utils/catchAsync.js';

// DEFINE REVIEW ROUTES

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
export const getAllReviews = catchAsync(async (req, res, next) => {
  // filtering reviews for a spcific tours -> /tours/tourId/reviews
  let filterObj;
  if (req.tourId) filterObj = { tour: req.tourId };
  if (req.userId) filterObj = { tour: req.tourId, user: req.userId };

  // Get all reviews
  const reviews = await Review.find(filterObj);

  // return response
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

// Get one review
// Update one review
// Delete one review
