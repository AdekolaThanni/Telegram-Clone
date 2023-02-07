import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { chatActions } from "../store/chatSlice";
import { notificationActions } from "../store/notificationSlice";
import useFetch from "./useFetch";

const useUpload = (fn, formatsAllowed) => {
  const [base64Format, setBase64Format] = useState();
  const [fileType, setFileType] = useState();
  const [extraFileData, setExtraFileData] = useState();
  const dispatch = useDispatch();

  //   Convert file to base64
  const fileToBase64 = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setBase64Format(reader.result);
    };
  };

  //   Handle file being added to form
  const handleFileUpload = (event) => {
    // Get file
    const file = event.target.files[0];

    setExtraFileData(event.target.extraFileData);

    // Restrict to only files less than 50mb
    const limit = 51200000;

    if (file.size > limit) {
      dispatch(
        notificationActions.addNotification({
          message: "File too large",
          type: "error",
        })
      );
      return;
    }

    // Restrict to only allowed formats
    if (
      !formatsAllowed.some((format) =>
        file.type.toLowerCase().startsWith(format.toLowerCase())
      )
    ) {
      const errorMessage = formatsAllowed.reduce((finalStr, currStr, index) => {
        if (!index) return finalStr;
        else {
          return finalStr + ` or ${currStr}`;
        }
      }, `${formatsAllowed[0]}`);

      dispatch(
        notificationActions.addNotification({
          message: `Only ${errorMessage} allowed`,
          type: "error",
        })
      );

      return;
    }

    const fileTypeStr = file.type.split("/")[0].toLowerCase();
    setFileType(fileTypeStr);
    dispatch(chatActions.setMode({ mode: `${fileTypeStr}Upload` }));

    // Convert file
    fileToBase64(file);
  };

  // Upload file to cloud
  const { reqFn: uploadToCloud, reqState: fileUploadState } = useFetch(
    { method: "POST", url: "/upload" },
    (data) => {
      fn({ ...data.data.uploadData, extraFileData });
      setBase64Format("");
    },
    () => {
      dispatch(chatActions.resetMode());
    }
  );

  useEffect(() => {
    if (base64Format) {
      uploadToCloud({
        data: base64Format,
        fileType: fileType === "audio" ? "video" : fileType,
      });
    }
  }, [base64Format]);

  return {
    handleFileUpload,
    fileUploadState,
    uploadToCloud,
  };
};

export default useUpload;
