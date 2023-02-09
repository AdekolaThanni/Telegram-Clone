import { useState } from "react";
import { useDispatch } from "react-redux";
import { chatActions } from "../store/chatSlice";
import useSocket from "../hooks/useSocket";

const useMessageInput = ({ currentChatRoom }) => {
  const { socketEmit } = useSocket();
  const dispatch = useDispatch();
  const [messageEmpty, setMessageEmpty] = useState(true);
  const [caretIndex, setCaretIndex] = useState(0);

  // Get cursor position in input
  function getCaretIndex(event) {
    let position = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection();
      if (selection.rangeCount !== 0) {
        const range = window.getSelection().getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(event.currentTarget);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        position = preCaretRange.toString().length;
      }
    }
    setCaretIndex(position);
  }

  // Add emoji to message
  const addEmojiToMessage = ({ getImageUrl }) => {
    dispatch(chatActions.setMode({ mode: "typing" }));
    setMessageEmpty(false);
    const messageInput = document.querySelector("#messageInput");
    const innerHtml = messageInput.innerHTML;
    const emojiString = `<img class="w-[2.5rem] h-[2.5rem] inline-block" src="${getImageUrl()}" />`;

    if (!caretIndex) {
      messageInput.innerHTML = emojiString + messageInput.innerHTML;
      return;
    }

    // Caret index === element index in textContent

    let textContentIndex = 0;
    let innerHtmlIndex = 0;

    let countingNormalText = true;

    for (let char of innerHtml) {
      const htmlRest = innerHtml.slice(innerHtmlIndex);
      // If an image tag is next
      if (htmlRest.startsWith("<img")) {
        countingNormalText = false;
      }

      // If it sees a div
      if (htmlRest.startsWith("<div>")) {
        countingNormalText = false;
      }

      // If it meets ending of div
      if (htmlRest.startsWith("</div>")) {
        countingNormalText = false;
      }

      if (countingNormalText) {
        textContentIndex++;
      }

      if (char === ">" && !countingNormalText) {
        countingNormalText = true;
      }

      innerHtmlIndex++;

      if (textContentIndex === caretIndex) break;
    }

    messageInput.innerHTML =
      innerHtml.slice(0, innerHtmlIndex) +
      emojiString +
      innerHtml.slice(innerHtmlIndex);
  };

  // Handle input to box
  const handleInput = (event) => {
    dispatch(chatActions.setMode({ mode: "typing" }));
    getCaretIndex(event);

    // If message is initially empty change to filled
    if (messageEmpty) {
      setMessageEmpty(false);
    }
    if (!event.currentTarget.innerHTML) {
      dispatch(chatActions.resetMode());
      setMessageEmpty(true);
    }
  };

  // Emit typing event on every key stroke
  const emitTypingEvent = () => {
    socketEmit("user:typing", currentChatRoom._id);
  };

  return {
    addEmojiToMessage,
    handleInput,
    messageEmpty,
    setMessageEmpty,
    getCaretIndex,
    emitTypingEvent,
  };
};

export default useMessageInput;
