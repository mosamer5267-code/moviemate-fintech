const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🍃 MongoDB connected successfully!");
  } catch (error) {
    console.log("❌ MongoDB connection FAILED");
    console.log(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
