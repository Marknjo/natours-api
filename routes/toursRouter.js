import express from 'express';
import * as toursController from '../controllers/toursController.js';
import * as toursMiddleware from '../middlewares/toursMiddleware.js';

// init router
const router = express.Router();

router.param('id', (req, res, next, value) => {
  // 1). Get the parameter
  const tourId = +req.params.id;

  // 2). Validate the tour id
  if (!Number.isFinite(tourId) || !tourId) {
    // 404 cannot fetch the data
    res.status(400).json({
      status: 'fail',
      message: 'Tour id format invalid!',
    });
    return;
  }

  req.tourId = tourId;

  next();
});

router
  .route('/')
  .get(toursController.getAllTours)
  .post(
    toursMiddleware.validateCreateTourFields,
    toursMiddleware.beforeCreate,
    toursMiddleware.validateAndSaveData,
    toursController.createTour
  );

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
