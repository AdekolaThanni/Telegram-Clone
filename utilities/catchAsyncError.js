const ReqError = require("./ReqError");

module.exports = function (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((error) => next(new ReqError(400, error)));
  };
};
