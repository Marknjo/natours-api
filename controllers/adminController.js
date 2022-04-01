// MODULES IMPORT

import catchAsync from '../library/catchAsyc.js';

/// MIDDLEWARE
//@TODO: getDashboard getMe getmyBookings (API requests, updatePassword updateMe -> No handlers, API requests)

/// ROUTE HANDLERS
/**
 * User Profile handler
 */
export const getProfile = (req, res) => {
  // Get user by use
  const getUser = req.user ? `- ${req.user.name.split(' ')[0]}` : '';

  res.status(200).render('pages/profile', {
    title: `Profile ${getUser}`,
    pageUrl: req.originalUrl,
    assetsUrl: './../',
  });
};

/**
 * Dash board Handler
 */
export const getDashboard = catchAsync(async (req, res, next) => {
  /// Successful response
  res.status(200).render('pages/dashboard', {
    title: 'Admin Dashboard',
    pageUrl: req.originalUrl,
  });
});

/**
 * Handle 404 errors for logged in users
 */
export const getPage404 = (req, res) => {
  res.status(404).render('errors/dashboard404', {
    title: 'Dashboard 404 Error',
    pageUrl: req.originalUrl,
    assetsUrl: './../',
  });
};
