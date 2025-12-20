const express = require("express");
const router = express.Router();

const {
  getAllMovies,
  getMovieById,
  createMovie,
  rateMovie,
  getComments,
  addComment,
  getSimilarMovies,
} = require("../controllers/movieController");

router.get("/", getAllMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);

router.post("/:id/rate", rateMovie);

// comments
router.get("/:id/comments", getComments);
router.post("/:id/comments", addComment);

// similar movies
router.get("/:id/similar", getSimilarMovies);

module.exports = router;
