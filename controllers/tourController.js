// IMPORT MODULES
// 3rd Party Locals

// Local imports
import AppError from '../library/appErrors.js';
import catchAsync from '../library/catchAsyc.js';
import FindFeatures from '../library/findFeatures.js';
import Tour from '../models/tourModel.js';

// HELPER FUNCTIONS @TODO: Export them to separate utility file
// MIDDLEWARES HANDLERS  @TODO: Export them to separate utility file
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
// @TODO: Implement getTour, createTour, updateTour, deleteTour
/**
 * Get All Tours
 */
export const getAllTour = catchAsync(async (req, res, next) => {
  // Implement advancedFindFeatures (filters, sort, fields, pagination)

  const features = new FindFeatures(Tour, req.query)
    .filterQuery()
    .limitFields()
    .sortBy()
    .paginate();

  // Get all tours
  let tours = await features.query;

  // Get results before returning the no results response
  const results = tours ? tours.length : 0;

  // If there is no tours -> Send a message instead
  if (tours.length < 1) {
    tours = 'There is no tours returned from this request';
  }

  res.status(200).json({
    status: 'success',
    results,
    data: {
      tours,
    },
  });
});

/**
 * Get's a single tour from the db
 */
export const getTour = catchAsync(async (req, res, next) => {
  // get the id of the tour
  const tourId = req.params.tourId;

  if (!tourId) return next(new AppError('Please provide a tour id.', 400));

  // Find tour by the id
  const tour = await Tour.findOne({ _id: tourId });

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

// AGGREGATE HANDLERS
// @TODO: Implement getToursStatsByDifficulty, getMontlyPlans
