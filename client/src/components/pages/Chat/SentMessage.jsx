import React from "react";
import BubbleTail from "./BubbleTail";
import Message from "./Message";

function SentMessage({ message }) {
  return (
    <div className="self-end">
      <div className="flex items-end max-w-[35rem] ml-[3rem]">
        <Message
          messageData={message}
          className="bg-message rounded-br-none flex-grow"
        />
        <BubbleTail
          className={message.messageType === "image" && "hidden"}
          fillColor="fill-message stroke-message"
        />
      </div>
    </div>
  );
}

export default SentMessage;
