const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
require('dotenv').config();

const bodyParser = require('body-parser');
const helmet = require('helmet');
const limiter = require('./helpers/limit');

const { PORT = 3000 } = process.env;

const { MONGO_DB } = require('./lib/consts');

mongoose.connect(MONGO_DB);

const router = require('./routes/index');
const nonExistRoute = require('./routes/nonExistRoute');
const errorHandler = require('./helpers/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.options('*', cors());
app.use(requestLogger);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet());
app.use(limiter);
app.use(router);
app.use('*', nonExistRoute);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
