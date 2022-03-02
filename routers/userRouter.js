// IMPORT DEPENDANCIES
import express from 'express';

// Local imports
import * as userCtr from '../controllers/userController.js';
import * as authCtr from '../controllers/authController.js';

// DEFINE EXPRESS ROUTER
const router = express.Router();

// ROUTES

// MIDDLEWARE ROUTES

// SINGLE ROUTES
router.route('/signup').post(authCtr.signup);

// CRUD ROUTES

// EXPORT ROUTER
export default router;
