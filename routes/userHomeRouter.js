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
    //it get the data based on page and mode
    //get the user req.user._id -- find by id after adding authentication 
    // console.log(req.headers);
    // console.log(req.user);
    // console.log(req.query);
    const {email,img}=req.user;
    const page = req.query.page;
    const mode = req.query.mode;
    let start = (page > 0 ? (page - 1) : 0) * 5; //start from index ( 0 , 5 , 10 , 15)
    let end = start + 5;
    let pipeline;
    if(mode !== 'all'){
         pipeline = [
            { $match: { email: req.user.email } }, // it will be req.user.firstName
            { $unwind: '$books' }, // to comvert the books field into array
            { $match: { 'books.shelf': mode } }, 
            { $project: { books: 1, _id: 0 } }, //to only keep books and user's id
            { $project: { "books._id": 0 } }, // to remove book id
            {$skip : start }, //for pagunation
            {$limit : end }
        ];
    }
    else {
         pipeline = [
            { $match: { email: req.user.email } }, // it will be req.user.firstName
            { $unwind: '$books' }, // to comvert the books field into array
            { $project: { books: 1, _id: 0 } },
            { $project: { "books._id": 0 } },
            {$skip : page*5 || 0},
            {$limit : 5 }
        ];
    }
    User.aggregate(pipeline, function (err, result) {
        if(err){
            res.status(404).send(err);
        }
        User.populate(result, {
            path: "books.bookInfo",
            select: { img:1,_id: 0, bookName: 1, author: 1,category:1,avgRate:1 } //select fields to return
        }, (err, result) => {
            console.log(result);
            if(err){
                console.log(err)
                // res.status(404).send()
            }
            let books = [];
            result.forEach(element => {
                books.push(element.books)
            });
            return res.json({"books":books,email,img});
        })
    })
})
//this is used to add rating or to change shelve
const editBookState = (bookName,mode,rate,res)=>{
    let book_id;
    if(mode === "read" || mode === "reading" || mode === "to-read"){
        Book.findOne({title:bookName},(err,data)=>{
            if(err){
                res.send(err)
            }
            if(data){
                book_id = data._id;
                console.log("i will change state of " , book_id , "to " , mode);
                User.findOneAndUpdate({firstName : "motaz" , "books.book" : book_id}, //firstName willbe req.user._id
                {'$set' : {'books.$.shelve' : mode}},(err,dataa)=>{
                    if(err){
                        res.status(404).send(err)
                    }
                    console.log("found in user");
                    res.status(200).send()})
            }
            else{
                    res.status(404).send(data)
                }

        }) 
    }
    else if(mode=="rating") {
        Book.findOneAndUpdate({title:bookName} , 
            {$inc: {"rating.total" : rate , "rating.users" :  1}},(err,data)=>{ //$inc to increament
                if(err){
                    res.status(404).send()
                }
            book_id = data._id;
            User.findOneAndUpdate({firstName : "motaz" , "books.book" : book_id}, //firstName willbe req.user._id
            {'$set' : {'books.$.rate' : rate}},(err,dataa)=>{
                console.log("found in user");
                res.send.status(200).send()})
        }) 
    }
    else{
        res.status(404).send()
    }
}
// edit the book
router.put("/:bookName",(req,res)=>{
    const mode = req.query.mode;
    const rate = parseInt(req.query.rate);
    const bookName = req.params.bookName;
    editBookState(bookName,mode,rate,res)
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
        })
        res.send("done")
    })
})

router.get("/addBook",(req,res)=>{
        let book = new Book({ title: "willBeAdded", authorID: "motaz" , rating:{total:0,users:0} });
        book.save((err,data)=>{
            res.send("done")
        })
})

module.exports.editBookState = editBookState;
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