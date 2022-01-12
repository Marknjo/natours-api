// Global
import fs from 'fs';
import path from 'path';

// Local Modules import
import rootDir from '../utils/rootDir.js';

// Tours Controllers
const tours = JSON.parse(
  fs.readFileSync(
    path.resolve(rootDir, 'dev-data', 'data', 'tours-simple.json'),
    'utf-8'
  )
);

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
  // 1). Get the parameter
  const tourId = +req.params.id;

  // 2). Validate the tour id
  if (!Number.isFinite(tourId) || !tourId) {
    // 404 cannot fetch the data
    res.status(400).json({
      status: 'fail',
      message: 'Tour id format invalid!',
    });
    return;
  }

  // 3). Fetch the JSON entry || Test the results
  const tourData = tours.find(el => el.id === tourId);

  if (!tourData) {
    res.status(404).json({
      status: 'fail',
      message: 'Cannot fetch tour of the requested id. Please try again!',
    });
    return;
  }

  // 4). Send a response
  res.status(200).json({
    status: 'success',
    data: {
      tour: tourData,
    },
  });
};

// Create Tour
export const createTour = (req, res) => {
  // 1). Get response body
  const { name, price, duration, difficulty, ratingAverage, maxGroupSize } =
    req.body;
  // 2). @TODO; Validate response body: Delegate to Mongoose

  // 3). Save data to file base api
  const lastDataId = tours.at(-1).id;

  const newTour = {
    id: lastDataId + 1,
    ...req.body,
  };

  tours.push(newTour);

  fs.writeFile(
    path.resolve(rootDir, 'dev-data', 'data', 'tours-simple.json'),
    JSON.stringify(tours),
    'utf-8',
    err => {
      // Fail save
      if (err) {
        // throw 400
        res.status(400).json({
          status: 'fail',
          message: 'Could not save the tour. Try again!',
        });
        return;
      }

      // 4). Success: Return saved data
      res.status(202).json({
        status: 'success',
        message: 'Tour added to the database successfully.',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// Delete Tours
export const deleteTour = (req, res) => {
  // 1). Get the parameter
  const tourId = +req.params.id;

  // 2). Validate the tour id
  if (!Number.isFinite(tourId) || !tourId) {
    // 404 cannot fetch the data
    res.status(400).json({
      status: 'fail',
      message: 'Tour id format invalid!',
    });
    return;
  }

  // 3). Fetch the JSON entry || Test the results
  const tourData = tours.find(el => el.id === tourId);

  if (!tourData) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid tour id. Please try again with a valid tour id!',
    });
    return;
  }

  // 4). Delete the tour
  const remainingTours = tours.filter(el => el.id !== tourId);

  fs.writeFile(
    path.resolve(rootDir, 'dev-data', 'data', 'tours-simple.json'),
    JSON.stringify(remainingTours),
    'utf-8',
    err => {
      // Fail save
      if (err) {
        // throw 400
        res.status(400).json({
          status: 'fail',
          message: 'Delete error happend!',
        });
        return;
      }

      // 5). Success: Return saved data
      res.status(202).json({
        status: 'success',
        message: 'Tour deleted from the database successfully.',
      });
    }
  );
};

// Update Tour
export const updateTour = (req, res) => {
  // 1). Get the parameter
  const tourId = +req.params.id;

  // 2). Validate the tour id
  if (!Number.isFinite(tourId) || !tourId) {
    // 404 cannot fetch the data
    res.status(400).json({
      status: 'fail',
      message: 'Tour id format invalid!',
    });
    return;
  }

  // 3). Fetch the JSON entry || Test the results
  const tourData = tours.find(el => el.id === tourId);

  // Validate
  if (!tourData) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid tour id. Please try again with a valid tour id!',
    });
    return;
  }

  // 5). Update the tour
  const updatedTour = {
    ...tourData,
    ...req.body,
  };

  const updatedTours = tours.map(el => {
    let updateTour = {};
    if (el.id === tourId) {
      // update the
      updateTour = {
        ...el,
        ...req.body, // @TODO: validate body
      };
    }

    return {
      ...el,
      ...updateTour,
    };
  });

  // 6). Save data to file && Success message with the updated data
  fs.writeFile(
    path.resolve(rootDir, 'dev-data', 'data', 'tours-simple.json'),
    JSON.stringify(updatedTours),
    'utf-8',
    err => {
      // Fail save
      if (err) {
        // throw 400
        res.status(400).json({
          status: 'fail',
          message: 'Update error!',
        });
        return;
      }

      // Success: Return saved data
      res.status(202).json({
        status: 'success',
        message: 'Tour updated successfully.',
        data: {
          tour: updatedTour,
        },
      });
    }
  );
};
