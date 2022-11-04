const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Connect database
mongoose
  .connect(
    "mongodb+srv://AdekolaThanni:bP9B6aO4NlECmtRk@cluster0.rx6zlo5.mongodb.net/Telegram-Clone?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database connected..."))
  .catch((error) => console.log("An error occured..."));

//   Listen to port
exports.expressServer = app.listen(process.env.PORT || 4000, () =>
  console.log("Listening...")
);
