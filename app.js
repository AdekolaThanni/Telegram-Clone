const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const authRouter = require("./routers/authRouter");
const contactsRouter = require("./routers/contactsRouter");
const ReqError = require("./utilities/ReqError");
const errorController = require("./controllers/errorController");

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", authRouter);

// Protector
app.use((req, res, next) => {
  if (!req.cookies.userId)
    return next(new ReqError(400, "You are not logged in"));

  next();
});

app.use("/api/contacts", contactsRouter);

// Error handle middleware
app.use(errorController);

module.exports = app;
