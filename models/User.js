const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = new mongoose.Schema({
  // name
  name: {
    type: String,
    required: true,
  },
  // Username
  username: {
    unique: true,
    type: String,
    required: true,
    lower: true,
  },
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
  //   User password
  password: { type: String, required: true, min: [8, "Password too short"] },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (givenPassword) {
        return givenPassword === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

Schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

Schema.methods.checkPasswordValidity = async (
  givenPassword,
  originalPassword
) => await bcrypt.compare(givenPassword, originalPassword);

module.exports = mongoose.model("User", Schema);
