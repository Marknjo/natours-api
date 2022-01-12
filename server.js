// GLOBAL IMPORTS
import { env } from 'process';

// 3rd PARTY IMPORTS

// LOCAL IMPORTS
import './configs/configEnv.js';
import app from './app.js';

// DATABASE SETUP

// LISTEN TO SERVER
const host = env.HOST || 'localhost';
const port = env.PORT || 8000;

app.listen(port, host, () => {
  console.log(`App running on http://${host}:${port}`);
});

// HANDLE SERVER ERRORS
