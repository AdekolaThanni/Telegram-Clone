import React from "react";
import { Image as CloudImage, Placeholder } from "cloudinary-react";
import process from "process";

function Image({ src, alt, className }) {
  return (
    <CloudImage
      cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
      publicId={src}
      alt={alt}
      className={`${className} object-center object-cover`}
    >
      <Placeholder type="blur" />
    </CloudImage>
  );
}

export default Image;
