const { connect, connection } = require("mongoose");
const { MONGODB_URI } = require("./config");

const connectDB = async () => {
  await connect(MONGODB_URI);
};

connection.on("error", async (err) => {
  console.log(await err);
});

module.exports = {
  connectDB,
  connection,
};
