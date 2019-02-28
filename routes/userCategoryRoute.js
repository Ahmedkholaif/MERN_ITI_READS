const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Book = require("../models/Book");
const perPage = 10;

// Get all the categories in the DB
router.get("/", (req, res) => {
  Category.find((err, data) => {
    res.json(data);
  });
});
// Get the books of the category has been selected
router.get("/:categoryName", (req, res) => {
  let cat = req.params.categoryName;
  const page = req.query.page;
  Book.find({ category: cat })
    .skip(page > 0 ? (page - 1) * perPage : 0)
    .limit(perPage)
    .exec(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
});

module.exports = router;
