import React from "react";
import BubbleTail from "./BubbleTail";
import Message from "./Message";

function ReceivedMessage({ message }) {
  return (
    <div className="flex items-end max-w-[35rem] mr-[3rem]">
      <div style={{ transform: "rotateY(180deg)" }}>
        <BubbleTail
          className={message.messageType === "image" && "hidden"}
          fillColor="fill-primary stroke-primary"
        />
      </div>
      <Message
        messageData={message}
        className="bg-primary rounded-bl-none flex-grow"
        messageReceived={true}
      />
    </div>
  );
}

export default ReceivedMessage;
