import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import IconWrapper from "../../globals/IconWrapper";
import AttachFileModal from "./AttachFileModal";
import MessageInput from "./MessageInput";
import useRecorder from "../../../hooks/useRecorder";
import StopRecordModal from "./StopRecordModal";
import useMessageInput from "../../../hooks/useMessageInput";
import CTAButtons from "./CTAButtons";
import AttachFileOrRecordDuration from "./AttachFileOrRecordDuration";
import EmojiModal from "./EmojiModal";
import BubbleTail from "./BubbleTail";

function NewMessage({ currentChatRoom }) {
  // Get current message mode
  const messageMode = useSelector((state) => state.chatReducer.mode);

  // Message Input
  const {
    addEmojiToMessage,
    handleInput,
    messageEmpty,
    getCaretIndex,
    emitTypingEvent,
    setMessageEmpty,
  } = useMessageInput({ currentChatRoom });

  // Emoji modal visibility
  const [emojiVisible, setEmojiVisible] = useState(false);

  const isRecording = useMemo(() => messageMode === "recording", [messageMode]);

  const isTyping = useMemo(() => messageMode === "typing", [messageMode]);

  //   Recorder hook to record messages
  const {
    formattedTime,
    startRecording,
    endRecording,
    playRecording,
    clearRecording,
    pauseRecording,
  } = useRecorder({ currentChatRoom });

  return (
    <div className="flex flex-col shrink-0">
      <div className="flex items-end gap-[1.5rem] sm:gap-0">
        {/* Message form bubble */}
        <div
          className={` overflow-x-hidden flex-grow duration-75 flex items-end ${
            isRecording ? "mr-[6rem]" : "mr-0"
          }`}
        >
          {/* Message form */}
          <div
            className={`bg-primary px-[1.5rem] py-[1rem] rounded-2xl rounded-br-none flex-grow flex items-end  overflow-x-hidden`}
          >
            {/* Emoji picker */}
            <IconWrapper
              onClick={() => setEmojiVisible((prevState) => !prevState)}
              className="shrink-0"
            >
              {emojiVisible && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 16 16"
                >
                  <g fill="currentColor" className="fill-secondary-text">
                    <path d="M14 5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12zM2 4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2z" />
                    <path d="M13 10.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm0-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5 0A.25.25 0 0 1 8.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 8 8.75v-.5zm2 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-.5zm1 2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5-2A.25.25 0 0 1 6.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 6 8.75v-.5zm-2 0A.25.25 0 0 1 4.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 4 8.75v-.5zm-2 0A.25.25 0 0 1 2.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 2 8.75v-.5zm11-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0A.25.25 0 0 1 9.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 9 6.75v-.5zm-2 0A.25.25 0 0 1 7.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 7 6.75v-.5zm-2 0A.25.25 0 0 1 5.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 5 6.75v-.5zm-3 0A.25.25 0 0 1 2.25 6h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 2 6.75v-.5zm0 4a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm2 0a.25.25 0 0 1 .25-.25h5.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-5.5a.25.25 0 0 1-.25-.25v-.5z" />
                  </g>
                </svg>
              )}

              {!emojiVisible && (
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
              )}
            </IconWrapper>

            {/* Message Input */}
            <MessageInput
              isRecording={isRecording}
              handleInput={handleInput}
              messageEmpty={messageEmpty}
              getCaretIndex={getCaretIndex}
              emitTypingEvent={emitTypingEvent}
            />

            <AttachFileOrRecordDuration
              isRecording={isRecording}
              formattedTime={formattedTime}
            />
          </div>
          <BubbleTail fillColor="fill-primary stroke-primary" />
        </div>

        {/* Action buttons to record stop recording and send messages or voice notes */}
        <CTAButtons
          startRecording={startRecording}
          endRecording={endRecording}
          isTyping={isTyping}
          isRecording={isRecording}
          clearRecording={clearRecording}
          pauseRecording={pauseRecording}
          setMessageEmpty={setMessageEmpty}
        />
      </div>

      {/* Modals */}
      {/* To pick emoji */}
      <EmojiModal
        emojiVisible={emojiVisible}
        setEmojiVisible={setEmojiVisible}
        addEmojiToMessage={addEmojiToMessage}
      />

      {/* To attach either video or photo */}
      <AttachFileModal />
      {/* Ask confirmation to stop recording if user types into keyboard while recording */}
      <StopRecordModal
        playRecording={playRecording}
        clearRecording={clearRecording}
      />
    </div>
  );
}

export default NewMessage;
