import { useState, useMemo, useCallback } from "react";

const useCounter = ({ showCentiseconds }) => {
  //   Time counter, updates every second
  const [counter, setCounter] = useState(0);

  //   Time interveal function, in order to be cleared on stopping recording
  const [timingInterval, setTimingInterval] = useState(null);

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

  return { formattedTime, setTimingInterval, setCounter, timingInterval };
};

export default useCounter;
