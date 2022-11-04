const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  // Username
  username: {
    type: String,
    required: true,
  },
  phoneNumber: { type: String, required: true },
  //   Bio, shouldn't be more than 100 characters
  bio: {
    type: String,
    min: 1,
    max: 100,
  },
  //   User profile image (Avatar)
  avatar: String,
  //   User contacts
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", Schema);
