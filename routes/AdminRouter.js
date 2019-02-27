const express = require("express");

const Author = require("../models/Author");
const Book = require("../models/Book");
const Category = require("../models/Category");
const categoryRouter = require("./CategoriesRouter");
const bookRouter = require("./BooksRouter");
const authorRouter = require("./AuthorsRouter");

const router = express.Router();
router.use("/categories", categoryRouter);
router.use("/books", bookRouter);
router.use("/authors", authorRouter);

module.exports = router;
