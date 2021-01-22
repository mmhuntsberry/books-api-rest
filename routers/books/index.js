const express = require("express");
const router = express.Router();
const booksControllers = require("../../controllers/books/books");

router.get("/books", booksControllers.list);

router.get("/books/:id", booksControllers.show);

router.post("/books", booksControllers.create);

router.put("/books/:id", booksControllers.update);

router.delete("/books/:id", booksControllers.remove);

module.exports = router;
