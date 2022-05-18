// MODULES IMPORT

// import AppError from '../library/appErrors.js';
// import catchAsync from '../library/catchAsyc.js';
import catchAsync from '../library/catchAsyc.js';
import Booking from '../models/bookingModel.js';
import Tour from '../models/tourModel.js';
import { errorsWrapperHandler } from '../utils/errorWrappers.js';

/// MIDDLEWARE
//@TODO: getDashboard getMe getmyBookings (API requests, updatePassword updateMe -> No handlers, API requests)

/// ROUTE HANDLERS
/**
 * User Profile handler
 */
export const getProfile = (req, res, next) => {
  return errorsWrapperHandler(next, () => {
    // Get user by use
    const getUser = req.user ? `- ${req.user.name.split(' ')[0]}` : '';

    res.status(200).render('pages/profile', {
      title: `Profile ${getUser}`,
      pageUrl: req.originalUrl,
      assetsUrl: './../',
    });
  });
};

/**
 * Dashboard Handler
 */
export const getDashboard = (req, res, next) => {
  return errorsWrapperHandler(next, () => {
    res.status(200).render('pages/dashboard', {
      title: 'Admin Dashboard',
      pageUrl: req.originalUrl,
    });
  });
};

/**
 *  Get user bookings
 */
export const getMyBookings = catchAsync(async (req, res, next) => {
  // get current logged in user
  const userId = req.user.id;

  // filter bookings by their user id
  const bookings = await Booking.find({ user: userId });

  // CHeck if there are booking under current user
  let noTours = false;

  if (bookings.length === 0 || !bookings) noTours = true;

  // get all the tours they have booked
  let tours;

  if (!noTours) {
    // Get collection of tour Ids (rem - booking model populates tour field, which comes with the tour id)
    const tourIds = bookings.map(booking => booking.tour.id);

    /// find tours with belonging to the tour ids
    tours = await Tour.find({ _id: { $in: tourIds } });
  }

  // send the response to the UI
  // Return response
  res.status(200).render('pages/overview', {
    title: 'Your Bookings',
    ...(noTours ? { noTours } : { tours }),
    view: 'bookings',
    pageUrl: req.originalUrl,
    assetsUrl: './../',
  });
});

/**
 * Handle 404 errors for logged in users
 */
export const getPage404 = (req, res, next) => {
  return errorsWrapperHandler(next, () => {
    res.status(404).render('errors/dashboard404', {
      title: 'Dashboard 404 Error',
      pageUrl: req.originalUrl,
      assetsUrl: './../',
    });
  });
};
