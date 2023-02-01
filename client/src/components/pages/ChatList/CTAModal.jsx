import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import { sidebarActions } from "../../../store/sidebarSlice";
import Modal from "../../globals/Modal";
import ModalChild from "../../globals/ModalChild";

function CTAModal() {
  const dispatch = useDispatch();
  return (
    <Modal className="origin-bottom-right" typeValue="ctaModal">
      {/* Create Group chat */}
      {/* <ModalChild
        onClick={() => {
          dispatch(modalActions.closeModal());
          dispatch(
            sidebarActions.changeActivePage({ newActivePage: "selectContacts" })
          );
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 48 48"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M17 24c3.867 0 7-3.133 7-7s-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7Zm5-7c0 2.763-2.237 5-5 5s-5-2.237-5-5s2.237-5 5-5s5 2.237 5 5ZM4 38v-5.6c0-4.256 8.661-6.4 13-6.4c2.886 0 7.685.949 10.575 2.837C29.635 28.28 31.894 28 33.5 28c1.858 0 4.351.374 6.41 1.13c1.026.378 2.009.874 2.752 1.516c.749.647 1.338 1.522 1.338 2.62V38H4Zm2-5.6c0-.317.146-.751.766-1.315c.633-.576 1.607-1.134 2.84-1.62C12.077 28.49 15.077 28 17 28s4.924.49 7.393 1.465c1.234.486 2.208 1.044 2.84 1.62c.621.564.767.998.767 1.315V36H6v-3.6Zm23.353-1.93c1.513-.313 3.03-.47 4.147-.47c1.647 0 3.903.34 5.72 1.008c.909.334 1.644.728 2.135 1.152c.485.419.645.787.645 1.107V36H30v-3.6c0-.7-.235-1.345-.647-1.93ZM39 20.5c0 3.039-2.461 5.5-5.5 5.5a5.499 5.499 0 0 1-5.5-5.5c0-3.039 2.461-5.5 5.5-5.5s5.5 2.461 5.5 5.5ZM33.5 24c1.934 0 3.5-1.566 3.5-3.5S35.434 17 33.5 17a3.498 3.498 0 0 0-3.5 3.5c0 1.934 1.566 3.5 3.5 3.5Z"
            clip-rule="evenodd"
          />
        </svg>
        New Group
      </ModalChild> */}
      {/* Create Private Chat */}
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
        New Private Chat
      </ModalChild>
    </Modal>
  );
}

export default CTAModal;
