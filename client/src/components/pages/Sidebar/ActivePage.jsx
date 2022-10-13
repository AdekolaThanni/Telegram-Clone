import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

// Sets animation and styles for all sidebar pages
function ActivePage({ activePageName, children, className }) {
  const activeSlidebarPage = useSelector(
    (state) => state.sidebarReducer.activePage
  );

  let variant = {
    hidden: {
      x: activePageName === "chatList" ? 0 : "40rem",
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      x: activePageName === "chatList" ? "-40rem" : "40rem",
      transition: {
        delay: activePageName === "chatList" ? 0.1 : 0,
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {activeSlidebarPage === activePageName && (
        <motion.div
          className={`absolute w-full h-full bg-primary ${className}`}
          variants={variant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ActivePage;
