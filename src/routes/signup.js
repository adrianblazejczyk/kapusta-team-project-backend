const express = require("express");
const signup = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../schemas/user");
const { newUserAuthSchema } = require("../validators/userValidation");

signup.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = newUserAuthSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { email: newUser.email },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = signup;
