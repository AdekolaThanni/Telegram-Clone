import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import Modal from "../../globals/Modal";
import ModalChild from "../../globals/ModalChild";

function ActionsModal({ chatProfile }) {
  const dispatch = useDispatch();
  const chatRoom = useSelector((state) => state.chatReducer.currentChatRoom);
  return (
    <Modal typeValue="actionsModal" className="origin-top-right !w-[18rem]">
      <ModalChild
        onClick={() => {
          dispatch(
            modalActions.openModal({
              type: "voiceCallModal",
              modalChange: true,
              payload: {
                partnerProfile: chatProfile,
                callDetail: { caller: true },
              },
              positions: {},
            })
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
            d="M26 29h-.17C6.18 27.87 3.39 11.29 3 6.23A3 3 0 0 1 5.76 3h5.51a2 2 0 0 1 1.86 1.26L14.65 8a2 2 0 0 1-.44 2.16l-2.13 2.15a9.37 9.37 0 0 0 7.58 7.6l2.17-2.15a2 2 0 0 1 2.17-.41l3.77 1.51A2 2 0 0 1 29 20.72V26a3 3 0 0 1-3 3ZM6 5a1 1 0 0 0-1 1v.08C5.46 12 8.41 26 25.94 27a1 1 0 0 0 1.06-.94v-5.34l-3.77-1.51l-2.87 2.85l-.48-.06c-8.7-1.09-9.88-9.79-9.88-9.88l-.06-.48l2.84-2.87L11.28 5Z"
            className="!stroke-transparent"
          />
        </svg>
        Call
      </ModalChild>
      <ModalChild
        onClick={() => {
          dispatch(
            modalActions.openModal({
              type: "videoCallModal",
              payload: {
                partnerProfile: chatProfile,
                callDetail: { caller: true },
              },
              positions: {},
            })
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
            d="M2 8v16h22v-3.375l4.563 2.28l1.437.72V8.375l-1.438.72L24 11.374V8H2zm2 2h18v12H4V10zm24 1.625v8.75l-4-2v-4.75l4-2z"
            className="!stroke-transparent"
          />
        </svg>
        Video Call
      </ModalChild>
      <ModalChild
        onClick={() => {
          dispatch(
            modalActions.openModal({
              type: chatRoom.roomType ? "deleteChatModal" : "leaveGroupModal",
              payload: { chatData: chatRoom },
              positions: {},
            })
          );
        }}
        className="text-danger"
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
            d="M9 7v0a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0M9 7h6M9 7H6m9 0h3m2 0h-2M4 7h2m0 0v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"
            className="!fill-transparent !stroke-danger"
          />
        </svg>
        {chatRoom.roomType === "Private" ? "Delete Chat" : "Leave Group"}
      </ModalChild>
    </Modal>
  );
}

export default ActionsModal;
