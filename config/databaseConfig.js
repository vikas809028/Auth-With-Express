const mongoose = require("mongoose");
const MONGODB_URL =
  "mongodb+srv://vikastiwari809028:database%40809028@cluster0.dlgt4hc.mongodb.net/AuthWithExpress?retryWrites=true&w=majority";
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
