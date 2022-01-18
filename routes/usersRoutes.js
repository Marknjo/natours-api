// IMPORTS
import express from 'express';

// Local Imports
import * as usersCtr from '../controllers/usersController.js';
import * as authCtr from '../controllers/authController.js';

// INIT ROUTER
const router = express.Router();

// OTHER ROUTES
router.route('/signup').post(authCtr.signup);
router.route('/login').post(authCtr.login);

// Password Reset
router.route('/forget-password').post(authCtr.forgetPassword);
router.route('/reset-password/:token').post(authCtr.resetPassword);
router
  .route('/update-my-password')
  .patch(authCtr.protect, authCtr.updateMyPassword);

// User Details
router.route('/update-me').patch(authCtr.protect, usersCtr.updateMe);

// REST ROUTES
router.route('/').get(usersCtr.getAllUsers).post(usersCtr.creatUser);
router
  .route('/:id')
  .get(usersCtr.getUser)
  .patch(usersCtr.updateUser)
  .delete(usersCtr.deleteUser);

// EXPORT ROUTER
export default router;
