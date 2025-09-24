const express = require('express');
const auth = require('../middleware/auth');
const Request = require('../models/Request');
const Book = require('../models/Book');

const router = express.Router();

// Create request
router.post('/:bookId', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.owner.equals(req.user._id)) return res.status(400).json({ message: 'Cannot request your own book' });

    const existing = await Request.findOne({ book: book._id, requester: req.user._id });
    if (existing) return res.status(400).json({ message: 'You already requested this book' });

    const request = await Request.create({
      book: book._id,
      requester: req.user._id,
      owner: book.owner
    });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get requests for logged-in user (books they own)
router.get('/', auth, async (req, res) => {
  try {
    const requests = await Request.find({ owner: req.user._id })
      .populate('book', 'title author')
      .populate('requester', 'name email')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Update request status (accept/reject)
router.put('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (!request.owner.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    request.status = status;
    await request.save();
    res.json(request);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
