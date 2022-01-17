// IMPORTS
import express from 'express';

// Local Imports
import * as usersCtr from '../controllers/usersController.js';

// INIT ROUTER
const router = express.Router();

// OTHER ROUTES

// REST ROUTES
router.route('/').get(usersCtr.getAllUsers).post(usersCtr.creatUser);
router
  .route('/:id')
  .get(usersCtr.getUser)
  .patch(usersCtr.updateUser)
  .delete(usersCtr.deleteUser);

// EXPORT ROUTER
export default router;
