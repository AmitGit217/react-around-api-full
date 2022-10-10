//  status
const NOT_FOUND = 404;
const INVALID_DATA = 400;
const DEFAULT_ERROR = 500;
const UNAUTHORIZE = 401;
const UNAUTHORIZE_ACTION = 403;

const CREATE = 201;

// messages
const USER_NOT_FOUND_MESSAGE = 'User with this ID has not been found';
const CARD_NOT_FOUND_MESSAGE = 'Card with this ID has not been found';
const INVALID_DATA_MESSAGE = 'Your input is not a valid data';
const DEFAULT_ERROR_MESSAGE = 'Something went wrong with the server';
const UNAUTHORIZE_MESSAGE = 'Authorization Required';
const DATA_EXIST =
  'This data is already on our server, and user data should be unique';

// Connections
const MONGO_DB = 'mongodb://localhost:27017/around';
const MONGO_DB_TEST = 'mongodb://localhost:27017/test';

module.exports = {
  NOT_FOUND,
  INVALID_DATA,
  DEFAULT_ERROR,
  CREATE,
  MONGO_DB,
  CARD_NOT_FOUND_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INVALID_DATA_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  UNAUTHORIZE_ACTION,
  UNAUTHORIZE,
  UNAUTHORIZE_MESSAGE,
  DATA_EXIST,
  MONGO_DB_TEST,
};
