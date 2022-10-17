import { useState } from "react";
import { useDispatch } from "react-redux";
import { chatActions } from "../store/chatSlice";

const useMessageInput = () => {
  const dispatch = useDispatch();
  const [messageEmpty, setMessageEmpty] = useState(true);

  // Add emoji to message
  const addEmojiToMessage = ({ emoji }) => {
    const messageInput = document.getElementById("messageInput");
    setMessageEmpty(false);
    messageInput.insertAdjacentHTML("beforeend", emoji);
  };

  // Handle input to box
  const handleInput = (event) => {
    dispatch(chatActions.setMode({ mode: "typing" }));
    // If message is initially empty change to filled
    if (messageEmpty) {
      setMessageEmpty(false);
    }
    if (!event.currentTarget.innerText) {
      dispatch(chatActions.resetMode());
      setMessageEmpty(true);
    }
  };

  return {
    addEmojiToMessage,
    handleInput,
    messageEmpty,
  };
};

export default useMessageInput;
