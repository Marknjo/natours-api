// IMPORT MODULES
// 3rd Party Locals

// Local imports
import AppError from '../library/appErrors.js';
import catchAsync from '../library/catchAsyc.js';
import Tour from '../models/tourModel.js';

// HELPER FUNCTIONS @TODO: Export them to separate utility file
// MIDDLEWARES HANDLERS  @TODO: Export them to separate utility file
// SINGLE FEATURE HANDLERS
// @TODO: Implement (alias - middlewares) getCheapestTours, getTopRatedTours
// CRUD HANDLERS
// @TODO: Implement getAllTours, getTour, createTour, updateTour, deleteTour
/**
 * Get A single Tour
 */
export const getAllTour = catchAsync(async (req, res, next) => {
  // @TODO: Implement advancedFindFeatures (filters, sort, fields, pagination)
  // Basic filter
  let queryStr = { ...req.query };

  // Filter filds that are not in the table [sort, fields, page, limit]
  const filterFields = ['sort', 'fields', 'page', 'limit'];
  filterFields.forEach(el => delete queryStr[el]);

  //Advanced filtering
  queryStr = JSON.parse(
    JSON.stringify(queryStr).replace(
      /\b(gt|gte|lt|lte)\b/g,
      match => `$${match}`
    )
  );

  // Create query;
  let query = Tour.find(queryStr);

  // Helpers
  const formatQueryFields = str => str.split(',').join(' ');

  // 1. Fields
  const requestedFields = req.query.fields;
  if (requestedFields) {
    const formatedFields = formatQueryFields(requestedFields);
    //return query
    query = query.select(formatedFields);
  } else {
    // do not show __v field
    query = query.select('-__v');
  }

  // 2. Sort results

  // 3. Pagination

  // Get all tours
  let tours = await query;

  // Get results before returning the no results response
  const results = tours.length;

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

// AGGREGATE HANDLERS
// @TODO: Implement getToursStatsByDifficulty, getMontlyPlans
