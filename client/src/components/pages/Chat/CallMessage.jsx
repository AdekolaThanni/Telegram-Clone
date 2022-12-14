import React from "react";
import MessageReadStatus from "./MessageReadStatus";

function CallMessage({ callDetails, received, readStatus, time }) {
  return (
    <div
      className={`flex rounded-3xl ${
        received ? "rounded-bl-none" : "rounded-br-none bg-message"
      } p-[1.5rem] gap-[1rem]`}
    >
      <div className="flex items-center gap-[1rem]">
        {/* Phone Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M26 29h-.17C6.18 27.87 3.39 11.29 3 6.23A3 3 0 0 1 5.76 3h5.51a2 2 0 0 1 1.86 1.26L14.65 8a2 2 0 0 1-.44 2.16l-2.13 2.15a9.37 9.37 0 0 0 7.58 7.6l2.17-2.15a2 2 0 0 1 2.17-.41l3.77 1.51A2 2 0 0 1 29 20.72V26a3 3 0 0 1-3 3ZM6 5a1 1 0 0 0-1 1v.08C5.46 12 8.41 26 25.94 27a1 1 0 0 0 1.06-.94v-5.34l-3.77-1.51l-2.87 2.85l-.48-.06c-8.7-1.09-9.88-9.79-9.88-9.88l-.06-.48l2.84-2.87L11.28 5Z"
            className="!stroke-transparent fill-primary-text"
          />
        </svg>
        <div className="flex flex-col">
          <p className="font-semibold">
            {received ? "Incoming call" : "Outgoing call"}
          </p>
          <div className="flex items-center gap-[.5rem]">
            {received ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                className="w-[2rem] h-[2rem]"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 8v10h10"
                  className="fill-transparent stroke-avatar-check"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                className="w-[2rem] h-[2rem]"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 6L6 18M8 6h10v10"
                  className="fill-transparent stroke-avatar-check"
                />
              </svg>
            )}
            <p className="text-[1.4rem]">
              {callDetails.callPicked ? callDetails.callDuration : "Missed"}
            </p>
          </div>
        </div>
      </div>
      <MessageReadStatus
        readStatus={received ? undefined : readStatus}
        time={time}
        className="self-end translate-y-[1rem]"
      />
    </div>
  );
}

export default CallMessage;
