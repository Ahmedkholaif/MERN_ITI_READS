const express = require('express');

const Author = require('../models/Author');
const Book = require('../models/Book');
const Category = require('../models/Category');

const router = express.Router();



//Routes for Category
// Get all category and display them
router.get("/admin/category", (req, res) => {
    Category.find((err, data) => {
        res.json(data);
    });
});
//Add a new category
router.post("/admin/category", (req, res) => {

    const title = req.body.title;
    const category1 = new Category({
        title: title,
    });
    console.log(category1);
    user1.save((err) => {
        if (err) console.log(err);
    })
    res.json(category1);
});
//Edit a category
router.put("/admin/category/:id", (req, res) => {
    const id = req.params.id;
    const title = req.body.title;

    Category.updateOne({
        _id: `${id}`
    }, {
        title: title,
    }, (err, res) => {
        if (err) console.log(err);
        console.log(res);
    });
    res.send("Category Updated");
});
//Delete a category
router.delete("/admin/category/:id", (req, res) => {
    const id = req.params.id;
    Category.deleteOne({
        _id: `${id}`
    }, (err) => {
        if (err) console.log(err);
        res.send("Category Deleted");
    })
});
//End of Routes for Category


//Routes for Book
// Get all Books and display them
router.get("/admin/book", (req, res) => {
    Book.find((err, data) => {
        res.json(data);
    });
});
//Add a new Book
router.post("/admin/book", (req, res) => {

    const title = req.body.title;
    const authorID = req.body.authorID;
    const categoryID = req.body.categoryID;
    const imgSrc = req.body.imgSrc;
    const book1 = new Book({
        title: title,
        authorID: authorID,
        categoryID: categoryID,
        imgSrc: imgSrc
    });
    console.log(book1);
    book1.save((err) => {
        if (err) console.log(err);
    })
    res.json(book1);
});
//Edit a Book
router.put("/admin/book/:id", (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const authorID = req.body.authorID;
    const categoryID = req.body.categoryID;
    const imgSrc = req.body.imgSrc;
    Book.updateOne({
        _id: `${id}`
    }, {
        title: title,
        authorID: authorID,
        categoryID: categoryID,
        imgSrc: imgSrc
    }, (err, res) => {
        if (err) console.log(err);
        console.log(res);
    });
    res.send("Book Updated");
});
//Delete a Book
router.delete("/admin/book/:id", (req, res) => {
    const id = req.params.id;
    Book.deleteOne({
        _id: `${id}`
    }, (err) => {
        if (err) console.log(err);
        res.send("Book Deleted");
    })
});
//End of Routes for Books


//Start of Routes for Author
// Get all Author and display them
router.get("/admin/author", (req, res) => {
    Author.find((err, data) => {
        res.json(data);
    });
});
//Add a new Author
router.post("/admin/author", (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const imgSrc = req.body.imgSrc;
    const dateOfBirth = req.body.dateOfBirth;
    const author1 = new Category({
        firstName: firstName,
        lastName: lastName,
        imgSrc: imgSrc,
        dateOfBirth: dateOfBirth
    });
    console.log(author1);
    author1.save((err) => {
        if (err) console.log(err);
    })
    res.json(author1);
});
//Edit an Author 
router.put("/admin/author/:id", (req, res) => {
    const id = req.params.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const imgSrc = req.body.imgSrc;
    const dateOfBirth = req.body.dateOfBirth;

    Author.updateOne({
        _id: `${id}`
    }, {
        firstName: firstName,
        lastName: lastName,
        imgSrc: imgSrc,
        dateOfBirth: dateOfBirth
    }, (err, res) => {
        if (err) console.log(err);
        console.log(res);
    });
    res.send("Author Updated");
});
//Delete an Author
router.delete("/admin/author/:id", (req, res) => {
    const id = req.params.id;
    Author.deleteOne({
        _id: `${id}`
    }, (err) => {
        if (err) console.log(err);
        res.send("Author Deleted");
    })
});
//End of Routes for Author






module.exports=router;