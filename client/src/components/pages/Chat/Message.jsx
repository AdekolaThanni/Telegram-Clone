import React from "react";
import CallMessage from "./CallMessage";
import MessageReadStatus from "./MessageReadStatus";
import VoiceMessage from "./VoiceMessage";
import Image from "../../globals/Image";

function Message({ messageData, className, messageReceived }) {
  // Image messages
  if (messageData.messageType === "image") {
    return (
      <div className="w-[30rem] rounded-3xl overflow-hidden h-[34rem] relative">
        <Image
          className="w-full h-full object-cover"
          src={messageData.imageUrl}
          alt=""
        />
        <MessageReadStatus
          readStatus={messageData.readStatus}
          deliveredStatus={messageData.deliveredStatus}
          messageReceived={messageReceived}
          time={messageData.timeSent}
          className="absolute bottom-[1rem] right-[1rem] bg-secondary-light-text rounded-full !text-white"
        />
      </div>
    );
  }

  if (messageData.messageType === "voice")
    return (
      <VoiceMessage
        deliveredStatus={messageData.deliveredStatus}
        messageReceived={messageReceived}
        voiceDuration={messageData.voiceNoteDuration}
        voiceNoteUrl={messageData.voiceNoteUrl}
        readStatus={messageData.readStatus}
        time={messageData.timeSent}
      />
    );

  if (messageData.messageType === "call")
    //   Calls
    return (
      <CallMessage
        callDetails={messageData.callDetails}
        messageReceived={messageReceived}
        deliveredStatus={messageData.deliveredStatus}
        readStatus={messageData.readStatus}
        time={messageData.timeSent}
      />
    );

  // if it's a text message
  return (
    <div
      className={`${className} p-[1.5rem] rounded-3xl sm:text-[1.4rem] overflow-hidden gap-[1rem] relative`}
    >
      <div
        dangerouslySetInnerHTML={{ __html: messageData.message }}
        className="font-semibold max-w-[25rem] mr-[3.5rem] break-words"
      ></div>
      <MessageReadStatus
        readStatus={messageData.readStatus}
        deliveredStatus={messageData.deliveredStatus}
        messageReceived={messageReceived}
        time={messageData.timeSent}
        className={`absolute right-[.8rem] bottom-[.5rem] ${
          messageData.deliveredStatus && "!text-secondary"
        }`}
      />
    </div>
  );
}

export default Message;
