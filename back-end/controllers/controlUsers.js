const User = require('../models/userModel');
const {
  NOT_FOUND,
  INVALID_DATA,
  DEFAULT_ERROR,
  CREATE,
  USER_NOT_FOUND_MESSAGE,
  INVALID_DATA_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
} = require('../lib/consts');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(DEFAULT_ERROR).send(err));
};

const getUserById = (req, res) => {
  const { _id } = req.params;
  User.findById(_id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ Error: USER_NOT_FOUND_MESSAGE });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ Error: INVALID_DATA_MESSAGE });
      } else {
        res.status(DEFAULT_ERROR).send({ Error: DEFAULT_ERROR_MESSAGE });
      }
    });
};

const postUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(CREATE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA).send({ Error: err.message });
      } else {
        res.status(DEFAULT_ERROR).send({ Error: DEFAULT_ERROR_MESSAGE });
      }
    });
};

const updateUser = (req, res) => {
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
        res.status(NOT_FOUND).send({ Error: USER_NOT_FOUND_MESSAGE });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ Error: INVALID_DATA_MESSAGE });
      } else if (err.name === 'ValidationError') {
        res.status(INVALID_DATA).send({ Error: err.message });
      } else {
        res.status(DEFAULT_ERROR).send({ Error: DEFAULT_ERROR_MESSAGE });
      }
    });
};

const updateAvatar = (req, res) => {
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
        res.status(NOT_FOUND).send({ Error: USER_NOT_FOUND_MESSAGE });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ Error: INVALID_DATA_MESSAGE });
      } else if (err.name === 'ValidationError') {
        res.status(INVALID_DATA).send({ Error: err.message });
      } else {
        res.status(DEFAULT_ERROR).send({ Error: DEFAULT_ERROR_MESSAGE });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  updateAvatar,
};
