// IMPORT MODULES
// 3rd Party Locals

// Local imports
import { getAll } from '../helpers/handlersFactory.js';
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
export const getTour = catchAsync(async (req, res, next) => {
  // Find tour by the id
  const tour = await Tour.findOne({ _id: req.tourId });

  // Return error if there is no tour with the requested ID
  if (!tour)
    return next(new AppError('Could not find tour requested tour', 404));

  // Return response
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

/**
 * Implement Add Tour Field
 */
export const createTour = catchAsync(async (req, res, next) => {
  // Get tour body
  const body = req.body;

  // Save tour to db
  const tour = await Tour.create(body);

  // Return success message to user
  res.status(201).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

/**
 * Update Tour field
 */
export const updateTour = catchAsync(async (req, res, next) => {
  // Validate tour id -> if it is supplied (Implemented using a middleware)

  // Update the tour from the supplied body -> return updated tour and runValidators
  const tour = await Tour.findByIdAndUpdate(req.tourId, req.body, {
    new: true,
    runValidators: true,
  });

  // Validate tour update
  if (!tour) return next(new AppError('Tour update error', 500));

  // Return the response
  res.status(202).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

/**
 * Delete Tour field
 */
export const delteteTour = catchAsync(async (req, res, next) => {
  // Validate tour id -> if it is supplied (Implemented using a middleware)

  // delete the tour from the supplied body
  const tour = await Tour.findByIdAndDelete(req.tourId);

  if (!tour) return next(new AppError('Tour deletion error', 500));

  // Return the response
  res.status(204).json({
    status: 'success',
  });
});

// AGGREGATE HANDLERS
// @TODO: Implement getToursStatsByDifficulty, getMontlyPlans
