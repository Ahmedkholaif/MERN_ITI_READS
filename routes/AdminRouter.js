const express = require('express');

const Author = require('../models/Author');
const Book = require('../models/Book');
const Category = require('../models/Category');

const router = express.Router();
const categoryRouter = require('./CategoriesRouter');
const bookRouter = require('./BooksRouter');
const authorRouter = require('./AuthorsRouter');

router.use('/categories',categoryRouter);
router.use('/books',bookRouter);
router.use('/authors',authorRouter);

module.exports=router;