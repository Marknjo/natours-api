// IMPORT MODULES
// 3rd Party
import { Router } from 'express';

// locals
import * as toursCtr from '../controllers/tourController.js';
import * as authCtr from '../controllers/authController.js';
import reviewRouter from './reviewRouter.js';

// INIT ROUTER
const router = Router();

// MIDDLEWARES ROUTES
/// Public Routes
// Route all reviews related requestes to the review router
router.use('/:tourId/reviews', reviewRouter);

// Aliases
router.get(
  '/top-5-cheap-tours',
  toursCtr.getCheapestTours,
  toursCtr.getAllTour
);

router.get(
  '/top-5-best-rated-tours',
  toursCtr.getTopRatedTours,
  toursCtr.getAllTour
);

/**
 * Get all tours
 */
router.get('/', toursCtr.getAllTour);

/**
 * Get a single route
 */
router.get('/:tourId', toursCtr.getTour);

/// Protected routes -> Only logged in users
router.use(authCtr.protect);

/**
 * Get montly plans
 */
router.route('/monthly-plans/:year').get(toursCtr.getMontlyPlans);

/**
 * Get tours within a certain distance
 */
router
  .route('/within-distance/:distance/center/:latlng/unit/:unit')
  .get(toursCtr.getToursWithin);

/**
 * Get tours near user location
 */
router
  .route('/near-my-location/:latlng/unit/:unit/:limit')
  .get(toursCtr.getToursNearMyLocation);

/**
 * Get tours statics by difficult level (prices, averageRatings e.t.c)
 * Restrict to admin/lead-guide
 */
router
  .route('/tour-stats-by-difficulty')
  .get(
    authCtr.restrictTo('admin', 'lead-guide'),
    toursCtr.getToursStatsByDifficulty
  );

/// Only admins can perform the following actions
router.use(authCtr.restrictTo('admin'));

/**
 * Create a tour
 */
router.post('/', toursCtr.createTour);

// Check if param is available
router.use('/:tourId', toursCtr.checkParamIsAvailable);

/**
 * Update tour and delete tour
 */
router
  .route('/:tourId')
  .patch(toursCtr.updateTour)
  .delete(toursCtr.beforeTourDelete, toursCtr.deleteTour);

// EXPORT
export default router;
