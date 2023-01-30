const {
  checkMembersOffUndeliveredListInMessage,
} = require("../controllers/chatRoomController");
const User = require("../models/User");

exports.getSocketDetails = async (userId) => {
  // Get user model
  userModel = await User.findById(userId);

  // Get all rooms
  allRoomsUserIn = userModel.chatRooms.map((room) => room.toString());

  return { userModel, allRoomsUserIn };
};

exports.onlineController = (io, socket) => {
  socket.on("user:online", async (userId) => {
    socket.userId = userId;
    // Get user detaiils
    const { userModel, allRoomsUserIn } = await this.getSocketDetails(userId);

    //   Make user join rooms
    socket.join(allRoomsUserIn);

    //   Update database on status
    userModel.status = {
      online: true,
      lastSeen: undefined,
    };

    for (let properties of userModel.undeliveredMessages) {
      await checkMembersOffUndeliveredListInMessage({
        membersId: [userId],
        io,
        ...properties,
      });
    }

    userModel.undeliveredMessages = [];

    // Save user model
    await userModel.save({ validateBeforeSave: false });

    // Emit user online status in all rooms user is in
    socket.to(allRoomsUserIn).emit("user:online", userId);
  });
};

exports.offlineController = (io, socket) => {
  socket.on("user:offline", async () => {
    const { userId } = socket;
    // Get user detaiils
    const { userModel, allRoomsUserIn } = await this.getSocketDetails(userId);

    const time = new Date(Date.now()).toISOString();

    userModel.status = {
      online: false,
      lastSeen: time,
    };

    await userModel.save({ validateBeforeSave: false });

    socket
      .to(allRoomsUserIn)
      .emit("user:offline", { userId: userModel._id, time });
  });
};

// socket disconnection
exports.disconnectingController = (io, socket) => {
  socket.on("disconnecting", async () => {
    if (!socket.userId) return;
    // Get user detaiils
    const { userModel, allRoomsUserIn } = await this.getSocketDetails(
      socket.userId
    );

    const time = new Date(Date.now()).toISOString();

    userModel.status = {
      online: false,
      lastSeen: time,
    };

    await userModel.save({ validateBeforeSave: false });

    socket
      .to(allRoomsUserIn)
      .emit("user:offline", { userId: userModel._id, time });
  });
};

exports.joinRoomController = (io, socket) => {
  socket.on("user:joinRooms", ({ rooms }) => {
    socket.join(rooms);
  });
};
