import { useState, useMemo, useEffect } from "react";

const useCounter = ({ showCentiseconds }) => {
  //   Time counter, updates every second
  const [counter, setCounter] = useState(0);

  // Counter pause/play
  const [played, setPlayed] = useState();

  //   Time interveal function, in order to be cleared on stopping recording
  const [timingInterval, setTimingInterval] = useState(null);

  useEffect(() => {
    if (!played) clearInterval(timingInterval);
    else {
      startCounter();
    }
  }, [played]);

  //   Format duration into centiseconds
  const formattedTime = useMemo(() => {
    // 6000 centiseconds make a minute
    const minutesSpent = String(Math.floor(counter / 6000));
    const secondsSpent = String(
      Math.floor((counter - minutesSpent * 6000) / 100)
    ).padStart(2, "0");
    const centiseconds = String(counter % 100).padStart(2, "0");

    return `${minutesSpent}:${secondsSpent}${
      showCentiseconds ? `,${centiseconds}` : ""
    }`;
  }, [counter]);

  // Start counter
  const startCounter = () => {
    setTimingInterval(
      setInterval(() => {
        setCounter((prevState) => prevState + 1);
      }, 10)
    );
  };

  // Stop counter
  const stopCounter = () => {
    clearInterval(timingInterval);
    setCounter(0);
    setTimingInterval(null);
    setPlayed();
  };

  // Pause and play counter
  const playCounter = (mode) => {
    setPlayed(mode);
  };

  return {
    formattedTime,
    startCounter,
    stopCounter,
    playCounter,
  };
};

export default useCounter;
