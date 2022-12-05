const express = require("express");

const app = express();

app.use(express.json());

const authRouter = require("./routers/authRouter");
const contactsRouter = require("./routers/contactsRouter");

// Routes
app.use("/api/user", authRouter);
app.use("/api/contacts", contactsRouter);

// Error handle middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
