const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const User = require("../models/User");
const Author = require("../models/Author");
const bookRouter = require("./userBookRouter");
const authorRouter = require("./userAuthorRouter");
const categoryRouter = require("./userCategoryRoute");

const perPage = 10;
const { authenticate, auth_Admin } = require("../helpers/Auth");
// After using authentication
//it's used to get books of specific shelve
router.use("/authors", authorRouter);
router.use("/categories", categoryRouter);
router.use("/books", bookRouter);

router.get("/", (req, res) => {
  //it get the data based on page and mode
  //get the user req.user._id -- find by id after adding authentication
  // console.log(req.headers);
  // console.log(req.user);
  // console.log(req.query);
  const { email, img } = req.user;
  const page = req.query.page;
  const mode = req.query.mode;
  let start = (page > 0 ? page - 1 : 0) * 5; //start from index ( 0 , 5 , 10 , 15)
  let end = start + 5;
  let pipeline;
  if (mode !== "all") {
    pipeline = [
      { $match: { email: req.user.email } }, // it will be req.user.firstName
      { $unwind: "$books" }, // to comvert the books field into array
      { $match: { "books.shelf": mode } },
      { $project: { books: 1, _id: 0 } }, //to only keep books and user's id
      { $project: { "books._id": 0 } }, // to remove book id
      { $skip: start }, //for pagunation
      { $limit: end }
    ];
  } else {
    pipeline = [
      { $match: { email: req.user.email } }, // it will be req.user.firstName
      { $unwind: "$books" }, // to comvert the books field into array
      { $project: { books: 1, _id: 0 } },
      { $project: { "books._id": 0 } },
      { $skip: page * 5 || 0 },
      { $limit: 5 }
    ];
  }
  User.findOne({ email: req.user.email }, (err, user) => {
    let count = 0;
    if (mode != "all") {
      user.books.forEach(book => {
        if (book.shelf === mode) {
          count++;
        }
      });
    } else {
      count = user.books.length;
    }
    console.log(count);
    User.aggregate(pipeline, function(err, result) {
      if (err) {
        res.status(500).send();
      }
      User.populate(
        result,
        {
          path: "books.bookInfo",
          select: {
            img: 1,
            _id: 0,
            bookName: 1,
            author: 1,
            category: 1,
            avgRate: 1
          } //select fields to return
        },
        (err, result) => {
          console.log(result);
          if (err) {
            console.log(err);
            // res.status(404).send()
          }
          let books = [];
          result.forEach(element => {
            books.push(element.books);
          });
          return res.json({ books: books, count, email, img });
        }
      );
    });
  });
});
//this is used to add rating or to change shelve
const editBookState = (bookName, mode, rate, res) => {
  let book_id;
  if (mode === "read" || mode === "current" || mode === "toRead") {
    Book.findOne({ bookName: bookName }, (err, data) => {
      if (err) {
        res.status(404).send();
      }
      if (data) {
        book_id = data._id;
        User.findOneAndUpdate(
          { email: "ahmed_kholaif@yahoo.com", "books.bookInfo": book_id }, //firstName willbe req.user._id
          { $set: { "books.$.shelf": mode } },
          (err, dataa) => {
            if (err) {
              res.status(404).send(err);
            } else {
              res.status(200).send();
            }
          }
        );
      }
    });
  } else if (mode == "rating") {
    Book.findOneAndUpdate(
      { bookName: bookName },
      { $inc: { "avgRate.total": rate, "avgRate.users": 1 } },
      (err, data) => {
        //$inc to increament
        if (err) {
          res.status(404).send();
        }
        book_id = data._id;
        User.findOneAndUpdate(
          { email: "ahmed_kholaif@yahoo.com", "books.bookInfo": book_id }, //firstName willbe req.user._id
          { $set: { "books.$.rate": rate } },
          (err, dataa) => {
            console.log(dataa);
            console.log(err);
            res.status(200).send();
          }
        );
      }
    );
  } else {
    res.status(404).send();
  }
};
// edit the book
router.put("/:bookName", (req, res) => {
  const mode = req.query.mode;
  const rate = parseInt(req.query.rate);
  const bookName = req.params.bookName;
  editBookState(bookName, mode, rate, res);
});

//use GET : /api/users/search?type=book&title=Blue+Cat
// to search for a book or author and search by title
router.get("/search", (req, res) => {
  const q = req.query.q;
  const type = req.query.type;
  if (type === "book") {
    Book.find(
      { bookName: { $regex: ".*" + q + ".*", $options: "i" } },
      (err, result) => {
        if (err) return handleError(err);
        console.log(result);
        res.json(result);
      }
    );
  } else if (type === "author") {
    Author.find(
      { fullName: { $regex: ".*" + q + ".*", $options: "i" } },
      (err, result) => {
        if (err) return handleError(err);
        console.log(result);
        res.json(result);
      }
    );
  } else {
    res.status(404).send();
    console.log("404");
  }
});
// } else if(type === "author"){

// }  else {

// console.log(type);
// res.json([q,type]);

// res.json(name);

//   const searchQuery = req.query.q;
//     if (searchQuery === "books" ){
//         res.json("books")
//     }
//     else if (searchQuery == "authors"){
//         res.json("authors") //(data)

//     }
//     else {
//         res.status(404).send()
//     }
// });

//Routes for testing
router.get("/addUserBook", (req, res, next) => {
  Book.findOne({ bookName: "ahemd fi belad el 3ga2eb" }, (err, data) => {
    let book = { bookInfo: data, shelf: "read", rate: 2 };
    User.findOneAndUpdate(
      { email: "ahmed_kholaif@yahoo.com" },
      { $push: { books: book } },
      (err, dataa) => {}
    );
    res.send("done");
  });
});

router.get("/addBook", (req, res) => {
  let book = new Book({
    bookName: "ahemd fi belad el 3ga2eb",
    author: "Kholaif",
    category: "horror",
    img:
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
    avgRate: { total: 0, users: 0 }
  });
  book.save((err, data) => {
    res.send("done");
  });
});

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
