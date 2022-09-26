const router = require('express').Router();
const {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  updateAvatar,
} = require('../controllers/controlUsers');
const {
  getCards,
  postCard,
  deleteCardById,
  likeCard,
  disLikeCard,
} = require('../controllers/controlCards');

router.get('/users', getUsers);
router.post('/users', postUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);
router.get('/users/:_id', getUserById);

router.get('/cards', getCards);
router.post('/cards', postCard);
router.delete('/cards/:_id', deleteCardById);
router.put('/cards/:_id/likes', likeCard);
router.delete('/cards/:_id/likes', disLikeCard);

module.exports = router;
