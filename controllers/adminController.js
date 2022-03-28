// MODULES IMPORT

import catchAsync from '../library/catchAsyc.js';

/// MIDDLEWARE
//@TODO: getDashboard getMe getmyBookings (API requests, updatePassword updateMe -> No handlers, API requests)

/// ROUTE HANDLERS
export const getDashboard = catchAsync(async (req, res, next) => {
  /// Successful response
  res.status(200).render('pages/dashboard', {
    title: 'Admin Dashboard',
  });
});
