exports.callRequestController = (io, socket) => {
  socket.on(
    "user:callRequest",
    async ({ chatRoomId, signalData, userId, callType }, acknowledgementFn) => {
      // If call receiver is not in room
      const socketsInChatRoom = io.in(chatRoomId).allSockets();
      if (socketsInChatRoom.size === 1) {
        acknowledgementFn(false);

        return;
      }

      //   Emit to other user about call request
      socket
        .to(chatRoomId)
        .timeout(5000)
        .emit(
          "user:callRequest",
          { chatRoomId, signalData, userId, callType },
          (err) => {
            if (err) {
              console.log("How?");
            } else {
              acknowledgementFn(true);
            }
          }
        );
    }
  );
};

exports.callAcceptedController = (io, socket) => {
  socket.on("user:callAccepted", ({ chatRoomId, signalData }) => {
    socket.to(chatRoomId).emit("user:callAccepted", { signalData });
  });
};

exports.endCallController = (io, socket) => {
  socket.on("user:endCall", ({ chatRoomId }) => {
    io.to(chatRoomId).emit("user:endCall");
  });
};

exports.callDeniedController = (io, socket) => {
  socket.on("user:callDenied", ({ chatRoomId }) => {
    io.to(chatRoomId).emit("user:callDenied");
  });
};
