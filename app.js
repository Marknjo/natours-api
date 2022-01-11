// Global Modules
import { env } from 'process';
import fs from 'fs';
import path from 'path';

// 3rd Party Import
import express from 'express';
import morgan from 'morgan';

// Own modules
import rootDir from './utils/rootDir.js';

const app = express();

// Middlewares
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Other Middlewares

// Temp: Handlers
// Tours Controllers
const tours = JSON.parse(
  fs.readFileSync(
    path.join(rootDir, 'dev-data', 'data', 'tours-simple.json'),
    'utf-8'
  )
);

// Get all Tours
const getAllTours = (req, res) => {
  // 1). Get file based data (fs)
  // 2). convert JSON to Object
  // 3). Send 200 and number of data fetched
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

// Get one tour
const getTour = (req, res) => {
  res.send(`A single tour, ID: ${req.params.id}`);
};

// Create Tour
const createTour = (req, res) => {};

// Delete Tours
const deleteTour = (req, res) => {};

// Update Tour
const updateTour = (req, res) => {};

// Users Controllers

// Routers
const toursRouter = express.Router();

toursRouter.route('/').get(getAllTours).post(createTour);
toursRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// Routes
const apiVer = env.API_VERSION || 1;
const apiUrl = `/api/v${apiVer}`;

app.use(`${apiUrl}/tours`, toursRouter);

// Listen to app
const host = env.HOST || '127.0.0.1';
const port = env.PORT || 3000;

app.listen(port, host, () => {
  console.log(`App running on http://${host}:${port}`);
});
