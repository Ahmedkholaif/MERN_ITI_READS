const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const User = require("../models/User");

const perPage = 10;
const userHomeRouter = require("./userHomeRouter");
//to get all books in application
router.get("/", (req, res, next) => {
  const page = req.query.page;
  Book.find()
    .skip(page > 0 ? (page - 1) * perPage : 0)
    .limit(perPage)
    .exec(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
});
//to get book name and show its status according to the user
router.get("/:bookName", (req, res, next) => {
  let bookName = req.params.bookName;
  let mode = req.query.mode;
  let rate = parseInt(req.query.rate);
  // console.log(bookName);
  let bookData = {
    title: null,
    author: null,
    category: null,
    imgSrc: null,
    describtion: null,
    rate: { userRate: null, rating: null, number: null },
    shelve: null,
    reviews: null
  };

  Book.findOne({ title: bookName }, (err, queriedBook) => {
    User.findOne({
      email: req.user.email,
      "books.bookInfo": queriedBook._id
    })
      .populate("books.bookInfo")
      .exec((err, userData) => {
        let book;
        if (userData !== null) {
          userData.books.forEach(element => {
            if (element.book.id === queriedBook.id) {
              //bookHere is id not _id
              book = element;
            }
          });
          bookData.rate.userRate = book.rate;
          bookData.shelf = book.shelf;
        }
        bookData.bookName = queriedBook.bookName;
        bookData.author = queriedBook.author;
        bookData.category = queriedBook.category;
        bookData.img = queriedBook.img;
        bookData.describtion = queriedBook.describtion;
        bookData.rate.rating = queriedBook.rating.total;
        bookData.rate.number = queriedBook.rating.users;
        res.send(bookData);
      });
  });
});

//change books state
router.put("/:bookName", (req, res, next) => {
  let mode = req.query.mode;
  let userRate = parseInt(req.query.rate);
  let bookName = req.params.bookName;
  if (
    mode === "read" ||
    mode === "current" ||
    mode === "toRead" ||
    mode === "rating"
  ) {
    //check if the user own this book
    Book.findOne({ bookName: bookName }, (err, queriedBook) => {
      User.findOne({
        email: req.user.email,
        "books.bookInfo": queriedBook._id
      })
        .populate("books.bookInfo")
        .exec((err, userData) => {
          if (userData !== null) {
            // if the user own it use the editBookState in userHomeRouter
            userHomeRouter.editBookState(bookName, mode, userRate, res);
          } else {
            if (userRate !== null) {
              // if the user rated it it will be automatically turned to read
              mode = "read";
            }
            //now the book object will get ready to be added to the user books with the following props
            let book = {
              book: queriedBook,
              shelf: mode,
              rate: userRate
            };
            //update the book in the books collection
            Book.findOneAndUpdate(
              { bookName: bookName },
              {
                $inc: {
                  "rating.total": userRate,
                  "rating.users": 1
                }
              },
              (err, data) => {
                if (err) {
                  res.status(404).send();
                }
              }
            );
            //motaz will be changed to req.user.userName
            //add the book to the user
            User.updateOne(
              { email: req.user.email },
              { $push: { books: bookInfo } },
              (err, data) => {
                console.log(data);
                res.status(200).send();
              }
            );
          }
        });
    });
  } else {
    res.status(404).send();
  }
});
//El fashii5 zyad
router.post("/:bookName", (req, res) => {
  //add the review to book model
  if (req.body.review != null) {
    let review = {
      userName: req.user.firstName + " " + req.user.lastName,
      review: req.body.review
    }; //req.user.firstName
    Book.updateOne(
      { bookName: req.params.bookName },
      { $push: { reviews: review } },
      (err, data) => {
        if (err) {
          res.status(404).send;
        }
        res.status(200).send();
      }
    );
  } else {
    req.status(404).send();
  }
});

module.exports = router;
