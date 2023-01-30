import React from "react";
import MessageCheck from "../../globals/MessageCheck";

function MessageReadStatus({
  readStatus,
  deliveredStatus,
  time,
  className,
  messageReceived,
}) {
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
      {/* If message was received, don't show messageReadStatus */}
      {!messageReceived && (
        <MessageCheck
          readStatus={readStatus}
          deliveredStatus={deliveredStatus}
        />
      )}
    </div>
  );
}

export default MessageReadStatus;
