const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
} = require('../controllers/controlUsers');
const {
  getCards,
  postCard,
  deleteCardById,
  likeCard,
  disLikeCard,
} = require('../controllers/controlCards');

router.post('/signin', login);
router.post(
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
  postUser
);

router.get('/users', auth, getUsers);
router.patch('/users/me', auth, updateUser);
router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me/avatar', auth, updateAvatar);
router.get('/users/:_id', getUserById);

router.get('/cards', auth, getCards);
router.post('/cards', auth, postCard);
router.delete('/cards/:_id', auth, deleteCardById);
router.put('/cards/:_id/likes', auth, likeCard);
router.delete('/cards/:_id/likes', auth, disLikeCard);

module.exports = router;
