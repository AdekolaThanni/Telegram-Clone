import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useContactList = () => {
  const contacts = useSelector((state) => state.contactsReducer);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchValue) {
      setSearchedContacts(
        contacts.filter((contact) =>
          contact.name.toLowerCase().startsWith(searchValue.toLowerCase())
        )
      );
    } else {
      setSearchedContacts(contacts);
    }
  }, [searchValue, contacts]);

  return {
    contacts: searchedContacts,
    handleSearchValue,
    searchValue,
  };
};

export default useContactList;
