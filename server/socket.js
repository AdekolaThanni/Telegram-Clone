const socketIO = require("socket.io");
const { expressServer } = require("./server");

const {
  onlineController,
  offlineController,
  disconnectingController,
} = require("./socketControllers/connectionController");
const {
  messagingController,
} = require("./socketControllers/messageController");

const {
  typingController,
  recordingcontroller,
} = require("./socketControllers/userActionController");

const io = socketIO(expressServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", async (socket) => {
  // -------------Connection controls -------------- //
  // socket come online
  onlineController(io, socket);

  // socket goes offline
  offlineController(io, socket);

  // socket disconnecting
  disconnectingController(io, socket);
  //--------------------------------------------------//

  // -------------User Action controls -------------- //
  // User typing
  typingController(io, socket);

  // User recording
  recordingcontroller(io, socket);
  //--------------------------------------------------//

  // -------------Message controls -------------- //
  // User sends message
  messagingController(io, socket);

  //--------------------------------------------------//
});
