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

  const sendMessage = (messageData) => {
    // Construct message
    const message = {
      sender: userId,
      timeSent: new Date(Date.now()).toISOString(),
      readStatus: false,
      deliveredStatus: false,
    };

    // If message is raw text
    if (messageMode === "typing") {
      message.messageType = "text";
      message.message = document.querySelector("#messageInput").innerHTML;
      document.querySelector("#messageInput").innerHTML = "";
      setMessageEmpty(true);
    }

    // If message is a recording
    if (messageMode === "audioUpload") {
      message.messageType = "voice";
      message.voiceNoteUrl = messageData.url;
      message.voiceNoteDuration = messageData.duration;
    }

    // If message is an image upload
    if (messageMode === "imageUpload") {
      message.imageUrl = messageData.url;
      message.messageType = "image";
    }

    // If message is a call
    if (!messageMode && messageData?.callType) {
      message.callDetails = messageData;
      message.messageType = "call";
      message.sender = messageData.sender;
    }

    // Emit message event
    socketEmit("user:message", {
      chatRoomId: messageData?.callType ? messageData.chatRoomId : chatRoomId,
      message,
    });

    // Set chatMode to null
    dispatch(chatActions.resetMode());
  };

  return { sendMessage };
};

export default useSendMessage;
