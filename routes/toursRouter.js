import express from 'express';
import * as toursController from '../controllers/toursController.js';
import * as toursMiddleware from '../middlewares/toursMiddleware.js';

// init router
const router = express.Router();

router.param('id', toursMiddleware.validateTourId);

router
  .route('/')
  .get(toursController.getAllTours)
  .post(toursController.createTour);

// Validate all routes that have an id
router.use('/:id', toursMiddleware.checkFieldExists);

router
  .route('/:id')
  .get(toursMiddleware.fetchTours, toursController.getTour)
  .patch(
    toursMiddleware.beforeUpdate,
    toursMiddleware.validateAndSaveData,
    toursController.updateTour
  )
  .delete(
    toursMiddleware.beforeDelete,
    toursMiddleware.validateAndSaveData,
    toursController.deleteTour
  );

// export router
export default router;
