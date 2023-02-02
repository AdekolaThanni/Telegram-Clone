import { useEffect } from "react";
import useFetch from "./useFetch";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";

const useSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const { reqFn: getProfile } = useFetch(
    { method: "GET", url: "/profile" },
    (data) => {
      dispatch(userActions.setUser({ user: data.data.user }));
    }
  );

  const { reqFn: updateProfile, reqState: updateProfileState } = useFetch(
    {
      method: "PATCH",
      url: "/profile",
    },
    (data) => {
      dispatch(userActions.setUser({ user: data.data.user }));
    }
  );

  useEffect(() => {
    getProfile();
  }, []);

  return {
    user,
    updateProfile,
    updateProfileState,
  };
};

export default useSettings;
