const socketIO = require("socket.io");
const { expressServer } = require("./server");

const io = socketIO(expressServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (connectedClientSocket) => {
  console.log("Client connected");
});
