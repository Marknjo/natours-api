// Global
import fs from 'fs';
import path from 'path';

// Local Modules import
import rootDir from '../utils/rootDir.js';
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
export const createTour = (req, res) => {
  res.status(202).json({
    status: 'success',
    message: 'Tour added to the database successfully.',
    data: {
      tour: req.newTour,
    },
  });
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
