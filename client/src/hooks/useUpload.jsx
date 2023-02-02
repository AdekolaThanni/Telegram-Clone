import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const useUpload = (fn) => {
  const [base64Format, setBase64Format] = useState();

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
    // Convert file
    fileToBase64(file);
  };

  // Upload file to cloud
  const { reqFn: uploadToCloud, reqState: fileUploadState } = useFetch(
    { method: "POST", url: "/upload" },
    (data) => {
      fn(data.data.uploadData);
      setBase64Format("");
    }
  );

  useEffect(() => {
    if (base64Format) {
      uploadToCloud({ data: base64Format });
    }
  }, [base64Format]);

  return {
    handleFileUpload,
    fileUploadState,
  };
};

export default useUpload;
