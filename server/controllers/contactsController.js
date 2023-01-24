const catchAsyncError = require("../utilities/catchAsyncError");
const User = require("../models/User");
const ChatRoom = require("../models/ChatRoom");
const ReqError = require("../utilities/ReqError");
const { createChatRoom } = require("./chatRoomController");

exports.getAllContacts = catchAsyncError(async (req, res, next) => {
  // Id is gotten from cookies, so as to get user contacts
  const user = await User.findById(req.cookies.userId).populate({
    path: "contacts.contactDetails",
    select: "id username bio avatar status",
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
  const { name, username } = req.body;

  if (!username) return next(new ReqError(400, "Contact username is needed"));

  const user = await User.findById(req.cookies.userId);
  const newContact = await User.findOne({ username: username });

  if (!newContact) return next(new ReqError(400, "User does not exist"));
  if (user._id === newContact.id)
    return next(new ReqError(400, "You can't add yourself as a contact"));

  // Create a chat room for both users
  const chatRoomDetails = {
    roomType: "Private",
    listeners: [newContact._id, user._id],
    messageHistory: [],
  };

  const newChatRoom = await createChatRoom(chatRoomDetails);

  if (!newChatRoom)
    return next(new ReqError(404, "Contact could not be added"));

  user.contacts.push({
    name,
    contactDetails: newContact._id,
    chatRoomId: newChatRoom._id,
  });
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: "success",
    data: {
      contact: {
        name,
        contactDetails: {
          username: newContact.username,
          _id: newContact._id,
          avatar: newContact.avatar,
          bio: newContact.bio,
          status: newContact.status,
        },
        chatRoomId: newChatRoom._id,
      },
    },
  });
});

exports.deleteContact = catchAsyncError(async (req, res, next) => {
  const { username } = req.body;

  if (!username) return next(new ReqError(400, "Contact username is missing"));

  const user = await User.findById(req.cookies.userId);
  const aimedContact = await User.findOne({ username: username });

  if (!aimedContact) return next(new ReqError(400, "User does not exist"));

  const id = aimedContact._id.toString();
  user.contacts = user.contacts.filter((contact) => contact.toString() !== id);

  await user.save({ validateBeforeSave: false });

  res.status(204).json({
    status: "success",
    message: "Contact successfully deleted",
  });
});
