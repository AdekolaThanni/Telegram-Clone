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
      transformX: "-2rem",
    },
    visible: {
      transformX: "0",
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      transformX: "-2rem",
      transition: {
        duration: 0.2,
      },
    },
  };

  //   If activePageName is ChatList, animations should be omitted
  variant = activePageName === "chatList" ? {} : variant;

  return (
    <AnimatePresence>
      {activeSlidebarPage === activePageName && (
        <motion.div
          className={`w-full h-full bg-primary ${className}`}
          variants={variant}
          initial="hidden"
          animation="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ActivePage;
