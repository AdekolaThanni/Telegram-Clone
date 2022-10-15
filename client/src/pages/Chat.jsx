import React from "react";
import { useSelector } from "react-redux";
import ChatHeader from "../components/pages/Chat/ChatHeader";
import NewMessage from "../components/pages/Chat/NewMessage";
import useChat from "../hooks/useChat";

function Chat() {
  const {
    chat: { chatProfile },
  } = useChat();

  const mode = useSelector((state) => state.chatReducer.mode);
  return (
    <div className="chat-bg flex-grow h-full relative flex flex-col">
      {/* Header */}
      <ChatHeader chatProfile={chatProfile} />
      {/* container */}
      <div className="flex-grow px-[1rem]">
        <div className="max-w-[75rem] h-full mx-auto flex flex-col pb-[2rem] relative">
          <NewMessage mode={mode} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
