// IMPORTS
import express from 'express';

// LOCAL IMPORTS
import * as bookingCtr from '../controllers/bookingsController.js';
import * as authCtr from '../controllers/authController.js';

// INIT ROUTER
const router = express.Router();

// ROUTES

// SINGLE ROUTES
// Protect all routes
router.use(authCtr.protect);

// Before submitting to DB, check if tour is booked by current user
router.route('/check-booking-status/:tourId').get(bookingCtr.checkTourIsBooked);

// Create a checkout session
router.route('/checkout-session/:tourId').get(bookingCtr.getCheckoutSession);

// CRUD ROUTES

// Restrict booking deletion to admin and lead-guide
router
  .route('/:id')
  .delete(authCtr.restrictTo('admin', 'lead-guide'), bookingCtr.deleteBooking);

// Group Restrictions to 'admin', 'lead-guide', 'guide'
router.use(authCtr.restrictTo('admin', 'lead-guide', 'guide'));

// Routes
router
  .route('/')
  .get(bookingCtr.aliasFilterBookingsByAgentRole, bookingCtr.getAllBookings)
  .post(bookingCtr.createBooking);

router.route('/:id').get(bookingCtr.getBooking).patch(bookingCtr.updateBooking);

// EXPORT ROUTER
export default router;
