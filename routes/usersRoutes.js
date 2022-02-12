// IMPORTS
import express from 'express';

// Local Imports
import * as usersCtr from '../controllers/usersController.js';
import * as authCtr from '../controllers/authController.js';
import reviewRouter from './reviewsRoutes.js';

// INIT ROUTER
const router = express.Router();

// Ruutes
// Implement nested routes
router.use(
  '/:userId/reviews',
  authCtr.protect,
  authCtr.restrictTo('admin'),
  reviewRouter
);

// OTHER ROUTES
router.route('/signup').post(authCtr.signup);
router.route('/login').post(authCtr.login);
router.route('/logout').get(authCtr.logout);

// Password Reset
router.route('/forget-password').post(authCtr.forgetPassword);
router.route('/reset-password/:token').post(authCtr.resetPassword);

// PROTECTED ROUTES
// Everything below here is protected
router.use(authCtr.protect);

// User Details
router
  .route('/update-me')
  .patch(
    usersCtr.uploadUserProfilePhoto,
    usersCtr.resizeUserProfilePhoto,
    usersCtr.updateMe
  );
router.route('/delete-me').patch(usersCtr.deleteMe);
router.route('/me').get(usersCtr.getMe, usersCtr.getUser);
router.route('/update-my-password').patch(authCtr.updateMyPassword);

// ADMIN PRIVILLEGES
router.use(authCtr.restrictTo('admin'));

// REST ROUTES
router
  .route('/')
  .get(usersCtr.aliasDefaultFields, usersCtr.getAllUsers)
  .post(usersCtr.creatUser);

router
  .route('/:id')
  .get(usersCtr.getUser)
  .patch(usersCtr.updateUser)
  .delete(usersCtr.deleteUser);

// EXPORT ROUTER
export default router;
