import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../store/notificationSlice";
import { motion, AnimatePresence } from "framer-motion";

function Notification() {
  const notifications = useSelector((state) => state.notificationReducer);
  const dispatch = useDispatch();

  return (
    <div className="absolute right-0 z-[10000] space-y-[.5rem]">
      <AnimatePresence>
        {notifications.map(({ message, type, id }) => (
          <motion.div
            initial={{
              translateX: "32rem",
              opacity: 0.5,
            }}
            animate={{
              translateX: 0,
              opacity: 1,
            }}
            exit={{
              translateX: "32rem",
              opacity: 0.5,
            }}
            key={id}
            className={`bg-primary border-l-[3px] flex justify-between pl-[2rem] w-[30rem] rounded-l-[.5rem] ${
              type === "error" && "border-l-danger"
            }`}
          >
            <span className="my-[3rem] mr-[.5rem]">{message}</span>
            <span
              onClick={() =>
                dispatch(notificationActions.removeNotification(id))
              }
              className="flex items-center justify-center w-[4.5rem] hover:bg-secondary-light-text"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"
                />
              </svg>
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default Notification;
