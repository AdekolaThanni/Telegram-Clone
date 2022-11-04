const User = require("../models/User");
const ReqError = require("../utilities/ReqError");
const jwt = require("jsonwebtoken");

const signToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.login = async (req, res, next) => {
  // Takes in username and password
  const { username, password } = req.body;

  // If there's no details given
  if (!username) return next(new ReqError(400, "Username and Password needed"));

  const foundUser = await User.findOne({ username });

  //   If username does not exist
  if (!foundUser)
    return next(new ReqError(400, "Username or Password incorrect"));

  const passwordGivenCorrect = await foundUser.checkPasswordValidity(
    password,
    foundUser.password
  );

  //   If given password is incorrect
  if (!passwordGivenCorrect)
    return next(new ReqError(400, "Username or Password incorrect"));

  const token = signToken(foundUser);

  res.status(200).json({
    status: "success",
    token,
    message: "Logged in successfully",
  });
};
