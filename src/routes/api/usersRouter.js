const express = require("express");
const passport = require("passport");
const {
    signup,
    login,
    logout,
    currentUser,
    updateUserBalance,
} = require("../../controllers/userController");
const verifyToken = require("../../middlewares/verifyToken");
const googleAuth = require("../../controllers/googleAuth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", verifyToken, logout);
router.get("/current", verifyToken, currentUser);
router.patch("/balance", verifyToken, updateUserBalance);
// endpoint logowania za pomocą konta Google
router.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

// callback endpoint dla uwierzytelnienia Google
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    googleAuth
);
module.exports = router;
