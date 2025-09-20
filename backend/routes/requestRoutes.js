const express = require("express");
const {
  createRequest,
  myRequests,
  requestsForMyBooks,
  updateRequest,
} = require("../controllers/requestController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, createRequest);
router.get("/my", auth, myRequests);
router.get("/incoming", auth, requestsForMyBooks);
router.put("/:id", auth, updateRequest);

module.exports = router;
