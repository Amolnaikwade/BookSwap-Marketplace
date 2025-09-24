const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

// create book (auth)
router.post('/', auth, async (req, res) => {
  try {
    const payload = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      image_url: req.body.image_url,
      category: req.body.category,
      owner: req.user._id
    };
    const b = await Book.create(payload);
    res.status(201).json(b);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// list books (search + pagination)
router.get('/', async (req, res) => {
  try {
    const { q, page = 1, limit = 12 } = req.query;
    const filter = q ? { $or: [ { title: new RegExp(q, 'i') }, { author: new RegExp(q, 'i') }, { category: new RegExp(q, 'i') } ] } : {};
    const books = await Book.find(filter)
      .skip((page-1)*limit)
      .limit(Number(limit))
      .populate('owner', 'name email');
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get single
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('owner', 'name email');
    if (!book) return res.status(404).json({ message: 'Not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update
router.put('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Not found' });
    if (!book.owner.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Not found' });
    if (!book.owner.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    await book.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
