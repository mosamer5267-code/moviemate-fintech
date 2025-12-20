const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const movieSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    genres: [String],

    ratings: {
      type: [Number],
      default: [],
    },
    averageRating: {
      type: Number,
      default: 0,
    },

    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
