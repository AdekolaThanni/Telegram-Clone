import EmojiPicker from "emoji-picker-react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

function EmojiModal({ emojiVisible, setEmojiVisible, addEmojiToMessage }) {
  const handleMouseMovement = (event) => {
    event.currentTarget.addEventListener("mouseleave", () => {
      setEmojiVisible(false);
    });
  };

  return (
    <AnimatePresence>
      {emojiVisible && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className={`absolute bottom-[9rem] left-0 w-[40rem]  origin-bottom-left sm:static sm:origin-bottom mt-[.5rem] sm:!scale-100 sm:!duration-[1000ms] sm:w-full ${
            !emojiVisible ? "sm:scale-y-0" : "sm:scale-y-100"
          }`}
          id="emojiPicker"
          onMouseEnter={handleMouseMovement}
        >
          <EmojiPicker
            width="100%"
            lazyLoadEmojis={true}
            // onEmojiClick={(emoji, getImageUrl) =>
            //   setTimeout(() => addEmojiToMessage(emoji, getImageUrl), 100)
            // }
            onEmojiClick={addEmojiToMessage}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EmojiModal;
