//IMPORTS
// Globals
import process, { env } from 'process';
import https from 'https';
import fs from 'fs';

// 3rd Party
import dotenv from 'dotenv';

// Handler errors
dotenv.config({ path: 'config.env' });

// Locals
import app from './app.js';

// SETUP DB

// SETUP SEVER
// define host and port
const port = env.PORT || 3001;
const host = env.HOST || 'localhost';

let server;

if (env.APP_LOCAL_NR) {
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
  console.log(
    `💥💥💥UNHANDLED REJECTIONS: ${{
      reason,
      promise,
    }}`
  );
  console.log('😭😭😭 Server shutting down...');

  server.close(() => {
    process.exit(1);
  });
});
