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

// EXPORT
export default router;
