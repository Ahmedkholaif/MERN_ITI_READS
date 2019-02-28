const express = require("express");
const router = express.Router();
const Author = require("../models/Author");
const Book = require("../models/Book");
const perPage = 10;

// Get all the Author in the DB

router.get("/", (req, res) => {
  const page = req.query.page;
  Author.count({}, (err, count) => {
    Author.find({})
      .skip(page > 0 ? (page - 1) * perPage : 0)
      .limit(perPage)
      .exec(function (err, authors) {
        if (err) throw err;
        data = { authors, count }
        res.json(data);
      })
      ;
  })
});
// Get the books of the Author has been selected
router.get("/:authorName", (req, res) => {
  let author = req.params.authorName;
  const page = req.query.page;
  console.log((page - 1) * perPage);
  Author.findOne({ fullName: author }, (error, authorData) => {
    Book.count({ author: author }, (err, count) => {
      Book.find({ author: author })
        .skip(page > 0 ? (page - 1) * perPage : 0)
        .limit(perPage)
        .exec(function (err, books) {
          if (err) throw err;
          data = { books, count, name: authorData.fullName, img: authorData.img }
          console.log(data);
          res.json(data);
        });
    })
  })

});

module.exports = router;
