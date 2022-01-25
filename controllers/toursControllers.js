// IMPORT

// Local
import Tour from '../models/toursModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import * as factory from '../helpers/handlersFactory.js';

// MIDDLEWARE SETUP

// ALIAS HANDLERS
// Get top cheap tours
export const aliasGetTopCheapTours = (req, res, next) => {
  // Define the the query object
  const queryObj = {
    sort: 'price,-ratingsAverage',
    limit: 5,
    page: 1,
    fields: 'name,price,ratingsAverage,ratingsQuantity,duration,difficulty',
  };

  req.query = queryObj;

  // Next
  next();
};

// Get top cheap tours
export const aliasGetTopRatedTours = (req, res, next) => {
  // Define the the query object
  const queryObj = {
    sort: '-ratingsAverage,price',
    limit: 5,
    page: 1,
    fields: 'name,price,ratingsAverage,ratingsQuantity,duration,difficulty',
  };

  req.query = queryObj;

  // Next
  next();
};

// CRUD HANDLERS
// Get All Tours
export const getAllTours = factory.getAll(Tour, { modelName: 'tours' });

// Get Single Tour
export const getTour = factory.getOne(Tour, {
  modelName: 'tour',
  populate: 'reviews',
});

// Create A tour
export const createTour = factory.createOne(Tour, { modelName: 'tour' });

// Update A Tour
export const updateTour = factory.updateOne(Tour, { modelName: 'tour' });

// Delete A Tour
// TODO: Prevent orphan reviews - Implement Delete all reviews for the tour before deleting the tour from the DB.
export const deleteTour = factory.deleteOne(Tour, { modelName: 'tour' });

// ADVANCED METHODS
// AGGREGATION
// Get Tour Stats by Difficulty
export const getTourStats = catchAsync(async (req, res, next) => {
  // Generate tour aggregation grouped by difficulty
  const stats = await Tour.aggregate([
    // Match Tours By ratingsAverage
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },

    // Group Tours by difficulty
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        totalTours: { $sum: 1 },
        totalQty: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        maxPrice: { $max: '$price' },
        minPrice: { $min: '$price' },
      },
    },

    // Sort by the average price
    {
      $sort: { avgPrice: -1 },
    },

    // And Field Difficulty
    {
      $addFields: { difficulty: '$_id' },
    },

    // Remove Id Field from the aggregation
    {
      $project: { _id: 0 },
    },
  ]);

  // return response
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

// Get Monthly Tours Stats
export const getTourMonthlyPlans = catchAsync(async (req, res, next) => {
  // Validate year field
  // Is it supplied
  if (!req.query.year) {
    const message = `Year field not provided!`;
    next(new AppError(message, 400));
    return;
  }
  // It is of the valid format, is numeric and its length is 4
  const year = req.query.year;
  const checkLengthMatches = /\b^\d{4}\b/.test(year);

  if (!checkLengthMatches || !Number.isFinite(+year)) {
    const message = `Year ${year} is not a valid format`;
    next(new AppError(message, 400));
    return;
  }

  // Stats
  const stats = await Tour.aggregate([
    // Unwind Dates
    {
      $unwind: '$startDates',
    },

    // Match by Start Dates
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },

    // Group by Start Dates
    {
      $group: {
        _id: { $month: '$startDates' },
        totalTours: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },

    // Add Month Field
    {
      $addFields: { month: '$_id' },
    },

    // Remove _id Field
    {
      $project: { _id: 0 },
    },

    // Limit field to 12
    {
      $limit: 12,
    },

    // Sort by months with the highest tours
    {
      $sort: { totalTours: -1 },
    },
  ]);

  //response
  res.status(200).json({
    status: 'success',
    results: stats.length,
    data: {
      stats,
    },
  });
});

// Get tours within a given distance/radius
export const getToursWithinRadius = catchAsync(async (req, res, next) => {
  // get parameters strings
  const { distance, latlng, unit } = req.params;

  // Validate existance of the parameters
  if (!distance || !latlng || !unit)
    return next(
      new AppError(
        'Please provide distance, unit, latitute and latitude in this format /tours/:distance/center/:latlng(lat,lng)/:unit.',
        400
      )
    );

  // validate unit
  if (unit !== 'mi' && unit !== 'km')
    return next(new AppError('Allowable unit is km or mi', 400));

  // Calculate radius
  const radius = unit === 'mi' ? distance / 3958.8 : distance / 6378.1;

  // Get latitude longitude
  const [lat, lng] = latlng.split(',');

  // Validate lat & lng
  if (!lat || !lng)
    return next(new AppError('Provide :latlng in the format of /lat,lng', 400));

  // Find tours based on the provided parameters
  const toursWithin = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  // Return a response
  res.status(200).json({
    status: 'success',
    results: toursWithin.length,
    data: {
      tours: toursWithin,
    },
  });
});

// Implement Geowithin aggregatio
export const getTourDistances = catchAsync(async (req, res, next) => {
  // get parameters strings
  const { latlng, unit } = req.params;

  // Validate existance of the parameters
  if (!latlng || !unit)
    return next(
      new AppError(
        'Please provide unit, latitute and latitude in this format /tours/:distance/center/:latlng(lat,lng)/:unit.',
        400
      )
    );

  // validate unit
  if (unit !== 'mi' && unit !== 'km')
    return next(new AppError('Allowable unit is km or mi', 400));

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  // Get latitude longitude
  const [lat, lng] = latlng.split(',');

  // Validate lat & lng
  if (!lat || !lng)
    return next(new AppError('Provide :latlng in the format of /lat,lng', 400));

  // Limit number of tours to return /&limit=6
  const limit = +req.query.limit || 10;

  if (!Number.isFinite(limit)) return next('Limit value must be a number', 400);

  // Do aggregation
  const stats = await Tour.aggregate([
    // GeoNear
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [+lng, +lat],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },

    // Project fields to show
    {
      $project: {
        distance: 1,
        name: 1,
        price: 1,
        ratingsAverage: 1,
        ratingsQuantity: 1,
      },
    },
    {
      $limit: limit,
    },
  ]);

  // Return results
  res.status(200).json({
    status: 'success',
    results: stats.length,
    data: {
      tours: stats,
    },
  });
});
