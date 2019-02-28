const express = require("express");
const router = express.Router();
const Author = require("../models/Author");
const Book = require("../models/Book");
const perPage = 10;

// Get all the Author in the DB
router.get("/", (req, res) => {
  Author.find(
    (err, data)
      .skip(page > 0 ? (page - 1) * perPage : 0)
      .limit(perPage)
      .exec(function(err, data) {
        if (err) throw err;
        res.json(data);
      })
  );
});
// Get the books of the Author has been selected
router.get("/:authorName", (req, res) => {
  let author = req.params.authorName;
  const page = req.query.page;
  console.log((page - 1) * perPage);
  Author.findOne({ fullName: author }, (err, authorData) => {
    console.log(authorData);
    Book.find({ author: author })
      .skip(page > 0 ? (page - 1) * perPage : 0)
      .limit(perPage)
      .exec(function(err, books) {
        if (err) throw err;
        console.log(books);
        data = { name: authorData.fullName, img: authorData.img, books };
        console.log(data);
        res.json(data);
      });
  });
});

module.exports = router;
