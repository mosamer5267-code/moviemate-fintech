const express = require("express");
const router = express.Router();

const {
  getAllMovies,
  getMovieById,
  createMovie,
  rateMovie,
  getComments,
  addComment,
} = require("../controllers/movieController");

// movies
router.get("/", getAllMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);

// ratings (no auth)
router.post("/:id/rate", rateMovie);

// comments (no auth)
router.get("/:id/comments", getComments);
router.post("/:id/comments", addComment);

module.exports = router;
