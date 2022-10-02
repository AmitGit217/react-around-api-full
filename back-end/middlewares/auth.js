const jwt = require('jsonwebtoken');
const Unauthorize = require('../errors/Unauthorize');
const { UNAUTHORIZE_MESSAGE } = require('../lib/consts');

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Unauthorize(UNAUTHORIZE_MESSAGE);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    );
  } catch (err) {
    throw new Unauthorize(err);
  }
  req.user = payload;
  return next();
};

module.exports = auth;
