const { Joi } = require('celebrate');

const userDataValidation = Joi.object().keys({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().uri(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

module.exports = userDataValidation;
