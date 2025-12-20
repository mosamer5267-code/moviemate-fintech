const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  addFavorite,
  getFavorites,
} = require("../controllers/userController");

router.post("/favorites/:movieId", auth, addFavorite);
router.get("/favorites", auth, getFavorites);

module.exports = router;
