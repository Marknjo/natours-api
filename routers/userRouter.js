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

//Logout route
router.route('/logout').get(authCtr.logout);

// User specific activities
//User confirm new account
router.route('/confirm-account').patch(userCtr.confirmAccount);

// Get a single user
router.route('/me').get(userCtr.getMe, userCtr.getUser);

// Update user profile details
router
  .route('/update-me')
  .patch(
    userCtr.uploadProfilePhoto,
    userCtr.resizeProfilePhoto,
    userCtr.updateMe
  );

// Delete user from the account
router.route('/delete-me').patch(userCtr.deleteMe, userCtr.updateMe);

// Update my password
router.route('/update-password').patch(userCtr.updateMyPassword);

// CRUD ROUTES
router.use(authCtr.restrictTo('admin'));

// Get router
router.route('/').get(userCtr.getAllUsers).post(userCtr.createUser);

// get single user, update & delete
router
  .route('/:userId')
  .get(userCtr.getUser)
  .patch(userCtr.updateUser)
  .delete(userCtr.deleteUser);

// EXPORT ROUTER
export default router;
