import React from "react";
import ChatList from "../../pages/ChatList";

function Sidebar() {
  return (
    <div id="side-bar" className="max-w-[42rem] h-full">
      <ChatList />
    </div>
  );
}

export default Sidebar;
