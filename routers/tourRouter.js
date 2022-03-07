// IMPORT MODULES
// 3rd Party
import { Router } from 'express';

// locals
import * as toursCtr from '../controllers/tourController.js';
import * as authCtr from '../controllers/authController.js';

// INIT ROUTER
const router = Router();

// MIDDLEWARES ROUTES
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
router
  .route('/')
  .get(authCtr.protect, toursCtr.getAllTour)
  .post(toursCtr.createTour);

router
  .route('/:tourId')
  .get(toursCtr.checkParamIsAvailable, toursCtr.getTour)
  .patch(toursCtr.checkParamIsAvailable, toursCtr.updateTour)
  .delete(toursCtr.checkParamIsAvailable, toursCtr.delteteTour);

// EXPORT
export default router;
