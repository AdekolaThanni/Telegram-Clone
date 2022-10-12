import React from "react";

function ModalChild({ children, onClick, className }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-[.8rem] hover:bg-secondary-light-text modal-child text-[1.4rem] font-medium capitalize px-[1rem] rounded-md cursor-default ${className}`}
    >
      {children}
    </div>
  );
}

export default ModalChild;
