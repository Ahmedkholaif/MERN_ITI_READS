const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');
const Category = require('../models/Category');

const multer = require('multer');
const uploading = multer({
    dest: './public/bookCovers'
})


router.post('/', uploading.single("image"), (req, res) => {

    const title = req.body.title;
    const author = req.body.author;
    // image
    const category = req.body.category;
    const imgSrc = req.file.path;

    let authorID;
    let categoryID;
    //query to find the authot and the category

    let findAuthor = 
        Author.findOne(
        // query
        {
            fullName: author
        },
        (err, author) => {
            console.log(author);
            if (err) return res.status(200).send(err)
            console.log(author._id);
            authorID = author._id;
        }
    )


    let findCat = Category.findOne(
        // query
        {
            title: category
        },
        (err, category) => {
            if (err) return res.status(200).send(err)
            categoryID = category._id;
        }
    );
    //converting queries into promises 
    let findAuthPromise = findAuthor.exec();
    let findCatPromise = findCat.exec();

    const addBook = () => {
        const book = new Book({
            title,
            authorID,
            categoryID,
            // imgSrc
        });
        book.save()
            .then(() => {
                res.send("done");
            })
            .catch(e => res.status(404).send(e));
    }

    //use promises to add book after getting the data from the database
    findAuthPromise.then(() => {
        findCatPromise.then(() => {
            addBook();
        })
    })
});



//Routes for Book
// Get all Books and display them
router.get("/", (req, res) => {
    Book.find((err, data) => {
        res.json(data);
    });
});

//Edit a Book
router.put("/:title",uploading.single("image"), (req, res) => {
    const oldTitle = req.params.title;
    const title = req.body.title;
    const authorID = req.body.authorID;
    const categoryID = req.body.categoryID;
    const imgSrc = req.file.path;
    Book.updateOne({
        title: `${oldTitle}`
    }, {
        title:title,
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
router.delete("/:title", (req, res) => {
    Book.deleteOne({
        title: `${title}`
    }, (err) => {
        if (err) console.log(err);
        res.send("Book Deleted");
    })
});
//End of Routes for Books

module.exports = router;
