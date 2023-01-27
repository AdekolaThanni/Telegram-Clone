const ChatRoom = require("../models/ChatRoom");
const User = require("../models/User");
const catchAsyncError = require("../utilities/catchAsyncError");
const ReqError = require("../utilities/ReqError");

exports.createChatRoom = async (chatRoomDetails) =>
  await ChatRoom.create(chatRoomDetails);

exports.getChatRoom = catchAsyncError(async (req, res, next) => {
  const chatRoom = await ChatRoom.findById(req.params.chatRoomId);
  if (!chatRoom) return next(new ReqError(400, "Chat does not exist"));

  res.status(200).json({
    status: "success",
    data: { chatRoom },
  });
});

exports.checkIfChatRoomExists = async (user, secondaryUser) => {
  let chatRoomId;
  // secondaryUser is the user not performing the action
  // Chat room exists if secondaryUser already has user as a contact
  secondaryUser.contacts.forEach((contact) => {
    if (contact.contactDetails.toString() === user._id.toString()) {
      chatRoomId = contact.chatRoomId;
    }
  });

  return chatRoomId;
};

exports.deleteChatRoom = async (chatRoomId) => {
  await ChatRoom.findByIdAndDelete(chatRoomId);
};

// Get all chat room user belongs to
exports.getAllChatRoomUserIn = async (userId) => {
  const user = await User.findById(userId);
  return user.chatRooms;
};

// Add message to chatroom
exports.addMessageToChatRoom = async (chatRoomId, message) => {
  const chatRoom = await ChatRoom.findById(chatRoomId);

  // Get last chatRoom day message
  const lastDayMessage =
    chatRoom.messageHistory[chatRoom.messageHistory.length - 1];
  // Get day message was sent
  const day = new Date(message.timeSent).toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
  });
  // Check if day is today
  if (lastDayMessage?.day === day) {
    // Add to object if day is today
    chatRoom.messageHistory[chatRoom.messageHistory.length - 1].messages.push(
      message
    );
  } else {
    // Else create new object for day
    const newDayObject = {
      day,
      messages: [message],
    };
    chatRoom.messageHistory.push(newDayObject);
  }

  await chatRoom.save();
};
