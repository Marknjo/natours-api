// MODULES IMPORT
import express from 'express';

/// Local imports -> Controllers
import * as adminCtr from '../controllers/adminController.js';
import * as authCtr from '../controllers/authController.js';

/// INIT ROUTER
const router = express.Router();

//@TODO: sys-admin/dashboard sys-admin/me sys-admin/update-me sys-admin/my-bookings sys-admin/update-password

/// All routes are protected
router.use(authCtr.protect);

/// ROUTES

/**
 * Admin 404 not found page
 */
router.get('/page404', adminCtr.getPage404);

/**
 * My profile page
 */
router.get('/profile', adminCtr.getProfile);

/**
 * Dashboard route
 */
router.get('/', adminCtr.getDashboard);

/// EXPORT ROUTER
export default router;
