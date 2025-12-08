// backend/src/server.js

const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

// test route
app.get("/", (req, res) => {
  res.send("Simple server is working ✅");
});

// start server
app.listen(PORT, () => {
  console.log(`✅ SIMPLE SERVER LISTENING ON http://localhost:${PORT}`);
});
