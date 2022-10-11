import React from "react";

function IconWrapper({ active, children, className, onClick }) {
  return (
    <div
      className={`flex items-center justify-center w-[4rem] h-[4rem] rounded-full cursor-pointer hover:bg-secondary-light-text ${
        active && "bg-secondary-light-text"
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default IconWrapper;
