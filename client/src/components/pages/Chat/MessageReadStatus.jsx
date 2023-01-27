import React from "react";
import MessageCheck from "../../globals/MessageCheck";

function MessageReadStatus({ readStatus, time, className }) {
  return (
    <div
      className={`flex items-center py-[.2rem] text-[1.1rem] text-message-status ${className}`}
    >
      <span className="shrink-0">
        {new Date(time).toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </span>
      {readStatus !== undefined && (
        <MessageCheck
          readStatus={readStatus}
          className="!fill-transparent !stroke-avatar-check translate-y-[.5rem]"
        />
      )}
    </div>
  );
}

export default MessageReadStatus;
