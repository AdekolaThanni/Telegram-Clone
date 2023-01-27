import React from "react";
import CallMessage from "./CallMessage";
import MessageReadStatus from "./MessageReadStatus";
import VoiceMessage from "./VoiceMessage";

function Message({ messageData, className, messageReceived }) {
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
          readStatus={messageData.received ? undefined : messageData.readStatus}
          time={messageData.time}
          className="absolute bottom-[1rem] right-[1rem] bg-secondary-light-text rounded-full !text-white"
        />
      </div>
    );
  }

  if (messageData.messageType === "voice")
    return (
      <VoiceMessage
        received={messageData.received}
        voiceDetails={messageData.voiceDetails}
        readStatus={messageData.readStatus}
        time={messageData.time}
      />
    );

  if (messageData.messageType === "call")
    //   Calls
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
      className={`${className} p-[1.5rem] rounded-3xl sm:text-[1.4rem] overflow-hidden gap-[1rem] relative`}
    >
      <div
        dangerouslySetInnerHTML={{ __html: messageData.message }}
        className="font-semibold max-w-[25rem] mr-[3.5rem] break-words"
      ></div>
      <MessageReadStatus
        readStatus={messageReceived ? undefined : messageData.readStatus}
        time={messageData.timeSent}
        className={`absolute right-[.8rem] bottom-[.5rem] ${
          messageData.received && "!text-secondary"
        }`}
      />
    </div>
  );
}

export default Message;
