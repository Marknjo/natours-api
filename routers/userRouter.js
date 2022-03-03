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
// Sign up route
router.route('/signup').post(authCtr.signup);

//Login route
router.route('/login').post(authCtr.login);

// Forget password route
router.route('/forget-password').post(authCtr.forgetPassword);

// CRUD ROUTES

// EXPORT ROUTER
export default router;
