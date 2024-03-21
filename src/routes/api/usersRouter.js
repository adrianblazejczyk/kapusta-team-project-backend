const express = require("express");
const {
    signup,
    login,
    logout,
    currentUser,
    updateUserBalance,
} = require("../../controllers/userController");
const verifyToken = require("../../middlewares/verifyToken");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", verifyToken, logout);
router.get("/current", verifyToken, currentUser);
router.patch("/balance", verifyToken, updateUserBalance);
module.exports = router;
