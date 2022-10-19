import React from "react";
import { useSelector } from "react-redux";
import ChatHeader from "../components/pages/Chat/ChatHeader";
import MessageList from "../components/pages/Chat/MessageList";
import NewMessage from "../components/pages/Chat/NewMessage";
import useChat from "../hooks/useChat";

function Chat() {
  const {
    chat: { chatProfile, messageHistory },
  } = useChat();

  const mode = useSelector((state) => state.chatReducer.mode);

  return (
    <div className="chat-bg flex-grow h-full relative flex flex-col overflow-hidden">
      {/* Header */}
      <ChatHeader chatProfile={chatProfile} />
      {/* container */}
      <div className="flex-grow px-[1rem] overflow-hidden">
        <div className="max-w-[75rem] h-full mx-auto flex flex-col justify-end pb-[2rem] relative overflow-hidden">
          <MessageList messageHistory={messageHistory} />
          <NewMessage mode={mode} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
