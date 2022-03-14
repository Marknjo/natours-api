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
      startDates: { $elemMatch: { $gte: Date.now() } },
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

/**
 * Get A Tour Page Handler
 */
export const getTourBySlug = catchAsync(async (req, res, next) => {
  // Get tour slug
  const slug = req.params.slug;

  // Find tour by slug
  const tour = await Tour.findOne({ slug }).populate({
    path: 'reviews',
    select: 'review rating updatedAt',
  });

  // Render overview page
  res.status(200).json({
    title: tour.name,
    tour,
  });
});
