import React from "react";
import Modal from "../../globals/Modal";
import ModalChild from "../../globals/ModalChild";
import useUpload from "../../../hooks/useUpload";
import useSendMessage from "../../../hooks/useSendMessage";

function AttachFileModal() {
  const { sendMessage } = useSendMessage();
  const { handleFileUpload } = useUpload(
    (uploadData) => {
      sendMessage({ url: uploadData.public_id });
    },
    ["Image"]
  );
  return (
    <Modal typeValue="attachFileModal">
      <ModalChild
        onClick={(event) =>
          event.currentTarget.querySelector("#attachFile").click()
        }
      >
        <input
          type="file"
          name="attachFile"
          id="attachFile"
          hidden
          onChange={handleFileUpload}
        />
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
            strokeWidth="1.5"
            d="m2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0a.375.375 0 0 1 .75 0Z"
            className="!fill-transparent"
          />
        </svg>
        Photo
      </ModalChild>
    </Modal>
  );
}

export default AttachFileModal;
