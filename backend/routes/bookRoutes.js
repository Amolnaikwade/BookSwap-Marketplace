const express = require("express");
const { addBook, getBooks, getMyBooks } = require("../controllers/bookController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, addBook);
router.get("/", getBooks);
router.get("/my", auth, getMyBooks);

module.exports = router;
