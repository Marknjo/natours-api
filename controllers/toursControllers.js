// IMPORT

// Local
import APIFeature from '../helpers/apiFeatures.js';
import Tour from '../models/toursModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

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
export const getAllTours = catchAsync(async (req, res, next) => {
  // API Features for Filtering Data. Sort, Fields, & Pagination
  const features = new APIFeature(Tour.find(), req.query)
    .filter()
    .limitFields()
    .sort()
    .paginate();

  const tours = await features.query;

  // Return Response
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// Get Single Tour
export const getTour = catchAsync(async (req, res, next) => {
  // Get Tour Id from URL
  // Find a tour by id
  const tour = await Tour.findById(req.params.id);

  // Validate if a tour exists before returning data
  if (!tour) {
    const message = `You requested tour of id ${req.params.id}, which is not in this server.`;
    next(new AppError(message, 404));
    return;
  }

  // Return Response
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// Create A tour
export const createTour = catchAsync(async (req, res, next) => {
  // Get new Tour data
  // Create Entry
  const tour = await Tour.create(req.body);

  // Return Response
  res.status(201).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// Update A Tour
export const updateTour = catchAsync(async (req, res, next) => {
  // Get Tour Id from URL
  // Find tour and Update
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // Validate if a tour exists before returning data
  if (!tour) {
    const message = `Cannot update tour with the id ${req.params.id}.`;
    next(new AppError(message, 400));
    return;
  }

  // Return Response
  res.status(202).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// Delete A Tour
export const deleteTour = catchAsync(async (req, res, next) => {
  // Get Tour Id from URL
  // Find by id and delete from DB
  const tour = await Tour.findByIdAndDelete(req.params.id);

  // Validate if a tour exists before returning data
  if (!tour) {
    const message = `Cannot delete tour with the id ${req.params.id} because it is not in this server.`;
    next(new AppError(message, 400));
    return;
  }

  // Return Response
  res.status(204).json({
    status: 'success',
    message: 'Tour was susccessfully deleted',
  });
});

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
