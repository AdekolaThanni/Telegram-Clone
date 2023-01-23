module.exports = (err, req, res, next) => {
  console.log(req.url);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
