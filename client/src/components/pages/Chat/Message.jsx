import React from "react";
import CallMessage from "./CallMessage";
import MessageReadStatus from "./MessageReadStatus";

function Message({ messageData, className }) {
  // Image messages
  if (messageData.messageType === "image") {
    return (
      <div className="w-[30rem] rounded-3xl overflow-hidden h-[34rem] relative">
        <img
          className="w-full h-full object-cover"
          src={messageData.imageUrl}
          alt=""
        />
        <MessageReadStatus
          readStatus={!messageData.received && messageData.readStatus}
          time={messageData.time}
          className="absolute bottom-[1rem] right-[1rem] bg-secondary-light-text rounded-full !text-white"
        />
      </div>
    );
  }

  //   Calls
  if (messageData.messageType === "call")
    return (
      <CallMessage
        callDetails={messageData.callDetails}
        received={messageData.received}
        readStatus={messageData.readStatus}
        time={messageData.time}
      />
    );

  return (
    <div
      className={`${className} p-[1.5rem] rounded-3xl flex items-center max-w-[35rem] sm:text-[1.4rem]`}
    >
      <div className="font-semibold">{messageData.message}</div>
      <MessageReadStatus
        readStatus={!messageData.received && messageData.readStatus}
        time={messageData.time}
        className={`self-end translate-y-[1rem] ${
          messageData.received && "!text-secondary"
        }`}
      />
    </div>
  );
}

export default Message;
