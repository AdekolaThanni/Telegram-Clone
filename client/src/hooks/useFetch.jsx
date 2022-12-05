import { useState } from "react";
import { useDispatch } from "react-redux";
import { notificationActions } from "../store/notificationSlice";

const useFetch = ({ method, url }, successFn, errorFn) => {
  const [requestState, setRequestState] = useState();
  const dispatch = useDispatch();

  const requestFunction = async (values) => {
    const fetchOptions =
      method !== "GET"
        ? {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        : {};

    try {
      setRequestState("loading");
      const response = await fetch(url, fetchOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setRequestState("success");
      successFn && successFn(data);
      return data;
    } catch (error) {
      setRequestState("error");
      dispatch(
        notificationActions.addNotification({
          message: error.message,
          type: "error",
        })
      );

      errorFn && errorFn(error);
    }
  };

  return {
    reqState: requestState,
    reqFn: requestFunction,
  };
};

export default useFetch;
