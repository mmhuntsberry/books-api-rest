const express = require("express");
const bodyParser = require("body-parser");
const books = require("./routers/books");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(books);

app.get("/", (req, res) => {
  res.send("Welcome to the books API");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
