const User = require("../models/User");

exports.addFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user.favorites.includes(req.params.movieId)) {
    user.favorites.push(req.params.movieId);
    await user.save();
  }

  res.json({ message: "Added to favorites" });
};

exports.getFavorites = async (req, res) => {
  const user = await User.findById(req.user.id).populate("favorites");
  res.json(user.favorites);
};
