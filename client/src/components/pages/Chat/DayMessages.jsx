import React from "react";
import { useSelector } from "react-redux";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";

function DayMessages({ messagesData }) {
  const userId = useSelector((state) => state.userReducer.user._id);
  return (
    <div className="">
      <p className="mx-auto w-fit py-[.2rem] px-[1rem] bg-message-highlight rounded-full my-[.5rem] font-semibold text-white">
        {messagesData.day}
      </p>
      <div className="flex flex-col items-start gap-[.5rem]">
        {messagesData.messages.map((message) =>
          message.sender !== userId ? (
            <ReceivedMessage message={message} />
          ) : (
            <SentMessage message={message} />
          )
        )}
      </div>
    </div>
  );
}

export default DayMessages;
