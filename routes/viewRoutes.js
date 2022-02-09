// IMPORTS
// 3rd Party
import express from 'express';

// Local Imports
import * as view from '../controllers/viewController.js';

// INIT ROUTERS
const router = express.Router();

// ANY CONFIGS

// ROUTES
// Homepage
router.route('/').get(view.overview);
router.route('/tours/:slug').get(view.tourPage);

// Login page
router.route('/login').get(view.login);

// EXPORT
export default router;
