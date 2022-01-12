// Global
import fs from 'fs';
import path from 'path';

// Local Modules import
import rootDir from '../configs/rootDir.js';
import Tour from '../models/tourModel.js';
import { tours } from '../utils/fetchTours.js';

// 01. CONTROLLERS
// Get all Tours
export const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

// Get one tour
export const getTour = (req, res) => {
  // 4). Send a response
  res.status(200).json({
    status: 'success',
    data: {
      tour: req.tourData,
    },
  });
};

// Create Tour
export const createTour = async (req, res) => {
  try {
    // 1). Get body @TODO: Validate
    // 2). Save to the database
    const tour = await Tour.create(req.body);

    // 3). Success saved data
    res.status(202).json({
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
export const deleteTour = (req, res) => {
  res.status(202).json({
    status: 'success',
    message: 'Tour deleted from the database successfully.',
  });
};

// Update Tour
export const updateTour = (req, res) => {
  const updatedTour = {
    ...req.tourData,
    ...req.body,
  };

  res.status(202).json({
    status: 'success',
    message: 'Tour updated successfully.',
    data: {
      tour: updatedTour,
    },
  });
};
