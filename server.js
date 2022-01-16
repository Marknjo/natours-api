// GLOBAL IMPORTS
import process, { env, exit } from 'process';

// 3rd party Modules
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

// START SERVER
const port = env.PORT || 8000;
const host = env.HOST || '127.0.0.1';
const server = app.listen(port, host, () => {
  console.log(`App running on http://${host}:${port}`);
});

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
