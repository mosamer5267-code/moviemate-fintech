const express = require("express");
const { getAllMovies, searchMovies, getMovieDetails, getSimilarMovies } = require("../controllers/movieController");

const router = express.Router();

// LIST ALL MOVIES
router.get("/", getAllMovies);

// SEARCH MOVIES
router.get("/search", searchMovies);

// GET FULL MOVIE INFO
router.get("/:id", getMovieDetails);

// GET RECOMMENDATIONS
router.get("/:id/similar", getSimilarMovies);

module.exports = router;
