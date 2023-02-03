import React from "react";
import {
  Image as CloudImage,
  Placeholder,
  Transformation,
} from "cloudinary-react";

function Image({ src, alt, className }) {
  return (
    <CloudImage
      cloudName="dlanhtzbw"
      publicId={src}
      alt={alt}
      className={`${className} object-center object-cover`}
    >
      <Placeholder type="blur" />
    </CloudImage>
  );
}

export default Image;
