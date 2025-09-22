// routes/requests.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // JWT authentication middleware
const Request = require("../models/Request"); // Request model
const Book = require("../models/Book");       // Book model

// ====================================================
// POST /api/requests/:bookId
// Send a book request
// ====================================================
router.post("/:bookId", auth, async (req, res) => {
  try {
    // Find the book by ID
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ msg: "Book not found" });

    // Check if user already requested this book
    const existingRequest = await Request.findOne({
      book: book._id,
      requester: req.user.id,
    });
    if (existingRequest)
      return res.status(400).json({ msg: "You already requested this book" });

    // Create new request
    const request = new Request({
      book: book._id,
      requester: req.user.id,
      status: "pending",
    });

    await request.save(); // Save request to DB

    res.json({ msg: "Request sent successfully", request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ====================================================
// GET /api/requests/my
// Get all requests sent by the logged-in user
// ====================================================
router.get("/my", auth, async (req, res) => {
  try {
    // Find requests made by this user and populate book details
    const requests = await Request.find({ requester: req.user.id }).populate("book");
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
