const { addMessageToChatRoom } = require("../controllers/chatRoomController");

exports.messagingController = (io, socket) => {
  socket.on("user:message", async ({ chatRoomId, message }) => {
    if (!socket.userId) return;
    // Save message to database
    await addMessageToChatRoom(chatRoomId, message);

    // Broadcast message to room
    io.to(chatRoomId).emit("user:message", {
      chatRoomId,
      message,
      userId: socket.userId,
    });
  });
};
