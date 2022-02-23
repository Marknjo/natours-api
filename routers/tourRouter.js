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

// CRUD ROUTES
router.route('/').get(toursCtr.getAllTour);

router.route('/:tourId').get(toursCtr.getTour);

// EXPORT
export default router;
