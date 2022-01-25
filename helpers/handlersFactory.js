/**
 *  This file contains CRUD refactor codes for all the routes
 *  Prevents dublication of code
 *  Factory Function signatures is Model name and options of errorMsg, successMsg, and modelName
 */
// IMPORTS
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import APIFeature from '../helpers/apiFeatures.js';

// CRUD HANDLERS
// Implement all the CRUD Handlers
// Factory Functi

// GET ALL

/**
 * Gets all data from the database.
 * Implements API Features -> filtering, sorting, field selections, and pagination
 * @param {Instance} Model Mongoose model instance i.e. Tour
 * @param {{modelName: String, errMsg: String, successMsg: String}} options Object contains options configurations, i.e. success message, model name, and errorMessage
 * @returns {Function} The catch async function
 */
export const getAll = (Model, options) =>
  catchAsync(async (req, res, next) => {
    // Allow middleware customer filtering
    let filterObj = {};

    if (req.filterObj) filterObj = { ...req.filterObj };

    // API Features for Filtering Data. Sort, Fields, & Pagination
    const features = new APIFeature(Model.find(filterObj), req.query)
      .filter()
      .limitFields()
      .sort()
      .paginate();

    const data = await features.query;

    // Return Response
    res.status(200).json({
      status: 'success',
      results: data.length,
      data: {
        [options.modelName]: data,
      },
    });
  });

// GET ONE

// CREATE ONE

// UPDATE ONE

// DELETE ONE
