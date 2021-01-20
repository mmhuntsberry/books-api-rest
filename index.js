const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const pool = require("./sql/connection");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/books", (req, res) => {
  pool.query("SELECT * FROM book", (err, rows) => {
    if (err) throw new Error(err);
    return res.json(rows);
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;

  pool.query(`SELECT * FROM book WHERE id = ${id}`, (err, rows) => {
    if (err) throw new Error(err);
    return res.json(rows);
  });
});

app.post("/books", (req, res) => {
  const book = req.body;
  console.log(book);

  // Values have to be surrounded by strings!  Got ya.
  pool.query(
    `INSERT INTO book (title, author, cover_Art, publisher) VALUES ("${book.title}" , "${book.author}", "${book.cover_art}", "${book.publisher}")
`,
    (err, rows) => {
      if (err) {
        console.error({ err });
        return res.status(500).send("An unexpected error occurred");
      }
      return res.json({ id: rows.insertId });
    }
  );
});

app.listen(PORT, console.log(`I am listening on port ${5000}`));
