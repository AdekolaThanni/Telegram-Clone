// When user is typing a message
exports.typingController = (io, socket) => {
  socket.on("user:typing", (chatRoomId) => {
    if (!socket.userId) return;

    socket.to(chatRoomId).emit("user:typing", socket.userId);
  });
};

// When user is recording a message
exports.recordingcontroller = (io, socket) => {
  socket.on("user:recording", (chatRoomId) => {
    if (!socket.userId) return;

    socket.to(chatRoomId).emit("user:recording", socket.userId);
  });

  socket.on("user:recordingStopped", (chatRoomId) => {
    if (!socket.userId) return;

    socket.to(chatRoomId).emit("user:recordingStopped", socket.userId);
  });
};
