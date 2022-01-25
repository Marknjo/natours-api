// IMPORTS
// 3rd Party
import express from 'express';

// Locals
// Import Review Controller
import * as revCtr from '../controllers/reviewsController.js';
import * as authCtr from '../controllers/authController.js';

// INIT ROUTER
const router = express.Router({ mergeParams: true });

// ROUTES DEFINATION
router
  .route('/')
  .post(authCtr.protect, authCtr.restrictTo('user'), revCtr.createTourReview)
  .get(revCtr.getAllReviews);

router.route('/:userId');

// EXPORT ROUTER
export default router;
