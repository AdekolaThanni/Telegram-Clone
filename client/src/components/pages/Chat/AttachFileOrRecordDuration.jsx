import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import IconWrapper from "../../globals/IconWrapper";

function AttachFileOrRecordDuration({ isRecording, formattedTime }) {
  const dispatch = useDispatch();
  //   If user is not recording, show them option to attach an image or video
  if (!isRecording)
    return (
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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m15.172 7l-6.586 6.586a2 2 0 1 0 2.828 2.828l6.414-6.586a4 4 0 0 0-5.656-5.656l-6.415 6.585a6 6 0 1 0 8.486 8.486L20.5 13"
            className="fill-transparent"
          />
        </svg>
      </IconWrapper>
    );

  if (isRecording)
    return (
      <div className="self-center flex items-center gap-[1rem]">
        <span>{formattedTime}</span>
        <span className="w-[1rem] h-[1rem] bg-danger rounded-full animate-pulse">
          &nbsp;
        </span>
      </div>
    );
}

export default AttachFileOrRecordDuration;
