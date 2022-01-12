import express from 'express';
import * as toursController from '../controllers/toursController.js';
import * as toursMiddleware from '../middlewares/toursMiddleware.js';

// init router
const router = express.Router();

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
