import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "../../../hooks/socketHooks/useSocket";
import { chatActions } from "../../../store/chatSlice";
import CTAIconWrapper from "../../globals/CTAIconWrapper";
import DayMessages from "./DayMessages";

let initial = true;

function MessageList({ messageHistory }) {
  const [scrolledUp, setScrolledUp] = useState(false);
  const [chatUpdated, setChatUpdated] = useState(true);
  const chatActive = useSelector((state) => state.chatReducer.active);
  const messageListRef = useRef();
  const { socketListen } = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    if (chatUpdated || chatActive) {
      messageListRef.current.scrollTo({
        top: messageListRef.current.scrollHeight,
        left: 0,
        behavior: initial ? "auto" : "smooth",
      });

      initial = false;
    }
    setChatUpdated(false);
  }, [chatUpdated, chatActive]);

  // When user leaves chat modal, deactivate scrolledUp icon appearance and set intial
  useEffect(() => {
    setScrolledUp(false);
    initial = true;
  }, [chatActive]);

  useEffect(() => {
    // Listen to socket events
    socketListen("user:message", ({ chatRoomId, message }) => {
      dispatch(chatActions.updateMessageHistory({ chatRoomId, message }));
      setChatUpdated(true);
    });
  }, []);

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
