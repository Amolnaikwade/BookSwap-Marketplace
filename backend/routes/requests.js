const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Request = require("../models/Request");
const Book = require("../models/Book");

// Send a request for a book
router.post("/:bookId", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ msg: "Book not found" });

    // Check if user already requested
    const existing = await Request.findOne({ book: book._id, requester: req.user.id });
    if (existing) return res.status(400).json({ msg: "You already requested this book" });

    const request = new Request({
      book: book._id,
      requester: req.user.id,
      status: "pending",
    });

    await request.save();

    // Optionally, attach request info to book for frontend
    book.requested = request;
    await book.save();

    res.json({ msg: "Request sent", request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all requests by logged-in user
router.get("/my", auth, async (req, res) => {
  try {
    const requests = await Request.find({ requester: req.user.id }).populate("book");
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
