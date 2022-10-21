import React from "react";
import { useSelector } from "react-redux";
import ChatList from "../../pages/ChatList";
import Contacts from "../../pages/Contacts";
import SelectContacts from "../../pages/SelectContacts";
import Settings from "../../pages/Settings";

function Sidebar() {
  const chatActive = useSelector((state) => state.chatReducer.active);
  return (
    <div
      id="side-bar"
      className={`w-[42rem] duration-200 h-full relative overflow-x-hidden shrink-0 sm:w-full ${
        chatActive && "lg:w-0"
      }`}
    >
      <ChatList />
      <Contacts />
      <Settings />
      <SelectContacts />
    </div>
  );
}

export default Sidebar;
