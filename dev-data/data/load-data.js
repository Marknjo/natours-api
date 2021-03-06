// IMPORT MODULES
// Global Modules
import process from 'process';
import fs from 'fs';
import path from 'path';

// Local modules
import '../../configs/dotenv.config.js';
import rootDir from '../../utils/rootDir.js';
import Tour from '../../models/tourModel.js';
import User from '../../models/userModel.js';
import Review from '../../models/reviewModel.js';

// INIT MONGO DB
import '../../configs/mongodb.config.js';

// LOAD JSON FILES
// Load tours data
const tours = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'dev-data', 'data', 'tours.json'), 'utf-8')
);

// load users data
const users = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'dev-data', 'data', 'users.json'), 'utf-8')
);

// load reviews data

const reviews = JSON.parse(
  fs.readFileSync(
    path.join(rootDir, 'dev-data', 'data', 'reviews.json'),
    'utf-8'
  )
);

// IMPORT DATA TO DB HELPER FUNCTION
const importCollection = async collection => {
  try {
    switch (collection) {
      case 'tours':
        console.log(`Importing ${collection} data... \n`);
        await Tour.create(tours, { validateBeforeSave: false });
        console.log(
          '🤪🤪🤪 Tour data imported to tour collections successfully..\n'
        );
        break;

      case 'reviews':
        console.log(`Importing ${collection} data...\n`);
        await Review.create(reviews);
        console.log(
          '🤪🤪🤪 Reviews data imported to tour collections successfully..\n'
        );
        break;

      case 'users':
        console.log(`Importing ${collection} data...\n`);
        await User.create(users, { validateBeforeSave: false });
        console.log(
          '🤪🤪🤪 Users data imported to tour collections successfully. \n'
        );
        break;

      // collection === all
      default:
        console.log(`Importing ${collection} collections data... \n`);
        await Tour.create(tours);

        await User.create(users, { validateBeforeSave: false });

        await Review.create(reviews);

        console.log('🤪🤪🤪 Tours/Users/Reviews data imported successfully.\n');
        break;
    }
  } catch (error) {
    console.log(
      `💥💥💥 Error during import: ${error.message} \n ${error.stack}\n`
    );
  }
};

// WIPE DATA FROM DB COLLECTION
const wipeCollection = async collection => {
  try {
    switch (collection) {
      case 'tours':
        console.log(`Deleting ${collection} data...\n`);
        await Tour.deleteMany();
        console.log('🚮🚮🚮 Tour data wiped successfully.\n');
        break;

      case 'reviews':
        console.log(`Deleting ${collection} data...\n`);
        await Review.deleteMany();
        console.log('🚮🚮🚮  Reviews data wiped successfully.\n');
        break;

      case 'users':
        console.log(`Deleting ${collection} data...\n`);
        await User.deleteMany();
        console.log('🚮🚮🚮 Users data wiped successfully.\n');
        break;

      // collection === all
      default:
        console.log(`Wiping ${collection} collections data...\n`);
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();

        console.log('🚮🚮🚮 Tours/Users/Reviews data wiped successfully.\n');
        break;
    }
  } catch (error) {
    console.log(`💥💥💥 Error Deleting: ${error.message} \n ${error.stack}\n`);
  }
};

// GET CMD FLAGS/ARGS
// --import-users --import-all --import-reviews --import-tours
// --wipe-users --wipe-all --wipe-reviews --wipe-tours

// Import CMD Argumanets/Scripts
// import: node :dev-data/data/load-data.js --import-all
// import:users :node dev-data/data/load-data.js --import-users
// import:reviews :node dev-data/data/load-data.js --import-reviews
// import:tours :node dev-data/data/load-data.js --import-tours

// Wipe CMD Argumanets/Scripts
// wipe: node dev-data/data/load-data.js --wipe-tours
// wipe:users :node dev-data/data/load-data.js --wipe-users
// wipe:reviews :node dev-data/data/load-data.js --wipe-reviews
// wipe:all :node dev-data/data/load-data.js --wipe-all

const argResponse = process.argv.at(-1).split('-');
const actionType = argResponse.at(2);
const collection = argResponse.at(-1);

const loadData = async (action, clct) => {
  try {
    // Set CMD Allowed Data Types
    const allowedCollections = ['users', 'tours', 'reviews', 'all'];
    const allowedActionTypes = ['import', 'wipe'];

    // Validate before loading data
    if (!allowedActionTypes.includes(action)) {
      throw new Error(
        `${action} is an invalid action type, expects (import or wipe)!`
      );
    }

    if (!allowedCollections.includes(clct)) {
      throw new Error(`${clct} is an invalid collection!`);
    }

    // Check Action type
    if (action === 'import') {
      await importCollection(clct);
      return;
    }

    // Delete data
    if (action === 'wipe') {
      await wipeCollection(clct);
      return;
    }
  } catch (error) {
    console.log(`💥💥💥 ERROR: ${error.message} \n ${error.stack} \n`);
  } finally {
    console.log('⚙⚙⚙ Shutting down nodejs...');
    process.exit(1);
  }
};

loadData(actionType, collection);
