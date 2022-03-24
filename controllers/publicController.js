// MODULES IMPORT
// Global
import { env } from 'process';

// Local modules
import catchAsync from '../library/catchAsyc.js';
import Tour from '../models/tourModel.js';
import FindFeatures from '../library/findFeatures.js';
import AppError from '../library/appErrors.js';

/// MIDDLEWARE
//TODO (/loginUser /logoutUser /signupUser -> No handlers, API requests)

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

  // FIXME: Remove implementaion of messaging

  // Find tour by slug
  const tour = await Tour.findOne({ slug }).populate({
    path: 'reviews',
    select: 'review rating updatedAt',
  });

  /// Handle not found tour
  if (!tour)
    return next(
      new AppError(`Could not find the tour you are requesting  ${slug}`, 404)
    );

  // req.setFlashMessage({ message: tour.summary, action: tour.name });
  if (req.setFlashMessage)
    req.setFlashMessage({
      message: tour.summary,
      action: tour.name,
      messageType: 'info',
      removeAfter: 'shown',
      expiresIn: 10,
      showOnPage: req.originalUrl,
    });
  else console.log('🎈🎈🎈🎈🎈');

  // Get Mapbox key
  const mapboxKey = env.MAPBOX_KEY || false;

  // Render overview page
  res.status(200).render('pages/tour', {
    title: tour.name,
    tour,
    mapboxKey,
  });
});

/**
 * Login user
 */
export const loginPage = (req, res) => {
  console.log(req.originalUrl);

  // Render login page
  res.status(200).render('pages/login', {
    title: 'User login',
  });
};
