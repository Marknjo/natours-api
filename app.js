// GLOBAL IMPORTS
import { env } from 'process';

// 3RD PARTY IMPORTS
import express from 'express';

// LOCAL IMPORT

// INIT EXPRESS APP
const app = express();

// LOGGER
// MIDDLEWARES
// ROUTES
// 404
// GLOBAL ERROR HANDLING

console.log(env.API_VERSION);

// EXPORT EXPRESS APP
export default app;
