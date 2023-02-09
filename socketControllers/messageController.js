const {
  addMessageToChatRoom,
  checkMembersOffUndeliveredListInMessage,
  addMessageAsUndeliveredToUser,
  addMessageAsUnreadToUser,
  markMessageAsReadByUser,
} = require("../controllers/chatRoomController");

exports.messagingController = (io, socket) => {
  socket.on("user:message", async ({ chatRoomId, message }) => {
    if (!socket.userId) return;

    // Save message to database
    const { messageObj, day } = await addMessageToChatRoom(chatRoomId, message);

    // Broadcast message to room
    io.timeout(180000)
      .to(chatRoomId)
      .emit(
        "user:message",
        {
          chatRoomId,
          message: messageObj,
          day,
          userId: socket.userId,
        },
        async (error, membersId) => {
          if (error) {
            console.log(error);
          } else {
            // Unique identifier of a message in chatRoom
            const uniqueMessageDetails = {
              chatRoomId,
              day,
              messageId: messageObj._id,
            };

            // Remove members from undelivered list
            const { undeliveredMembers } =
              await checkMembersOffUndeliveredListInMessage({
                ...uniqueMessageDetails,
                membersId: membersId.map((id) => id.toString()),
                io,
              });

            // Add message as undelivered to members that aren't currently online
            await addMessageAsUndeliveredToUser({
              ...uniqueMessageDetails,
              undeliveredMembers,
            });

            // Add message as unread to all members of the room except sender of the messagee
            await addMessageAsUnreadToUser({
              ...uniqueMessageDetails,
              unreadMembers: messageObj.unreadMembers.filter(
                (memberId) =>
                  memberId.toString() !== messageObj.sender.toString()
              ),
            });

            // Emit to all users that message can be read
            io.to(chatRoomId).emit("user:messageCanBeRead", {
              ...uniqueMessageDetails,
              message: messageObj,
            });
          }
        }
      );
  });
};

exports.markMessageReadController = (io, socket) => {
  socket.on(
    "user:messageRead",
    async ({ messageId, chatRoomId, day, userId }) => {
      await markMessageAsReadByUser({ messageId, chatRoomId, day, userId, io });
    }
  );

  socket.on(
    "user:markMessagesAsRead",
    async ({ messages, chatRoomId, userId }) => {
      for (let { messageId, day } of messages) {
        await markMessageAsReadByUser({
          messageId,
          chatRoomId,
          day,
          userId,
          io,
        });
      }
    }
  );
};
