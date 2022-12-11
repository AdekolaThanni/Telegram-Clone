import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const useSettings = () => {
  const [user, setUser] = useState({});
  const { reqFn: getProfile } = useFetch(
    { method: "GET", url: "/profile" },
    (data) => {
      setUser(data.data.user);
    }
  );

  const { reqFn: updateProfile } = useFetch(
    {
      method: "PATCH",
      url: "/profile",
    },
    (data) => {
      setUser(data.data.user);
    }
  );

  useEffect(() => {
    getProfile();
  }, []);

  return {
    user,
    updateProfile,
  };
};

export default useSettings;
