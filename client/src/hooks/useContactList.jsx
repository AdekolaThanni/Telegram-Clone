import { useState, useEffect } from "react";
const dummyContact = [
  {
    id: 0,
    avatar:
      "https://images.unsplash.com/photo-1663153275138-ec8463d46634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    title: "Sophia",
    status: { online: true },
  },
  {
    id: 4,
    avatar:
      "https://images.unsplash.com/photo-1664729723238-d42ae2f188e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    title: "John",
    status: { online: false, lastSeen: 1665613250716 },
  },
  {
    id: 3,
    title: "Gianni",
    status: { online: false, lastSeen: 1665613033917 },
    avatar:
      "https://images.unsplash.com/photo-1664819485266-2de9be49b054?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=564&q=80",
  },
];

const useContactList = () => {
  const [contacts, setContacts] = useState(dummyContact);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    setContacts(() =>
      dummyContact.filter((contact) =>
        contact.title.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    );
  }, [searchValue]);

  return {
    contacts,
    handleSearchValue,
    searchValue,
  };
};

export default useContactList;
