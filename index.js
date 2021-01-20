const express = require("express");
const bodyParser = require("body-parser");
const booksRouter = require("./routers/books");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(booksRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, console.log(`I am listening on port ${5000}`));
