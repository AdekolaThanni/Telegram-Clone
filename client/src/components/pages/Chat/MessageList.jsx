import React, { useEffect, useRef } from "react";
import { useState } from "react";
import CTAIconWrapper from "../../globals/CTAIconWrapper";
import DayMessages from "./DayMessages";

function MessageList({ messageHistory }) {
  const [scrolledUp, setScrolledUp] = useState(false);
  const messageListRef = useRef();
  useEffect(() => {
    messageListRef.current.scrollTo({
      top: messageListRef.current.scrollHeight,
      left: 0,
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
          <DayMessages
            key={messagesData.dateMilliseconds}
            messagesData={messagesData}
          />
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
