import { useDispatch } from "react-redux";
import { chatActions } from "../store/chatSlice";
import { useReactMediaRecorder } from "react-media-recorder";
import useSocket from "./socketHooks/useSocket";
import useSendMessage from "./useSendMessage";
import useUpload from "./useUpload";
import useCounter from "./useCounter";
import { useState } from "react";
import { useEffect } from "react";

const useRecorder = ({ currentChatRoom }) => {
  const dispatch = useDispatch();
  const { socketEmit } = useSocket();
  const { sendMessage } = useSendMessage();
  const [blob, setBlob] = useState();
  const [recordSend, setRecordSend] = useState();

  const { handleFileUpload } = useUpload(
    (uploadData) => {
      sendMessage({ url: uploadData.public_id, ...uploadData.extraFileData });
    },
    ["audio"]
  );

  const { formattedTime, playCounter, startCounter, stopCounter } = useCounter({
    showCentiseconds: true,
  });

  useEffect(() => {
    if (recordSend) {
      handleFileUpload({
        target: {
          files: [blob],
          extraFileData: { duration: formattedTime.split(",")[0] },
        },
      });
      setRecordSend(false);
    }

    stopCounter();
  }, [blob]);

  const {
    startRecording: startMediaRecord,
    stopRecording: stopMediaRecord,
    resumeRecording: playMediaRecord,
    pauseRecording: pauseMediaRecord,
    clearBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    askPermissionOnMount: true,
    blobPropertyBag: {
      type: "audio/mp3",
    },
    onStop: (_, Blob) => {
      setBlob(Blob);
    },
  });

  const startRecording = () => {
    startMediaRecord();
    socketEmit("user:recording", currentChatRoom._id);
    startCounter();
    dispatch(chatActions.setMode({ mode: "recording" }));
  };

  const endRecording = () => {
    setRecordSend(true);
    clearRecording();
  };

  const clearRecording = () => {
    stopMediaRecord();
    socketEmit("user:recordingStopped", currentChatRoom._id);
    dispatch(chatActions.resetMode());
  };

  const playRecording = () => {
    playMediaRecord();
    playCounter(true);
    socketEmit("user:recording", currentChatRoom._id);
  };

  const pauseRecording = () => {
    pauseMediaRecord();
    socketEmit("user:recording", currentChatRoom._id);
    playCounter(false);
  };

  return {
    formattedTime,
    startRecording,
    clearRecording,
    endRecording,
    playRecording,
    pauseRecording,
  };
};

export default useRecorder;
