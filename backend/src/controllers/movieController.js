const Movie = require("../models/Movie");

// =============================
// Add a new movie
// =============================
exports.addMovie = async (req, res) => {
  try {
    const { title, description, rating, year, image } = req.body;

    const newMovie = new Movie({
      title,
      description,
      rating,
      year,
      image,
    });

    await newMovie.save();
    return res.status(201).json({ message: "Movie added successfully", movie: newMovie });

  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =============================
// Get all movies
// =============================
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);

  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =============================
// Get a movie by ID
// =============================
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);

  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =============================
// Update movie
// =============================
exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie updated", updatedMovie });

  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =============================
// Delete movie
// =============================
exports.deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted", deletedMovie });

  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ message: "Server error" });
  }
};
