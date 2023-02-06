import React from "react";
import Modal from "./Modal";
import usePeer from "../../hooks/usePeer";
import { useSelector } from "react-redux";
import CTAIconWrapper from "./CTAIconWrapper";
import callReceiverTone from "../../assets/Receiver Call Request Tone.mp3";
import callSenderTone from "../../assets/Sender Call Request Tone.mp3";

function VideoCallModal() {
  const { partnerProfile, callDetail } = useSelector(
    (state) => state.modalReducer.payload
  );

  const {
    userMediaRef,
    callStatus,
    partnerMediaRef,
    acceptCall,
    callAccepted,
    endCall,
    denyCall,
    duration,
  } = usePeer({
    mediaOptions: { video: true, audio: true },
    callDetail,
    partnerProfile,
  });

  return (
    <Modal
      typeValue="videoCallModal"
      canOverlayClose={false}
      className="!h-full !w-full !py-0 !px-0"
    >
      {/* Partner video */}
      <video
        ref={partnerMediaRef}
        className={`${
          callAccepted ? "w-full h-full object-cover object-center" : "hidden"
        }`}
        autoPlay
        playsInline
      />

      {/* User video */}
      <video
        ref={userMediaRef}
        className={`rounded-lg duration-100 object-cover object-center ${
          callAccepted
            ? "w-[30rem] h-[30rem] absolute bottom-0 right-0 md:w-[12rem] md:h-[25rem]"
            : "w-full h-full"
        }`}
        autoPlay
        playsInline
        muted
      />

      <div
        className={`duration-100 flex items-center text-white ${
          callAccepted
            ? "left-[5rem] top-[3rem] gap-[3rem] absolute"
            : "pt-[5rem] text-center w-full absolute flex-col gap-[1rem]"
        }`}
      >
        <p className="text-[2.5rem] font-semibold">
          {partnerProfile?.name || partnerProfile?.username}
        </p>
        {/* Call progress */}
        <span className="capitalize">
          {callAccepted ? duration : `${callStatus}...`}
        </span>
      </div>

      {/* Pick call buttons */}
      <div className="flex gap-[20rem] mt-auto mb-[5rem] absolute left-[50%] -translate-x-[50%] bottom-[5rem]">
        <div
          onClick={() => (callAccepted ? endCall() : denyCall("Busy"))}
          className=""
        >
          <CTAIconWrapper className="bg-danger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M15.897 9c.125.867.207 2.053-.182 2.507c-.643.751-4.714.751-4.714-.751c0-.756.67-1.252.027-2.003c-.632-.738-1.766-.75-3.027-.751s-2.394.012-3.027.751c-.643.751.027 1.247.027 2.003c0 1.501-4.071 1.501-4.714.751C-.102 11.053-.02 9.867.105 9c.096-.579.339-1.203 1.118-2c1.168-1.09 2.935-1.98 6.716-2h.126c3.781.019 5.548.91 6.716 2c.778.797 1.022 1.421 1.118 2z"
                className="fill-white stroke-transparent"
              />
            </svg>
          </CTAIconWrapper>
        </div>
        {!callAccepted && !callDetail.caller && (
          <div onClick={acceptCall} className="mt-auto mb-[5rem]">
            <CTAIconWrapper className="bg-[#0ac630]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M15.897 9c.125.867.207 2.053-.182 2.507c-.643.751-4.714.751-4.714-.751c0-.756.67-1.252.027-2.003c-.632-.738-1.766-.75-3.027-.751s-2.394.012-3.027.751c-.643.751.027 1.247.027 2.003c0 1.501-4.071 1.501-4.714.751C-.102 11.053-.02 9.867.105 9c.096-.579.339-1.203 1.118-2c1.168-1.09 2.935-1.98 6.716-2h.126c3.781.019 5.548.91 6.716 2c.778.797 1.022 1.421 1.118 2z"
                  className="fill-white stroke-transparent"
                />
              </svg>
            </CTAIconWrapper>
          </div>
        )}
      </div>

      {/* Ringtones */}
      {callDetail.caller && !callAccepted && (
        <audio
          src={callSenderTone}
          autoPlay
          playsInline
          loop
          hidden
          controlsList="nodownload"
        />
      )}
      {!callDetail.caller && !callAccepted && (
        <audio
          src={callReceiverTone}
          autoPlay
          playsInline
          loop
          hidden
          controlsList="nodownload"
        />
      )}
    </Modal>
  );
}

export default VideoCallModal;
