module.exports = (err, req, res, next) => {
  console.log(err.code);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
