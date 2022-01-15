// GLOBAL IMPORTS
import process, { env, exit } from 'process';

// 3rd PARTY IMPORTS
import mongoose from 'mongoose';

// LOCAL IMPORTS
import './configs/configEnv.js';

// Import
import app from './app.js';

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

// LISTEN TO SERVER
const host = env.HOST || 'localhost';
const port = env.PORT || 8000;

const server = app.listen(port, host, () => {
  console.log(`App running on http://${host}:${port}`);
});

// HANDLE SERVER ERRORS
process.on('unhandledRejection', err => {
  console.log(`UNHANDLED REJECTION 💥💥💥: ${err.message}`);
  console.log(err.stack);
  console.log('Shutting down server...');

  server.close(() => {
    exit(1);
  });
});
