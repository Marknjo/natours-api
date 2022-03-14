// MODULES IMPORT
import express from 'express';

import * as publicCtr from '../controllers/publicController.js';

/// INIT ROUTER
const router = express.Router();
//@TODO: /overview & /:slug /login /logout /signup

/// ROUTES
/**
 * Route to Home page
 */
router.get('/', publicCtr.getOverview);

/**
 * Route to tour page
 */
router.get('/:slug', publicCtr.getTourBySlug);

/// EXPORT ROUTER
export default router;
