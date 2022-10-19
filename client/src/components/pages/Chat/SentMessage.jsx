import React from "react";
import BubbleTail from "./BubbleTail";
import Message from "./Message";

function SentMessage({ message }) {
  return (
    <div className="self-end">
      <div className="flex items-end">
        <Message messageData={message} className="bg-message rounded-br-none" />
        <BubbleTail
          className={message.messageType === "image" && "hidden"}
          fillColor="fill-message stroke-message"
        />
      </div>
    </div>
  );
}

export default SentMessage;
