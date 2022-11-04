const fs = require("fs");
const mongoose = require("mongoose");
const User = require("./models/User");

// Connect database
mongoose
  .connect(
    "mongodb+srv://AdekolaThanni:bP9B6aO4NlECmtRk@cluster0.rx6zlo5.mongodb.net/Telegram-Clone?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database connected..."));

const data = fs.readFileSync("./usersJson.json", "utf-8");

console.log(data);
User.create(JSON.parse(data)).then(() => console.log("Transferred"));
