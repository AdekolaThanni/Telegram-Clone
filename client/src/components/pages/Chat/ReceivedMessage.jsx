import React from "react";
import BubbleTail from "./BubbleTail";
import Message from "./Message";

function ReceivedMessage({ message }) {
  return (
    <div className="flex items-end">
      <div style={{ transform: "rotateY(180deg)" }}>
        <BubbleTail
          className={message.messageType === "image" && "hidden"}
          fillColor="fill-primary stroke-primary"
        />
      </div>
      <Message
        messageData={message}
        className="bg-primary rounded-bl-none mr-[3rem]"
      />
    </div>
  );
}

export default ReceivedMessage;
