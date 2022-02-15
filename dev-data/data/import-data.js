// GLOBAL IMPORTS
import process, { env, exit } from 'process';
import fs from 'fs';
import path from 'path';

// 3rd party Modules
import mongoose from 'mongoose';

import '../../configs/dotenvConfig.js';
import rootDir from '../../utils/rootDir.js';
import Tour from '../../models/toursModel.js';
import Review from '../../models/reviewsModel.js';
import User from '../../models/usersModel.js';

// HANDLE uncaught exception ERROR
process.on('uncaughtException', err => {
  console.log(`UNCAUGHT EXCEPTION ERROR 💥💥💥: ${err.message}`);
  console.error(err.stack);
  console.log('\nServer shutting down...');
  exit(1);
});

// SETUP MONGO DATABASE SERVER
try {
  let mongoDbConnection = env.DB_MONGO_LOCAL;

  if (env.DB_IS_ONLINE) {
    mongoDbConnection = env.DB_MONGO_ONLINE.replace(
      /<PASSWORD>/,
      env.DB_MONGO_PASS
    ).replace(/<COLLECTION>/, env.DB_MONGO_COLLECTION);
  }

  await mongoose.connect(mongoDbConnection);
  console.log('😊😊😊 MongoDB connected...');
} catch (error) {
  console.error(`💥💥💥 ${error.message}`);
  console.log(error.stack);
}

// import file helper
const dataFile = fileName =>
  path.resolve(rootDir, 'dev-data', 'data', fileName);

// IMPORT DEV DATA
const tours = JSON.parse(fs.readFileSync(dataFile('tours.json'), 'utf-8'));
const users = JSON.parse(fs.readFileSync(dataFile('users.json'), 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(dataFile('reviews.json'), 'utf-8'));

// IMPORT DATA HANDLER
const importData = async collectionName => {
  try {
    switch (collectionName) {
      case 'tours':
        await Tour.create(tours);
        console.log('😊😊😊 Tours data imported to MongoDB Successfully...');
        break;

      case 'users':
        await User.create(users, { validateBeforeSave: false });
        console.log('😊😊😊 Users data imported to MongoDB Successfully...');
        break;

      case 'reviews':
        await Review.create(reviews);
        console.log('😊😊😊 Reviews data imported to MongoDB Successfully...');
        break;

      case 'all':
        await Tour.create(tours);
        await User.create(users, { validateBeforeSave: false });
        await Review.create(reviews);
        console.log('😊😊😊 All data imported to MongoDB Successfully...');
        break;

      default:
        throw new Error('Cannot recognize passed argument.');
    }
  } catch (error) {
    console.log(`ERROR 💥💥💥! ${error.message}`);
    console.error(error.stack);
  }

  exit(1);
};

// WIPE DATA HANDLER
const wipeDBData = async collectionName => {
  try {
    switch (collectionName) {
      case 'tours':
        await Tour.deleteMany();
        console.log('😊😊😊 Tours data wiped from MongoDB Successfully...');
        break;

      case 'users':
        await User.deleteMany();
        console.log('😊😊😊 Users data wiped from MongoDB Successfully...');
        break;

      case 'reviews':
        await Review.deleteMany();
        console.log('😊😊😊 Reviews data wiped from MongoDB Successfully...');
        break;

      case 'all':
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        console.log('😊😊😊 All data wiped from MongoDB Successfully...');
        break;

      default:
        throw new Error('Cannot recognize passed argument.');
    }
  } catch (error) {
    console.log(`ERROR 💥💥💥! ${error.message}`);
    console.error(error.stack);
  }

  exit(1);
};

// MANAGE PROCESS ARGUMENTS
// node dev-data/data/import-data.js --import --users
// Stop executing the command if the arguments are more than 4
const importCommandArgs = process.argv;
if (importCommandArgs.length > 4) {
  console.error(
    `ERROR: Arguments passed to the import/wipe data command too many 💥💥💥`
  );
  process.exit(1);
}

// Prep arguments
const cmdType = importCommandArgs.at(-2).split('-').at(-1); // gets command type
const collectionName = importCommandArgs.at(-1).split('-').at(-1); // gets the data to import

// Determine arguments passed
// Import Data
if (cmdType === 'import') {
  importData(collectionName);
}

// Wipe data command
if (cmdType === 'wipe') {
  wipeDBData(collectionName);
}
