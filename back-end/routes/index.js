const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  updateAvatar,
  login,
} = require('../controllers/controlUsers');
const {
  getCards,
  postCard,
  deleteCardById,
  likeCard,
  disLikeCard,
} = require('../controllers/controlCards');

router.get('/users', getUsers);
router.post(
  '/users',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  postUser
);

router.post('/login', login);

router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);
router.get('/users/:_id', getUserById);

router.get('/cards', getCards);
router.post('/cards', postCard);
router.delete('/cards/:_id', deleteCardById);
router.put('/cards/:_id/likes', likeCard);
router.delete('/cards/:_id/likes', disLikeCard);

module.exports = router;
