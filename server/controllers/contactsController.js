const catchAsyncError = require("../utilities/catchAsyncError");
const User = require("../models/User");
const ReqError = require("../utilities/ReqError");
const {
  createChatRoom,
  checkIfChatRoomExists,
  deleteChatRoom,
} = require("./chatRoomController");

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
  if (user.username === newContact.username)
    return next(new ReqError(400, "You can't add yourself as a contact"));

  for (let contact of user.contacts) {
    // Check if contact exists already
    if (contact.contactDetails.toString() === newContact._id.toString()) {
      return next(new ReqError(400, "Contact exists already"));
    }

    // Check if contact name exists and rename
    if (contact.name === name) {
      return next(new ReqError(400, "Contact name exists already"));
    }
  }

  // Check if chat room exists between users i.e check if newContact already has user as a contact
  let chatRoomId = await checkIfChatRoomExists(user, newContact);

  if (!chatRoomId) {
    // Create a chat room for both users
    const chatRoomDetails = {
      roomType: "Private",
      listeners: [newContact._id, user._id],
      messageHistory: [],
    };

    const newChatRoom = await createChatRoom(chatRoomDetails);

    if (!newChatRoom)
      return next(new ReqError(404, "Contact could not be added"));

    chatRoomId = newChatRoom._id;
  }

  const newContactData = {
    name,
    contactDetails: newContact._id,
    chatRoomId,
  };

  // Add to contacts
  user.contacts.push(newContactData);

  // Add chatRoomId to chatRooms user belongs to
  user.chatRooms.push(chatRoomId);

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
        chatRoomId,
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

  let chatRoomId;
  const id = aimedContact._id.toString();

  user.contacts = user.contacts.filter((contact) => {
    if (contact.contactDetails.toString() === id) {
      chatRoomId = contact.chatRoomId;
      return;
    }

    return true;
  });

  user.chatRooms = user.chatRooms.filter(
    (room) => room.toString() !== chatRoomId.toString()
  );

  await user.save({ validateBeforeSave: false });

  // Check if other user still has you as a contact, if so don't delete chatRoom from database else delete it
  const chatRoomExists = await checkIfChatRoomExists(user, aimedContact);

  if (!chatRoomExists) {
    await deleteChatRoom(chatRoomId);
  }

  res.status(204).json({
    status: "success",
    message: "Contact successfully deleted",
  });
});
