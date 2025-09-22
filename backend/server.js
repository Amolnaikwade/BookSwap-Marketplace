// server.js
require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const connectDB = require("./config/db"); // DB connection
const cors = require("cors"); // Allow cross-origin requests

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/auth", require("./routes/authRoutes")); // Auth routes
app.use("/api/books", require("./routes/bookRoutes")); // Book routes
app.use("/api/requests", require("./routes/requestRoutes")); // Book request routes

// Default route
app.get("/", (req, res) => {
  res.send("📚 BookSwap API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
