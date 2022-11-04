const mongoose = require("Mongoose");

const Schema = new mongoose.Schema({
  messageType: {
    type: String,
    required: true,
  },
  sender: mongoose.Schema.Types.ObjectId,
  receiver: monggose.Schema.Types.ObjectId,
  readStatus: false,
  timeSent: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Message", Schema);
