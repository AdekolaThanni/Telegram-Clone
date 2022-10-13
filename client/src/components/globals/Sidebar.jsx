import React from "react";
import ChatList from "../../pages/ChatList";
import Contacts from "../../pages/Contacts";
import Settings from "../../pages/Settings";

function Sidebar() {
  return (
    <div
      id="side-bar"
      className="max-w-[42rem] h-full relative overflow-x-hidden"
    >
      <ChatList />
      <Contacts />
      <Settings />
    </div>
  );
}

export default Sidebar;
