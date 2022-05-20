//IMPORTS
// Globals
import { env } from 'process';

// 3rd Party
import mongoose from 'mongoose';

// SETUP DB
try {
  console.log('> Connecting to mongodb server...');

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

  // Return success message
  mongoose.connect(dbConnection, {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  });

  console.log('🙌🙌🙌 Connection to MongoDb successful...');
} catch (error) {
  console.error(`💥💥💥 ${error.name} ${error.message}`);
  console.log(error.stack);
}
