const User = require("../models/User");
const Movie = require("../models/Movie");

// ADD TO FAVORITES
exports.addFavorite = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const userId = req.userId; // comes from JWT middleware

    // Check if movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // Add movie if not already saved
    await User.findByIdAndUpdate(userId, {
      $addToSet: { favorites: movieId }
    });

    return res.status(200).json({ message: "Movie added to favorites" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET USER FAVORITES
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("favorites");

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user.favorites);

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
