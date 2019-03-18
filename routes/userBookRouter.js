const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const User = require("../models/User");

const perPage = 10;
const userHomeRouter = require("./userHomeRouter");
//to get all books in application
router.get("/", (req, res, next) => {
  const page = req.query.page;
  Book.find({})
    .skip(page > 0 ? (page - 1) * perPage : 0)
    .limit(perPage)
    .exec(function (err, books) {
      if (err) res.status(404).send({ err });
      res.status(200).json({ books });
    });
});
//to get book name and show its status according to the user
router.get("/:bookName", (req, res, next) => {
  let bookName = req.params.bookName;
  let mode = req.query.mode;
  let rate = parseInt(req.query.rate);
  // console.log(bookName);
  let bookData = {
    bookInfo : {
      bookName: null,
      author: null,
      category: null,
      img: null,
      description: null,
    }
    ,
    rating: {rating: null, number: null },
    rate : null,
    shelf: null,
    reviews: null
  };

  Book.findOne({ bookName: bookName }, (err, queriedBook) => {
    console.log(queriedBook);
    User.findOne({
      email: req.user.email,
      "books.bookInfo": queriedBook._id
    })
      .populate("books.bookInfo")
      .exec((err, userData) => {
        let book;
        if (userData !== null) {
          userData.books.forEach(element => {
            if (element.bookInfo.id === queriedBook.id) {
              //bookHere is id not _id
              book = element;
            }
          });
          bookData.rate = book.rate;
          bookData.shelf = book.shelf;
        }
        bookData.bookInfo.bookName = queriedBook.bookName;
        bookData.bookInfo.author = queriedBook.author;
        bookData.bookInfo.category = queriedBook.category;
        bookData.bookInfo.img = queriedBook.img;
        bookData.bookInfo.description = queriedBook.description;
        bookData.rating.rating = queriedBook.avgRate.total;
        bookData.rating.number = queriedBook.avgRate.users;
        bookData.bookInfo.reviews = queriedBook.reviews;
        console.log(bookData);
        res.send(bookData);
      });
  });
});

//change books state
router.put("/:bookName", (req, res, next) => {
  let mode = req.query.mode;
  console.log(mode);
  let userRate;
  if (req.query.rate) {
    userRate = parseInt(req.query.rate)
  }
  else {
    userRate = 0;
  }
  let bookName = req.params.bookName;
  if (
    mode === "Read" ||
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
            userHomeRouter.editBookState(bookName, mode, userRate, res,req);
          } else {
            console.log("not in books");
            if (userRate !== 0) {
              // if the user rated it it will be automatically turned to read
              mode = "read";
            }
            //now the book object will get ready to be added to the user books with the following props
            let book = {
              bookInfo: queriedBook,
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
            // console.log(req.user.email);
            //motaz will be changed to req.user.userName
            //add the book to the user
            console.log("not in books");
            User.findOneAndUpdate(
              { email: req.user.email },
              { $push: { books: book } },
              (err, data) => {
                // console.log(err);
                // console.log(data);
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
