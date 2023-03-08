import React from "react";
import Modal from "../../globals/Modal";
import ModalChild from "../../globals/ModalChild";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/authSlice";
import useSocket from "../../../hooks/useSocket";
import { userActions } from "../../../store/userSlice";
import { chatActions } from "../../../store/chatSlice";
import { chatListActions } from "../../../store/chatListSlice";
import { userProfileActions } from "../../../store/userProfileSlice";
import { sidebarActions } from "../../../store/sidebarSlice";
import { contactsActions } from "../../../store/contactsSlice";

function LogoutModal() {
  const dispatch = useDispatch();
  const { socketEmit, socket } = useSocket();
  const userId = useSelector((state) => state.userReducer.user._id);

  const logoutHandler = () => {
    socketEmit("user:offline", userId);
    socket.disconnect();

    // Reset states
    dispatch(authActions.logout());
    dispatch(userActions.setUser({ user: {} }));
    dispatch(chatActions.resetChat());
    dispatch(chatActions.setChatUnactive());
    dispatch(chatListActions.setChatList({ chatList: [] }));
    dispatch(userProfileActions.hideProfile());
    dispatch(userProfileActions.setProfile({}));
    dispatch(sidebarActions.changeActivePage({ newActivePage: "chatList" }));
    dispatch(contactsActions.setContacts([]));
  };

  return (
    userId && (
      <Modal typeValue="logoutModal" className="origin-top-right">
        <ModalChild onClick={logoutHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
              className="!stroke-transparent"
            />
          </svg>
          Logout
        </ModalChild>
      </Modal>
    )
  );
}

export default LogoutModal;
