// GLOBAL IMPORTS
import { env } from 'process';

// 3rd PARTY IMPORTS
import mongoose from 'mongoose';

// LOCAL IMPORTS
import './configs/configEnv.js';
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

app.listen(port, host, () => {
  console.log(`App running on http://${host}:${port}`);
});

// HANDLE SERVER ERRORS
