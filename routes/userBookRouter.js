const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');

const perPage = 10;
const userHomeRouter = require('./userHomeRouter');
//to get all books in application
router.get("/", (req, res, next) => {
    const page = req.query.page;
    Book.find()
        .skip((page > 0 ? ((page - 1) * perPage) : 0))
        .limit(perPage)
        .exec(function (err, data) {
            if (err) throw err;
            res.json(data)
        });
});
//to get book name and show its status according to the user
router.get("/:bookName", (req, res, next) => {
    let bookName = req.params.bookName;
    let mode = req.query.mode;
    let rate = parseInt(req.query.rate);
    // console.log(bookName);
    let bookData = {
        title: null, author: null, category: null, imgSrc: null, describtion: null
        , rate: { userRate: null, rating: null, number: null }, shelve: null,
        reviews: null
    }

    Book.findOne({ title: bookName }, (err, queriedBook) => {
        User.findOne({ firstName: "motaz", "books.book": queriedBook._id }).populate("books.book")
            .exec((err, userData) => {
                let book
                if (userData !== null) {
                    userData.books.forEach(element => {
                        if (element.book.id === queriedBook.id) { //bookHere is id not _id
                            book = element;
                        }
                    });
                    bookData.rate.userRate = book.rate;
                    bookData.shelve = book.shelve;
                }
                bookData.title = queriedBook.title;
                bookData.author = queriedBook.author;
                bookData.category = queriedBook.category;
                bookData.imgSrc = queriedBook.imgSrc;
                bookData.describtion = queriedBook.describtion;
                bookData.rate.rating = queriedBook.rating.total
                bookData.rate.number = queriedBook.rating.users
                res.send(bookData)
            })
    })

});

//change books state
router.put("/:bookName", (req, res, next) => {
    let mode = req.query.mode;
    let userRate = parseInt(req.query.rate);
    let bookName = req.params.bookName;
    if(mode === "read" || mode === "reading" || mode ==="to-read" || (mode === "rating") ){
        //check if the user own this book
    Book.findOne({ title: bookName }, (err, queriedBook) => {
        User.findOne({ firstName: "motaz", "books.book": queriedBook._id }).populate("books.book")
            .exec((err, userData) => {
                if (userData !== null) { // if the user own it use the editBookState in userHomeRouter
                    userHomeRouter.editBookState(bookName,mode,userRate,res)
                }
                else { 
                    if (userRate!==null){ // if the user rated it it will be automatically turned to read
                        mode = "read";
                    }
                    //now the book object will get ready to be added to the user books with the following props 
                    let book = {book : queriedBook , shelve : mode , rate : userRate }
                    //update the book in the books collection
                    Book.findOneAndUpdate({title:bookName} , 
                        {$inc: {"rating.total" : userRate , "rating.users" :  1}},(err,data)=>{
                            if(err){
                                res.status(404).send()
                            }
                        })
                    //motaz will be changed to req.user.userName
                    //add the book to the user
                    User.updateOne({firstName : "motaz"} , { $push: { books: book } },(err,data)=>{
                        console.log(data)
                        res.status(200).send()
                    });
                }
            })
    })}
    else{
        res.status(404).send();
    }
})
//El fashii5 zyad
router.post("/:bookName",(req,res)=>{
    //add the review to book model
    let review = {userName : "zyad" , review : req.body.review} //req.user.firstName
            Book.updateOne({title : req.params.bookName} , { $push: { reviews: review } },(err,data)=>{
                res.send("done")
            });


})

module.exports = router;