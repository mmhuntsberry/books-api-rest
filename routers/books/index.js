const express = require("express");
const router = express.Router();
const {
  create,
  update,
  remove,
  show,
  list,
} = require("../../controllers/books");

router.get("/", list);

router.get("/:id", show);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

module.exports = router;
