const { celebrate, Joi } = require('celebrate');

const celebrateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const celebrateUserName = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const celebrateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri(),
  }),
});

const celebrateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
    owner: Joi.object(),
    likes: Joi.array(),
    createdAt: Joi.date(),
  }),
});

module.exports = {
  celebrateUser,
  celebrateCard,
  celebrateUserName,
  celebrateUserAvatar,
};
