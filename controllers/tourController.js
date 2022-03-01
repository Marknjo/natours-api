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

/**
 * Implement monthly plans for all tours within a given year
 */
export const getMontlyPlans = catchAsync(async (req, res, next) => {
  // Get url params (Year)
  const year = req.params.year;
  const isDigit = /^\d{4}$/.test(year);

  if (!isDigit && Number.isFinite(+year))
    return next(new AppError(`Year format not suported`, 406));

  // Aggregate tours based on the tour start Dates
  const stats = await Tour.aggregate([
    // Unwind by startDates,
    {
      $unwind: '$startDates',
    },

    // match tours by startDates
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-01`),
        },
      },
    },

    // Group By month numTours, tours,
    {
      $group: {
        _id: { $month: '$startDates' },
        numTours: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },

    // sort by month,
    {
      $sort: { _id: 1 },
    },

    // limit by 2
  ]);

  // Return response
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

/**
 * Advanced implementation of finding tours within a given distance given coodinates and the unit (miles/km)
 */
export const getToursWithin = catchAsync(async (req, res, next) => {
  // Get Params -> distance, center [lat,lag], unit [mi/km]
  const { distance, latlng, unit } = req.params;

  // Validate each step
  // Validate existence
  if (!distance || !latlng || !unit)
    return next(
      new AppError(
        'Distance or center or unit values missing from the request',
        406
      )
    );

  // Validate unit type
  if (unit !== 'km' && unit !== 'mi')
    return next(new AppError('Invalid unit type provided', 406));

  // Validate distance is a number
  if (!Number.isFinite(+distance))
    return next(new AppError('Distance must be a number', 406));

  // Validate lat lng
  const [lat, lng] = latlng.split(',');

  if (!lat || !lng)
    return next(
      new AppError(
        'Latitude and longitude should be separated by comma (31.038635,-117.6199248)',
        406
      )
    );

  const isLatLngValidFormat =
    /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(
      latlng
    );

  if (!isLatLngValidFormat)
    return next(
      new AppError('Latitude and longitude not in a valid format!', 406)
    );

  // radius
  const radius = unit === 'mi' ? distance / 3963 : distance / 6378;

  // Geo Find query
  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  // Responses
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});
