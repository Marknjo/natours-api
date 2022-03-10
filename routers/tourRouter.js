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

// SINGLE ROUTES
router
  .route('/tour-stats-by-difficulty')
  .get(toursCtr.getToursStatsByDifficulty);

router.route('/monthly-plans/:year').get(toursCtr.getMontlyPlans);

router
  .route('/within-distance/:distance/center/:latlng/unit/:unit')
  .get(toursCtr.getToursWithin);

router
  .route('/near-my-location/:latlng/unit/:unit/:limit')
  .get(toursCtr.getToursNearMyLocation);

// CRUD ROUTES
router.route('/').get(toursCtr.getAllTour).post(toursCtr.createTour);

// Check if param is available
router.use('/:tourId', toursCtr.checkParamIsAvailable);

router
  .route('/:tourId')
  .get(toursCtr.getTour)
  .patch(toursCtr.updateTour)
  .delete(toursCtr.beforeTourDelete, toursCtr.delteteTour);

// EXPORT
export default router;
