const express = require("express");
const { signup, login, logout } = require("../../controllers/userController");
const authorize = require("../../middlewares/verifyToken");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", authorize, logout);

module.exports = router;
