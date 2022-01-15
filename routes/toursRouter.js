import express from 'express';
import * as toursController from '../controllers/toursController.js';

// init router
const router = express.Router();

// Single Routes
router
  .route('/top-5-cheap')
  .get(toursController.aliasTopCheap, toursController.getAllTours);

// Data Aggregation
router.route('/stats').get(toursController.getTourStats);
router.route('/monthly-plans').get(toursController.getMonthlyPlans);

// Group Routes
router
  .route('/top-5-rated')
  .get(toursController.aliasTopRated, toursController.getAllTours);

router
  .route('/')
  .get(toursController.getAllTours)
  .post(toursController.createTour);

router
  .route('/:id')
  .get(toursController.getTour)
  .patch(toursController.updateTour)
  .delete(toursController.deleteTour);

// export router
export default router;
