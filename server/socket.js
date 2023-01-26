const socketIO = require("socket.io");
const { expressServer } = require("./server");
const {
  onlineController,
  offlineController,
  initController,
  disconnectingController,
} = require("./socketControllers/connectionController");

const io = socketIO(expressServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", async (socket) => {
  // socket come online
  onlineController(io, socket);

  // socket goes offline
  offlineController(io, socket);

  // socket disconnecting
  disconnectingController(io, socket);
});
