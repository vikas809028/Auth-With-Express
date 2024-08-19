const express = require("express");
const authRouter = require("./router/authRoute");
const databaseconnect = require("./config/databaseConfig");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

databaseconnect();
app.use(express.json()); //to parse the serialized data that is in request
app.use(cookieparser()); // to get the details that is in cookie

// if any requesting on /api/auth/signup
app.use("/api/auth", authRouter);

// start middleware

app.use("/", (req, res) => {
  res.status(200).json({
    data: "JWTAuth server",
  });
});

module.exports = app;
