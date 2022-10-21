import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import Modal from "./Modal";

function DeleteChat() {
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.modalReducer.payload);

  return (
    <Modal
      onClick={() => dispatch(modalActions.closeModal())}
      typeValue="deleteChatModal"
      className="w-[30rem] !px-[2rem] pb-[2rem]"
      canOverlayClose={true}
    >
      <h2 className="font-semibold text-[2rem]">Discard chat</h2>
      <p className="">
        Are you sure you want to delete the chat with {chatData?.profile?.title}
      </p>
      <div className="flex items-center justify-center gap-[2rem] mt-[1rem]">
        <button className="text-cta-icon rounded-md font-semibold uppercase p-[1rem] hover:bg-secondary-light-text">
          Cancel
        </button>
        <button className="text-danger rounded-md font-semibold uppercase p-[1rem] hover:bg-secondary-light-text">
          Delete Chat
        </button>
      </div>
    </Modal>
  );
}

export default DeleteChat;
