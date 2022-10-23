import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState, useMemo } from "react";
import CTAIconWrapper from "../../globals/CTAIconWrapper";
import MessageReadStatus from "./MessageReadStatus";

function VoiceMessage({ voiceDetails, received, readStatus, time }) {
  const audioRef = useRef();
  const seekBarRef = useRef();

  const [playing, setPlaying] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [currentDuration, setCurrentDuration] = useState();
  const [totalDuration, setTotalDuration] = useState();

  const formatDuration = (seconds) => {
    const minutes = "" + (seconds / 60).toFixed(0);
    const remainingSeconds = "" + (seconds % 60);

    return `${minutes.padStart(2, 0)}:${remainingSeconds.padStart(2, 0)}`;
  };

  const currentDurationString = useMemo(
    () => formatDuration(currentDuration),
    [currentDuration]
  );

  const totalDurationString = useMemo(
    () => formatDuration(totalDuration),
    [totalDuration]
  );

  const percentageCovered = useMemo(
    () => ((currentDuration / totalDuration) * 100).toFixed(0),
    [currentDuration, totalDuration]
  );

  const playVoiceMessage = () => {
    audioRef.current.play();
    setPlaying(true);
  };

  const pauseVoiceMessage = () => {
    audioRef.current.pause();
    setPlaying(false);
  };

  const handleCanPlay = (event) => {
    setTotalDuration(event.target.duration.toFixed(0));
  };

  const handleTimeUpdate = (event) => {
    setCurrentDuration(event.target.currentTime.toFixed(0));
  };

  const handleSeeking = (event) => {
    if (!seeking) return;
    const clickPositionX = event.clientX;
    const { width: seekBarWidth, left: seekBarPositionX } =
      seekBarRef.current.getBoundingClientRect();
    const difference = clickPositionX - seekBarPositionX;
    const percentage = (difference / seekBarWidth) * 100;

    audioRef.current.currentTime = (percentage / 100) * totalDuration;
  };

  const handleEnding = (event) => {
    event.target.pause();
    event.target.currentTime = 0;
    setPlaying(false);
  };

  return (
    <div
      className={`flex rounded-3xl ${
        received ? "rounded-bl-none" : "rounded-br-none bg-message"
      } p-[1.5rem] gap-[1rem] w-[30rem] h-[7rem] relative`}
    >
      {/* Audio Player */}
      <div className="flex items-center w-full">
        <audio
          ref={audioRef}
          src="http://jplayer.org/audio/m4a/Miaow-07-Bubble.m4a"
          className="hidden"
          id="audioRef"
          onTimeUpdate={handleTimeUpdate}
          onCanPlay={handleCanPlay}
          onEnded={handleEnding}
        ></audio>
        {/* Play and pause Icon */}
        <CTAIconWrapper
          onClick={() => (playing ? pauseVoiceMessage() : playVoiceMessage())}
          className="bg-avatar-check relative"
        >
          {/* Play svg */}
          <AnimatePresence>
            {!playing && (
              <motion.svg
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                  transition: {
                    delay: 0.1,
                  },
                }}
                exit={{
                  scale: 0,
                  transition: {
                    duration: 0.1,
                  },
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 32 32"
              >
                <path
                  fill="white"
                  d="M7 28a1 1 0 0 1-1-1V5a1 1 0 0 1 1.482-.876l20 11a1 1 0 0 1 0 1.752l-20 11A1 1 0 0 1 7 28Z"
                  className="fill-recorder-icon stroke-recorder-icon"
                />
              </motion.svg>
            )}
          </AnimatePresence>

          {/* Pause svg */}
          {playing && (
            <motion.svg
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
                transition: {
                  delay: 0.1,
                },
              }}
              exit={{
                scale: 0,
                transition: {
                  duration: 0.1,
                },
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 20 20"
              className="absolute"
            >
              <path
                fill="currentColor"
                d="M5 16V4h3v12H5zm7-12h3v12h-3V4z"
                className="fill-recorder-icon stroke-recorder-icon"
              />
            </motion.svg>
          )}
        </CTAIconWrapper>

        {/* Play bar */}
        <div
          className=" ml-[1rem] flex-grow bg-message-highlight h-[6px] text-avatar-check relative flex rounded-full"
          ref={seekBarRef}
          onMouseDown={(event) => {
            setSeeking(true);
            handleSeeking(event);
          }}
          onMouseMove={handleSeeking}
          onMouseUp={(event) => {
            handleSeeking(event);
            setSeeking(false);
          }}
          onTouchStart={(event) => {
            setSeeking(true);
            handleSeeking(event);
          }}
          onTouchMove={handleSeeking}
          onTouchEnd={(event) => {
            handleSeeking(event);
            setSeeking(false);
          }}
        >
          {/* Played Audio bar */}
          <span
            style={{ width: `${percentageCovered}%` }}
            className={`bg-avatar-check h-full duration-200 rounded-l-full`}
          >
            &nbsp;
          </span>

          {/* Knob bar */}
          <span
            style={{ left: `${percentageCovered}%` }}
            className="w-[1rem] h-[1rem] bg-avatar-check absolute duration-200 top-1/2 -translate-y-1/2 rounded-full"
          ></span>

          {/* Duration */}
          <span className="absolute top-[.5rem] cursor-default">
            {currentDuration && `${currentDurationString} / `}
            {totalDurationString}
          </span>
        </div>
      </div>

      {!received && (
        <MessageReadStatus
          readStatus={false}
          time={time}
          className="absolute right-[2rem] bottom-[.5rem]"
        />
      )}
    </div>
  );
}

export default VoiceMessage;
