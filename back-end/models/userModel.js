const mongoose = require('mongoose');
const { isEmail } = require('validator');

const validUrl =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const User = new mongoose.Schema({
  name: {
    required: true,
    minlength: 2,
    maxlength: 30,
    type: String,
    default: 'Jacques Cousteau',
  },
  about: {
    required: true,
    minlength: 2,
    maxlength: 30,
    type: String,
    default: 'Explorer',
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validUrl.test(value),
      message: (type) => `${type.value} is not a valid url`,
    },
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Email is invalid'],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', User);
