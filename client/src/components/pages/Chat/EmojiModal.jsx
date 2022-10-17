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
          className="absolute bottom-[9rem] left-0 w-[40rem]  origin-bottom-left"
          id="emojiPicker"
          onMouseEnter={handleMouseMovement}
        >
          <EmojiPicker
            width="100%"
            // lazyLoadEmojis={true}
            onEmojiClick={addEmojiToMessage}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EmojiModal;
