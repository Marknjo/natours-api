/// IMPORT DEPENDENCIES
// 3rd Party Imports
import express from 'express';

// local Imports
import * as reviewCtr from '../controllers/reviewController.js';
import * as authCtr from '../controllers/authController.js';

/// Init Router
const router = express.Router({ mergeParams: true }); // handle /tours/:tourId/reviews -> request

/// ROUTES DEFINATIONS

// MIDDLEWARES ROUTES

/// Protected Routes
router.use(authCtr.protect);

/// SINGLE ROUTES

/// CRUD ROUTES
router
  .route('/')
  .post(
    authCtr.restrictTo('user'),
    reviewCtr.prepCreateReviewFields,
    reviewCtr.createReview
  );

// Review with ID
router
  .route('/:reviewId')
  .patch(authCtr.restrictTo('user', 'admin'), reviewCtr.updateReview)
  .delete(
    authCtr.restrictTo('user', 'admin', 'lead-guide'),
    reviewCtr.deleteReview
  );

/// EXPORT ROUTER
export default router;
