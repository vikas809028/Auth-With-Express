const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

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
