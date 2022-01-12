// GLOBAL IMPORTS
import { env } from 'process';
import fs from 'fs';
import path from 'path';

// 3rd PARTY IMPORTS
import mongoose from 'mongoose';

// LOCAL IMPORTS
import '../../configs/configEnv.js';
import rootDir from '../../configs/rootDir.js';
import Tour from '../../models/tourModel.js';

// DATABASE SETUP
try {
  mongoose.connect(env.DB_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('DB connected successfully 😃😃😃...');
} catch (error) {
  console.error(`DB CONNECTION ERROR: 💥💥💥 \n${error.stack}`);
}

// Import tours simple data
const tours = JSON.parse(
  fs.readFileSync(
    path.resolve(rootDir, 'dev-data', 'data', 'tours-simple.json')
  )
);

// import
const importData = async (collection = '') => {
  try {
    await Tour.create(tours);

    console.log(`Tours Data loaded 😊😊😊`);
  } catch (error) {
    console.log(error.message);
    console.error(error.stack);
  }
  process.exit(1);
};

// delete
const deleteData = async (collection = '') => {
  try {
    await Tour.deleteMany();
    console.log(`Tours collection wiped successfully 😊😊😊`);
  } catch (error) {
    console.log(error.message);
    console.error(error.stack);
  }
  process.exit(1);
};

// use arg variables to determine what to load
const collectionName = process.argv.at(-1).split('-').at(-1);
const actionType = process.argv.at(-2).split('-').at(-1);

if (actionType === 'import') {
  importData();
} else if (actionType === 'delete') {
  deleteData();
}
