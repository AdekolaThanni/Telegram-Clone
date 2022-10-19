import { useState } from "react";

const dummyChat = {
  chatProfile: {
    id: 0,
    title: "Sophia",
    privateChat: true,
    status: { online: true },
    avatar:
      "https://images.unsplash.com/photo-1663153275138-ec8463d46634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  },
  messageHistory: [
    {
      dateMilliseconds: 1665615600000,
      dateString: "October 13",
      messages: [
        {
          id: 0,
          message: "Hey, how are you feeling now?",
          messageType: "text",
          time: "5:00AM",
          readStatus: true,
          received: false,
        },
        {
          id: 1,

          message: "I feel good, how about you?",
          messageType: "text",
          time: "5:01AM",
          readStatus: true,
          received: true,
        },
        {
          id: 2,

          imageUrl:
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          messageType: "image",
          time: "6:01AM",
          readStatus: true,
          received: false,
        },
      ],
    },
    {
      dateMilliseconds: 1665702000000,
      dateString: "October 14",
      messages: [
        {
          id: 0,
          message: "It's really nice, how much?",
          messageType: "text",
          time: "1:00PM",
          readStatus: true,
          received: true,
        },
        {
          id: 1,

          callDetails: {
            callType: "voice",
            callDuration: "456 seconds",
            callPicked: true,
          },
          messageType: "call",
          time: "1:27PM",
          readStatus: true,
          received: false,
        },
        {
          id: 2,
          message: "Sorry, I was away",
          messageType: "text",
          time: "3:00PM",
          readStatus: false,
          received: true,
        },
      ],
    },
    {
      dateMilliseconds: 1665615600000,
      dateString: "October 13",
      messages: [
        {
          id: 0,
          message: "Hey, how are you feeling now?",
          messageType: "text",
          time: "5:00AM",
          readStatus: true,
          received: false,
        },
        {
          id: 1,

          message: "I feel good, how about you?",
          messageType: "text",
          time: "5:01AM",
          readStatus: true,
          received: true,
        },
        {
          id: 2,

          imageUrl:
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          messageType: "image",
          time: "6:01AM",
          readStatus: true,
          received: false,
        },
      ],
    },
    {
      dateMilliseconds: 1665702000000,
      dateString: "October 14",
      messages: [
        {
          id: 0,
          message: "It's really nice, how much?",
          messageType: "text",
          time: "1:00PM",
          readStatus: true,
          received: true,
        },
        {
          id: 1,

          callDetails: {
            callType: "voice",
            callDuration: "456 seconds",
            callPicked: true,
          },
          messageType: "call",
          time: "1:27PM",
          readStatus: true,
          received: false,
        },
        {
          id: 2,
          message: "Sorry, I was away",
          messageType: "text",
          time: "3:00PM",
          readStatus: false,
          received: true,
        },
      ],
    },
    {
      dateMilliseconds: 1665615600000,
      dateString: "October 13",
      messages: [
        {
          id: 0,
          message: "Hey, how are you feeling now?",
          messageType: "text",
          time: "5:00AM",
          readStatus: true,
          received: false,
        },
        {
          id: 1,

          message: "I feel good, how about you?",
          messageType: "text",
          time: "5:01AM",
          readStatus: true,
          received: true,
        },
        {
          id: 2,

          imageUrl:
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          messageType: "image",
          time: "6:01AM",
          readStatus: true,
          received: false,
        },
      ],
    },
    {
      dateMilliseconds: 1665702000000,
      dateString: "October 14",
      messages: [
        {
          id: 0,
          message: "It's really nice, how much?",
          messageType: "text",
          time: "1:00PM",
          readStatus: true,
          received: true,
        },
        {
          id: 1,

          callDetails: {
            callType: "voice",
            callDuration: "456 seconds",
            callPicked: true,
          },
          messageType: "call",
          time: "1:27PM",
          readStatus: true,
          received: false,
        },
        {
          id: 2,
          message: "Sorry, I was away",
          messageType: "text",
          time: "3:00PM",
          readStatus: false,
          received: true,
        },
      ],
    },
  ],
};

const useChat = () => {
  const [chat] = useState(dummyChat);

  return { chat };
};

export default useChat;
