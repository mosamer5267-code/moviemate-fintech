const express = require("express");
const router = express.Router();

const {
  signupUser,
  loginUser,
} = require("../controllers/authController");

// SIGNUP
router.post("/signup", signupUser);

// LOGIN
router.post("/login", loginUser);

module.exports = router;
