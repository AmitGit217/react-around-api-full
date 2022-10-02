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
  celebrateId,
} = require('../helpers/celebrate');

router.get('/users/me', getCurrentUser);
router.get('/users/:_id', celebrateId, getUserById);
router.get('/users', getUsers);
router.patch('/users/me', celebrateUserName, updateUser);
router.patch('/users/me/avatar', celebrateUserAvatar, updateAvatar);

router.get('/cards', getCards);
router.post('/cards', celebrateCard, postCard);
router.put('/cards/:_id/likes', celebrateId, likeCard);
router.delete('/cards/:_id', celebrateId, deleteCardById);
router.delete('/cards/:_id/likes', celebrateId, disLikeCard);

module.exports = router;
