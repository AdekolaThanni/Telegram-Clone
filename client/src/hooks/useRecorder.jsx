import { useDispatch } from "react-redux";
import { chatActions } from "../store/chatSlice";
import { useReactMediaRecorder } from "react-media-recorder";
import useSocket from "./socketHooks/useSocket";
import useSendMessage from "./useSendMessage";
import useUpload from "./useUpload";
import useCounter from "./useCounter";

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

  const { formattedTime, setTimingInterval, setCounter, timingInterval } =
    useCounter({ showCentiseconds: true });

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
