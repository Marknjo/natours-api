// IMPORTS
import express from 'express';

// LOCAL IMPORTS
import * as bookingCtr from '../controllers/bookingsController.js';
import * as authCtr from '../controllers/authController.js';

// INIT ROUTER
const router = express.Router();

// ROUTES

// SINGLE ROUTES
router
  .route('/checkout-session/:tourId')
  .get(authCtr.protect, bookingCtr.getCheckoutSession);

// CRUD ROUTES
// router
//   .route('/')
//   .get(tourCtr.getAllTours)
//   .post(
//     authCtr.protect,
//     authCtr.restrictTo('admin', 'lead-guide'),
//     tourCtr.createTour
//   );

// router
//   .route('/:id')
//   .get(tourCtr.getTour)
//   .patch(
//     authCtr.protect,
//     authCtr.restrictTo('admin', 'lead-guide'),
//     tourCtr.uploadToursImages,
//     tourCtr.resizeTourImages,
//     tourCtr.updateTour
//   )
//   .delete(
//     authCtr.protect,
//     authCtr.restrictTo('admin', 'lead-guide'),
//     tourCtr.deleteTour
//   );

// EXPORT ROUTER
export default router;
