import { useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { chatActions } from "../store/chatSlice";
import { useReactMediaRecorder } from "react-media-recorder";
import useSocket from "./socketHooks/useSocket";
import useSendMessage from "./useSendMessage";
import useUpload from "./useUpload";

const useRecorder = ({ currentChatRoom }) => {
  const dispatch = useDispatch();
  const { socketEmit } = useSocket();
  const { sendMessage } = useSendMessage();

  const { handleFileUpload } = useUpload(
    (uploadData) => {
      sendMessage({ url: uploadData.public_id });
    },
    ["audio"]
  );

  const {
    startRecording: startMediaRecord,
    stopRecording: stopMediaRecord,
    resumeRecording: playMediaRecord,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    blobPropertyBag: {
      type: "audio/mp3",
    },
    onStop: (_, Blob) => {
      handleFileUpload({ target: { files: [Blob] } });
    },
  });

  //   Time counter, updates every second
  const [counter, setCounter] = useState(0);

  //   Time interveal function, in order to be cleared on stopping recording
  const [timingInterval, setTimingInterval] = useState(null);

  //   Format duration into milliseconds
  const formattedTime = useMemo(() => {
    // 6000 centiseconds make a minute
    const minutesSpent = String(Math.floor(counter / 6000));
    const secondsSpent = String(
      Math.floor((counter - minutesSpent * 6000) / 100)
    );
    const centiseconds = String(counter % 100);
    return `${minutesSpent}:${secondsSpent.padStart(
      2,
      "0"
    )},${centiseconds.padStart(2, "0")}`;
  }, [counter]);

  const startRecording = () => {
    startMediaRecord();
    socketEmit("user:recording", currentChatRoom._id);
    setTimingInterval(
      setInterval(() => {
        setCounter((prevState) => prevState + 1);
      }, 10)
    );
    dispatch(chatActions.setMode({ mode: "recording" }));
  };

  const endRecording = () => {
    stopMediaRecord();
    socketEmit("user:recordingStopped", currentChatRoom._id);
    setCounter(0);
    clearInterval(timingInterval);
    dispatch(chatActions.resetMode());
  };

  const sendRecording = () => {
    endRecording();
  };

  const playRecording = () => {
    playMediaRecord();
  };

  return {
    formattedTime,
    startRecording,
    endRecording,
    playRecording,
    mediaBlobUrl,
  };
};

export default useRecorder;
