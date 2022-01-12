// Global Modules
import { env } from 'process';

// 3rd Party Import
import express from 'express';
import morgan from 'morgan';

// Local modules
import tourRoutes from './routes/toursRouter.js';

const app = express();

// Middlewares
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Other Middlewares
app.use(express.json());

// Routes
const apiVer = env.API_VERSION || 1;
const apiUrl = `/api/v${apiVer}`;

app.use(`${apiUrl}/tours`, tourRoutes);

// Listen to app
const host = env.HOST || '127.0.0.1';
const port = env.PORT || 3000;

app.listen(port, host, () => {
  console.log(`App running on http://${host}:${port}`);
});
