const catchAsyncError = require("../utilities/catchAsyncError");
const ReqError = require("../utilities/ReqError");
const User = require("../models/User");

exports.getSelfProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.cookies.userId).select(
    "-contacts -password -__v"
  );

  if (!user) return next(new ReqError(400, "User does not exist"));

  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
});

exports.updateSelfProfile = catchAsyncError(async (req, res, next) => {
  // This action should send a message to all sockets to update username if user changes username
  const user = await User.findByIdAndUpdate(req.cookies.userId, req.body, {
    new: true,
  });

  if (!user) return next(new ReqError(400, "User does not exist"));

  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
});
