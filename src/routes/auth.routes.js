const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/send-otp", authController.isUserExist);
router.post("/verify-otp", authController.verifyOtp);

module.exports = router;
