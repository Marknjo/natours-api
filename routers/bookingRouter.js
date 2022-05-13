/// IMPORT EXPRESS
import express from 'express';

/// IMPORT LOCAL MODULES
import * as bookingCtr from '../controllers/bookingController.js';
import * as authCtr from '../controllers/authController.js';

/// INIT BOOKING ROUTER
const router = express.Router();

/// DEFINE ROUTES
// Basic Routes
/**
 * Stripe checkout router
 */
router.get('/stripe-checkout/:tourId', bookingCtr.getStripeCheckoutSession);

// CRUD Routes

/// EXPORT BOOKING ROUTER
export default router;
