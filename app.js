const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const DB_URL = process.env.DB_HOST;

const db = mongoose.connect(DB_URL);

const signupRouter = require("./src/routes/signup");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.urlencoded({ extended: true }));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/signup", signupRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
module.exports = { app, db };
