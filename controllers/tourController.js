// IMPORT MODULES
// 3rd Party Locals

// Local imports
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from '../helpers/handlersFactory.js';
import AppError from '../library/appErrors.js';
import catchAsync from '../library/catchAsyc.js';
import FindFeatures from '../library/findFeatures.js';
import Tour from '../models/tourModel.js';

// HELPER FUNCTIONS @TODO: Export them to separate utility file
// MIDDLEWARES HANDLERS  @TODO: Export them to separate utility file
// Check if an id is supplied before sending the request (Create reusable component)
export const checkParamIsAvailable = (req, res, next) => {
  // Guard Clause for checking if a tour ID is supplied
  const tourId = req.params.tourId;

  if (!tourId) return next(new AppError('Please provide a tour id.', 400));

  // Assign tour Id to the request
  req.tourId = tourId;

  next();
};

// ALIAS MIDDLEWARES
// Get Cheapest Tours - top five
export const getCheapestTours = (req, res, next) => {
  // construct query object
  const fields = {
    fields:
      'name,price,ratingsAverage,ratingsQuantity,duration,summary,difficulty,maxGroupSize',
  };
  const sort = { sort: 'price,ratingsAverage' };
  const limitFields = { limit: '5' };

  req.query = { ...fields, ...sort, ...limitFields };

  next();
};

// get top 5 top rated tours
export const getTopRatedTours = (req, res, next) => {
  // construct query object
  const fields = {
    fields:
      'name,price,ratingsAverage,ratingsQuantity,duration,summary,difficulty,maxGroupSize',
  };
  const sort = { sort: '-ratingsAverage,price' };
  const limitFields = { limit: '5' };

  req.query = { ...fields, ...sort, ...limitFields };

  next();
};

// SINGLE FEATURE HANDLERS

// CRUD HANDLERS
/**
 * Get All Tours
 */
export const getAllTour = getAll(Tour, { modelName: 'tours' });
/**
 * Get's a single tour from the db
 */
export const getTour = getOne(Tour, { modelName: 'tour' });

/**
 * Implement Add Tour Field
 */
export const createTour = createOne(Tour, { modelName: 'tour' });

/**
 * Update Tour field
 */
export const updateTour = updateOne(Tour, { modelName: 'tour' });

/**
 * Delete Tour field
 */
export const delteteTour = deleteOne(Tour, { modelName: 'tour' });

// AGGREGATE HANDLERS
// @TODO: Implement getToursStatsByDifficulty, getMontlyPlans

/**
 * Implement get Tour Stats Grouped By Difficulty
 */
export const getToursStatsByDifficulty = catchAsync(async (req, res, next) => {
  // Aggregation pipeline
  const stats = await Tour.aggregate([
    // Match by average rating
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },

    // Group by difficulty, avgPrice, maxPrice, minPrice, tQty, numTours
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        ratingsQty: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        maxPrice: { $max: '$price' },
        minPrice: { $min: '$price' },
        avgPrice: { $avg: '$price' },
        tours: { $push: '$name' },
      },
    },

    // Sort by avgPrice
    {
      $sort: { avgPrice: -1 },
    },
  ]);

  // Response
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
