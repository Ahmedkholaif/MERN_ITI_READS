const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');
const bookRouter = require('./userBookRouter');

const authorRouter = require('./userAuthorRouter');
const categoryRouter = require('./userCategoryRoute');

const perPage = 10;
const { authenticate, auth_Admin } = require('../helpers/Auth');
// After using authentication 
//it's used to get books of specific shelve
router.use("/authors",authorRouter);
router.use("/categories",categoryRouter);
router.use("/books",bookRouter);

router.get("/", (req, res) => {
    console.log("gettttttt")
    //get the user req.user._id -- find by id after adding authentication 
    const page = req.query.page;
    const mode = req.query.mode;
    let start = (page > 0 ? (page - 1) : 0) * 5; //start from index ( 0 , 5 , 10 , 15)
    let end = start + 5;
    let pipeline;
    if(mode!=null){
         pipeline = [
            { $match: { firstName: "motaz" } }, // it will be req.user.firstName
            { $unwind: '$books' },
            { $match: { 'books.shelve': mode } },
            { $project: { books: 1, _id: 0 } },
            { $project: { "books._id": 0 } },
        ];
    }
    else {
         pipeline = [
            { $match: { firstName: "motaz" } }, // it will be req.user.firstName
            { $project: { books: 1, _id: 0 } },
            { $project: { "books._id": 0 } },
        ];
    }

    User.aggregate(pipeline, function (err, result) {
        User.populate(result, {
            path: "books.book",
            select: { _id: 0, title: 1, authorID: 1 }
        }, (err, result) => {
            let arr = [];
            result.forEach(element => {
                arr.push(element.books)
            });
            res.json(arr.slice(start, end))

        })
    })
})
router.put("/:bookName",(req,res)=>{
    const mode = req.query.mode;
    const rate = parseInt(req.query.rate);
    console.log(typeof rate);
    let book_id;
    console.log(req.params.bookName);
    console.log(mode);
    if(mode!="rating"){
        console.log("shelve");
        Book.findOne({title:req.params.bookName},(err,data)=>{
            book_id = data._id;
            console.log(book_id);
            User.findOneAndUpdate({firstName : "motaz" , "books.book" : book_id}, //firstName willbe req.user._id
            {'$set' : {'books.$.rate' : mode}},(err,data)=>{
                res.send("done")})
        }) 
    }
    else {
        console.log("rating");
        console.log(rate);
        Book.findOneAndUpdate({title:req.params.bookName} , 
            {$inc: {"rating.total" : rate , "rating.users" :  1}},(err,data)=>{
            book_id = data._id;
            console.log(data);
            User.findOneAndUpdate({firstName : "motaz" , "books.book" : book_id}, //firstName willbe req.user._id
            {'$set' : {'books.$.rate' : rate}},(err,dataa)=>{
                res.send(dataa)})
        }) 
    }
})

/////router Elfashe777777777777777''''''' Ziyad to add search for books , author , category use pattern and relative posibilty contant Aineshtain 
router.get("/dd", (req, res)=> {
    console.log("search")
      const searchQuery = req.query.q;
        if (searchQuery === "books" ){
            res.json("books")
        }
        else if (searchQuery == "authors"){
            res.json("authors") //(data)

        }
        else {
            res.status(404).send()
        }
});















//Routes for testing
router.get("/addUserBook", (req, res, next) => {
    Book.findOne({ title: "ratedbook" }, (err, data) => {
        let book = { book: data, shelve: "read" , rate : 2}
        User.findOneAndUpdate({ firstName: "motaz" }, { $push: { books: book } }, (err, dataa) => {
            console.log(dataa)
        })
        res.send("done")
    })
})

router.get("/addBook",(req,res)=>{
        let book = new Book({ title: "ratedbook", authorID: "motaz" , rating:{total:0,users:0} });
        book.save((err,data)=>{
            res.send("done")
        })
})


module.exports = router;





// const addBooks = () => {
//     for (let index = 0; index < 12; index++) {
//         let book = new Book({ title: "xx", authorID: "motaz" });
//         console.log(book._id)
//         book.save().then(function (result) {
//             console.log(result._id)
//             return User.findOneAndUpdate(
//                 { firstName: "motaz" },
//                 { $push: { books: result } }
//             );
//         }).then(function (result) {
//             console.log('updated post');
//         });

//     }
// }
// const getbooks = (books) => {
//     books.forEach(book => {
//         console.log(book._id)
//         gettedBooks.push(book.id)
//         Book.findById((book._id).then(()=>{
//             gettedBooks.push(data)
//             console.log(data);

//         }),(err,data)=>{
//                     if (err) throw err;

//                 })
//     });
// }


// router.get("/", (req, res, next) => {
    // let books;
    // addBooks()
    // const page = req.query.page;
    // let start = (page > 0 ? (page - 1) : 0) * 10; //start from index ( 0 , 10 , 20 , 30)
    // let end = start + 10;
    // let user;
// })













// })
// Book.find()
//     .skip((page > 0 ? ((page - 1) * perPage) : 0))
//     .limit(perPage)
//     .exec(function (err, data) {
//         if (err) throw err;
//         res.json(data)
//     })