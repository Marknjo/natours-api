// IMPORTS
import express from 'express';

// LOCAL IMPORTS
import * as tourCtr from '../controllers/toursControllers.js';

// INIT ROUTER
const router = express.Router();

// ROUTES
// ALIAS ROUTES
router
  .route('/top-5-cheap')
  .get(tourCtr.aliasGetTopCheapTours, tourCtr.getAllTours);

router
  .route('/top-5-highest-rated')
  .get(tourCtr.aliasGetTopRatedTours, tourCtr.getAllTours);

// SINGLE ROUTES
// CRUD ROUTES
router.route('/').get(tourCtr.getAllTours).post(tourCtr.createTour);
router
  .route('/:d')
  .get(tourCtr.getTour)
  .patch(tourCtr.updateTour)
  .delete(tourCtr.deleteTour);

// EXPORT ROUTER
export default router;
