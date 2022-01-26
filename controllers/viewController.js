// IMPORT
// Local Imports
import Tour from '../models/toursModel.js';
import catchAsync from '../utils/catchAsync.js';

// MIDDLEWARES

// HANDLERS
// TODO: Overview/homepage, tours/:slug, signin, login, signup, dashboard, /me,

// Overview/Homepage
export const overview = catchAsync(async (req, res, next) => {
  // TODO: Implement data filtering, sorting, & pagination
  const tours = await Tour.find();

  res.status(200).render('pages/overview', {
    title: 'Exciting tours for adventurous people',
    tours,
  });
});
