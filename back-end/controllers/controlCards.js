const Card = require('../models/cardModel');
const {
  NOT_FOUND,
  INVALID_DATA,
  DEFAULT_ERROR,
  CREATE,
  CARD_NOT_FOUND_MESSAGE,
  INVALID_DATA_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
} = require('../lib/consts');

const getCards = (req, res) =>
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(DEFAULT_ERROR).send(err));

const postCard = (req, res) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => res.status(CREATE).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA).send({ Error: err.message });
      } else {
        res.status(DEFAULT_ERROR).send({ Error: DEFAULT_ERROR_MESSAGE });
      }
    });
};

const deleteCardById = (req, res) => {
  const { _id } = req.params;
  Card.findByIdAndRemove(_id)
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ Error: CARD_NOT_FOUND_MESSAGE });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ Error: INVALID_DATA_MESSAGE });
      } else {
        res.status(DEFAULT_ERROR).send({ Error: DEFAULT_ERROR_MESSAGE });
      }
    });
};

const likeCard = (req, res) => {
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
        res.status(NOT_FOUND).send({ Error: CARD_NOT_FOUND_MESSAGE });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ Error: INVALID_DATA_MESSAGE });
      } else {
        res.status(DEFAULT_ERROR).send({ Error: DEFAULT_ERROR_MESSAGE });
      }
    });
};

const disLikeCard = (req, res) => {
  const cardId = req.params._id;
  const userId = req.user._id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ Error: CARD_NOT_FOUND_MESSAGE });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ Error: INVALID_DATA_MESSAGE });
      } else {
        res.status(DEFAULT_ERROR).send({ Error: DEFAULT_ERROR_MESSAGE });
      }
    });
};

module.exports = {
  getCards,
  postCard,
  deleteCardById,
  likeCard,
  disLikeCard,
};
