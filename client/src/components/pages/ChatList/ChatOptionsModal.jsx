import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import { chatListActions } from "../../../store/chatListSlice";
import { modalActions } from "../../../store/modalSlice";
import Modal from "../../globals/Modal";
import ModalChild from "../../globals/ModalChild";

function ChatOptionsModal() {
  const chatData = useSelector((state) => state.modalReducer.payload);

  const dispatch = useDispatch();

  // pin chat request function
  const { reqFn: pinChatRoom } = useFetch(
    {
      method: "POST",
      url: `/chatRoom/${chatData.chatRoomId}`,
    },
    () => {
      // Pin chat room
      dispatch(
        chatListActions.pinOrUnpinChat({
          pinned: true,
          chatRoomId: chatData.chatRoomId,
        })
      );
    }
  );

  // unpin chat request function
  const { reqFn: unpinChatRoom } = useFetch(
    {
      method: "PATCH",
      url: `/chatRoom/${chatData.chatRoomId}`,
    },
    () => {
      // unpin chat room
      dispatch(
        chatListActions.pinOrUnpinChat({
          pinned: false,
          chatRoomId: chatData.chatRoomId,
        })
      );
    }
  );

  const pin = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479c-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408l-.002-.001l.002.001zm-.002-.001l.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007l-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458a1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282z"
        className="!stroke-transparent"
      />
    </svg>
  );

  const unpin = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m9 9l1.914 1.914L8 13.828V14h6l2 2h-3v4l-1 3l-1-3v-4H6v-3l3-3V9zm8-7v2l-2 1v5l3 3v2.461l-5-5.001V4h-2v4.46l-2-2V5L7 4V2h10z"
        className="!stroke-transparent"
      />
      <path
        fill="currentColor"
        d="M2.27 2.27L1 3.54L20.46 23l1.27-1.27L11 11z"
        className="!stroke-transparent"
      />
    </svg>
  );

  return (
    <Modal className={`z-10`} typeValue="chatOptions">
      {/* Pin or unpin chat */}
      <ModalChild
        onClick={() => {
          if (!chatData.pinned) {
            pinChatRoom();
          } else {
            unpinChatRoom();
          }

          dispatch(modalActions.closeModal());
        }}
      >
        {chatData.pinned ? unpin : pin}
        {chatData.pinned ? "Unpin" : "Pin"}
      </ModalChild>
      <ModalChild
        onClick={() => {
          dispatch(modalActions.closeModal());

          setTimeout(() => {
            dispatch(
              modalActions.openModal({
                type: chatData.roomType ? "deleteChatModal" : "leaveGroupModal",
                payload: { chatData },
                positions: {},
              })
            );
          }, 210);
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
        {chatData.roomType ? "Delete Chat" : "Leave Group"}
      </ModalChild>
    </Modal>
  );
}

export default ChatOptionsModal;
