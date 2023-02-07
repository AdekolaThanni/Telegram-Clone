const catchAsyncError = require("../utilities/catchAsyncError");
const ReqError = require("../utilities/ReqError.js");
const { cloudinary } = require("../utilities/Cloudinary.js");

module.exports = catchAsyncError(async (req, res, next) => {
  const fileBase64 = req.body.data;

  const uploadData = await cloudinary.uploader
    .upload(fileBase64, {
      upload_preset: "telegram_preset",
      resource_type: req.body.fileType,
      width: 400,
      height: 400,
      crop: "limit",
    })
    .catch((error) => console.log(error));

  if (!uploadData) {
    return next(new ReqError(500, "Upload failed"));
  }

  res.status(200).json({
    status: "success",
    data: {
      uploadData,
    },
  });
});
