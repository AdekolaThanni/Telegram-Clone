import { useState } from "react";

const dummyUser = {
  avatar:
    "https://images.unsplash.com/photo-1431440869543-efaf3388c585?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  phoneNumber: "+2348181130539",
  username: "AdekolaThanni",
  bio: "You live in a world designed for me...",
  firstName: "Adekola",
  lastName: "Thanni",
};

const useSettings = () => {
  const [user] = useState(dummyUser);

  return {
    user,
  };
};

export default useSettings;
