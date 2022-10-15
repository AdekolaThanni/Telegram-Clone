import React from "react";
import ChatList from "../../pages/ChatList";
import Contacts from "../../pages/Contacts";
import SelectContacts from "../../pages/SelectContacts";
import Settings from "../../pages/Settings";

function Sidebar() {
  return (
    <div
      id="side-bar"
      className="basis-[42rem] h-full relative overflow-x-hidden"
    >
      <ChatList />
      <Contacts />
      <Settings />
      <SelectContacts />
    </div>
  );
}

export default Sidebar;
