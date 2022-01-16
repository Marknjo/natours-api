// IMPORT

// Local
import APIFeature from '../helpers/apiFeatures.js';
import Tour from '../models/toursModel.js';
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
  // Find a tour
  // Validate if a tour exists before returning data

  // Return Response
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'A single to come.',
    },
  });
});

// Create A tour
export const createTour = catchAsync(async (req, res, next) => {
  // Get Tour data
  // Create Entry
  // Validate if there is an entry and delete

  // Return Response
  res.status(201).json({
    status: 'success',
    data: {
      tour: 'Tour Creation handler to come.',
    },
  });
});

// Update A Tour
export const updateTour = catchAsync(async (req, res, next) => {
  // Get Tour Id from URL
  // Find tour and Update
  // Validate if a tour exists before updating

  // Return Response
  res.status(202).json({
    status: 'success',
    data: {
      tour: 'Update tour was successful',
    },
  });
});

// Delete A Tour
export const deleteTour = catchAsync(async (req, res, next) => {
  // Get Tour Id from URL
  // Find by id and delete from DB
  // Validate if deleting was successful before decalring deleting has happened

  // Return Response
  res.status(204).json({
    status: 'success',
    message: 'A tour deletion message',
  });
});

// ADVANCED METHODS
// AGGREGATION
// Get Tour Stats by Difficulty
// Get Monthly Tours Stats
