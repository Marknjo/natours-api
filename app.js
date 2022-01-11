import express from 'express';

const app = express();

// Routes
app.get('/', (req, res) => {
  res.send('Express app running!');
});

// Listen to app
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log(`App running on http://${host}:${port}`);
});
