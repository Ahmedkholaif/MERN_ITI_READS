const express = require('express');

const router = express.Router();
const categoryRouter = require('./CategoriesRouter');
const bookRouter = require('./BooksRouter');
const authorRouter = require('./AuthorsRouter');

router.use('/categories',categoryRouter);
router.use('/books',bookRouter);
router.use('/authors',authorRouter);



module.exports=router;