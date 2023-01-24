import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "../components/pages/Chat/ChatHeader";
import MessageList from "../components/pages/Chat/MessageList";
import NewMessage from "../components/pages/Chat/NewMessage";
import useChat from "../hooks/useChat";
import { userProfileActions } from "../store/userProfileSlice";

function Chat() {
  const {
    mode,
    chat: { chatProfile, messageHistory },
  } = useChat();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileActions.setProfile(chatProfile));
  }, [chatProfile]);

  const chatActive = useSelector((state) => state.chatReducer.active);

  return (
    <div
      className={`chat-bg flex-grow h-full relative flex flex-col overflow-hidden shrink-0 sm:absolute sm:top-0 sm:left-0 sm:w-full duration-200 ${
        chatActive
          ? "lg:basis-full sm:translate-x-0"
          : "lg:basis-[100rem] sm:translate-x-[55rem]"
      }`}
    >
      {chatActive && (
        <>
          {/* Header */}
          <ChatHeader chatProfile={chatProfile} />
          {/* container */}
          <div className="flex-grow px-[1rem] sm:px-[.5rem] overflow-hidden">
            <div className="max-w-[75rem] h-full mx-auto flex flex-col justify-end pb-[2rem] relative overflow-hidden">
              <MessageList messageHistory={messageHistory} />
              <NewMessage mode={mode} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
