// IMPORT MODULES
// 3rd Party Locals

// Local imports
import AppError from '../library/appErrors.js';
import catchAsync from '../library/catchAsyc.js';
import FindFeatures from '../library/findFeatures.js';
import Tour from '../models/tourModel.js';

// HELPER FUNCTIONS @TODO: Export them to separate utility file
// MIDDLEWARES HANDLERS  @TODO: Export them to separate utility file
// SINGLE FEATURE HANDLERS
// @TODO: Implement (alias - middlewares) getCheapestTours, getTopRatedTours
// CRUD HANDLERS
// @TODO: Implement getTour, createTour, updateTour, deleteTour
/**
 * Get A single Tour
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

// AGGREGATE HANDLERS
// @TODO: Implement getToursStatsByDifficulty, getMontlyPlans
