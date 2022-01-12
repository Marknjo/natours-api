// Global
import fs from 'fs';
import path from 'path';

// Local Modules import
import rootDir from '../utils/rootDir.js';

// Middleware
// Checkout routes with id
export const tourWithIdValidations = (req, res, next) => {
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
      message: 'Cannot find requested tour.',
    });
    return;
  }

  // put data to the req
  req.tourId = tourId;
  req.tourData = tourData;

  next();
};

// update Data before save
export const beforeUpdate = (req, res, next) => {
  // Process data
  // 5). Update the tour
  const updatedTours = tours.map(el => {
    let updateTour = {};
    if (el.id === req.tourId) {
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

  // Prep pass to the validate and save data middleware
  req.saveData = updatedTours;
  req.failSaveMessage = 'Update error!';
  // next
  next();
};

// filter data before delete
export const beforeDelete = (req, res, next) => {
  const remainingTours = tours.filter(el => el.id !== req.tourId);

  // Prep pass to the validate and save data middleware
  req.saveData = remainingTours;
  req.failSaveMessage = 'Tour delete error!';
  // next
  next();
};

// filter data before create new tour
export const beforeCreate = (req, res, next) => {
  const lastDataId = tours.at(-1).id;

  const newTour = {
    id: lastDataId + 1,
    ...req.body,
  };

  const allTours = [...tours, newTour];

  // Prep pass to the validate and save data middleware
  req.saveData = allTours;
  req.failSaveMessage = 'Tour save error!';
  req.newTour = newTour;
  // next
  next();
};

// Write and Save Data middleware
export const validateAndSaveData = (req, res, next) => {
  fs.writeFile(
    path.resolve(rootDir, 'dev-data', 'data', 'tours-simple.json'),
    JSON.stringify(req.saveData),
    'utf-8',
    err => {
      // Fail save
      if (err) {
        // throw 400
        res.status(500).json({
          status: 'error',
          message: req.failSaveMessage || 'Process failed!',
        });
        return;
      }
    }
  );

  // next middleware
  next();
};

// Validate submitted data
export const validateCreateTourFields = (req, res, next) => {
  const { name, price, duration, maxGroupSize } = req.body;

  req.body = {
    name,
    price,
    duration,
    maxGroupSize,
    ...(req.body.difficulty || { difficulty: 'easy' }),
    ...(req.body.ratingAverage || { ratingAverage: 4.5 }),
  };

  // Required fields
  if ((!name && !duration, !price, !maxGroupSize)) {
    res.status(400).json({
      status: 'fail',
      message:
        'Validation error! A tour must have a name, duration, price and max group size.',
    });

    return;
  }

  // Price validation
  const priceValue = +price;
  if (!Number.isFinite(priceValue)) {
    res.status(400).json({
      status: 'fail',
      message: 'Validation error! Submitted price format not supported.',
    });

    return;
  }

  if (req.body.id) {
    res.status(400).json({
      status: 'fail',
      message: 'Validation error! one of the fied not supported.',
    });

    return;
  }

  next();
};

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
  //   // 1). Get response body
  //   const { name, price, duration, difficulty, ratingAverage, maxGroupSize } =
  //     req.body;
  //   // 2). @TODO; Validate response body: Delegate to Mongoose

  //   // 3). Save data to file base api
  //   const lastDataId = tours.at(-1).id;

  //   const newTour = {
  //     id: lastDataId + 1,
  //     ...req.body,
  //   };

  //   tours.push(newTour);

  //   fs.writeFile(
  //     path.resolve(rootDir, 'dev-data', 'data', 'tours-simple.json'),
  //     JSON.stringify(tours),
  //     'utf-8',
  //     err => {
  //       // Fail save
  //       if (err) {
  //         // throw 400
  //         res.status(400).json({
  //           status: 'fail',
  //           message: 'Could not save the tour. Try again!',
  //         });
  //         return;
  //       }

  //       // 4). Success: Return saved data
  //       res.status(202).json({
  //         status: 'success',
  //         message: 'Tour added to the database successfully.',
  //         data: {
  //           tour: newTour,
  //         },
  //       });
  //     }
  //   );

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
