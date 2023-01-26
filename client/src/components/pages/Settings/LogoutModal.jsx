import React from "react";
import Modal from "../../globals/Modal";
import ModalChild from "../../globals/ModalChild";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/authSlice";
import useSocket from "../../../hooks/socketHooks/useSocket";
import { userActions } from "../../../store/userSlice";

function LogoutModal() {
  const dispatch = useDispatch();
  const { socketEmit } = useSocket();
  const userId = useSelector((state) => state.userReducer.user._id);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    socketEmit("user:offline", userId);
    dispatch(userActions.setUser({ user: {} }));
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
