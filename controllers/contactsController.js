const catchAsyncError = require("../utilities/catchAsyncError");
const User = require("../models/User");
const ReqError = require("../utilities/ReqError");

exports.getAllContacts = catchAsyncError(async (req, res, next) => {
  // Username is gotten from request, so as to get user contacts
  const { username } = req.body;

  if (!username) return next(new ReqError(400, "Username is required"));

  const user = await User.findOne({ username }).populate({
    path: "contacts",
    select: "id name username",
  });

  if (!user) return next(new ReqError(400, "Username does not exist"));

  res.status(200).json({
    status: "success",
    data: {
      contacts: user.contacts,
    },
  });
});

exports.addNewContact = catchAsyncError(async (req, res, next) => {
  const { newUsername, username } = req.body;

  if (!newUsername || !username)
    return next(new ReqError(400, "Details are incomplete"));

  const user = await User.findOne({ username });
  const newContact = await User.findOne({ username: newUsername });

  if (!newContact) return next(new ReqError(400, "User does not exist"));
  if (user._id === newContact.id)
    return next(new ReqError(400, "You can't add yourself as a contact"));

  user.contacts.push(newContact._id);
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteContact = catchAsyncError(async (req, res, next) => {
  const { aimedUsername, username } = req.body;

  if (!aimedUsername || !username)
    return next(new ReqError(400, "Details are incomplete"));

  const user = await User.findOne({ username });
  const aimedContact = await User.findOne({ username: aimedUsername });

  if (!aimedContact) return next(new ReqError(400, "User does not exist"));

  const id = aimedContact._id.toString();
  user.contacts = user.contacts.filter((contact) => contact.toString() !== id);

  await user.save({ validateBeforeSave: false });

  res.status(204).json({
    status: "success",
    message: "Contact successfully deleted",
  });
});
