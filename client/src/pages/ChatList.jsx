import React, { useState } from "react";
import ChatItem from "../components/pages/ChatList/ChatItem";
import ChatListHeader from "../components/pages/ChatList/ChatListHeader";
// import ChatListSkeleton from "../components/pages/ChatList/ChatListSkeleton";
import ActivePage from "../components/pages/Sidebar/ActivePage";
import useChatList from "../hooks/useChatList";

function ChatList() {
  const { chatList } = useChatList();
  const [activeChat, setActiveChat] = useState(false);

  const selectChat = (chatId) => {
    setActiveChat(chatId);
  };

  return (
    <ActivePage activePageName="chatList" className="flex flex-col">
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
    </ActivePage>
  );
}

export default ChatList;
