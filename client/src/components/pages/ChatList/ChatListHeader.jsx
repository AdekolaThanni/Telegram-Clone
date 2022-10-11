import React from "react";
import Header from "../../globals/Header";
import Menu from "./Menu";
import SearchBar from "./SearchBar";

function ChatListHeader() {
  return (
    <Header className="flex px-[2rem] items-center gap-[1rem]">
      <Menu />
      <SearchBar className="flex-grow" />
    </Header>
  );
}

export default ChatListHeader;
