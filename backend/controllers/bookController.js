const Book = require("../models/Book");

// Add a new book
exports.addBook = async (req, res) => {
  const { title, author, condition, image } = req.body;
  const book = new Book({ title, author, condition, image, owner: req.user });
  await book.save();
  res.json(book);
};

// Get all books
exports.getBooks = async (req, res) => {
  const books = await Book.find().populate("owner", "username email");
  res.json(books);
};

// Get user’s own books
exports.getMyBooks = async (req, res) => {
  const books = await Book.find({ owner: req.user });
  res.json(books);
};
