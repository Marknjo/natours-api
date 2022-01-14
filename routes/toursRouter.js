import express from 'express';
import * as toursController from '../controllers/toursController.js';

// init router
const router = express.Router();

// Single Routes
router
  .route('/top-5-cheap')
  .get(toursController.aliasTopCheap, toursController.getAllTours);

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
