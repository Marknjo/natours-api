// IMPORTS
// 3rd Party
import express from 'express';

// Local Imports
import * as view from '../controllers/viewController.js';
import * as auth from '../controllers/authController.js';

// INIT ROUTERS
const router = express.Router();

// ANY CONFIGS

// ROUTES
// Homepage
router.route('/').get(view.getOverview);
router.route('/tours/:slug').get(view.getTourPage);

// Login page
router.route('/login').get(view.getLogin);

// Dashboard
router.route('/dashboard').get(auth.protect, view.getDashboard);

// EXPORT
export default router;
