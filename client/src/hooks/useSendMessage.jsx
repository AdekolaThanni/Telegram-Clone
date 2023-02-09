import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../store/chatSlice";
import useSocket from "./useSocket";

const useSendMessage = (setMessageEmpty) => {
  // Get messageMode
  const messageMode = useSelector((state) => state.chatReducer.mode);
  // Get socketFns
  const { socketEmit, userId } = useSocket();
  //   Get currentChatRoom
  const chatRoomId = useSelector(
    (state) => state.chatReducer.currentChatRoom._id
  );
  // Get chat profile of other user to check if it's the bot
  const chatWithBot = useSelector(
    (state) =>
      state.chatReducer.currentChatRoom.chatProfile.username ===
      process.env.REACT_APP_BOT_USERNAME
  );
  const dispatch = useDispatch();

  const sendMessage = (messageData) => {
    // Construct message
    const message = {
      sender: userId,
      timeSent: new Date(Date.now()).toISOString(),
      readStatus: chatWithBot ? true : false,
      deliveredStatus: chatWithBot ? true : false,
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

    // If message is being sent by bot
    if (messageData?.botId) {
      message.sender = messageData.botId;
      message.messageType = "text";
      message.message = messageData.botMessage;
    }

    // If message is a call
    if (!messageMode && messageData?.callType) {
      message.callDetails = messageData;
      message.messageType = "call";
      message.sender = messageData.sender;
    }

    // Emit message event
    socketEmit("user:message", {
      chatRoomId:
        messageData?.callType || messageData?.botId
          ? messageData.chatRoomId
          : chatRoomId,
      message,
    });

    // Set chatMode to sending
    dispatch(chatActions.setMode({ mode: "sending" }));
  };

  return { sendMessage };
};

export default useSendMessage;
