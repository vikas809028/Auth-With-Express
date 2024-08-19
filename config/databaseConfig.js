const mongoose = require("mongoose");
const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/my_databse";
const databaseconnect = () => {
  mongoose
    .connect(MONGODB_URL)
    .then((conn) =>
      console.log(`Connected to database ${conn.connection.host}`)
    )
    .catch((e) => {
      console.log("error", e.message);
    });
};

module.exports = databaseconnect;
