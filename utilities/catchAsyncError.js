const ReqError = require("./ReqError");

module.exports = function (fn) {
  return function (req, res, next) {
    // if (!req.cookies.userId)
    //   return next(new ReqError(400, "You are not logged in"));
    console.log(req.cookies);
    fn(req, res, next).catch((error) => next(new ReqError(400, error)));
  };
};
