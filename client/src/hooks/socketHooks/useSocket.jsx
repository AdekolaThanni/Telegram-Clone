import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

const useSocket = () => {
  const socketEmit = (action, payload) => {
    socket.emit(action, payload);
  };

  const socketListen = (action, fn) => {
    socket.on(action, fn);
  };

  return { socketEmit, socketListen };
};

export default useSocket;
