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

  // Validate input
  if (!username) return next(new ReqError(400, "Contact username is needed"));

  // Get models for both users
  const user = await User.findById(req.cookies.userId);
  const newContact = await User.findOne({ username: username });

  // Validate models existence
  if (!newContact) return next(new ReqError(400, "User does not exist"));
  if (user.username === newContact.username)
    return next(new ReqError(400, "You can't add yourself as a contact"));

  // Validate addition of contacts
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
      members: [newContact._id, user._id],
      messageHistory: [],
    };

    const newChatRoom = await createChatRoom(chatRoomDetails);

    if (!newChatRoom)
      return next(new ReqError(404, "Contact could not be added"));

    chatRoomId = newChatRoom._id;

    // Add chatRoomId to chatRooms both user belongs to
    user.chatRooms.push(chatRoomId);
    newContact.chatRooms.push(chatRoomId);
  }

  const newContactData = {
    name,
    contactDetails: newContact._id,
    chatRoomId,
  };

  // Add to contacts
  user.contacts.push(newContactData);

  await user.save({ validateBeforeSave: false });
  await newContact.save({ validateBeforeSave: false });

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

  // Validate request
  if (!username) return next(new ReqError(400, "Contact username is missing"));

  // Get models
  const user = await User.findById(req.cookies.userId);
  const aimedContact = await User.findOne({ username: username });

  // Validate models
  if (!aimedContact) return next(new ReqError(400, "User does not exist"));

  let chatRoomId;

  // Get aimed contact id
  const id = aimedContact._id.toString();

  // Remove contact
  user.contacts = user.contacts.filter((contact) => {
    if (contact.contactDetails.toString() === id) {
      chatRoomId = contact.chatRoomId;
      return;
    }

    return true;
  });

  // Check if other user still has you as a contact, if so don't delete chatRoom from database else delete it
  const chatRoomExists = await checkIfChatRoomExists(user, aimedContact);

  if (!chatRoomExists) {
    await deleteChatRoom(chatRoomId);
    // Remove chat room from user chat rooms
    user.chatRooms = user.chatRooms.filter(
      (roomId) => roomId.toString() !== chatRoomId.toString()
    );
    aimedContact.chatRooms = aimedContact.chatRooms.filter(
      (roomId) => roomId.toString() !== chatRoomId.toString()
    );

    user.pinnedChatRooms = user.pinnedChatRooms.filter(
      (roomId) => roomId.toString() !== chatRoomId.toString()
    );
    aimedContact.pinnedChatRooms = aimedContact.pinnedChatRooms.filter(
      (roomId) => roomId.toString() !== chatRoomId.toString()
    );

    await aimedContact.save({ validateBeforeSave: false });
  }

  await user.save({ validateBeforeSave: false });

  res.status(204).json({
    status: "success",
    message: "Contact successfully deleted",
  });
});
