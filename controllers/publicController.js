// MODULES IMPORT

import catchAsync from '../library/catchAsyc.js';
import Tour from '../models/tourModel.js';
import FindFeatures from '../library/findFeatures.js';

/// MIDDLEWARE
//@TODO: getOverview getTour (/loginUser /logoutUser /signupUser -> No handlers, API requests)

/**
 * Get all tours
 */

export const getOverview = catchAsync(async (req, res, next) => {
  // Fetch all tours -> filter only active tours
  let findFeatures = new FindFeatures(
    Tour.find({
      startDates: { $elemMatch: { $gt: Date.now() } },
      active: { $ne: false },
    }),
    req.query
  )
    .filterQuery()
    .limitFields()
    .sortBy()
    .paginate();

  const tours = await findFeatures.query;

  // No tours returned from teh request
  const noTours = true;

  // Return response
  res.status(200).render('pages/overview', {
    title: 'Exciting tours for adventurous people',
    ...(tours.length === 0 || !tours ? { noTours } : { tours }),
  });
});
