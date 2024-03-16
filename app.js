const express = require("express");
require("dotenv").config();
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const usersRouter = require("./src/routes/api/usersRouter");

const DB_URL = process.env.DB_HOST;
const db = mongoose.connect(DB_URL);

const app = express();
app.use(express.static(path.join(__dirname, "public")));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.urlencoded({ extended: true }));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
module.exports = { app, db };
