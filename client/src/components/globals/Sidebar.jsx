import React from "react";
import ChatList from "../../pages/ChatList";
import Contacts from "../../pages/Contacts";

function Sidebar() {
  return (
    <div id="side-bar" className="max-w-[42rem] h-full relative">
      <ChatList />
      <Contacts />
    </div>
  );
}

export default Sidebar;
