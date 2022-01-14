// Global

// Local Modules import
import Tour from '../models/tourModel.js';
import APIFeatures from '../utils/apiFeatures.js';

// MIDDLEWARES
export const aliasTopCheap = (req, res, next) => {
  const queryObj = {
    sort: 'price,-ratingsAverage',
    limit: 5,
    fields: 'name,price,ratingsAverage,difficulty,duration',
  };

  req.query = queryObj;

  next();
};

// 01. CONTROLLERS
// Get all Tours
export const getAllTours = async (req, res) => {
  try {
    // API Features for filtering, sorting, and paginating data
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .fieldsLimit()
      .sort()
      .paginate();

    // EXECUTE
    const tours = await features.query;

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
