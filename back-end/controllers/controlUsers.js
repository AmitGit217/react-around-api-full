const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/userModel');
const {
  CREATE,
  USER_NOT_FOUND_MESSAGE,
  INVALID_DATA_MESSAGE,
  DATA_EXIST,
} = require('../lib/consts');
const NotFound = require('../errors/NotFound');
const ValidationError = require('../errors/Validation');
const Unauthorize = require('../errors/Unauthorize');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { _id } = req.params;
  User.findById(_id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFound(USER_NOT_FOUND_MESSAGE);
      } else if (err.name === 'CastError') {
        throw new ValidationError(INVALID_DATA_MESSAGE);
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        ...req.body,
        password: hash,
      })
        .then((user) => res.status(CREATE).send(user))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new ValidationError(INVALID_DATA_MESSAGE);
          } else {
            return res.status(409).send({ message: DATA_EXIST });
          }
        })
    )
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { name: req.body.name, about: req.body.about },
    { runValidators: true, new: true }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFound(USER_NOT_FOUND_MESSAGE);
      } else if (err.name === 'CastError') {
        throw new ValidationError(INVALID_DATA_MESSAGE);
      } else if (err.name === 'ValidationError') {
        throw new ValidationError(err.message);
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { avatar: req.body.avatar },
    { runValidators: true, new: true }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFound(USER_NOT_FOUND_MESSAGE);
      } else if (err.name === 'CastError') {
        throw new ValidationError(INVALID_DATA_MESSAGE);
      } else if (err.name === 'ValidationError') {
        throw new ValidationError(err.message);
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { password, email } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
      );
      res.send({ token, user });
    })
    .catch((err) => {
      throw new Unauthorize(err.message);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFound(USER_NOT_FOUND_MESSAGE);
      } else if (err.name === 'CastError') {
        throw new ValidationError(INVALID_DATA_MESSAGE);
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
};
