const express = require("express");
const {
  signup,
  login,
  logout,
  currentUser,
  updateUserBalance,
  loginGoogle,
} = require("../../controllers/userController");
const verifyToken = require("../../middlewares/verifyToken");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", verifyToken, logout);
router.get("/current", verifyToken, currentUser);
router.patch("/balance", verifyToken, updateUserBalance);
router.post("/loginGoogle", loginGoogle);
module.exports = router;
