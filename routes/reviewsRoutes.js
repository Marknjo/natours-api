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
  .post(
    authCtr.protect,
    authCtr.restrictTo('user'),
    revCtr.addUserAndTourToBody,
    revCtr.createTourReview
  )
  .get(revCtr.filterGetAll, revCtr.getAllReviews);

// Protected Routes
router.use(authCtr.protect);

router
  .route('/:id')
  .get(revCtr.getReview)
  .patch(
    authCtr.restrictTo('user', 'admin'),
    revCtr.addUserAndTourToBody,
    revCtr.updateReview
  )
  .delete(authCtr.restrictTo('user', 'admin'), revCtr.deleteReview);

// EXPORT ROUTER
export default router;
