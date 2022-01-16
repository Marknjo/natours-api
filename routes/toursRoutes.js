// IMPORTS
import express from 'express';

// LOCAL IMPORTS
import * as tourCtr from '../controllers/toursControllers.js';

// INIT ROUTER
const router = express.Router();

// ROUTES
// ALIAS ROUTES
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
