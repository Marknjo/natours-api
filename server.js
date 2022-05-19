//IMPORTS
// Globals
import process, { env } from 'process';
import https from 'https';
import fs from 'fs';

// 3rd Party
import mongoose from 'mongoose';

// Handler errors: uncaughtException
process.on('uncaughtException', err => {
  console.log(`💥💥💥 UNCAUGHT EXCEPTION: ${err.name} - ${err.message}`);
  console.log(`🗺: ${err.stack}`);
  console.log('😭😭😭 Server shutting down...');

  process.exit(1);
});

// Locals
import './configs/dotenvConfig.js';
import app from './app.js';

// SETUP DB
try {
  let dbConnection;

  if (env.DB_IS_ONLINE === 'true') {
    // Make online mongodb connection string
    const pass = env.DB_MONGO_PASS;
    const coll = env.DB_MONGO_COLLECTION;
    dbConnection = env.DB_MONGO_ONLINE.replace('<PASSWORD>', pass).replace(
      '<COLLECTION>',
      coll
    );
  } else {
    // Make local mongodb connection string
    dbConnection = env.DB_MONGO_LOCAL;
  }

  // Connect to db @TODO: Remove
  console.log(dbConnection);

  // Return success message
  mongoose.connect(dbConnection);

  console.log('🙌🙌🙌 Connection to MongoDb successful...');
} catch (error) {
  console.error(`💥💥💥 ${error.name} ${error.message}`);
  console.log(error.stack);
}

// SETUP SEVER
// define host and port
const port = env.PORT || 3001;
const host = env.HOST || 'localhost';

let server;

if (env.APP_LOCAL === 'true') {
  // get local server development with https
  const key = fs.readFileSync('./natours.key', 'utf-8');
  const cert = fs.readFileSync('./natours.cert', 'utf-8');
  server = https.createServer({ key, cert }, app).listen(port, host, () => {
    console.log(
      `😊😊😊 App running on local development environment on https://${host}:${port}`
    );
  });
} else {
  // server setup for app running online i.e. Heroku
  server = app.listen(port, () => {
    console.log(`😊😊😊 App running on port ${port}`);
  });
}

// HANDLE ERRORS
// Server async errors
process.on('unhandledRejection', (reason, promise) => {
  console.log(`💥💥💥UNHANDLED REJECTIONS: ${reason} -> ${promise}`);
  console.log('😭😭😭 Server shutting down...');

  server.close(() => {
    process.exit(1);
  });
});
