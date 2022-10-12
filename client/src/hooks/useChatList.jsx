import { useState } from "react";

const dummyList = [
  {
    id: 0,
    avatar:
      "https://images.unsplash.com/photo-1663153275138-ec8463d46634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    privateChat: true,
    title: "Sophia",
    latestMessage: {
      message: "Okay, I'll keep it with me",
      time: "1665495052368",
      readStatus: true,
    },
    pinned: true,
  },
  {
    id: 4,
    avatar:
      "https://images.unsplash.com/photo-1664729723238-d42ae2f188e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    privateChat: true,
    title: "John",
    latestMessage: {
      sender: "John",
      message: "The papers are gone",
      time: "1665496509424",
    },
    pinned: true,
  },
  {
    id: 1,
    avatar:
      "https://images.unsplash.com/photo-1664450631808-146f4feca397?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
    privateChat: false,
    title: "Winner's Group",
    latestMessage: {
      sender: "Tolu",
      message: "Daniel is crazy",
      time: "1665495911612",
    },
    pinned: false,
  },
  {
    id: 3,
    avatar:
      "https://images.unsplash.com/photo-1664819485266-2de9be49b054?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=564&q=80",
    privateChat: true,
    title: "Gianni",
    latestMessage: {
      sender: "Sophia",
      message: "Bye, see you tommorrow",
      time: "1609455600000",
    },
    unreadMessages: 1,
    pinned: false,
  },
];

const useChatList = () => {
  const [chatList] = useState(dummyList);

  return {
    chatList,
  };
};

export default useChatList;
