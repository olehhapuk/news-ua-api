const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const errorHandler = require('./middlewares/errorHandler');
const apiRouter = require('./routes/api.router');

const app = express();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

app.use('/api', apiRouter);

app.use(errorHandler);

module.exports = app;
