// IMPORTS
// 3rd Party
import express from 'express';

// Local Imports
import * as view from '../controllers/viewController.js';
import * as auth from '../controllers/authController.js';
import * as bookingsCtr from '../controllers/bookingsController.js';

// INIT ROUTERS
const router = express.Router();

// ANY CONFIGS

// ROUTES

// Dashboard
router.route('/dashboard').get(auth.protect, view.getDashboard);

router.use(auth.isLoggedin);

// Homepage
router.route('/').get(bookingsCtr.getSaveBookingToDB, view.getOverview);
router.route('/tours/:slug').get(view.getTourPage);

// Login page
router.route('/login').get(view.getLogin);

// EXPORT
export default router;
