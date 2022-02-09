// GLOBAL IMPORTS
import process, { env, exit } from 'process';
import https from 'https';
import fs from 'fs';

// 3rd party Modules
import mongoose from 'mongoose';

import './configs/dotenvConfig.js';

// HANDLE uncaught exception ERROR
process.on('uncaughtException', err => {
  console.log(`UNCAUGHT EXCEPTION ERROR 💥💥💥: ${err.message}`);
  console.error(err.stack);
  console.log('\nServer shutting down...');
  exit(1);
});

// IMPORT APP
import app from './app.js';

// SETUP MONGO DATABASE SERVER
try {
  await mongoose.connect(env.DB_LOCAL, {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  });
  console.log('😊😊😊 MongoDB connected...');
} catch (error) {
  console.error(`💥💥💥 ${error.message}`);
  console.log(error.stack);
}

// START SERVER
const port = env.PORT || 8000;
const host = env.HOST || '127.0.0.1';

const server = https
  .createServer(
    {
      key: fs.readFileSync('natours.key'),
      cert: fs.readFileSync('natours.cert'),
    },
    app
  )
  .listen(port, host, () => {
    console.log(`App running on https://${host}:${port}`);
  });

// const server = app.listen(port, host, () => {
//   console.log(`App running on https://${host}:${port}`);
// });

// HANDLE ERRORS
process.on('unhandledRejection', err => {
  console.log(`UNHANDLES REJECTION 💥💥💥: ${err.message}`);
  console.error(err.stack);
  console.log('\nServer shutting down...');

  // Gracefully shutdown server
  server.close(() => {
    exit(1);
  });
});
