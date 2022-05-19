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
/**
 * Gets a single item from the database factory method.
 * @param {Instance} Model Mongoose model instance i.e. Tour
 * @param {{modelName: String, errMsg: String, successMsg: String, populate: String|{path: String, select: String} }} options Object contains options configurations, i.e. success message, model name, and errorMessage
 * @returns {Function} The catch async function
 */
export const getOne = (Model, options) =>
  catchAsync(async (req, res, next) => {
    // Find a DB entry by id

    let query = Model.findById(req.params.id);

    // Set populate to be optional
    if (options.populate) query = query.populate(options.populate);

    // Await query with populate or without
    const data = await query;

    // Validate if a data exists before returning the response
    if (!data) {
      const message =
        options.errMsg ||
        `You requested ${options.modelName} of id ${req.params.id}, which is not in this server.`;
      next(new AppError(message, 404));
      return;
    }

    // Return Response
    res.status(200).json({
      status: 'success',
      data: {
        [options.modelName]: data,
      },
    });
  });

// CREATE ONE
/**
 * Creates a database entry universal factory method.
 * @param {Instance} Model Mongoose model instance i.e. Tour
 * @param {{modelName: String, errMsg: String, successMsg: String }} options Object contains options configurations, i.e. success message, model name, and errorMessage
 * @returns {Function} The catch async function
 */
export const createOne = (Model, options) =>
  catchAsync(async (req, res, next) => {
    // Create Entry
    const data = await Model.create(req.body);

    // Return Response
    res.status(201).json({
      status: 'success',
      data: {
        [options.modelName]: data,
      },
    });
  });

// UPDATE ONE
/**
 * Updates a single a database entry universal factory method.
 * @param {Instance} Model Mongoose model instance i.e. Tour
 * @param {{modelName: String, errMsg: String, successMsg: String }} options Object contains options configurations, i.e. success message, model name, and errorMessage
 * @returns {Function} The catch async function
 */
export const updateOne = (Model, options) =>
  catchAsync(async (req, res, next) => {
    // Find DB entry and Update
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Validate if a data exists before returning the response
    if (!data) {
      const message =
        options.errMsg ||
        `Cannot update ${options.modelName} with the id ${req.params.id}.`;
      next(new AppError(message, 400));
      return;
    }

    // Return Response
    res.status(202).json({
      status: 'success',
      data: {
        [options.modelName]: data,
      },
    });
  });

// DELETE ONE
/**
 * Deletes a single a database entry universal factory method.
 * @param {Instance} Model Mongoose model instance i.e. Tour
 * @param {{modelName: String, errMsg: String, successMsg: String }} options Object contains options configurations, i.e. success message, model name, and errorMessage
 * @returns {Function} The catch async function
 */
export const deleteOne = (Model, options) =>
  catchAsync(async (req, res, next) => {
    // Find by DB entry id and delete it
    const data = await Model.findByIdAndDelete(req.params.id);

    // Validate if a data exists before returning the response
    if (!data) {
      const message =
        options.errMsg ||
        `Cannot delete ${options.modelName} with the id ${req.params.id} because it is not in this server.`;
      next(new AppError(message, 400));
      return;
    }

    // Return Response
    res.status(204).json({
      status: 'success',
      message: `${options.modelName
        .charAt(0)
        .toUpperCase()}${options.modelName.slice(1)} was susccessfully deleted`,
    });
  });
