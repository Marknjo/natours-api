import express from 'express';

// Local modules
import * as userController from '../controllers/usersControllers.js';

// Init router
const router = express.Router();

// Name routes
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// export router
export default router;
