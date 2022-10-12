import React, { useState } from "react";
import CTAIconWrapper from "../components/globals/CTAIconWrapper";
import ChatItem from "../components/pages/ChatList/ChatItem";
import ChatListHeader from "../components/pages/ChatList/ChatListHeader";
import CTAModal from "../components/pages/ChatList/CTAModal";
// import ChatListSkeleton from "../components/pages/ChatList/ChatListSkeleton";
import ActivePage from "../components/pages/Sidebar/ActivePage";
import useChatList from "../hooks/useChatList";
import { AnimatePresence, motion } from "framer-motion";

function ChatList() {
  const { chatList } = useChatList();
  const [activeChat, setActiveChat] = useState(false);
  const [ctaModalVisibility, setCtaModalVisibility] = useState(false);

  const selectChat = (chatId) => {
    setActiveChat(chatId);
  };

  return (
    <ActivePage activePageName="chatList" className="flex flex-col relative">
      <ChatListHeader />
      {/* <ChatListSkeleton /> */}
      <div className="basis-full p-[.5rem] overflow-y-scroll custom-scrollbar">
        {chatList.map((chatItem) => (
          <ChatItem
            key={chatItem.id}
            chatData={chatItem}
            activeChat={activeChat === chatItem.id}
            onClick={selectChat}
          />
        ))}
      </div>

      {/* CTA to create new group chat or private chat */}
      <AnimatePresence>{ctaModalVisibility && <CTAModal />}</AnimatePresence>
      <CTAIconWrapper
        className="absolute bottom-[2rem] right-[2rem] cursor-pointer"
        onClick={() => setCtaModalVisibility((prevState) => !prevState)}
      >
        <AnimatePresence>
          {!ctaModalVisibility && (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              initial={{ scale: 0 }}
              animate={{ scale: 1, transitionDuration: 0.2 }}
              exit={{ scale: 0, transitionDuration: 0.2 }}
            >
              <path
                fill="currentColor"
                d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157l3.712 3.712l1.157-1.157a2.625 2.625 0 0 0 0-3.712Zm-2.218 5.93l-3.712-3.712l-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
                className="fill-white stroke-white"
              />
            </motion.svg>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {ctaModalVisibility && (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
              initial={{ scale: 0 }}
              animate={{ scale: 1, transitionDuration: 0.2 }}
              exit={{ scale: 0, transitionDuration: 0.2 }}
              className="absolute"
            >
              <path
                fill="currentColor"
                d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"
                strokeWidth={1}
                className="fill-white stroke-white"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </CTAIconWrapper>
    </ActivePage>
  );
}

export default ChatList;
