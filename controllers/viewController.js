// IMPORT
// Local Imports
import Tour from '../models/toursModel.js';
import catchAsync from '../utils/catchAsync.js';

// MIDDLEWARES

// HANDLERS
// TODO: tours/:slug, signin, login, signup, dashboard, /me,

// Overview/Homepage
export const overview = catchAsync(async (req, res, next) => {
  // TODO: Implement data filtering, sorting, & pagination
  const tours = await Tour.find();

  res.status(200).render('pages/overview', {
    title: 'Exciting tours for adventurous people',
    tours,
  });
});

// View A single Tour Page
export const tourPage = catchAsync(async (req, res, next) => {
  // Fetch tour by slug
  const tourResp = await Tour.find({ slug: req.params.slug }).populate(
    'reviews'
  );

  if (!tourResp) {
    // TODO: Implement a better 404 page handler
    return next(
      new AppError(
        '404 cannot find the page you are requesting. Please try again',
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
