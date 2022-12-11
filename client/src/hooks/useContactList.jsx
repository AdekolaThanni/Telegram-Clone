import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactsActions } from "../store/contactsSlice";
import useFetch from "./useFetch";

let allContacts = [];

const useContactList = () => {
  const contacts = useSelector((state) => state.contactsReducer);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);

  const { reqFn: fetchContacts } = useFetch(
    { method: "GET", url: "/contacts" },
    (data) => {
      dispatch(contactsActions.setContacts(data.data.contacts));
      allContacts = data.data.contacts;
    }
  );

  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (loggedIn) {
      fetchContacts();
    }
  }, [loggedIn]);

  useEffect(() => {
    dispatch(
      contactsActions.setContacts(
        allContacts.filter((contact) =>
          contact.name.toLowerCase().startsWith(searchValue.toLowerCase())
        )
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
