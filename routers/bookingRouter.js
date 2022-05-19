/// IMPORT EXPRESS
import express from 'express';

/// IMPORT LOCAL MODULES
import * as bookingCtr from '../controllers/bookingController.js';
import * as authCtr from '../controllers/authController.js';

/// INIT BOOKING ROUTER
const router = express.Router();

/// DEFINE ROUTES
// Basic Routes
/** Prtect all routes before access */
router.use(authCtr.protect);

/**
 * Stripe checkout router
 */
// router.get('/stripe-checkout/:tourId', bookingCtr.checkBookingStatus, bookingCtr.getStripeCheckoutSession); // to be implemented
router.get('/stripe-checkout/:tourId', bookingCtr.getStripeCheckoutSession);

// CRUD Routes
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

/// EXPORT BOOKING ROUTER
export default router;
