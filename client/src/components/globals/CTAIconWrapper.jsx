import React from "react";

function CTAIconWrapper({ className, children, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-cta-icon flex items-center justify-center w-[5.5rem] h-[5.5rem] rounded-full ${className}`}
    >
      {children}
    </div>
  );
}

export default CTAIconWrapper;
