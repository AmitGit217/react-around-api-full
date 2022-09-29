const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
require('dotenv').config();
const { celebrate, Joi } = require('celebrate');

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

const { login, createUser } = require('./controllers/controlUsers');

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.use(helmet());
app.use(limiter);

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Server will crash now');
//   }, 0);
// }); // PM2 server crush test

app.post('/signin', login);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);

app.use(router);
app.use('*', nonExistRoute);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
