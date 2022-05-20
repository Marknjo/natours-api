//IMPORTS
// Globals
import process, { env } from 'process';
import https from 'https';
import fs from 'fs';

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
import './configs/mongodb.config.js';

// SETUP SEVER
// define host and port
const port = env.PORT || 3001;
const host = env.HOST || 'localhost';

let server;

if (env.APP_LOCAL === 'true') {
  // get local server development with https
  const key = fs.readFileSync('./ssl/natours.key', 'utf-8');
  const cert = fs.readFileSync('./ssl/natours.cert', 'utf-8');
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

// Handling Sigterm errors from heroku
process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED: Shutting down gracefully');
  server.close(() => {
    console.log('😢😢😢 Process terminates');
  });
});
