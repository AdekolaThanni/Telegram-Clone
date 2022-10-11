import React from "react";

function MessageCheck({ readStatus, className }) {
  const singleCheck = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      className="w-[1.7rem] h-[1.7rem]"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m4 12l6 6L20 6"
        className={className}
      />
    </svg>
  );

  const doubleCheck = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 32 32"
      className="w-[1.7rem] h-[1.7rem]"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m4 17l5 5l12-12m-5 10l2 2l12-12"
        className={className}
      />
    </svg>
  );

  return <span>{readStatus ? doubleCheck : singleCheck}</span>;
}

export default MessageCheck;
