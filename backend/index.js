/* eslint-disable no-undef */
const express = require('express');
require('dotenv').config();
const app = express();
// Use numeric PORT from env or fallback to 3000
const portEnv = process.env.SERVER_PORT;
const port = portEnv ? parseInt(portEnv, 10) : 3000;

if (!portEnv) {
  // Helpful info for local development when env var is missing
  // Avoid throwing here so dev server can still run with a sensible default
  // but log a clear warning for maintainers.
  // eslint-disable-next-line no-console
  console.warn('Warning: SERVER_PORT not set in environment; using default port 3000');
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is Running!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});