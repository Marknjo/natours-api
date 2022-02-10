// IMPORT
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
  const tours = await Tour.find();

  res.status(200).render('pages/overview', {
    title: 'Exciting tours for adventurous people',
    tours,
  });
});

// View A single Tour Page
export const getTourPage = catchAsync(async (req, res, next) => {
  // Fetch tour by slug
  const tourResp = await Tour.find({ slug: req.params.slug }).populate(
    'reviews'
  );

  console.log(tourResp);
  console.log(!tourResp);

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
  res.status(200).render('pages/tour', {
    title: tour.name,
    tour,
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
