import React from "react";

function ChatListSkeleton() {
  return (
    <div className="basis-full p-[1rem] overflow-hidden">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((elem, index) => (
        <div
          key={index}
          className="relative flex items-center gap-[2rem] p-[1rem] fallback-anim"
        >
          {/* Image */}
          <div className="w-[5.5rem] h-[5.5rem] rounded-full bg-secondary-light-text"></div>
          {/* Detail */}
          <div className="">
            <div className="w-[8rem] h-[1rem] rounded-full bg-secondary-light-text"></div>
            <div className="w-[20rem] h-[1rem] rounded-full bg-secondary-light-text mt-[1rem]"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatListSkeleton;
