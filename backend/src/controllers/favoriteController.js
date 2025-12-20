const User = require("../models/User");
const Movie = require("../models/Movie");

// ADD TO FAVORITES
exports.addFavorite = async (req, res) => {
  try {
    const userId = req.userId;
    const movieId = req.params.movieId;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await User.findByIdAndUpdate(userId, {
      $addToSet: { favorites: movieId },
    });

    res.status(200).json({ message: "Movie added to favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REMOVE FROM FAVORITES ✅
exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.userId;
    const movieId = req.params.movieId;

    await User.findByIdAndUpdate(userId, {
      $pull: { favorites: movieId },
    });

    res.status(200).json({ message: "Movie removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET FAVORITES
exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("favorites");
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
