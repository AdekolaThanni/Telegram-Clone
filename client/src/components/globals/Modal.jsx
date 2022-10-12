import React from "react";
import { motion } from "framer-motion";

function Modal({ className, children }) {
  return (
    <motion.div
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
        transitionDuration: 0.2,
      }}
      exit={{
        scale: 0,
        transitionDuration: 0.2,
      }}
      className={`bg-primary backdrop-blur-md py-[1rem] px-[.5rem] flex flex-col gap-[.5rem] w-fit rounded-md shadow-sm shadow-[#00000085] absolute ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default Modal;
