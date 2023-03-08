const socketIO = require("socket.io");
const { expressServer } = require("./server");

const {
  callRequestController,
  callAcceptedController,
  endCallController,
  callDeniedController,
} = require("./socketControllers/callController");

const {
  onlineController,
  offlineController,
  disconnectingController,
  joinRoomController,
} = require("./socketControllers/connectionController");
const {
  messagingController,
  markMessageReadController,
} = require("./socketControllers/messageController");

const {
  typingController,
  recordingcontroller,
  clearChatRoomController,
} = require("./socketControllers/userActionController");

const io = socketIO(expressServer);

io.on("connection", async (socket) => {
  // -------------Connection controls -------------- //
  // socket come online
  onlineController(io, socket);

  // socket goes offline
  offlineController(io, socket);

  // socket disconnecting
  disconnectingController(io, socket);

  // socket joins new room
  joinRoomController(io, socket);
  //--------------------------------------------------//

  // -------------User Action controls -------------- //
  // User typing
  typingController(io, socket);

  // User recording
  recordingcontroller(io, socket);

  // User clears chat room
  clearChatRoomController(io, socket);
  //--------------------------------------------------//

  // -------------Message controls -------------- //
  // User sends message
  messagingController(io, socket);

  // User reads message
  markMessageReadController(io, socket);

  //--------------------------------------------------//

  // ----------------- Call controls --------------- //
  // User makes call request
  callRequestController(io, socket);

  // User accepts call
  callAcceptedController(io, socket);

  // User ends call
  endCallController(io, socket);

  // User denies call
  callDeniedController(io, socket);
  //--------------------------------------------------//
});
