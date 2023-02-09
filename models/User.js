const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const contactSchema = new mongoose.Schema({
  contactDetails: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  chatRoomId: mongoose.Schema.Types.ObjectId,
});

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
    default: "Hi there, I'm using Telegram",
  },
  //   User profile image (Avatar)
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dlanhtzbw/image/upload/v1675343188/Telegram%20Clone/no-profile_aknbeq.jpg",
  },
  //   User contacts
  contacts: [contactSchema],
  // Status, whether user is online or not
  status: {
    online: { type: Boolean, default: true },
    lastSeen: Date,
  },
  //   User password
  password: {
    type: String,
    required: true,
    min: [8, "Password too short"],
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (givenPassword) {
        return givenPassword === this.password;
      },
      message: "Passwords do not match",
    },
  },
  // Chat rooms user belongs to
  chatRooms: [mongoose.Schema.Types.ObjectId],
  // Pinned chat rooms by user
  pinnedChatRooms: [],
  // Unread messages
  unreadMessages: [{}],
  // Undelivered messages
  undeliveredMessages: [{}],
});

Schema.pre("save", async function (next) {
  if (!this.$isNew) this.$ignore("password");
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
