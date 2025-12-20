const Movie = require("../models/Movie");

// GET ALL MOVIES
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
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
    res.json(movie);
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

// RATE MOVIE (NO AUTH)
exports.rateMovie = async (req, res) => {
  try {
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    movie.ratings.push(rating);
    const sum = movie.ratings.reduce((acc, r) => acc + r, 0);
    movie.averageRating = sum / movie.ratings.length;

    await movie.save();

    res.json({
      message: "Rating submitted",
      averageRating: movie.averageRating,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET COMMENTS (NO AUTH)
exports.getComments = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie.comments || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD COMMENT (NO AUTH)
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const newComment = { text };
    movie.comments.push(newComment);
    await movie.save();

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
