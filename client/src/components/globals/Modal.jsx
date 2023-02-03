import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import Overlay from "./Overlay";

function Modal({ className, children, typeValue, canOverlayClose, onClick }) {
  const { type, positions } = useSelector((state) => state.modalReducer);

  return (
    <AnimatePresence>
      {type === typeValue && (
        <Overlay canOverlayClose={canOverlayClose === false ? false : true}>
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
            className={`bg-modal backdrop-blur-[100px] py-[1rem] px-[.5rem] flex flex-col gap-[.5rem] w-fit rounded-md shadow-md shadow-box-shadow absolute ${className}`}
            id="modal"
            style={{
              ...positions,
            }}
            onClick={onClick}
          >
            {children}
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default Modal;
