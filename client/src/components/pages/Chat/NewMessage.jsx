import React, { useMemo } from "react";
import { modalActions } from "../../../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import CTAIconWrapper from "../../globals/CTAIconWrapper";
import IconWrapper from "../../globals/IconWrapper";
import AttachFileModal from "./AttachFileModal";
import MessageInput from "./MessageInput";
import useRecorder from "../../../hooks/useRecorder";
import { AnimatePresence, motion } from "framer-motion";
import StopRecordModal from "./StopRecordModal";

function NewMessage() {
  const dispatch = useDispatch();
  const messageMode = useSelector((state) => state.chatReducer.mode);

  const isRecording = useMemo(() => messageMode === "recording", [messageMode]);

  const isTyping = useMemo(() => messageMode === "typing", [messageMode]);

  //   Recorder hook to record messages
  const { formattedTime, startRecording, endRecording, playRecording } =
    useRecorder();

  return (
    <div className="mt-auto flex items-end  gap-[1.5rem] ">
      {/* <audio
        src={mediaBlobUrl}
        className="absolute top-[5rem] left-[5rem]"
        controls={true}
      ></audio> */}
      {/* Message form */}
      <div
        className={`bg-primary px-[1.5rem] py-[1rem] rounded-2xl flex-grow flex items-end overflow-x-hidden duration-75 ${
          isRecording ? "mr-[7rem]" : "mr-0"
        }`}
      >
        {/* Emoji picker */}
        <IconWrapper className="shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 48 48"
          >
            <path
              fill="currentColor"
              d="M17.5 22a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5ZM33 19.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0ZM18.452 34.681A11.718 11.718 0 0 0 24 36a11.718 11.718 0 0 0 9.816-5.1a1.249 1.249 0 1 0-2.13-1.307A9.212 9.212 0 0 1 24 33.5a9.22 9.22 0 0 1-7.687-3.907a1.248 1.248 0 1 0-2.13 1.307a11.718 11.718 0 0 0 4.269 3.781ZM24 4C12.954 4 4 12.954 4 24s8.954 20 20 20s20-8.954 20-20S35.046 4 24 4ZM6.5 24c0-9.665 7.835-17.5 17.5-17.5S41.5 14.335 41.5 24S33.665 41.5 24 41.5S6.5 33.665 6.5 24Z"
            />
          </svg>
        </IconWrapper>
        {/* Message Input */}
        <MessageInput isRecording={isRecording} />
        {/* Attach file */}
        {!isRecording && (
          <IconWrapper
            className="shrink-0"
            onClick={() =>
              dispatch(
                modalActions.openModal({
                  type: "attachFileModal",
                  positions: { bottom: 90, right: 80 },
                })
              )
            }
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m15.172 7l-6.586 6.586a2 2 0 1 0 2.828 2.828l6.414-6.586a4 4 0 0 0-5.656-5.656l-6.415 6.585a6 6 0 1 0 8.486 8.486L20.5 13"
                className="fill-transparent"
              />
            </svg>
          </IconWrapper>
        )}

        {/* Recording */}
        {isRecording && (
          <div className="self-center flex items-center gap-[1rem]">
            <span>{formattedTime}</span>
            <span className="w-[1rem] h-[1rem] bg-danger rounded-full animate-pulse">
              &nbsp;
            </span>
          </div>
        )}
      </div>

      {/* Buttons */}
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 7v0a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0M9 7h6M9 7H6m9 0h3m2 0h-2M4 7h2m0 0v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"
                className="!fill-transparent !stroke-white"
              />
            </svg>
          </CTAIconWrapper>
        )}

        {/* Start recording  or send message*/}
        <CTAIconWrapper
          onClick={startRecording}
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.912 12H4L2.023 4.135A.662.662 0 0 1 2 3.995c-.022-.721.772-1.221 1.46-.891L22 12L3.46 20.896c-.68.327-1.464-.159-1.46-.867a.66.66 0 0 1 .033-.186L3.5 15"
                  className="fill-white stroke-white"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </CTAIconWrapper>
      </div>

      {/* Modals */}
      <AttachFileModal />
      <StopRecordModal
        playRecording={playRecording}
        stopRecording={endRecording}
      />
    </div>
  );
}

export default NewMessage;
