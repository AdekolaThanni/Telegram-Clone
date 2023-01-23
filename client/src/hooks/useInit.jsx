import { useEffect } from "react";
import useJoinSocket from "./socketHooks/useJoinSocket";
import { useSelector, useDispatch } from "react-redux";
import { contactsActions } from "../store/contactsSlice";
import useFetch from "./useFetch";

const useInit = () => {
  // Join socket
  useJoinSocket();
  // Set app theme
  useEffect(() => {
    const initialMode = JSON.parse(localStorage.getItem("darkMode"));
    document
      .querySelector("html")
      .setAttribute("class", initialMode ? "dark" : "null");
  }, []);
  // Get logged in state
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);

  // Fetch user contacts
  const dispatch = useDispatch();
  const { reqFn: fetchContacts } = useFetch(
    { method: "GET", url: "/contacts" },
    (data) => {
      dispatch(contactsActions.setContacts(data.data.contacts));
    }
  );

  useEffect(() => {
    if (loggedIn) {
      fetchContacts();
    }
  }, [loggedIn]);

  return {
    loggedIn,
  };
};

export default useInit;
