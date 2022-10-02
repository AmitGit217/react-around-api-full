const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/controlUsers');
const {
  getCards,
  postCard,
  deleteCardById,
  likeCard,
  disLikeCard,
} = require('../controllers/controlCards');

router.get('/users', auth, getUsers);
router.patch('/users/me', auth, updateUser);
router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me/avatar', auth, updateAvatar);
router.get('/users/:_id', getUserById);

router.get('/cards', auth, getCards);
router.post(
  '/cards',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().uri().required(),
      owner: Joi.object(),
      likes: Joi.array(),
      createdAt: Joi.date(),
    }),
  }),
  postCard
);
router.delete('/cards/:_id', auth, deleteCardById);
router.put('/cards/:_id/likes', auth, likeCard);
router.delete('/cards/:_id/likes', auth, disLikeCard);

module.exports = router;
