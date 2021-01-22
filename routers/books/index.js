const express = require("express");
const router = express.Router();
const {
  create,
  update,
  remove,
  show,
  list,
} = require("../../controllers/books");

router.get("/books", list);

router.get("/books/:id", show);

router.post("/books", create);

router.put("/books/:id", update);

router.delete("/books/:id", remove);

module.exports = router;
