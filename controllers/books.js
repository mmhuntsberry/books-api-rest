const express = require("express");
const mysql = require("mysql");
const pool = require("../sql/connection");

const list = (req, res) => {
  pool.query("SELECT * FROM book", (err, rows) => {
    if (err) throw new Error(err);
    return res.json(rows);
  });
};

const show = (req, res) => {
  const id = req.params.id;

  pool.query(`SELECT * FROM book WHERE id = ${id}`, (err, rows) => {
    if (err) throw new Error(err);
    return res.json(rows);
  });
};

const create = (req, res) => {
  const book = req.body;

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
};

const update = (req, res) => {
  let sql = "UPDATE ?? SET ? WHERE ?? = ?";
  sql = mysql.format(sql, ["book", req.body, "id", req.params.id]);

  pool.query(sql, (err, results) => {
    if (err) {
      throw new Error(err);
    }
    return res.json({ id: results.message });
  });
};

const remove = (req, res) => {
  let sql = "DELETE FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["book", "id", req.params.id]);
  pool.query(sql, (err, results) => {
    if (err) {
      throw new Error(err);
    }

    return res.json({ affected: results.affectedRows });
  });
};

module.exports = { list, show, create, update, remove };
