// Global

// Local Modules import
import Tour from '../models/tourModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';
import cathcAsync from '../utils/catchAsync.js';

// MIDDLEWARES
export const aliasTopCheap = (req, res, next) => {
  const queryObj = {
    sort: 'price,-ratingsAverage',
    limit: 5,
    fields: 'name,price,ratingsAverage,difficulty,duration',
  };

  req.query = queryObj;

  next();
};

export const aliasTopRated = (req, res, next) => {
  const queryObj = {
    sort: '-ratingsAverage,-price',
    limit: 5,
    fields: 'name,price,ratingsAverage,difficulty,duration',
  };

  req.query = queryObj;

  next();
};

// 01. CONTROLLERS
// Get all Tours
export const getAllTours = cathcAsync(async (req, res, next) => {
  // API Features for filtering, sorting, and paginating data
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .fieldsLimit()
    .sort()
    .paginate();

  // EXECUTE
  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// Get one tour
export const getTour = cathcAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  console.log(tour);

  if (!tour) {
    next(new AppError(`Cannot find tour with id ${req.params.id}!`, 404));
    return;
  }

  // 4). Send a response
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// Create Tour
export const createTour = cathcAsync(async (req, res, next) => {
  // 1). Get body @TODO: Validate
  // 2). Save to the database
  const tour = await Tour.create(req.body);

  // 3). Success saved data
  res.status(200).json({
    status: 'success',
    message: 'Tour added to the database successfully.',
    data: {
      tour: tour,
    },
  });
});

// Delete Tours
export const deleteTour = cathcAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    next(new AppError('Cannot delete tour with that id!', 404));
    return;
  }

  res.status(204).json({
    status: 'success',
    message: 'Tour deleted from the database successfully.',
  });
});

// Update Tour
export const updateTour = cathcAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    next(new AppError('Cannot update tour with that id!', 404));
    return;
  }

  res.status(200).json({
    status: 'success',
    message: 'Tour updated successfully.',
    data: {
      tour,
    },
  });
});

// Get Tour Stats
export const getTourStats = cathcAsync(async (req, res, next) => {
  // Aggregate tours by difficulty level
  const stats = await Tour.aggregate([
    // match: ratingsAverage > 4.5
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },

    // Group: By numTours, avgPrice, minPrice, maxPrice
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        totalRatings: { $sum: '$ratingsQuantity' },
        avgRatings: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },

    // Sort: Sort by avgPrice
    {
      $sort: { avgPrice: -1 },
    },

    // Add difficulty field
    {
      $addFields: { difficulty: '$_id' },
    },

    // Remove ID
    {
      $project: { _id: 0 },
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

// Get Tour Tours Monthly Plans
export const getMonthlyPlans = cathcAsync(async (req, res, next) => {
  // get year
  // Check if url has year available
  if (!req.query.year) {
    next(
      new AppError(
        `Expects url to have a year parameter i.e. http://url?year=1979.`,
        404
      )
    );
    return;
  }

  // Set values
  const year = +req.query.year;
  const checkLength = /^\d{4}$/.test(year);

  // Validate

  // Check format
  if (!checkLength && Number.isFinite(year)) {
    next(
      new AppError(
        `You passed ${req.query.year}, but expects year to be in the format XXXX i.e. year=1979.`,
        404
      )
    );
    return;
  }

  // Get year froum the url
  const stats = await Tour.aggregate([
    // Extract start dates array
    {
      $unwind: '$startDates',
    },

    // Match where start dates are given
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },

    // Group: By month, show count, and tour names
    {
      $group: {
        _id: { $month: '$startDates' },
        totalTours: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },

    // add a months field matching _id
    {
      $addFields: { month: '$_id' },
    },

    // Remove the id field
    {
      $project: { _id: 0 },
    },

    // Sort by the number of tours per month
    {
      $sort: { totalTours: -1 },
    },

    // Limit
    {
      $limit: 12,
    },
  ]);

  // Aggregate Tour by datte
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
