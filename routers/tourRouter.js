// IMPORT MODULES
// 3rd Party
import { Router } from 'express';

// locals
import * as toursCtr from '../controllers/tourController.js';

// INIT ROUTER
const router = Router();

// MIDDLEWARES ROUTES

// SINGLE ROUTES

// CRUD ROUTES
router.route('/').get(toursCtr.getAllTour);

// EXPORT
export default router;
