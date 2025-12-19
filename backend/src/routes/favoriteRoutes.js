const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addFavorite,
  getFavorites,
} = require("../controllers/favoriteController");

router.post("/:movieId", authMiddleware, addFavorite);
router.get("/", authMiddleware, getFavorites);

module.exports = router;
