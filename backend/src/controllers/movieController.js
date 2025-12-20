const Movie = require("../models/Movie");

// GET MOVIE BY ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// RATE MOVIE (logged-in users only)
exports.rateMovie = async (req, res) => {
  try {
    const { rating } = req.body;
    const userId = req.userId;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be 1–5" });
    }

    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const existingRating = movie.ratings.find(
      r => r.user.toString() === userId
    );

    if (existingRating) {
      existingRating.value = rating;
    } else {
      movie.ratings.push({ user: userId, value: rating });
    }

    // calculate average rating
    const sum = movie.ratings.reduce((acc, r) => acc + r.value, 0);
    movie.averageRating = sum / movie.ratings.length;

    await movie.save();

    res.json({
      message: "Rating saved",
      averageRating: movie.averageRating,
      ratingsCount: movie.ratings.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// CREATE MOVIE
exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// GET ALL MOVIES
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
