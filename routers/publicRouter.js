// MODULES IMPORT
import express from 'express';
import { isLoggedIn } from '../controllers/authController.js';

import * as publicCtr from '../controllers/publicController.js';

/// INIT ROUTER
const router = express.Router();
//@TODO: /overview & /:slug /login /logout /signup

/// ROUTES

/**
 * Add user info to the locals by checking if user is logged in
 */
router.use(isLoggedIn);

/**
 * Route to Login page
 */
router.get('/login', publicCtr.loginPage);

/**
 * Route to Home page
 */
router.get('/', publicCtr.getOverview);

/**
 * Route to tour page
 */
router.get('/:slug', publicCtr.getTourBySlug);

/// EXPORT ROUTER
export default router;
