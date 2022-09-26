const mongoose = require('mongoose');

const validUrl =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const Card = mongoose.Schema({
  name: { required: true, minlength: 2, maxlength: 30, type: String },
  link: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validUrl.test(value),
      message: (props) => `${props.value} is not a valid url`,
    },
  },
  owner: { ref: 'user', type: mongoose.Schema.Types.ObjectId, require: true },
  likes: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('card', Card);
