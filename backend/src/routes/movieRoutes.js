const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");

// LIST ALL MOVIES
router.get("/", movieController.getAllMovies);

// ADD MOVIE
router.post("/", movieController.addMovie);

// GET ONE MOVIE
router.get("/:id", movieController.getMovieById);

// UPDATE MOVIE
router.put("/:id", movieController.updateMovie);

// DELETE MOVIE
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
