import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import Modal from "../../globals/Modal";

function StopRecordModal({ playRecording, clearRecording }) {
  const dispatch = useDispatch();

  return (
    <Modal
      onClick={() => dispatch(modalActions.closeModal())}
      typeValue="stopRecordModal"
      className="w-[30rem] !px-[2rem] pb-[2rem]"
      canOverlayClose={false}
    >
      <h2 className="font-semibold text-[2rem]">Discard Voice Message</h2>
      <p className="">
        Are you sure you want to stop recording and discard your voice message
      </p>
      <div className="flex items-center justify-center gap-[2rem] mt-[1rem]">
        <button
          onClick={playRecording}
          className="text-cta-icon rounded-md font-semibold uppercase p-[1rem] hover:bg-secondary-light-text"
        >
          Continue
        </button>
        <button
          onClick={clearRecording}
          className="text-danger rounded-md font-semibold uppercase p-[1rem] hover:bg-secondary-light-text"
        >
          Discard
        </button>
      </div>
    </Modal>
  );
}

export default StopRecordModal;
