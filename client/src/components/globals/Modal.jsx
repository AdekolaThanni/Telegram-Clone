import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import Overlay from "./Overlay";

function Modal({ className, children, typeValue }) {
  const { type, positions } = useSelector((state) => state.modalReducer);

  return (
    <AnimatePresence>
      {type === typeValue && (
        <Overlay>
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.2,
              },
            }}
            exit={{
              scale: 0,
              transition: {
                duration: 0.2,
              },
            }}
            className={`bg-primary backdrop-blur-md py-[1rem] px-[.5rem] flex flex-col gap-[.5rem] w-fit rounded-md shadow-sm shadow-[#00000085] absolute ${className}`}
            style={{
              ...positions,
            }}
          >
            {children}
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default Modal;
