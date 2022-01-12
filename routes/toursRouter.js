import express from 'express';
import * as toursController from '../controllers/toursController.js';

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
    toursController.validateCreateTourFields,
    toursController.beforeCreate,
    toursController.validateAndSaveData,
    toursController.createTour
  );

// Validate all routes that have an id
router.use('/:id', toursController.checkFieldExists);

router
  .route('/:id')
  .get(toursController.getTour)
  .patch(
    toursController.beforeUpdate,
    toursController.validateAndSaveData,
    toursController.updateTour
  )
  .delete(
    toursController.beforeDelete,
    toursController.validateAndSaveData,
    toursController.deleteTour
  );

// export router
export default router;
