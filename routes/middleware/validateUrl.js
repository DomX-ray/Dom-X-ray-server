const createError = require("http-errors");

const STATUS_CODES = require("../../constants/statusCode");
const ERROR = require("../../constants/messages");

const isAValidUrl = (req, res, next) => {
  const url = req.query.searchUrl;

  if (!url) {
    next(createError(STATUS_CODES.BAD_REQUEST, ERROR.EMPTY_INPUT));
  }

  const regex =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  if (regex.test(url)) {
    next();
  } else {
    next(createError(STATUS_CODES.BAD_REQUEST, ERROR.INVALID_URL));
  }
};

module.exports = isAValidUrl;
