// IMPORT MODULES
// 3rd Party
import { Router } from 'express';

// locals
import * as toursCtr from '../controllers/tourController.js';

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

// CRUD ROUTES
router.route('/').get(toursCtr.getAllTour).post(toursCtr.createTour);

router
  .route('/:tourId')
  .get(toursCtr.checkParamIsAvailable, toursCtr.getTour)
  .patch(toursCtr.checkParamIsAvailable, toursCtr.updateTour)
  .delete(toursCtr.checkParamIsAvailable, toursCtr.delteteTour);

// EXPORT
export default router;
