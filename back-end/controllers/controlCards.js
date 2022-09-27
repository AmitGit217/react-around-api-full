const Card = require('../models/cardModel');
const {
  CREATE,
  CARD_NOT_FOUND_MESSAGE,
  INVALID_DATA_MESSAGE,
} = require('../lib/consts');

const NotFound = require('../errors/NotFound');
const ValidationError = require('../errors/Validation');

const getCards = (req, res, next) =>
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);

const postCard = (req, res, next) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => res.status(CREATE).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(err.message);
      }
    })
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  const { _id } = req.params;
  Card.findByIdAndRemove(_id)
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFound(CARD_NOT_FOUND_MESSAGE);
      } else if (err.name === 'CastError') {
        throw new ValidationError(INVALID_DATA_MESSAGE);
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const cardId = req.params._id;
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFound(CARD_NOT_FOUND_MESSAGE);
      } else if (err.name === 'CastError') {
        throw new ValidationError(INVALID_DATA_MESSAGE);
      }
    })
    .catch(next);
};

const disLikeCard = (req, res, next) => {
  const cardId = req.params._id;
  const userId = req.user._id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFound(CARD_NOT_FOUND_MESSAGE);
      } else if (err.name === 'CastError') {
        throw new ValidationError(INVALID_DATA_MESSAGE);
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  postCard,
  deleteCardById,
  likeCard,
  disLikeCard,
};
