// IMPORT

// Local Imports
import Review from '../models/reviewsModel.js';
import catchAsync from '../utils/catchAsync.js';

// DEFINE REVIEW ROUTES

// BASIC CRUD METHODS
// Create
export const createTourReview = catchAsync(async (req, res, next) => {
  // Get user id from the protected route
  const userId = req.user.id;

  // Get tours id from the url // /tours/tourId/reviews
  const tourId = req.params.tourId || req.body.tour;

  // Validate the id by using create

  // Send the data to the database
  const createdReview = await Review.create({
    user: userId,
    tour: tourId,
    review: req.body.review,
    rating: req.body.rating,
  });

  // Return response
  res.status(201).json({
    status: 'success',
    data: {
      review: createdReview,
    },
  });
});

// Get All reviews for a given tour id

// Get one review
// Update one review
// Delete one review
