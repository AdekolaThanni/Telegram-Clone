import { useState } from "react";
import { useDispatch } from "react-redux";
import { chatActions } from "../store/chatSlice";

const useMessageInput = () => {
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
  const addEmojiToMessage = ({ emoji, getImageUrl }) => {
    setMessageEmpty(false);
    const messageInput = document.querySelector("#messageInput");
    const innerHtml = messageInput.innerHTML;
    const emojiString = `<img src="${getImageUrl()}" alt="${emoji}" />`;

    if (!caretIndex) {
      if (innerHtml.length) {
        messageInput.innerHTML += emojiString;
      } else {
        messageInput.innerHTML = emojiString + messageInput.innerHTML;
        return;
      }
    }

    if (innerHtml.includes("<div>")) {
      messageInput.innerHTML += emojiString;
    }

    // Caret index === element index in textContent

    let textContentIndex = 0;
    let innerHtmlIndex = 0;

    let countingNormalText = true;
    for (let char of innerHtml) {
      if (innerHtml.slice(innerHtmlIndex).startsWith("<img src=")) {
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
    // If message is initially empty change to filled
    if (messageEmpty) {
      setMessageEmpty(false);
    }
    if (!event.currentTarget.innerHTML) {
      dispatch(chatActions.resetMode());
      setMessageEmpty(true);
    }
  };

  return {
    addEmojiToMessage,
    handleInput,
    messageEmpty,
    getCaretIndex,
  };
};

export default useMessageInput;
