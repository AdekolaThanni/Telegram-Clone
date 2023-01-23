import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import { sidebarActions } from "../../../store/sidebarSlice";
import IconWrapper from "../../globals/IconWrapper";
import Modal from "../../globals/Modal";
import ModalChild from "../../globals/ModalChild";
import ThemeToggler from "./ThemeToggler";

function Menu() {
  const dispatch = useDispatch();
  const menuActive = useSelector((state) => state.modalReducer.type === "menu");

  return (
    <>
      <IconWrapper
        onClick={() => {
          dispatch(
            modalActions.openModal({
              type: "menu",
              positions: { left: 12, top: 50 },
            })
          );
        }}
        active={menuActive}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 8h24M4 16h24M4 24h24"
            className=""
          />
        </svg>
      </IconWrapper>
      <Modal typeValue="menu" className="origin-top-left gap-[1rem]">
        {/* Contacts */}
        <ModalChild
          onClick={() => {
            dispatch(modalActions.closeModal());
            dispatch(
              sidebarActions.changeActivePage({ newActivePage: "contacts" })
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M8 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1s1-4 6-4s6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664h10z"
              className="!stroke-transparent"
            />
          </svg>
          Contacts
        </ModalChild>
        <ModalChild
          onClick={() => {
            dispatch(modalActions.closeModal());
            dispatch(
              sidebarActions.changeActivePage({ newActivePage: "settings" })
            );
          }}
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
              d="M27 16.76v-1.53l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1a2 2 0 0 0-.64.1l-2.43.82a11.35 11.35 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.48 11.48 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .41 2.51L5 15.24v1.53l-1.89 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1a2 2 0 0 0 .64-.1l2.43-.82a11.35 11.35 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.48 11.48 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1a2 2 0 0 0 1.73-1l2.28-4a2 2 0 0 0-.41-2.51ZM25.21 24l-3.43-1.16a8.86 8.86 0 0 1-2.71 1.57L18.36 28h-4.72l-.71-3.55a9.36 9.36 0 0 1-2.7-1.57L6.79 24l-2.36-4l2.72-2.4a8.9 8.9 0 0 1 0-3.13L4.43 12l2.36-4l3.43 1.16a8.86 8.86 0 0 1 2.71-1.57L13.64 4h4.72l.71 3.55a9.36 9.36 0 0 1 2.7 1.57L25.21 8l2.36 4l-2.72 2.4a8.9 8.9 0 0 1 0 3.13L27.57 20Z"
              className="!stroke-transparent"
            />
            <path
              fill="currentColor"
              d="M16 22a6 6 0 1 1 6-6a5.94 5.94 0 0 1-6 6Zm0-10a3.91 3.91 0 0 0-4 4a3.91 3.91 0 0 0 4 4a3.91 3.91 0 0 0 4-4a3.91 3.91 0 0 0-4-4Z"
              className="!stroke-transparent"
            />
          </svg>
          Settings
        </ModalChild>
        <ModalChild
          onClick={(event) => {
            event.target.querySelector("div").click();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.353 3C5.849 4.408 3 7.463 3 11.47A9.53 9.53 0 0 0 12.53 21c4.007 0 7.062-2.849 8.47-6.353C8.17 17.065 8.14 8.14 9.353 3z"
              className="!fill-transparent"
            />
          </svg>
          <div className="flex items-center gap-[5rem]">
            Dark Mode
            <ThemeToggler />
          </div>
        </ModalChild>
      </Modal>
    </>
  );
}

export default Menu;
