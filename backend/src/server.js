const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../db");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/favorites", favoriteRoutes);

// DB + Server
connectDB();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
