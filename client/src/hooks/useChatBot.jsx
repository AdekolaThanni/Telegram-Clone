import useSocket from "./useSocket";
import useSendMessage from "./useSendMessage";

const useChatBot = () => {
  const { socketEmit } = useSocket();
  const { sendMessage } = useSendMessage();

  const extractTextFromHtml = (html) => {
    // Fake html to get message text content
    const fakeDiv = document.createElement("div");
    fakeDiv.innerHTML = html;

    return fakeDiv.textContent;
  };

  const getResponseFromChatBot = async ({ chatRoomId, userMessage }) => {
    const message = extractTextFromHtml(userMessage);

    // Send request
    const request = await fetch(process.env.REACT_APP_BOT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        application: process.env.REACT_APP_BOT_APPLICATION_ID,
        instance: process.env.REACT_APP_BOT_APPLICATION_INSTANCE,
        message: message,
      }),
    });

    const botReply = await request.json();

    // Emit robot typing event
    socketEmit("user:typing", chatRoomId, process.env.REACT_APP_BOT_ID);

    // Send message back to user
    sendMessage({
      chatRoomId,
      botMessage: botReply.message,
      botId: process.env.REACT_APP_BOT_ID,
    });
  };

  const respondAsChatBot = ({ chatRoomId, message }) => {
    // Send message back to user
    sendMessage({
      chatRoomId,
      botMessage: message,
      botId: process.env.REACT_APP_BOT_ID,
    });
  };

  return { getResponseFromChatBot, respondAsChatBot };
};

export default useChatBot;
