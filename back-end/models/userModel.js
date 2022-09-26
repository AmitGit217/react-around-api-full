const mongoose = require('mongoose');

const validUrl =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const User = new mongoose.Schema({
  name: { required: true, minlength: 2, maxlength: 30, type: String },
  about: { required: true, minlength: 2, maxlength: 30, type: String },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validUrl.test(value),
      message: (type) => `${type.value} is not a valid url`,
    },
  },
});

module.exports = mongoose.model('user', User);
