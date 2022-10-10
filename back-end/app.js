const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
require('dotenv').config();

const bodyParser = require('body-parser');
const helmet = require('helmet');
const limiter = require('./helpers/limit');

const { PORT = 3000 } = process.env;

const { MONGO_DB, MONGO_DB_TEST } = require('./lib/consts');

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGO_DB);
} else {
  mongoose.connect(MONGO_DB_TEST);
}

const router = require('./routes/index');
const nonExistRoute = require('./routes/nonExistRoute');
const errorHandler = require('./helpers/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { login, createUser } = require('./controllers/controlUsers');
const { celebrateUser } = require('./helpers/celebrate');
const auth = require('./middlewares/auth');

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(limiter);

app.post('/signin', login);
app.post('/signup', celebrateUser, createUser);

app.use(auth);
app.use(router);
app.use('*', nonExistRoute);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

module.exports = app;
