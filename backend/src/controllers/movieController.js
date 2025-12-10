const Movie = require("../models/Movie");

// GET ALL MOVIES
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD MOVIE
exports.addMovie = async (req, res) => {
  try {
    const { title, description, rating } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newMovie = await Movie.create({ title, description, rating });

    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET MOVIE BY ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE MOVIE
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE MOVIE
exports.deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
