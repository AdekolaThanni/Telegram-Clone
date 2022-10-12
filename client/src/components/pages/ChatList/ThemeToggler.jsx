import React, { useEffect } from "react";
import { useState } from "react";

function ThemeToggler() {
  const [darkMode, setDarkMode] = useState(null);

  useEffect(() => {
    if (darkMode === null) {
      setDarkMode(JSON.parse(localStorage.getItem("darkMode")));
    } else {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
      document
        .querySelector("html")
        .setAttribute("class", darkMode ? "dark" : "null");
    }
  }, [darkMode]);

  return (
    <div
      onClick={() => setDarkMode((prevState) => !prevState)}
      className={`w-[3.5rem] h-[1.5rem] rounded-full relative ${
        !darkMode ? "bg-secondary justify-start" : "bg-cta-icon justify-end"
      }`}
    >
      <span
        style={{ transition: "left 2s" }}
        className={`w-[2rem] h-[2rem] rounded-full border-2 bg-primary absolute top-1/2 -translate-y-1/2 ${
          !darkMode ? "border-secondary left-0" : "border-cta-icon right-0"
        }`}
      ></span>
    </div>
  );
}

export default ThemeToggler;
