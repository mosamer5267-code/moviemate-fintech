const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

console.log("authRoutes =", authRoutes);
console.log("movieRoutes =", movieRoutes);
console.log("favoriteRoutes =", favoriteRoutes);


const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect database
connectDB();

// ROOT TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🎉");
});

// main routes
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/favorites", favoriteRoutes);

// run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
