import { useState } from "react";
import { useDispatch } from "react-redux";
import { notificationActions } from "../store/notificationSlice";

const useFetch = ({ method, url }, successFn, errorFn) => {
  const [requestState, setRequestState] = useState();
  const dispatch = useDispatch();

  const requestFunction = async (values) => {
    const methodUpper = method.toUpperCase();
    const fetchOptions =
      methodUpper !== "GET"
        ? {
            method: methodUpper,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        : {};

    try {
      setRequestState("loading");
      const response = await fetch(`/api${url}`, fetchOptions);
      let data;
      if (methodUpper !== "DELETE") {
        data = await response.json();
      }
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
