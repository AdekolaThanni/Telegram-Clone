import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

const useJoinSocket = () => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  socket?.on("connect", () => {
    // alert("We are connected over here!!");
  });
};

export default useJoinSocket;
