import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "../../../hooks/useSocket";
import useChatBot from "../../../hooks/useChatBot";
import { chatListActions } from "../../../store/chatListSlice";
import { chatActions } from "../../../store/chatSlice";
import { userActions } from "../../../store/userSlice";
import CTAIconWrapper from "../../globals/CTAIconWrapper";
import DayMessages from "./DayMessages";

function MessageList({ messageHistory }) {
  const [scrolledUp, setScrolledUp] = useState(false);
  const [chatUpdated, setChatUpdated] = useState(false);
  const [chatRoomChanged, setChatRoomChanged] = useState(true);
  const currentChatRoomId = useSelector(
    (state) => state.chatReducer.currentChatRoom._id
  );
  const chatWithBot = useSelector(
    (state) =>
      state.chatReducer?.currentChatRoom.chatProfile.username ===
      process.env.REACT_APP_BOT_USERNAME
  );
  const chatActive = useSelector((state) => state.chatReducer.active);

  const messageListRef = useRef();
  const { socketListen, userId, socketEmit, socket } = useSocket();
  const dispatch = useDispatch();
  const { getResponseFromChatBot } = useChatBot();

  // When user leaves chat modal, deactivate scrolledUp icon appearance and set intial
  useEffect(() => {
    setScrolledUp(false);
  }, [chatRoomChanged]);

  // Listen to incoming messages and emit delivered on receiving
  useEffect(() => {
    socketListen(
      "user:message",
      ({ chatRoomId, message }, acknowledgeReceiving) => {
        // Acknowledge receiving message by sending userId back to server
        acknowledgeReceiving(userId);
        dispatch(chatActions.updateMessageHistory({ chatRoomId, message }));
        dispatch(
          chatListActions.setLatestMessage({
            chatRoomId,
            latestMessage: message,
          })
        );
        // Set message mode to initial
        dispatch(chatActions.resetMode());

        setChatUpdated(true);
      }
    );
  }, []);

  // Listen to when a message can be read
  useEffect(() => {
    setChatRoomChanged(true);
    socketListen("user:messageCanBeRead", ({ chatRoomId, day, message }) => {
      // If message was sent to chat room that belongs with chat bot, get response from chat bot
      if (chatWithBot && message.sender === userId) {
        getResponseFromChatBot({ chatRoomId, userMessage: message.message });
      }

      // If user is the sender of the message
      if (userId === message.sender) return;

      // If message chatRoom is the currentChatRoom being displayed, emit message as being read
      if (chatRoomId === currentChatRoomId && chatActive) {
        socketEmit("user:messageRead", {
          messageId: message._id,
          chatRoomId,
          day,
          userId,
        });
      } else {
        dispatch(
          userActions.setUnreadMessage({
            chatRoomId,
            day,
            messageId: message._id,
          })
        );

        dispatch(
          chatListActions.IncreaseMessageCountInChatRoom({ chatRoomId })
        );
      }
    });

    return () => {
      socket.off("user:messageCanBeRead");
    };
  }, [currentChatRoomId, chatActive]);

  // Listen to messages that has been delivered or read by all members
  useEffect(() => {
    socketListen(
      "user:messageDelivered",
      ({ chatRoomId, messageId, senderId, day }) => {
        dispatch(
          chatListActions.updateMessageStatus({
            messageId,
            chatRoomId,
            status: "deliveredStatus",
          })
        );

        // If message wasn't sent by user, there's no need to update
        if (userId !== senderId) return;

        dispatch(
          chatActions.updateMessageStatus({
            chatRoomId,
            messageId,
            day,
            status: "deliveredStatus",
          })
        );
      }
    );

    socketListen(
      "user:messageReadByAllMembers",
      ({ chatRoomId, messageId, senderId, day }) => {
        dispatch(
          chatListActions.updateMessageStatus({
            messageId,
            chatRoomId,
            status: "readStatus",
          })
        );

        // If message wasn't sent by user, there's no need to update
        if (userId !== senderId) return;

        dispatch(
          chatActions.updateMessageStatus({
            chatRoomId,
            messageId,
            day,
            status: "readStatus",
          })
        );
      }
    );
  }, []);

  // Manages message scrolling down to the bottom
  useEffect(() => {
    const behavior = chatRoomChanged ? "auto" : "smooth";
    if (chatUpdated || chatRoomChanged) {
      messageListRef.current.scrollTo({
        top: messageListRef.current.scrollHeight,
        left: 0,
        behavior,
      });
    }
    if (chatRoomChanged) {
      setChatRoomChanged(false);
    }

    if (chatUpdated) {
      setChatUpdated(false);
    }
  }, [chatUpdated, chatRoomChanged]);

  return (
    <div
      ref={messageListRef}
      onScroll={({ currentTarget }) => {
        if (currentTarget.scrollHeight - currentTarget.scrollTop >= 1000) {
          setScrolledUp(true);
        } else {
          setScrolledUp(false);
        }
      }}
      className="w-full overflow-y-scroll no-scrollbar py-[1rem]"
    >
      {!!messageHistory.length &&
        messageHistory.map((messagesData) => (
          <DayMessages key={messagesData.day} messagesData={messagesData} />
        ))}
      {/* Scroll down */}
      {scrolledUp && (
        <CTAIconWrapper
          onClick={() =>
            messageListRef.current.scrollTo({
              top: messageListRef.current.scrollHeight,
              left: 0,
              behavior: "smooth",
            })
          }
          className="absolute !bg-primary bottom-[8.5rem] right-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 20V4m-7 9l7 7l7-7"
              className="fill-transparent"
            />
          </svg>
        </CTAIconWrapper>
      )}
    </div>
  );
}

export default MessageList;
