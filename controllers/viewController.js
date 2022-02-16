// IMPORT
// Global
import { env } from 'process';
import Booking from '../models/bookingsModel.js';

// Local Imports
import Tour from '../models/toursModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// MIDDLEWARES

// HANDLERS
// TODO: signup, dashboard, /me,

// Overview/Homepage
export const getOverview = catchAsync(async (req, res, next) => {
  // TODO: Implement data filtering, sorting, & pagination
  let tours = await Tour.find({
    startDates: { $elemMatch: { $gte: new Date(Date.now()) } },
  });

  tours = tours.filter((tour, i) => {
    const currentDate = Date.now();
    const tourStartDate = Number.parseInt(
      new Date(tour.startDates.at(0)).getTime(),
      10
    );
    if (tourStartDate > currentDate) return tour;
  });

  // console.log(mytours);

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
