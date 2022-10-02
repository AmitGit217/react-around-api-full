const router = require('express').Router();

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
const {
  celebrateCard,
  celebrateUserName,
  celebrateUserAvatar,
} = require('../helpers/celebrate');

router.get('/users/me', getCurrentUser);
router.get('/users/:_id', getUserById);
router.get('/users', getUsers);
router.patch('/users/me', celebrateUserName, updateUser);
router.patch('/users/me/avatar', celebrateUserAvatar, updateAvatar);

router.get('/cards', getCards);
router.post('/cards', celebrateCard, postCard);
router.put('/cards/:_id/likes', likeCard);
router.delete('/cards/:_id', deleteCardById);
router.delete('/cards/:_id/likes', disLikeCard);

module.exports = router;
