const ChatRoom = require("../models/ChatRoom");
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
