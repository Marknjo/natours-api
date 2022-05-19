// IMPORT
// Global
import { env } from 'process';
import APIFeature from '../helpers/apiFeatures.js';
import Booking from '../models/bookingsModel.js';

// Local Imports
import Tour from '../models/toursModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// MIDDLEWARES
export const alerts = (req, res, next) => {
  // Check for alert
  const { alert } = req.query;

  // Evaluate deferent scerios
  switch (alert) {
    case 'booking':
      res.locals.alert = {
        type: 'success',
        message:
          'Your booking was successful! Please check your email for a confirmation. If your booking does not show up here immediately, please come back later.',
        duration: 15,
      };
      break;
    // Add more message types here
  }

  //next
  next();
};
// HANDLERS
// Overview/Homepage
export const getOverview = catchAsync(async (req, res, next) => {
  const features = new APIFeature(
    Tour.find({
      startDates: { $elemMatch: { $gte: new Date(Date.now()) } },
    }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  let tours = await features.query;

  let hasTours = true;

  // Check if there are bookings
  if (!tours || tours.length === 0) {
    hasTours = false;
  }

  res.status(200).render('pages/overview', {
    title: 'Exciting tours for adventurous people',
    display: 'overviews',
    tours,
    hasTours,
  });
});

// View A single Tour Page
export const getTourPage = catchAsync(async (req, res, next) => {
  // Fetch tour by slug
  const tourResp = await Tour.find({ slug: req.params.slug }).populate(
    'reviews'
  );

  if (!tourResp || tourResp.length < 1) {
    // TODO: Implement a better 404 page handler
    return next(
      new AppError(
        'Cannot find the page you are requesting. Please try again',
        404
      )
    );
  }

  const tour = tourResp[0];

  // Response
  return res.status(200).render('pages/tour', {
    title: tour.name,
    modalLayout: '_modalCheckBookingStatus',
    showModal: true,
    tour,
    stripePublicKey: env.STRIPE_PUBLIC_KEY,
  });
});

// View Login Page
export const getLogin = (req, res) => {
  // Render login page
  res.status(200).render('pages/login', {
    title: 'Login',
  });
};

// Dashboard
export const getDashboard = (req, res) => {
  // Return dashboard
  res.status(200).render('pages/dashboard', {
    title: 'Dashboard',
  });
};

// VIew Controller
export const getMyBookings = catchAsync(async (req, res, next) => {
  // Get bookings
  const bookings = await Booking.find({ user: req.user.id });
  const tourIds = bookings.map(el => el.tour.id);

  const tours = await Tour.find({ _id: { $in: tourIds } });

  let hasTours = true;

  //Check if there are bookings
  if (!tours || tours.length === 0) {
    hasTours = false;
  }

  // Render the overview template with the current user bookings
  res.status(200).render('pages/overview', {
    title: 'My Bookings',
    display: 'bookings',
    tours,
    hasTours,
  });
});
