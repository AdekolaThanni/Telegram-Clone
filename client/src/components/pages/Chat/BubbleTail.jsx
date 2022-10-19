import React from "react";

function BubbleTail({ className, fillColor }) {
  return (
    <svg
      width="11"
      height="10"
      viewBox="0 0 11 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} w-[2.5rem] h-[2.5rem] translate-x-[-.6rem] shrink-0`}
    >
      <path
        d="M11 20C4.46592 14.9222 2.16956 10.4109 0 0V20H11Z"
        fill="#8774E1"
        className={`${fillColor}`}
      />
    </svg>
  );
}

export default BubbleTail;
