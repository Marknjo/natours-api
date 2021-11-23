// IMPORT MODULES
import process from 'process';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// SETUP DOTENV
dotenv.config({ path: './config.env' });

// IMPORT 3rd PARTY MODULES
import app from './app.js';
import terminate from './utils/terminate.js';

// CAPTURE UNCAUGHT EXCEPTIONS
process.on('uncaughtException', err => {
  console.log(`💥💥💥 UNCAUGHT EXCEPTION, ${err.message} `);
  console.log(err.stack);
});

// START MONGO DB
try {
  await mongoose.connect(process.env.DB_HOST_LOCAL);
  console.log('😃😃 DB connected successfully...');
} catch (error) {
  console.error(`💥💥💥 DB Error. ${error.message}`);
}

// START SERVER
const port = process.env.PORT || 0;
const host = process.env.HOST || 'localhost';
const server = app.listen(port, host, () => {
  console.log(`App running on http://${host}:${port} 😀😀😀`);
});

// HANDLE ERRORS
// Server errors
server.on('error', err => {
  console.log(`💥💥💥 SERVER ERROR: SHUTTING DOWN WITH ERROR - ${err.message}`);
  console.log(err.stack);

  server.close(() => {
    process.exit(1);
  });
});

// Other errors (unhandledRejections, SIGINT, SIGTERM)
const exitHandler = terminate(server);

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));
