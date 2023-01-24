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
