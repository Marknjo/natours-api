// Global

// Local Modules import
import Tour from '../models/tourModel.js';

// 01. CONTROLLERS
// Get all Tours
export const getAllTours = async (req, res) => {
  try {
    // Advanced APIFeatures
    // 1). Filtering
    // 1a). Simple Filtering
    const queryObj = req.query;
    const queryObjCopy = { ...queryObj };
    // Exclude files ['fields', 'sort', 'page', 'limit']
    const excludedFields = ['fields', 'sort', 'page', 'limit'];
    excludedFields.forEach(el => delete queryObjCopy[el]);

    // 1b). Advanced Filtering:
    const queryObjStr = JSON.parse(
      JSON.stringify(queryObjCopy).replace(
        /\b(gt|gte|lt|lte)\b/,
        match => `$${match}`
      )
    );

    console.log(queryObjStr);

    let query = Tour.find(queryObjStr);

    const findAndReplaceCommaWithSpaces = str => str.split(',').join(' ');

    // 2). Fields
    const fields = queryObj.fields;
    if (fields) {
      // Replace comma with spaces
      const fieldsStr = findAndReplaceCommaWithSpaces(fields);
      query = query.select(fieldsStr);
    } else {
      query = query.select('-__v');
    }

    // 3). Sorting
    const sortQuery = queryObj.sort;
    if (sortQuery) {
      // Replace comma with spaces
      // const sortStr = findAndReplaceCommaWithSpaces(sortQuery);
      const sortStr = sortQuery.split(',').join(' ');
      query = query.sort(sortStr);
    } else {
      query = query.sort('-createdAt');
    }

    // 4). Pagination
    const page = +queryObj.page || 1;
    const limit = +queryObj.limit || 100;
    const skip = (page - 1) * limit;
    console.log(`Skip: ${skip}`);
    console.log(`Page: ${page}`);
    // query pagination
    query = query.skip(skip).limit(limit);

    // EXECUTE
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
      error,
    });
  }
};

// Get one tour
export const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    // 4). Send a response
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
      error,
    });
  }
};

// Create Tour
export const createTour = async (req, res) => {
  try {
    // 1). Get body @TODO: Validate
    // 2). Save to the database
    const tour = await Tour.create(req.body);

    // 3). Success saved data
    res.status(200).json({
      status: 'success',
      message: 'Tour added to the database successfully.',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
      error,
    });
  }
};

// Delete Tours
export const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      message: 'Tour deleted from the database successfully.',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
      error,
    });
  }
};

// Update Tour
export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'Tour updated successfully.',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
      error,
    });
  }
};
