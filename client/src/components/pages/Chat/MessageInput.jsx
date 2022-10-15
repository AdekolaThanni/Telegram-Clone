import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { chatActions } from "../../../store/chatSlice";
import { modalActions } from "../../../store/modalSlice";

function MessageInput({ isRecording }) {
  const dispatch = useDispatch();

  // Manages message emptiness
  const [messageEmpty, setMessageEmpty] = useState(true);

  // Ask for confirmation to terminate recording if user is currenly recording a message
  const terminateRecording = (event) => {
    if (isRecording) {
      event.currentTarget.blur();
      dispatch(modalActions.openModal({ type: "stopRecordModal" }));
    }
  };

  const handleChange = (event) => {
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

  return (
    <div
      onClick={(event) => {
        event.currentTarget.querySelector("#messageInput").click();
      }}
      className="ml-[1rem] flex-grow min-h-[4rem] flex items-center group relative overflow-x-hidden"
    >
      {/* Placeholder */}
      <AnimatePresence>
        {messageEmpty && (
          <motion.span
            initial={{ left: 40, opacity: 0 }}
            animate={{ left: 0, opacity: 1, transition: { duration: 0.3 } }}
            exit={{ left: 40, opacity: 0, transition: { duration: 0.3 } }}
            className="text-secondary-text absolute top-1/2 -translate-y-1/2 left-0"
          >
            Message
          </motion.span>
        )}
      </AnimatePresence>
      {/* Input */}
      <div
        id="messageInput"
        className="outline-none flex-grow z-10 duration-200 max-h-[16rem] overflow-y-scroll custom-scrollbar overflow-x-hidden"
        ariaRole="input"
        contentEditable={true}
        onInput={handleChange}
        onClick={terminateRecording}
      ></div>
    </div>
  );
}

export default MessageInput;
