const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllMovies,   // 👈 ADD THIS
  getMovieById,
  rateMovie,
  createMovie
} = require("../controllers/movieController");

// GET ALL MOVIES ✅
router.get("/", getAllMovies);

// CREATE movie
router.post("/", createMovie);

// GET movie details
router.get("/:id", getMovieById);

// RATE movie (logged-in users only)
router.post("/:id/rate", authMiddleware, rateMovie);

module.exports = router;
