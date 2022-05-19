// MODULES IMPORT
// Global
import { env } from 'process';

// Local modules
import catchAsync from '../library/catchAsyc.js';
import Tour from '../models/tourModel.js';
import FindFeatures from '../library/findFeatures.js';
import AppError from '../library/appErrors.js';
import { errorsWrapperHandler } from '../utils/errorWrappers.js';

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
    view: 'overview',
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

  /// Handle not found tour
  if (!tour)
    return next(
      new AppError(`Could not find the tour you are requesting  ${slug}`, 404)
    );

  // Get Mapbox key
  const mapboxKey = env.MAPBOX_KEY || false;

  // Render overview page
  res.status(200).render('pages/tour', {
    title: tour.name,
    tour,
    mapboxKey,
    stripePublicKey: env.STRIPE_PUBLIC_KEY,
  });
});

/**
 * Login user
 */
export const loginPage = (req, res, next) => {
  return errorsWrapperHandler(next, () => {
    // Do not show login page if user is logged in
    if (res.locals.isLoggedIn) return res.redirect('/');

    // Render login page
    res.status(200).render('pages/login', {
      title: 'User login',
    });
  });
};

/**
 * User Signup Page
 */
export const signupPage = (req, res, next) => {
  return errorsWrapperHandler(next, () => {
    // Do not show signup page if user is logged in/already registered
    if (res.locals.isLoggedIn) return res.redirect('/');

    // Render signup page
    res.status(200).render('pages/signup', {
      title: 'User Signup',
    });
  });
};

/**
 * Handle 404 errors public pages
 */
export const getPage404 = (_, res, next) => {
  return errorsWrapperHandler(next, () => {
    res.status(404).render('errors/public404', {
      title: '404 Error',
    });
  });
};

/**
 * Handle 5xx errors public pages
 */
export const getPage5xx = (req, res, next) => {
  return errorsWrapperHandler(next, () => {
    const errorStatus = req.errorStatusCode ? req.errorStatusCode : 500;

    res.status(404).render('errors/errorPage', {
      title: `${errorStatus} Error`,
      errorStatus,
    });
  });
};
