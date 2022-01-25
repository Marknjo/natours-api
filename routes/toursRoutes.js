// IMPORTS
import express from 'express';

// LOCAL IMPORTS
import * as tourCtr from '../controllers/toursControllers.js';
import * as authCtr from '../controllers/authController.js';
import reviewRouter from './reviewsRoutes.js';

// INIT ROUTER
const router = express.Router();

// ROUTES
// Implement nested routes
router.use('/:tourId/reviews', reviewRouter);

// ALIAS ROUTES
router
  .route('/top-5-cheap')
  .get(tourCtr.aliasGetTopCheapTours, tourCtr.getAllTours);

router
  .route('/top-5-highest-rated')
  .get(tourCtr.aliasGetTopRatedTours, tourCtr.getAllTours);

// SINGLE ROUTES
// Aggregation
router
  .route('/stats')
  .get(
    authCtr.protect,
    authCtr.restrictTo('admin', 'guide', 'lead-guide'),
    tourCtr.getTourStats
  );

router
  .route('/monthly-plans')
  .get(
    authCtr.protect,
    authCtr.restrictTo('admin', 'guide', 'lead-guide'),
    tourCtr.getTourMonthlyPlans
  );

// CRUD ROUTES
router
  .route('/')
  .get(authCtr.protect, tourCtr.getAllTours)
  .post(
    authCtr.protect,
    authCtr.restrictTo('admin', 'lead-guide'),
    tourCtr.createTour
  );

router
  .route('/:id')
  .get(tourCtr.getTour)
  .patch(
    authCtr.protect,
    authCtr.restrictTo('admin', 'lead-guide'),
    tourCtr.updateTour
  )
  .delete(
    authCtr.protect,
    authCtr.restrictTo('admin', 'lead-guide'),
    tourCtr.deleteTour
  );

// EXPORT ROUTER
export default router;
