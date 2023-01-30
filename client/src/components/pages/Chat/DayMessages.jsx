import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";

function DayMessages({ messagesData }) {
  const userId = useSelector((state) => state.userReducer.user._id);
  const [day, setDay] = useState();

  useEffect(() => {
    const currentDay = new Date(Date.now()).toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });

    const messageDay = new Date(messagesData.day).toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });

    let outputDayString = "";

    // Show Today if current day and message day is the same
    if (messageDay === currentDay) {
      outputDayString = "Today";
    } else {
      outputDayString = messageDay.split(",")[0];
    }

    setDay(outputDayString);
  }, []);

  return (
    <div className="">
      <p className="mx-auto w-fit py-[.2rem] px-[1rem] bg-message-highlight rounded-full my-[.5rem] font-semibold text-white">
        {day}
      </p>
      <div className="flex flex-col items-start gap-[.5rem]">
        {messagesData.messages.map((message) => (
          <React.Fragment key={message._id}>
            {message.sender !== userId ? (
              <ReceivedMessage message={message} />
            ) : (
              <SentMessage message={message} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default DayMessages;
