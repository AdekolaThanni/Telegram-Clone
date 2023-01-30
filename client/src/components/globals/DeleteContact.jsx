import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import Modal from "./Modal";
import useFetch from "../../hooks/useFetch";
import { contactsActions } from "../../store/contactsSlice";
import { chatActions } from "../../store/chatSlice";
import { userProfileActions } from "../../store/userProfileSlice";

function DeleteContact() {
  const dispatch = useDispatch();
  const chatRoomId = useSelector(
    (state) => state.chatReducer.currentChatRoom._id
  );
  const contactData = useSelector((state) => state.modalReducer.payload);
  const { reqFn: deleteContact } = useFetch({
    method: "DELETE",
    url: "/contacts",
  });

  const deleteContactHandler = async () => {
    // Hide profile
    dispatch(userProfileActions.hideProfile());
    // Delete contact from database
    await deleteContact({ username: contactData?.profile?.username });
    // Remove contact from redux store
    dispatch(contactsActions.removeContact({ id: contactData?.profile?._id }));
    // Deactivate chat
    dispatch(chatActions.removeChatRoom({ chatRoomId }));
    dispatch(chatActions.setChatUnactive());
  };

  return (
    <Modal
      onClick={() => dispatch(modalActions.closeModal())}
      typeValue="deleteContactModal"
      className="w-[30rem] !px-[2rem] pb-[2rem]"
      canOverlayClose={true}
    >
      <h2 className="font-semibold text-[2rem]">Delete Contact</h2>
      <p className="">
        Are you sure you want to delete {contactData?.profile?.name} contact?
      </p>
      <div className="flex items-center justify-center gap-[2rem] mt-[1rem]">
        <button className="text-cta-icon rounded-md font-semibold uppercase p-[1rem] hover:bg-secondary-light-text">
          Cancel
        </button>
        <button
          onClick={deleteContactHandler}
          className="text-danger rounded-md font-semibold uppercase p-[1rem] hover:bg-secondary-light-text"
        >
          Delete Contact
        </button>
      </div>
    </Modal>
  );
}

export default DeleteContact;
