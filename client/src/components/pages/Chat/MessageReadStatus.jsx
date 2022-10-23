import React from "react";
import MessageCheck from "../../globals/MessageCheck";

function MessageReadStatus({ readStatus, time, className }) {
  return (
    <div
      className={`flex items-center px-[1rem] py-[.2rem] text-[1.3rem] text-message-status ${className}`}
    >
      <span className="">{time}</span>
      {readStatus !== undefined && (
        <MessageCheck
          readStatus={readStatus}
          className="!fill-transparent !stroke-avatar-check"
        />
      )}
    </div>
  );
}

export default MessageReadStatus;
