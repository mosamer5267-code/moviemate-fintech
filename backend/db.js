const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI;
  console.log("🟢 Loaded MONGO_URI in db.js:", uri);

  if (!uri) {
    console.error("❌ No MongoDB URI found. Check your .env file.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("💚 MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection FAILED");
    console.error(err.message);
  }
}

module.exports = connectDB;
