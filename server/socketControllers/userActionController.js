const { clearChatRoom } = require("../controllers/chatRoomController");

// When user is typing a message
exports.typingController = (io, socket) => {
  socket.on("user:typing", (chatRoomId, userId) => {
    if (!socket.userId) return;

    socket
      .to(chatRoomId)
      .emit("user:typing", { userId: userId || socket.userId, chatRoomId });
  });
};

// When user is recording a message
exports.recordingcontroller = (io, socket) => {
  socket.on("user:recording", (chatRoomId) => {
    if (!socket.userId) return;

    socket
      .to(chatRoomId)
      .emit("user:recording", { userId: socket.userId, chatRoomId });
  });

  socket.on("user:recordingStopped", (chatRoomId) => {
    if (!socket.userId) return;

    socket
      .to(chatRoomId)
      .emit("user:recordingStopped", { userId: socket.userId, chatRoomId });
  });
};

// When user clears a chatRoom
exports.clearChatRoomController = (io, socket) => {
  socket.on("user:chatRoomClear", async ({ chatRoomId }) => {
    await clearChatRoom({ chatRoomId });
    io.to(chatRoomId).emit("user:chatRoomClear", { chatRoomId });
  });
};
