import React from "react";

function Header({ children, className }) {
  return <header className={`h-[5.5rem] ${className}`}>{children}</header>;
}

export default Header;
