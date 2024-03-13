const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });
const app = require("./app");

const DB_URL = process.env.DB_HOST;
const PORT = process.env.PORT || 3000;

mongoose.connect(DB_URL);

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});

mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected. Trying to reconnect...");
  mongoose.connect(DB_URL);
});

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
