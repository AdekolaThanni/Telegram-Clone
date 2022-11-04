const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/User");

dotenv.config({ path: "./.env" });

// Connect database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected..."));

const data = fs.readFileSync("./usersJson.json", "utf-8");

console.log(data);
User.create(JSON.parse(data)).then(() => console.log("Transferred"));
// sophieXR, adekolathanni
