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
    // Get Id
    const id = req[`${options.modelName}Id`]; // i.e tourId, userId

    // Find document by the id
    const doc = await Model.findById(id);

    // Return error if there is no doc with the requested ID
    if (!doc)
      return next(
        new AppError(`Could not find ${options.modelName} requested tour`, 404)
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
 */

/**
 * Update one general handler method
 */

/**
 * Delete one general handler method
 */
