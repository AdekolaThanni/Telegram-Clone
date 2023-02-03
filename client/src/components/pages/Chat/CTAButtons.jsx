import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import useSendMessage from "../../../hooks/useSendMessage";
import CTAIconWrapper from "../../globals/CTAIconWrapper";

function CTAButtons({
  isTyping,
  isRecording,
  endRecording,
  mediaBlobUrl,
  startRecording,
  setMessageEmpty,
}) {
  const { sendMessage } = useSendMessage(setMessageEmpty);

  return (
    <div className="shrink-0 relative">
      {/* End recording */}
      {isRecording && (
        <CTAIconWrapper
          className="absolute bg-danger top-0 -left-[7rem] z-10"
          onClick={endRecording}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 7v0a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0M9 7h6M9 7H6m9 0h3m2 0h-2M4 7h2m0 0v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"
              className="!fill-transparent !stroke-white"
            />
          </svg>
        </CTAIconWrapper>
      )}

      {/* Start recording  or send message*/}
      <CTAIconWrapper
        onClick={() => {
          if (!isTyping && !isRecording) startRecording();
          else {
            if (isRecording) {
              endRecording();
              return;
            }

            sendMessage();
          }
        }}
        className={`relative ${isRecording && "animate-wave"}`}
      >
        {/* Microphone */}
        <AnimatePresence>
          {!isTyping && !isRecording && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M23 14v3a7 7 0 0 1-14 0v-3H7v3a9 9 0 0 0 8 8.94V28h-4v2h10v-2h-4v-2.06A9 9 0 0 0 25 17v-3Z"
                className="fill-white stroke-transparent"
              />
              <path
                fill="currentColor"
                d="M16 22a5 5 0 0 0 5-5V7a5 5 0 0 0-10 0v10a5 5 0 0 0 5 5Z"
                className="fill-white stroke-transparent"
              />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Send icon */}
        <AnimatePresence>
          {(isTyping || isRecording) && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              className="absolute"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.912 12H4L2.023 4.135A.662.662 0 0 1 2 3.995c-.022-.721.772-1.221 1.46-.891L22 12L3.46 20.896c-.68.327-1.464-.159-1.46-.867a.66.66 0 0 1 .033-.186L3.5 15"
                className="fill-white stroke-white"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </CTAIconWrapper>
    </div>
  );
}

export default CTAButtons;
