// MODULES IMPORT
import express from 'express';

import * as publicCtr from '../controllers/publicController.js';

/// INIT ROUTER
const router = express.Router();
//@TODO: /overview & /:slug /login /logout /signup

/// ROUTES
/**
 * Get Home page
 */
router.get('/', publicCtr.getOverview);

/// EXPORT ROUTER
export default router;
