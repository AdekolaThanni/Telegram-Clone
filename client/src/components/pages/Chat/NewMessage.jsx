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

function NewMessage() {
  // Get current message mode
  const messageMode = useSelector((state) => state.chatReducer.mode);

  // Message Input
  const { addEmojiToMessage, handleInput, messageEmpty } = useMessageInput();
  const [emojiVisible, setEmojiVisible] = useState(false);

  const isRecording = useMemo(() => messageMode === "recording", [messageMode]);

  const isTyping = useMemo(() => messageMode === "typing", [messageMode]);

  //   Recorder hook to record messages
  const { formattedTime, startRecording, endRecording, playRecording } =
    useRecorder();

  return (
    <div className="flex flex-col shrink-0">
      <div className="flex items-end gap-[1.5rem]">
        {/* Message form bubble */}
        <div
          className={` overflow-x-hidden flex-grow duration-75 flex items-end ${
            isRecording ? "mr-[7rem]" : "mr-0"
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
            <MessageInput
              isRecording={isRecording}
              handleInput={handleInput}
              messageEmpty={messageEmpty}
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
        stopRecording={endRecording}
      />
    </div>
  );
}

export default NewMessage;
