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

// Reset password route
router.route('/reset-password/:token').patch(authCtr.resetPassword);

// PROTECTED ROUTES
router.use(authCtr.protect);

// User specific activities
router.route('/update-me').patch(userCtr.updateMe);

// CRUD ROUTES

// EXPORT ROUTER
export default router;
