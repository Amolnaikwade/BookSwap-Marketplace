const Request = require("../models/Request");
const Book = require("../models/Book");

// Request a book
exports.createRequest = async (req, res) => {
  const { bookId } = req.body;

  // Prevent owner requesting own book
  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ msg: "Book not found" });
  if (book.owner.toString() === req.user) {
    return res.status(400).json({ msg: "You cannot request your own book" });
  }

  const request = new Request({ book: bookId, requester: req.user });
  await request.save();
  res.json(request);
};

// Get requests made by logged-in user
exports.myRequests = async (req, res) => {
  const requests = await Request.find({ requester: req.user }).populate("book");
  res.json(requests);
};

// Get requests for user’s books
exports.requestsForMyBooks = async (req, res) => {
  const requests = await Request.find()
    .populate({
      path: "book",
      match: { owner: req.user },
    })
    .populate("requester", "username email");

  res.json(requests.filter((r) => r.book)); // only requests for my books
};

// Update request status (accept/decline)
exports.updateRequest = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const request = await Request.findById(id).populate("book");
  if (!request) return res.status(404).json({ msg: "Request not found" });
  if (request.book.owner.toString() !== req.user) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  request.status = status;
  await request.save();
  res.json(request);
};
