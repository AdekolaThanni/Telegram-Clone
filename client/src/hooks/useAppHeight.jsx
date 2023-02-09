const useAppHeight = () => {
  const setHeight = () => {
    document.querySelector("#root").style.height = window.innerHeight + "px";
  };

  const deviceWidth = window.matchMedia("(max-width: 1024px)");

  if (deviceWidth.matches) {
    // set an event listener that detects when innerHeight changes:
    window.addEventListener("resize", setHeight);
  }

  // set initial height:
  setHeight();
};

export default useAppHeight;
