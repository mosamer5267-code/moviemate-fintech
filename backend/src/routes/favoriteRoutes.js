const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require("../controllers/favoriteController");

// Add favorite
router.post("/:movieId", authMiddleware, addFavorite);

// Remove favorite ✅
router.delete("/:movieId", authMiddleware, removeFavorite);

// Get all favorites
router.get("/", authMiddleware, getFavorites);

module.exports = router;
