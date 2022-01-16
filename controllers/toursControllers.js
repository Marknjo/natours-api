// IMPORT

// Local
import APIFeature from '../helpers/apiFeatures.js';
import Tour from '../models/toursModel.js';
import catchAsync from '../utils/catchAsync.js';

// MIDDLEWARE SETUP

// CRUD HANDLERS
// Get All Tours
export const getAllTours = catchAsync(async (req, res, next) => {
  // API Features for Filtering Data. Sort, Fields, & Pagination
  //   // 1). Filtering
  //   const queryObj = { ...req.query };
  //   // TODO: Implement allowable fields types
  //   // Filtering Basic fields,sort,page,limit
  //   const excludeQueryFields = ['fields', 'sort', 'page', 'limit'];
  //   excludeQueryFields.map(field => delete queryObj[field]);

  //   // Filtering Adavanced
  //   const queryStr = JSON.parse(
  //     JSON.stringify(queryObj).replace(
  //       /\b(gte|gt|lte|lt)\b/,
  //       match => `$${match}`
  //     )
  //   );

  //   let query = Tour.find(queryStr);
  //   // Helpers
  //   const replaceCommaWithSpace = str => {
  //     return str.split(',').join(' ');
  //   };

  //   // 2). Fields
  //   const showFields = req.query.fields;
  //   if (showFields) {
  //     const cleanFields = replaceCommaWithSpace(showFields);
  //     query = query.select(cleanFields);
  //   } else {
  //     query = query.select('-__v');
  //   }
  //   // 3). Sorting
  //   const sortFields = req.query.sort;
  //   if (sortFields) {
  //     const cleanSortFields = replaceCommaWithSpace(sortFields);
  //     query = query.sort(cleanSortFields);
  //   } else {
  //     query = query.sort('-createdAt');
  //   }

  //   // 4). Pagination
  //   const page = +req.query.page || 1;
  //   const limit = +req.query.limit || 100;
  //   const skip = (page - 1) * limit;

  //   query = query.skip(skip).limit(limit);

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
