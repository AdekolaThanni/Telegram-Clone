const mongoose = require("mongoose");

const callDetailSchema = new mongoose.Schema({
  callType: String,
  callDuration: String,
  callRejectReason: { type: String, enum: ["Missed", "Busy"] },
});

const MessageSchema = new mongoose.Schema({
  messageType: {
    type: String,
    required: true,
  },
  sender: mongoose.Schema.Types.ObjectId,
  readStatus: {
    type: Boolean,
    default: false,
  },
  deliveredStatus: {
    type: Boolean,
    default: false,
  },
  undeliveredMembers: [mongoose.Schema.Types.ObjectId],
  unreadMembers: [mongoose.Schema.Types.ObjectId],
  timeSent: Date,
  // If text message was sent
  message: String,
  // If image was sent
  imageUrl: String,
  // If call was made
  callDetails: callDetailSchema,
  // If voice note was sent
  voiceNoteUrl: String,
  voiceNoteDuration: String,
});

const Schema = new mongoose.Schema({
  roomType: {
    type: String,
    enum: ["Private", "Group"],
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messageHistory: [{ day: Number, messages: [MessageSchema] }],
});

module.exports = mongoose.model("ChatRoom", Schema);
