const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    value: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    }
  },
  { _id: false }
);

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    genres: {
      type: [String],
      default: []
    },
    ratings: {
      type: [ratingSchema],
      default: []
    },
    averageRating: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
