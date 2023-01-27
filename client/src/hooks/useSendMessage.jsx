import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../store/chatSlice";
import useSocket from "./socketHooks/useSocket";

const useSendMessage = (setMessageEmpty) => {
  // Get messageMode
  const messageMode = useSelector((state) => state.chatReducer.mode);
  // Get socketFns
  const { socketEmit, userId } = useSocket();
  //   Get currentChatRoom
  const chatRoomId = useSelector(
    (state) => state.chatReducer.currentChatRoom._id
  );
  const dispatch = useDispatch();

  const sendMessage = () => {
    // Construct message
    const message = {
      sender: userId,
      timeSent: new Date(Date.now()).toISOString(),
      readStatus: false,
      received: false,
    };

    // If message is raw text
    if (messageMode === "typing") {
      message.messageType = "text";
      message.message = document.querySelector("#messageInput").innerHTML;
    }

    // Emit message event
    socketEmit("user:message", { chatRoomId, message });

    // Set chatMode to null
    dispatch(chatActions.resetMode());

    document.querySelector("#messageInput").innerHTML = "";
    setMessageEmpty(true);
  };

  return { sendMessage };
};

export default useSendMessage;
