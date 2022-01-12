import express from 'express';
import * as toursController from '../controllers/toursController.js';

// init router
const router = express.Router();

router
  .route('/')
  .get(toursController.getAllTours)
  .post(toursController.createTour);

// Validate all routes that have an id
router.use('/:id', toursController.tourWithIdValidations);

router
  .route('/:id')
  .get(toursController.getTour)
  .patch(toursController.updateTour)
  .delete(toursController.deleteTour);

// export router
export default router;
