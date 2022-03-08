/**
 * Handlers Helper methods
 * getAll
 * getOne
 * updateOne
 * deleteOne
 * createOne
 */

// Imports
import AppError from '../library/appErrors.js';
import catchAsync from '../library/catchAsyc.js';
import FindFeatures from '../library/findFeatures.js';
import { filterRequiredFields } from '../utils/helpers.js';

/**
 * Get All general handler method
 * @param {Instance} Model The model implementing helper handler
 * @param {Object:{optionalFilters: {Object}, modelName: String}} options Passess filter options directly to the find, required modelName
 * @returns Response or error message to the http request
 */
export const getAll = (
  Model,
  options = { optionalFilters: {}, modelName: '' }
) => {
  return catchAsync(async (req, res, next) => {
    // Implement advancedFindFeatures (filters, sort, fields, pagination)
    let findQuery;

    if (options.optionalFilters) {
      findQuery = new FindFeatures(
        Model.find(options.optionalFilters),
        req.query
      );
    } else {
      findQuery = new FindFeatures(Model, req.query);
    }

    const features = findQuery.filterQuery().limitFields().sortBy().paginate();

    // Get all
    let data = await features.query;

    // Get results before returning the no results response
    const results = data ? data.length : 0;

    // If there is no data -> Send a message instead
    if (data.length < 1) {
      data = `There is no ${options.modelName} returned from this request`;
    }

    res.status(200).json({
      status: 'success',
      results,
      data: {
        [options.modelName]: data,
      },
    });
  });
};

/**
 * Get One general handler method
 * @param {Instance} Model The model implementing helper handler
 * @param {Object:{message: {String}, modelName: {String}}} options Passess filter options directly to the find, required modelName
 * @returns Response or error message to the http request
 */
export const getOne = (Model, options = { message: '', modelName: '' }) => {
  return catchAsync(async (req, res, next) => {
    // setup id dynamically
    let id;

    // Get Id -> currentId is set through the middleware - universal for any id holder
    if (req.currentId) {
      id = req.currentId;
    } else {
      id = req.params[`${options.modelName}Id`]; // i.e tourId, userId
    }

    // Find document by the id
    const doc = await Model.findById(id);

    // Return error if there is no doc with the requested ID
    if (!doc)
      return next(
        new AppError(`Could not find requested ${options.modelName}`, 404)
      );

    // Return response
    res.status(200).json({
      status: 'success',
      data: {
        [options.modelName]: doc,
      },
    });
  });
};

/**
 * Create one general handler method
 *
 * @param {Instance} Model The model implementing helper handler
 * @param {Object:{message: {String}, requiredFields: [String], modelName: {String}, fileFieldName:{String}}} options Passess filter options directly to the find, required modelName
 * @returns Response or error message to the http request
 */
export const createOne = (
  Model,
  options = {
    message: '',
    requiredFields: [],
    modelName: '',
    fileFieldName: '',
  }
) => {
  return catchAsync(async (req, res, next) => {
    // check if there is a body filter options
    const { requiredFields, modelName } = options;

    let body;
    // Get doc body
    if (requiredFields) {
      // Filter the body
      body = filterRequiredFields(req.body, requiredFields);
    } else {
      body = req.body;
    }

    // @TODO: suport files upoad
    //if(req.files || req.file) body[options.fileFieldName] = req.file.filename;

    // Save tour to db
    const doc = await Model.create(body);

    // Return success message to requester
    res.status(201).json({
      status: 'success',
      data: {
        [modelName]: doc,
      },
    });
  });
};

/**
 * Update one general handler method
 *
 * @param {Instance} Model The model implementing helper handler
 * @param {Object:{message: {String}, requiredFields: [String], modelName: {String}, fileFieldName:{String}}} options Passess filter options directly to the find, required modelName
 * @returns Response or error message to the http request
 */
export const updateOne = (
  Model,
  options = {
    message: '',
    requiredFields: [],
    modelName: '',
    fileFieldName: '',
  }
) => {
  return catchAsync(async (req, res, next) => {
    // check if there is a body filter options
    const { requiredFields, modelName } = options;

    let body;
    // Get doc body
    if (requiredFields) {
      // Filter the body
      body = filterRequiredFields(req.body, requiredFields);
    } else {
      body = req.body;
    }

    // @TODO: suport files upoad

    // Get Id
    const id = req.params[`${modelName}Id`]; // i.e tourId, userId

    // Update the tour from the supplied body -> return updated tour and runValidators
    const doc = await Model.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    // Validate doc update
    if (!doc)
      return next(
        new AppError(
          `${modelName.charAt(0).toLocaleUpperCase()}${modelName.slice(
            1
          )} update error`,
          404
        )
      );

    // Return success message to requester
    res.status(202).json({
      status: 'success',
      data: {
        [modelName]: doc,
      },
    });
  });
};

/**
 * Delete one general handler method
 *
 * @param {Instance} Model The model implementing helper handler
 * @param {Object:{message: {String}, modelName: {String}}} options Passess filter options directly to the find, required modelName
 * @returns Response or error message to the http request
 */
export const deleteOne = (Model, options = { message: '', modelName: '' }) => {
  return catchAsync(async (req, res, next) => {
    // Get Id
    const id = req.params[`${options.modelName}Id`]; // i.e tourId, userId

    // delete doc by the supplied id
    const doc = await Model.findByIdAndDelete(id);

    if (!doc)
      return next(
        new AppError(
          `Could not delete ${options.modelName} with an id of ${id}`,
          404
        )
      );

    // Return the response
    res.status(204).json({
      status: 'success',
    });
  });
};
